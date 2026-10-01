import { business } from "@/lib/business";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink px-5 pt-24 pb-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="text-5xl leading-[0.95] font-medium tracking-[-0.045em] text-white sm:text-7xl lg:text-[8.5rem]">
            Ready when
            <br />
            your car <em className="font-serif font-normal text-amber">isn&rsquo;t.</em>
          </h2>
          <div className="flex flex-wrap gap-3 lg:mb-4">
            <a href="#contact" className="rounded-full bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-soft">
              Book an inspection
            </a>
            <a href={business.phoneHref} className="rounded-full border border-white/15 px-6 py-3.5 text-sm text-white transition-colors hover:border-white/40">
              {business.phone}
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-white/[0.07] pt-8 text-sm text-mist sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-baseline gap-1.5">
              <span className="font-semibold text-white">BC Advance</span>
              <span className="font-serif text-lg text-amber italic">Auto</span>
            </p>
            <p className="mt-2">ASE-certified auto repair · Est. {business.established}</p>
          </div>
          <address className="not-italic">
            {business.street}
            <br />
            {business.city}, {business.region} {business.postalCode}
          </address>
          <p>
            Mon–Fri 8:00 AM – 5:30 PM
            <br />
            Sat 8:00 AM – 3:00 PM · Sun closed
          </p>
          <p className="lg:text-right">
            © {new Date().getFullYear()} {business.name}
            <br />
            Domestic &amp; import specialists
          </p>
        </div>
      </div>
    </footer>
  );
}
