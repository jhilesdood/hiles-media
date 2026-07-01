import { ArrowUp } from "lucide-react";
import { social } from "../data/site";

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-paper/10 bg-night px-5 pb-8 pt-16 text-paper md:px-10">
      <div className="relative z-[2] mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl italic text-paper/80">
              Visual stories that move people.
            </p>
            <a
              href="#top"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-paper/60 transition-colors hover:text-amber"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 transition-colors group-hover:border-amber">
                <ArrowUp size={15} />
              </span>
              Back to top
            </a>
          </div>

          <div className="flex gap-16 font-mono text-[11px] uppercase tracking-widest">
            <ul className="flex flex-col gap-3">
              <li className="text-paper/40">Menu</li>
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-paper/70 transition-colors hover:text-amber"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              <li className="text-paper/40">Social</li>
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-paper/70 transition-colors hover:text-amber"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* giant wordmark — solid logotype bleeding off the base */}
        <div className="pointer-events-none relative mt-14 select-none overflow-hidden">
          <h2 className="translate-y-[0.07em] font-display text-[26vw] font-extrabold uppercase leading-[0.72] tracking-[-0.07em] text-paper md:text-[20rem]">
            Hiles<span className="text-amber">.</span>
          </h2>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-paper/10 pt-6 font-mono text-[10px] uppercase tracking-widest text-paper/40 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Hiles Media — All rights reserved</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Designed &amp; built in-house
          </span>
        </div>
      </div>
    </footer>
  );
}
