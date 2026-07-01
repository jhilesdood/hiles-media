import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/cn";
import { social } from "../data/site";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock background scroll when the mobile drawer is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-colors duration-500",
          scrolled
            ? "border-b border-ink/10 bg-paper/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-10">
          <a
            href="#top"
            className="group flex items-center gap-2"
            aria-label="Hiles Media — home"
          >
            <span className="font-display text-xl font-extrabold tracking-tightest">
              HILES
            </span>
            <span className="h-2 w-2 rounded-full bg-amber transition-transform duration-300 group-hover:scale-125" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Media
            </span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-sans text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-paper transition-colors duration-300 hover:bg-amber-deep"
            >
              Get in touch
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="grain fixed inset-0 z-[130] flex flex-col bg-night px-6 pb-10 pt-5 text-paper md:hidden"
            initial={{ clipPath: "circle(0% at 90% 6%)" }}
            animate={{ clipPath: "circle(150% at 90% 6%)" }}
            exit={{ clipPath: "circle(0% at 90% 6%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-extrabold tracking-tightest">
                HILES
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/20"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-auto flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="font-display text-5xl font-bold tracking-tightest"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-paper/15 pt-6 font-mono text-xs uppercase tracking-widest text-paper/60">
              {social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
