"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/lib/business";
import {
  FRAME_COUNT,
  INTRO_END,
  OUTRO_START,
  chapters,
  framePath,
  type Chapter,
} from "@/lib/hood";
import { scrollToY } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = { amber: "#f5a524", cyan: "#4cc9f0" } as const;
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
/** Smoothstep between edges a and b. */
const ss = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const frameToProgress = (f: number) =>
  INTRO_END + (f / (FRAME_COUNT - 1)) * (OUTRO_START - INTRO_END);

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function UnderTheHood() {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  return reduced ? <StaticHood /> : <ScrollHood />;
}

function ScrollHood() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const loadBarRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const mobileFillRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reticleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const small = window.innerWidth < 768;

    // Progressive frame loading: first frame, then the rest in order.
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded = new Uint8Array(FRAME_COUNT);
    let loadedCount = 0;
    let disposed = false;
    let dirty = true;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (disposed) return resolve();
          loaded[i] = 1;
          loadedCount++;
          if (loadBarRef.current) {
            loadBarRef.current.style.transform = `scaleX(${loadedCount / FRAME_COUNT})`;
            if (loadedCount === FRAME_COUNT) loadBarRef.current.style.opacity = "0";
          }
          dirty = true;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(i, small);
        images[i] = img;
      });

    (async () => {
      await load(0);
      const queue = Array.from({ length: FRAME_COUNT - 1 }, (_, i) => i + 1);
      const worker = async () => {
        while (queue.length && !disposed) await load(queue.shift()!);
      };
      await Promise.all(Array.from({ length: 6 }, worker));
    })();

    // Canvas sizing follows the 16:9 stage.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = stage.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      dirty = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();

    let targetFrame = 0;
    let currentFrame = 0;
    let drawnFrame = -1;

    const nearestLoaded = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (i - d >= 0 && loaded[i - d]) return i - d;
        if (i + d < FRAME_COUNT && loaded[i + d]) return i + d;
      }
      return -1;
    };

    const render = () => {
      currentFrame += (targetFrame - currentFrame) * 0.22;
      if (Math.abs(targetFrame - currentFrame) < 0.01) currentFrame = targetFrame;
      const idx = nearestLoaded(Math.round(currentFrame));
      if (idx < 0 || (!dirty && idx === drawnFrame)) return;
      ctx.drawImage(images[idx], 0, 0, canvas.width, canvas.height);
      drawnFrame = idx;
      dirty = false;
    };
    gsap.ticker.add(render);

    let lastActive = -2;
    const update = (p: number) => {
      const f = clamp((p - INTRO_END) / (OUTRO_START - INTRO_END)) * (FRAME_COUNT - 1);
      targetFrame = f;

      const heroOut = ss(0.025, 0.085, p);
      if (heroRef.current) {
        heroRef.current.style.opacity = String(1 - heroOut);
        heroRef.current.style.transform = `translate3d(0, ${-48 * heroOut}px, 0)`;
        heroRef.current.style.visibility = heroOut >= 1 ? "hidden" : "visible";
      }

      const posterIn = Math.max(1 - ss(0.07, INTRO_END, p), ss(OUTRO_START + 0.01, 0.975, p));
      if (posterRef.current) posterRef.current.style.opacity = String(posterIn);

      let best = -1;
      let bestOpacity = 0;
      chapters.forEach((c, i) => {
        const fadeIn = i === 0 ? ss(0.08, INTRO_END, p) : ss(c.from - 5, c.from + 7, f);
        const fadeOut =
          i === chapters.length - 1 ? ss(OUTRO_START, OUTRO_START + 0.03, p) : ss(c.to - 7, c.to + 5, f);
        const o = fadeIn * (1 - fadeOut);
        const panel = panelRefs.current[i];
        if (panel) {
          const shift = (1 - fadeIn) * 36 - fadeOut * 36;
          panel.style.opacity = String(o);
          panel.style.transform = `translate3d(0, ${shift}px, 0)`;
          panel.style.visibility = o < 0.01 ? "hidden" : "visible";
        }
        const reticle = reticleRefs.current[i];
        if (reticle) {
          reticle.style.opacity = String(o);
          reticle.style.transform = `scale(${0.7 + 0.3 * o})`;
        }
        if (o > bestOpacity) {
          bestOpacity = o;
          best = i;
        }
      });

      const outro = ss(0.945, 0.985, p);
      if (outroRef.current) {
        outroRef.current.style.opacity = String(outro);
        outroRef.current.style.transform = `translate3d(0, ${(1 - outro) * 36}px, 0)`;
        outroRef.current.style.visibility = outro < 0.01 ? "hidden" : "visible";
      }

      const fill = `scaleY(${f / (FRAME_COUNT - 1)})`;
      if (railFillRef.current) railFillRef.current.style.transform = fill;
      if (mobileFillRef.current)
        mobileFillRef.current.style.transform = `scaleX(${f / (FRAME_COUNT - 1)})`;

      const next = bestOpacity > 0.5 ? best : -1;
      if (next !== lastActive) {
        lastActive = next;
        setActive(next);
      }
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
    });
    update(st.progress);

    return () => {
      disposed = true;
      st.kill();
      ro.disconnect();
      gsap.ticker.remove(render);
    };
  }, []);

  const jumpTo = useCallback((i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const c = chapters[i];
    const p = frameToProgress((c.from + c.to) / 2);
    const top = section.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + p * (section.offsetHeight - window.innerHeight));
  }, []);

  const accent = active >= 0 ? ACCENT[chapters[active].accent] : ACCENT.amber;

  return (
    <section
      id="under-the-hood"
      ref={sectionRef}
      aria-label="Under the hood: an interactive tour of four car systems"
      className="relative h-[560vh] lg:h-[640vh]"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div id="top" className="absolute top-0" />
      <div className="grain sticky top-0 h-svh overflow-hidden">
        <div className="blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_45%,#000_20%,transparent_75%)]" />
        {/* Ambient glow picks up the lit system's color. */}
        <div
          className="pointer-events-none absolute top-1/2 right-[-10%] size-[70vmax] -translate-y-1/2 rounded-full opacity-[0.07] blur-[140px] transition-colors duration-1000"
          style={{ background: "var(--accent)" }}
        />

        <div className="relative mx-auto flex h-full max-w-[1480px] flex-col px-5 pt-20 pb-6 sm:px-8 lg:grid lg:grid-cols-[minmax(380px,0.44fr)_1fr] lg:items-center lg:gap-6 lg:pr-52 lg:pl-12 lg:pt-28 lg:pb-10 xl:pr-56">
          {/* Stage */}
          <div className="relative flex items-center justify-center lg:order-2 lg:h-full">
            <div
              ref={stageRef}
              className="stage-mask relative aspect-video w-[118%] max-w-none shrink-0 sm:w-full lg:w-[min(100%,calc((100svh-160px)*16/9))]"
            >
              <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={posterRef}
                src="/hood/stills/00-overview.webp"
                alt="Translucent illustration of a sedan showing its engine, brakes, tires and air conditioning"
                className="absolute inset-0 size-full"
                fetchPriority="high"
              />
              {chapters.map((c, i) => (
                <Reticle
                  key={c.id}
                  chapter={c}
                  ref={(el) => {
                    reticleRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-x-[8%] bottom-2 h-px overflow-hidden lg:bottom-[12%]">
              <div
                ref={loadBarRef}
                className="h-full origin-left scale-x-0 bg-white/40 transition-[transform,opacity] duration-500"
              />
            </div>
          </div>

          {/* Copy column */}
          <div className="relative min-h-0 flex-1 lg:order-1 lg:h-full">
            {/* Mobile progress */}
            <div className="mt-4 mb-6 flex items-center gap-3 lg:hidden">
              <div className="relative h-px flex-1 bg-white/10">
                <div
                  ref={mobileFillRef}
                  className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent)] transition-colors duration-700"
                />
              </div>
              <span className="eyebrow text-white/50">
                {active >= 0 ? `${chapters[active].index} / 04` : "00 / 04"}
              </span>
            </div>

            {/* Hero */}
            <div ref={heroRef} className="absolute inset-x-0 top-12 lg:top-0 lg:flex lg:h-full lg:flex-col lg:justify-center">
              <p className="eyebrow mb-5 flex items-center gap-3 text-white/55 lg:mb-7">
                <span className="h-px w-8 bg-amber" />
                Santa Ana · Est. 1985 · ASE certified
              </p>
              <h1 className="text-[2.15rem] leading-[1.02] font-medium tracking-[-0.035em] text-balance text-white sm:text-5xl lg:text-[clamp(2.5rem,min(4vw,6.6svh),4.6rem)]">
                Whatever&rsquo;s making that noise, we&rsquo;ll help you{" "}
                <em className="font-serif font-normal tracking-[-0.01em] text-amber">understand</em> it.
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist lg:mt-7 lg:text-base">
                Family-owned for four decades. Honest diagnostics on every domestic and import car, with
                the problem explained in plain English before any wrench turns.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3 lg:mt-9">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-soft"
                >
                  Book an inspection
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white transition-colors hover:border-white/40"
                >
                  Free phone quote
                </a>
              </div>
              <dl className="mt-10 hidden grid-cols-3 border-t border-white/10 pt-6 sm:grid lg:mt-[min(3.5rem,5svh)]">
                {[
                  ["4.8", "★", "from 700+ reviews"],
                  ["40", "+ yrs", "family-owned"],
                  ["100", "%", "satisfaction guaranteed"],
                ].map(([n, unit, label]) => (
                  <div key={label} className="border-l border-white/10 pl-4 first:border-none first:pl-0">
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-3xl font-medium tracking-tight text-white">
                      {n}
                      <span className="ml-0.5 text-base text-amber">{unit}</span>
                    </dd>
                    <dd className="mt-1 text-xs text-mist">{label}</dd>
                  </div>
                ))}
              </dl>
              <p className="eyebrow mt-10 hidden items-center gap-3 text-white/40 lg:[@media(min-height:960px)]:flex">
                <span className="relative h-8 w-px overflow-hidden bg-white/15">
                  <span className="absolute inset-x-0 top-0 h-3 animate-drip bg-amber" />
                </span>
                Scroll to look under the hood
              </p>
            </div>

            {/* Chapters */}
            {chapters.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="invisible absolute inset-x-0 top-12 opacity-0 lg:top-0 lg:flex lg:h-full lg:flex-col lg:justify-center"
                aria-hidden={active !== i}
              >
                <ChapterPanel chapter={c} />
              </div>
            ))}

            {/* Outro */}
            <div
              ref={outroRef}
              className="invisible absolute inset-x-0 top-12 opacity-0 lg:top-0 lg:flex lg:h-full lg:flex-col lg:justify-center"
            >
              <p className="eyebrow mb-5 flex items-center gap-3 text-white/55">
                <span className="h-px w-8 bg-amber" />
                End of tour
              </p>
              <h2 className="text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-white lg:text-6xl">
                That&rsquo;s ours. Now let&rsquo;s look at{" "}
                <em className="font-serif font-normal text-amber">yours</em>.
              </h2>
              <p className="mt-5 max-w-md text-mist">
                Tell us what you&rsquo;re hearing, feeling or smelling. We&rsquo;ll quote it free over the
                phone. Ask for Charlie or Tony.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-soft"
                >
                  Book an inspection <Arrow />
                </a>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 text-sm text-white transition-colors hover:border-white/40"
                >
                  {business.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop rail */}
        <nav
          aria-label="Car systems"
          className="absolute top-1/2 right-5 hidden -translate-y-1/2 xl:right-8 lg:block"
        >
          <div className="absolute top-2 bottom-2 right-[5px] w-px bg-white/10">
            <div
              ref={railFillRef}
              className="absolute inset-0 origin-top scale-y-0 bg-[var(--accent)] transition-colors duration-700"
            />
          </div>
          <ol className="relative flex flex-col gap-10">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  className="group flex items-center gap-3"
                  aria-current={active === i ? "step" : undefined}
                >
                  <span
                    className={`eyebrow transition-colors duration-500 ${active === i ? "text-white" : "text-white/35 group-hover:text-white/70"}`}
                  >
                    {c.name}
                  </span>
                  <span
                    className={`size-[11px] rounded-full border transition-all duration-500 ${
                      active === i
                        ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_16px_var(--accent)]"
                        : "border-white/30 bg-ink group-hover:border-white/70"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {active >= 0 && (
          <a
            href="#contact"
            className="eyebrow absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/45 transition-colors hover:text-white lg:block"
          >
            Skip to booking →
          </a>
        )}
      </div>
    </section>
  );
}

function ChapterPanel({ chapter: c }: { chapter: Chapter }) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-2 font-serif text-[9rem] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] lg:-top-28 lg:text-[14rem]"
      >
        {c.index}
      </span>
      <p className="eyebrow relative mb-5 flex items-center gap-3 text-[var(--accent)]">
        <span className="h-px w-8 bg-current" />
        {c.index} / {c.name}
      </p>
      <h2 className="relative font-serif text-[2.2rem] leading-[1.04] tracking-[-0.02em] text-white lg:text-[clamp(2.6rem,3.7vw,3.8rem)]">
        {c.symptom}
      </h2>
      <p className="relative mt-5 max-w-md text-[15px] leading-relaxed text-mist lg:text-base">{c.body}</p>
      <ul className="relative mt-6 flex flex-wrap gap-2">
        {c.services.map((s) => (
          <li
            key={s}
            className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80"
          >
            {s}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="relative mt-8 hidden items-center gap-2 text-sm text-white underline decoration-[var(--accent)] decoration-1 underline-offset-[6px] transition-colors hover:text-[var(--accent)] sm:inline-flex"
      >
        {c.cta} <Arrow />
      </a>
    </div>
  );
}

function Reticle({ chapter: c, ref }: { chapter: Chapter; ref: React.Ref<HTMLDivElement> }) {
  const color = ACCENT[c.accent];
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 origin-center opacity-0"
      style={{ transformOrigin: `${c.target.x}% ${c.target.y}%` }}
    >
      <div className="absolute" style={{ left: `${c.target.x}%`, top: `${c.target.y}%`, color }}>
        <span className="animate-ping-soft absolute top-0 left-0 size-14 rounded-full border border-current" />
        <span className="absolute top-0 left-0 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current/60" />
        <span className="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
        <span className="absolute top-0 left-5 hidden h-px w-10 bg-current/60 sm:block lg:w-16" />
        <span className="eyebrow absolute top-0 left-[4.25rem] hidden -translate-y-1/2 sm:block rounded-full border border-current/40 bg-ink/70 px-2.5 py-1 whitespace-nowrap text-white backdrop-blur-md lg:left-[5.75rem]">
          <span style={{ color }}>SYS {c.index}</span> · {c.name}
        </span>
      </div>
    </div>
  );
}

function StaticHood() {
  return (
    <section id="under-the-hood" className="px-5 pt-28 pb-24 sm:px-8 lg:px-12" aria-label="Under the hood">
      <div id="top" />
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-5 flex items-center gap-3 text-white/55">
          <span className="h-px w-8 bg-amber" />
          Santa Ana · Est. 1985 · ASE certified
        </p>
        <h1 className="max-w-4xl text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-white lg:text-7xl">
          Whatever&rsquo;s making that noise, we&rsquo;ll help you{" "}
          <em className="font-serif font-normal text-amber">understand</em> it.
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="rounded-full bg-amber px-6 py-3.5 text-sm font-semibold text-ink">
            Book an inspection
          </a>
          <a href={business.phoneHref} className="rounded-full border border-white/15 px-6 py-3.5 text-sm text-white">
            {business.phone}
          </a>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {chapters.map((c) => (
            <article key={c.id} style={{ "--accent": ACCENT[c.accent] } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.still} alt={`${c.name} system highlighted`} className="aspect-video w-full rounded-2xl" loading="lazy" />
              <p className="eyebrow mt-5 text-[var(--accent)]">
                {c.index} / {c.name}
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">{c.symptom}</h2>
              <p className="mt-3 text-mist">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M1 7h11m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
