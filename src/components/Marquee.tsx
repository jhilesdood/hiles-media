const WORDS = [
  "Film",
  "Short-Form",
  "Brand",
  "Story",
  "Direction",
  "Color",
  "Motion",
];

/**
 * Infinite night-colored ticker. The track is duplicated so the CSS
 * translateX(-50%) loop is seamless; animation pauses under reduced motion.
 */
export function Marquee() {
  const row = (
    <div className="marquee-track animate-marquee items-center">
      {WORDS.concat(WORDS).map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-5xl font-extrabold uppercase tracking-tight text-paper md:text-7xl">
            {w}
          </span>
          <span className="text-amber md:text-2xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-hidden
      className="grain relative overflow-hidden border-y border-paper/10 bg-night py-6 md:py-8"
    >
      <div className="relative flex w-max">{row}</div>
    </section>
  );
}
