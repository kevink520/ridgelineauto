import { business, serviceGroups } from "@/lib/business";

const marquee = [
  "Engines",
  "Transmissions",
  "Check engine lights",
  "Electrical",
  "Brakes",
  "Air conditioning",
  "Smog checks",
  "Timing belts",
  "Oil changes",
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-paper text-graphite">
      <div aria-hidden className="border-y border-graphite/10 py-6 select-none">
        <div className="animate-marquee flex w-max gap-10 font-serif text-5xl whitespace-nowrap italic lg:text-7xl">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10 text-graphite/85 even:text-transparent even:[-webkit-text-stroke:1px_rgba(26,34,48,0.45)]">
              {m}
              <span className="size-2 rounded-full bg-amber not-italic" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div data-reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-graphite/55">
              <span className="h-px w-8 bg-amber" />
              Services
            </p>
            <h2 className="max-w-3xl text-[2.1rem] leading-[1.05] font-medium tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Everything your car needs, <em className="font-serif font-normal">under one roof.</em>
            </h2>
          </div>
          <div data-reveal className="max-w-xs">
            <p className="text-[15px] leading-relaxed text-graphite/65">
              Domestic or import, daily driver or work truck. If it rolls into Santa Ana, we&rsquo;ve likely
              fixed it before.
            </p>
            <a
              href={business.phoneHref}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-graphite px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink"
            >
              Call {business.phone}
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((g, i) => {
            const feature = i === 0;
            return (
              <article
                key={g.id}
                data-reveal
                className={`group relative flex flex-col overflow-hidden rounded-[24px] p-8 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 lg:p-10 ${
                  feature
                    ? "grain bg-ink text-white md:col-span-2 lg:row-span-1"
                    : "bg-paper-2 hover:shadow-[0_30px_60px_-30px_rgba(12,23,38,0.35)]"
                }`}
              >
                {feature && (
                  <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-amber/25 blur-3xl" />
                )}
                <div className="relative flex items-start justify-between">
                  <span className={`eyebrow ${feature ? "text-amber" : "text-graphite/45"}`}>{g.index}</span>
                  {feature && (
                    <span className="eyebrow rounded-full border border-white/15 px-3 py-1 text-white/70">
                      Start here
                    </span>
                  )}
                </div>
                <h3
                  className={`relative mt-10 font-medium tracking-tight ${feature ? "text-4xl lg:text-5xl" : "text-2xl"}`}
                >
                  {g.title}
                </h3>
                <p className={`relative mt-3 max-w-md text-[15px] leading-relaxed ${feature ? "text-mist" : "text-graphite/65"}`}>
                  {g.blurb}
                </p>
                <ul
                  className={`relative mt-8 grid flex-1 content-end gap-x-8 ${feature ? "sm:grid-cols-2" : ""}`}
                >
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center justify-between border-t py-3 text-sm ${
                        feature ? "border-white/10 text-white/85" : "border-graphite/10 text-graphite/80"
                      }`}
                    >
                      {item}
                      <span
                        className={`size-1.5 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${feature ? "bg-amber" : "bg-graphite/40"}`}
                      />
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
          <a
            href="#contact"
            data-reveal
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-amber p-8 text-ink lg:p-10"
          >
            <span className="eyebrow text-ink/60">Not sure?</span>
            <div>
              <p className="mt-10 font-serif text-4xl leading-[1.05] lg:text-[2.75rem]">
                Describe the noise. We&rsquo;ll figure out the rest.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Book an inspection
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 7h11m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
