import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { VideoModal } from "./VideoModal";

// Web-optimised hero still (1600px JPG) — doubles as the showreel poster.
// The 4K original lives at /videos/showreelimage.png.
const HERO_IMG = "/images/hero.jpg";
// Showreel hosted on YouTube — the player auto-detects the link (see lib/video.ts).
const SHOWREEL = "https://youtu.be/B1a9YKdHCrA";

/** One line of the headline that wipes up from behind a mask. */
function MaskLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={className}
        initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: reduced ? 0.4 : 0.95,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ display: "block", willChange: "transform" }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [reelOpen, setReelOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);

  const base = 0.35; // start after nav/hero settle

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-36"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: base, duration: 0.8 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            Available for projects — 2026
          </span>
          <span className="hidden sm:block">Content Studio · Est. 2024</span>
          <span>Houston, TX / Worldwide</span>
        </motion.div>

        <div className="grid items-end gap-8 lg:grid-cols-12">
          {/* Headline */}
          <div className="lg:col-span-7">
            <h1 className="font-display font-extrabold uppercase leading-[0.86] tracking-tightest text-ink">
              <MaskLine
                delay={base}
                className="text-[clamp(3.6rem,15vw,12rem)]"
              >
                Visual
              </MaskLine>
              <span className="flex items-baseline gap-[0.15em]">
                <MaskLine
                  delay={base + 0.12}
                  className="text-[clamp(3.6rem,15vw,12rem)]"
                >
                  Stories
                </MaskLine>
              </span>
              <MaskLine
                delay={base + 0.24}
                className="mt-1 font-serif text-[clamp(1.6rem,6.5vw,4.8rem)] font-normal normal-case italic tracking-normal text-amber-deep"
              >
                that move people
              </MaskLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: base + 0.5, duration: 0.8 }}
              className="mt-8 max-w-md font-sans text-base leading-relaxed text-ink-soft md:text-lg"
            >
              Hiles Media is a video-forward content studio. We craft films,
              short-form, and brand stories that transcend the scroll — and
              stay with people long after.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: base + 0.6, duration: 0.8 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-paper transition-colors duration-300 hover:bg-amber-deep"
              >
                View the work
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <button
                type="button"
                onClick={() => setReelOpen(true)}
                data-cursor="hover"
                className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ink"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 transition-colors duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-night">
                  <Play size={15} className="translate-x-[1px]" fill="currentColor" />
                </span>
                Watch showreel
              </button>
            </motion.div>
          </div>

          {/* Media panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: base + 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-ink">
              <motion.img
                src={HERO_IMG}
                srcSet="/images/hero-sm.jpg 1080w, /images/hero-md.jpg 1600w, /images/hero.jpg 2000w"
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt="A cinematographer framing a shot on location"
                width={2000}
                height={1125}
                style={{ y: imgY, scale: imgScale }}
                className="h-full w-full object-cover"
              />
              {/* subtle legibility vignette for the signature + play badge */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-night/20" />

              {/* signature */}
              <span className="absolute left-5 top-5 font-serif text-3xl italic text-paper drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
                Hiles
              </span>

              <button
                type="button"
                onClick={() => setReelOpen(true)}
                aria-label="Play showreel"
                data-cursor="hover"
                className="group absolute bottom-5 right-5 inline-flex items-center gap-3 rounded-full bg-night/85 py-2 pl-2 pr-5 text-paper backdrop-blur-sm"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber text-night transition-transform duration-300 group-hover:scale-110">
                  <Play size={14} className="translate-x-[1px]" fill="currentColor" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  Showreel 2026
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* bottom strip: stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 0.75, duration: 0.8 }}
          className="mt-14 flex flex-col gap-8 border-t border-ink/10 pt-7 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex gap-10 sm:gap-16">
            <Stat value="+75" label="Clients served, from startups to brands" />
            <Stat value="2M" label="Views generated across every screen" />
          </div>
        </motion.div>
      </div>

      {/* Showreel modal */}
      <VideoModal
        open={reelOpen}
        onClose={() => setReelOpen(false)}
        src={SHOWREEL}
        poster={HERO_IMG}
      />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="max-w-[9rem]">
      <div className="font-display text-3xl font-bold text-ink md:text-4xl">
        {value}
      </div>
      <p className="mt-1 font-sans text-[11px] leading-snug text-muted">{label}</p>
    </div>
  );
}
