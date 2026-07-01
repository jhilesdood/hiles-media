import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  /** delay in seconds */
  delay?: number;
  /** distance travelled on the y-axis */
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}

/**
 * Scroll-triggered fade + rise. Fires once when ~20% enters the viewport.
 * Collapses to a plain fade (no movement) under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: reduced ? 0.3 : 0.8,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
