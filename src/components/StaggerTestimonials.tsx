import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Testimonial } from "../data/site";
import { cn } from "../lib/cn";

// Fan geometry — how far each neighbouring card shifts / rotates / shrinks.
const X_STEP = 52; // px of horizontal offset per step from the active card
const Y_STEP = 14; // px pushed down per step
const ROTATE = 5; // degrees of tilt per step
const SCALE_STEP = 0.07; // shrink per step
const VISIBLE = 2; // cards shown on each side before they fade out

/**
 * A staggered testimonial deck. The active quote sits front-and-centre while
 * the rest fan out behind it with a slight tilt. Cycle with the arrows, or
 * click any peeking card to bring it forward. Wraps around infinitely.
 */
export function StaggerTestimonials({ items }: { items: Testimonial[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = items.length;

  const wrap = (i: number) => (i + n) % n;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[25rem] w-full sm:h-[22rem]">
        {items.map((t, i) => {
          // Shortest signed distance from the active card (so the fan wraps).
          let diff = i - active;
          if (diff > n / 2) diff -= n;
          if (diff < -n / 2) diff += n;
          const abs = Math.abs(diff);
          const isActive = diff === 0;

          return (
            <div
              key={t.name}
              className="absolute left-1/2 top-1/2 w-[min(86vw,25rem)] -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: n - abs }}
            >
              <motion.button
                type="button"
                onClick={() => setActive(i)}
                aria-label={
                  isActive ? undefined : `Show testimonial from ${t.name}`
                }
                aria-hidden={abs > VISIBLE}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "block w-full text-left",
                  isActive ? "cursor-default" : "cursor-pointer"
                )}
                animate={{
                  x: diff * X_STEP,
                  y: abs * Y_STEP,
                  rotate: diff * ROTATE,
                  scale: 1 - abs * SCALE_STEP,
                  opacity: abs > VISIBLE ? 0 : 1,
                }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 200, damping: 26 }
                }
              >
                <figure
                  className={cn(
                    "relative flex h-[22rem] flex-col justify-between rounded-2xl border p-7 sm:h-[19rem] sm:p-8",
                    isActive
                      ? "border-ink/15 bg-paper-2 shadow-2xl shadow-ink/10"
                      : "border-ink/10 bg-paper-2"
                  )}
                >
                  <span
                    aria-hidden
                    className="font-serif text-6xl italic leading-[0.5] text-amber"
                  >
                    &ldquo;
                  </span>

                  <blockquote className="font-serif text-lg italic leading-snug text-ink [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] overflow-hidden sm:text-xl">
                    {t.quote}
                  </blockquote>

                  <figcaption className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover grayscale ring-2 ring-amber/60"
                    />
                    <div className="font-mono text-[11px] uppercase tracking-widest">
                      <div className="text-ink">{t.name}</div>
                      <div className="mt-0.5 text-muted">{t.role}</div>
                    </div>
                  </figcaption>

                  {/* dim the cards behind the active one */}
                  {!isActive && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-paper/45" />
                  )}
                </figure>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* controls */}
      <div className="mt-9 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setActive((a) => wrap(a - 1))}
          aria-label="Previous testimonial"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-amber hover:bg-amber hover:text-night"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="w-14 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => setActive((a) => wrap(a + 1))}
          aria-label="Next testimonial"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-amber hover:bg-amber hover:text-night"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
