import { business, reviews } from "@/lib/business";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-1 ${className}`} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2 2.9 6.9 7.1.6-5.4 4.7 1.6 7.3L12 17.8 5.8 21.5l1.6-7.3L2 9.5l7.1-.6L12 2Z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-paper px-5 pb-28 text-graphite sm:px-8 lg:px-12 lg:pb-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 border-t border-graphite/10 pt-24 lg:grid-cols-[0.8fr_1.2fr] lg:pt-32">
        <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-6 flex items-center gap-3 text-graphite/55">
            <span className="h-px w-8 bg-amber" />
            Reviews
          </p>
          <p className="text-[7rem] leading-none font-medium tracking-[-0.06em] lg:text-[10rem]">
            {business.rating}
          </p>
          <Stars className="mt-4 text-amber" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-graphite/65">
            Across {business.reviewCount}+ reviews from {business.city} drivers who came back, and sent their
            neighbors.
          </p>
        </div>

        <ul className="divide-y divide-graphite/10">
          {reviews.map((r) => (
            <li key={r.name} data-reveal className="py-10 first:pt-0 last:pb-0">
              <blockquote>
                <p className="font-serif text-[1.75rem] leading-[1.15] tracking-[-0.015em] text-graphite lg:text-[2.6rem]">
                  <span className="text-amber">&ldquo;</span>
                  {r.quote}
                  <span className="text-amber">&rdquo;</span>
                </p>
                <footer className="eyebrow mt-6 flex items-center gap-3 text-graphite/55">
                  <span className="grid size-8 place-items-center rounded-full bg-graphite text-[10px] tracking-normal text-paper">
                    {r.name.charAt(0)}
                  </span>
                  {r.name} · Verified customer
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
