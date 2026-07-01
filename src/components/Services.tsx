import { ArrowUpRight } from "lucide-react";
import { services } from "../data/site";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="grain relative bg-night px-5 py-24 text-paper md:px-10 md:py-32">
      <div className="relative z-[2] mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
              ( 02 ) — Capabilities
            </p>
            <h2 className="max-w-2xl font-display text-[11vw] font-extrabold uppercase leading-[0.85] tracking-tightest md:text-[6rem]">
              What we do
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-paper/60">
              One studio, the full pipeline — from the first idea to the final
              frame. No hand-offs, no diluted vision.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-b border-paper/15">
          {services.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.05}>
              <div className="group relative border-t border-paper/15 py-7 transition-colors duration-500 md:py-9">
                <div className="flex items-center gap-5 md:gap-10">
                  <span className="font-mono text-sm text-amber">{s.no}</span>
                  <h3 className="font-display text-4xl font-bold tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:text-6xl">
                    {s.title}
                  </h3>
                  <span className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/25 text-paper/70 transition-colors duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-night">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                {/* hover-reveal detail (grid-rows trick, no layout jump) */}
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out-expo md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:pl-[3.75rem]">
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 pt-5 md:flex-row md:items-end md:justify-between">
                      <p className="max-w-xl font-sans text-sm leading-relaxed text-paper/70 md:text-base">
                        {s.copy}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-paper/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
