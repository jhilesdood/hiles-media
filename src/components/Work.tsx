import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories, projects, type Project } from "../data/projects";
import { Reveal } from "./Reveal";
import { VideoModal } from "./VideoModal";
import { cn } from "../lib/cn";

const aspect: Record<Project["span"], string> = {
  tall: "aspect-[4/5]",
  wide: "aspect-[16/11]",
  square: "aspect-square",
};

export function Work() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        {/* header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-deep">
              ( 01 ) — Selected Work
            </p>
            <h2 className="font-display text-[13vw] font-extrabold uppercase leading-[0.85] tracking-tightest md:text-[6.5rem]">
              The Reel
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300",
                    filter === c
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 text-ink-soft hover:border-ink"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* masonry grid — remounts on filter change to re-run reveals */}
        <div
          key={filter}
          className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]"
        >
          {visible.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 0.05}
              className="mb-5 break-inside-avoid"
            >
              <ProjectCard project={p} index={i} onOpen={() => setActive(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Project video lightbox */}
      <VideoModal
        open={!!active}
        onClose={() => setActive(null)}
        src={active?.video ?? ""}
        poster={active?.image}
      />
    </section>
  );
}

function ProjectCard({
  project: p,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="hover"
      className="group relative block w-full text-left overflow-hidden rounded-2xl bg-night"
      aria-label={`Play ${p.title} — ${p.discipline}`}
    >
      <div className={cn("relative w-full overflow-hidden", aspect[p.span])}>
        <img
          src={p.image}
          alt={`${p.title} for ${p.client}`}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-[900ms] ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
        />
        {/* amber duotone wash — fades on hover */}
        <div className="pointer-events-none absolute inset-0 bg-amber/25 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
        {/* legibility gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night via-night/40 to-transparent" />
      </div>

      {/* index + category */}
      <div className="absolute left-4 top-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-paper/80">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="rounded-full border border-paper/30 px-2 py-0.5">
          {p.category}
        </span>
      </div>

      {/* arrow */}
      <div className="absolute right-4 top-4 inline-flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-paper text-night opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight size={18} />
      </div>

      {/* meta */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
        <p className="mb-1 translate-y-2 font-mono text-[10px] uppercase tracking-widest text-amber opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {p.discipline}
        </p>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {p.title}
          </h3>
          <span className="pb-1 font-mono text-[11px] uppercase tracking-widest text-paper/70">
            {p.client} · {p.year}
          </span>
        </div>
      </div>
    </button>
  );
}
