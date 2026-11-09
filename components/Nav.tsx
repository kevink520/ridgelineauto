import { business } from "@/lib/business";
import { OpenStatus } from "./OpenStatus";

const links = [
  { href: "#under-the-hood", label: "Under the hood" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex max-w-[1400px] items-center justify-between gap-4 rounded-full border border-white/10 bg-ink/85 py-2 pr-2 pl-5 backdrop-blur-xl sm:mx-4 xl:mx-auto">
        <a href="#top" className="flex items-baseline gap-1.5 whitespace-nowrap" aria-label={business.name}>
          <span className="text-[15px] font-semibold tracking-tight text-white">Ridgeline</span>
          <span className="font-serif text-lg italic text-amber">Auto</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden xl:mr-3 xl:inline">
            <OpenStatus className="eyebrow text-white/55" />
          </span>
          <a
            href={business.phoneHref}
            className="hidden rounded-full px-4 py-2.5 text-[13px] text-white/85 transition-colors hover:bg-white/5 hover:text-white sm:inline-block"
          >
            {business.phone}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-amber px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap text-ink transition-[background-color,transform] duration-300 hover:-translate-y-px hover:bg-amber-soft"
          >
            Book an inspection
          </a>
        </div>
      </div>
    </header>
  );
}
