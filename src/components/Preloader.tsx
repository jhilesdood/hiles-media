import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Opening curtain: a counter races 0 → 100 while the wordmark fades in,
 * then two panels wipe upward to reveal the site. Reduced motion shortens
 * the whole thing to a brief hold.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const total = reduced ? 350 : 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, reduced ? 0 : 260);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col"
      exit={{ transition: { duration: 0 } }}
    >
      {/* Two-panel wipe */}
      <div className="relative flex h-full">
        <motion.div
          className="grain relative h-full w-1/2 bg-night"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="grain relative h-full w-1/2 bg-night"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.06 }}
        />
      </div>

      {/* Centered content overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-paper"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-[13vw] font-extrabold leading-none tracking-tightest md:text-[8vw]"
        >
          HILES
        </motion.span>
        <div className="mt-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-paper/60">
          <span>Media Studio</span>
          <span className="h-px w-8 bg-amber" />
          <span className="text-amber font-feature-tnum">{count}%</span>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex justify-center">
        <motion.div
          className="h-px bg-amber"
          initial={{ width: 0 }}
          animate={{ width: `${count * 2.2}px` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
