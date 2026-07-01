import { stats } from "../data/site";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export function Stats() {
  return (
    <section className="bg-amber px-5 py-16 text-night md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="border-t border-night/20 pt-4">
              <div className="font-display text-6xl font-extrabold leading-none tracking-tightest md:text-7xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 max-w-[10rem] font-sans text-sm leading-snug text-night/70">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
