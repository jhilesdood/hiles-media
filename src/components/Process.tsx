import { process } from "../data/site";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section className="bg-paper-2 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-deep">
            ( 04 ) — How we work
          </p>
          <h2 className="max-w-3xl font-display text-[9vw] font-extrabold uppercase leading-[0.85] tracking-tightest md:text-[5rem]">
            Idea to delivery
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.08}>
              <div className="group relative">
                <div className="mb-5 h-px w-full bg-ink/15">
                  <div className="h-px w-0 bg-amber-deep transition-all duration-700 ease-out-expo group-hover:w-full" />
                </div>
                <span className="font-mono text-sm text-amber-deep">
                  {step.no}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
