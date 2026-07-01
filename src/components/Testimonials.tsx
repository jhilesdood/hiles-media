import { clients, testimonials } from "../data/site";
import { Reveal } from "./Reveal";
import { StaggerTestimonials } from "./StaggerTestimonials";

export function Testimonials() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-deep">
            ( 05 ) — In their words
          </p>
        </Reveal>

        <Reveal>
          <StaggerTestimonials items={testimonials} />
        </Reveal>

        {/* client row */}
        <Reveal delay={0.15}>
          <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-ink/10 pt-8 font-display text-xl font-bold uppercase tracking-tight text-ink/35 md:text-2xl">
            <span className="font-mono text-[11px] font-normal uppercase tracking-widest text-muted">
              Trusted by
            </span>
            {clients.map((c) => (
              <span
                key={c}
                className="transition-colors duration-300 hover:text-ink"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
