"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scrolling synced to GSAP, plus fade-up reveals for [data-reveal]. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(targets, { autoAlpha: 0, y: 28 });
    const batches = ScrollTrigger.batch(targets, {
      start: "top 88%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
        }),
    });

    return () => {
      batches.forEach((b) => b.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
