import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Reveal } from "./Reveal";

const PORTRAIT = "https://picsum.photos/seed/hiles-studio/1440/1760";

export function About() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-14%"]);

  return (
    <section id="studio" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-deep">
            ( 03 ) — The Studio
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* portrait */}
          <div className="lg:col-span-5">
            <div
              ref={ref}
              className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-night"
            >
              <motion.img
                src={PORTRAIT}
                alt="Behind the scenes at the Hiles Media studio"
                width={900}
                height={1100}
                style={{ y }}
                className="h-[114%] w-full object-cover grayscale"
              />
              <div className="pointer-events-none absolute inset-0 bg-amber/15 mix-blend-multiply" />
              <div className="absolute bottom-5 left-5 rounded-full bg-paper/90 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-night">
                Est. 2024 · On location
              </div>
            </div>
          </div>

          {/* statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[7.5vw] font-bold leading-[0.95] tracking-tightest md:text-[3.6rem] lg:text-[4rem]">
                We make{" "}
                <span className="text-amber-deep">film with feeling</span> — and
                the discipline to make it perform.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink-soft md:text-lg">
                Hiles Media started with a camera and a stubborn belief: that a
                brand's story deserves to be told like cinema, not content.
                Since then, we've grown into a tight collective of directors,
                editors, and colorists who obsess over the frame and the
                feeling behind it.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ink-soft md:text-lg">
                We move fast, guard the vision, and treat every project — a
                sixty-second spot or a feature-length doc — like it's the one
                people will remember us by.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-5">
                <span className="font-serif text-4xl italic text-ink">
                  Joey Hiles
                </span>
                <span className="h-px w-14 bg-ink/30" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  Founder / Director
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
