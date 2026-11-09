import { business } from "@/lib/business";

const pillars = [
  {
    title: "No pushy upsells",
    body: "We tell you what needs doing now, what can wait, and what doesn't need doing at all. The quote you hear is the price you pay.",
    icon: (
      <path d="M4 12h16M4 12l5-5M4 12l5 5M14 7h6M14 17h6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "ASE-certified mechanics",
    body: "Certified technicians working on domestic and import cars every day, from quick oil changes to full engine and transmission swaps.",
    icon: (
      <>
        <circle cx="12" cy="10" r="6" />
        <path d="M9 15.5 7.5 21 12 19l4.5 2-1.5-5.5M9.5 10l1.75 1.75L14.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Free quotes by phone",
    body: "Describe the symptom and we'll give you a straight answer on the phone before you ever drive over. Ask for Marco or Dee.",
    icon: (
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        strokeLinejoin="round"
      />
    ),
  },
];

const badges = ["Family owned & operated", "Walk-ins welcome", "Workmanship guaranteed", "Waiting room", "ADA accessible"];

export function About() {
  return (
    <section id="about" className="relative">
      <div className="grain relative bg-ink-2 px-5 pt-28 pb-56 sm:px-8 lg:px-12 lg:pt-40 lg:pb-64">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div data-reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-white/55">
              <span className="h-px w-8 bg-amber" />
              About the shop
            </p>
            <h2 className="text-[2.1rem] leading-[1.05] font-medium tracking-[-0.03em] text-balance text-white sm:text-5xl lg:text-[4.25rem]">
              We earn our living the old-fashioned way, with{" "}
              <em className="font-serif font-normal text-amber">fair, honest,</em> hard-working mechanics.
            </h2>
          </div>
          <div data-reveal className="max-w-sm text-[15px] leading-relaxed text-mist">
            <p>
              {business.owners} opened the doors in {business.established} to help people repair cars at an
              affordable price. Thirty years on, and more than twenty on this same stretch of Alder Way, that&rsquo;s
              still the whole business plan.
            </p>
            <p className="eyebrow mt-6 text-white/45">Marco R. &amp; Dee O. · Owners</p>
          </div>
        </div>
      </div>

      <div className="relative flow-root bg-paper px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto -mt-40 max-w-[1400px] lg:-mt-44">
          <div
            data-reveal
            className="relative grid overflow-hidden rounded-[28px] bg-[#fbfaf7] shadow-[0_40px_120px_-40px_rgba(12,23,38,0.45)] ring-1 ring-black/5 md:grid-cols-3"
          >
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="group relative border-black/[0.07] p-8 not-last:border-b md:not-last:border-r md:not-last:border-b-0 lg:p-12"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full border border-graphite/15 text-graphite transition-colors duration-500 group-hover:border-amber group-hover:bg-amber">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      {p.icon}
                    </svg>
                  </span>
                  <span className="eyebrow text-graphite/35">0{i + 1}</span>
                </div>
                <h3 className="mt-10 text-2xl font-medium tracking-tight text-graphite">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite/65">{p.body}</p>
              </div>
            ))}
          </div>

          <ul data-reveal className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {badges.map((b) => (
              <li key={b} className="eyebrow flex items-center gap-2.5 text-graphite/55">
                <span className="size-1 rounded-full bg-amber" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
