import { business } from "@/lib/business";
import { ContactForm } from "./ContactForm";
import { HoursTable } from "./HoursTable";
import { OpenStatus } from "./OpenStatus";

export function Contact() {
  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_20%,#000_10%,transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[40rem] rounded-full bg-amber/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div data-reveal>
          <p className="eyebrow mb-6 flex items-center gap-3 text-white/55">
            <span className="h-px w-8 bg-amber" />
            Book an inspection
          </p>
          <h2 className="text-[2.4rem] leading-[1.02] font-medium tracking-[-0.035em] text-white sm:text-5xl lg:text-[4.5rem]">
            Tell us what it&rsquo;s <em className="font-serif font-normal text-amber">doing.</em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
            Walk-ins welcome. Or send a note and we&rsquo;ll call you back with honest next steps and a free
            quote. 100% satisfaction guaranteed.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <p className="eyebrow mb-3 text-white/40">Visit</p>
              <address className="text-[15px] leading-relaxed text-white not-italic">
                {business.street}
                <br />
                {business.city}, {business.region} {business.postalCode}
              </address>
              <p className="eyebrow mt-8 mb-3 text-white/40">Call</p>
              <a href={business.phoneHref} className="text-2xl font-medium tracking-tight text-white hover:text-amber">
                {business.phone}
              </a>
              <p className="mt-2 text-sm text-mist">Ask for Marco or Dee.</p>
            </div>
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="eyebrow text-white/40">Hours</p>
                <OpenStatus className="eyebrow text-white/60" />
              </div>
              <HoursTable />
            </div>
          </div>
        </div>

        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
