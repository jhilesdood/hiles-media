# Hiles Media

An award-style, animated marketing site for **Hiles Media** — a video-forward, full-service content studio. Bold editorial aesthetic: warm cream paper, near-black ink, and an amber accent, with oversized display type and motion throughout.

## Stack
- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (design tokens in `tailwind.config.ts` + `src/index.css`)
- **Framer Motion** (reveals, hero masking, magnetic buttons, count-ups)
- **Lenis** (momentum smooth scroll — disabled under reduced motion)
- **lucide-react** (SVG icons)

Fonts (Google Fonts, loaded in `index.html`): **Bricolage Grotesque** (display), **Instrument Sans** (body), **Fraunces** italic (editorial accents), **Space Mono** (labels).

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Structure
```
src/
  App.tsx                 # page composition + preloader/scroll wiring
  index.css               # tokens, fonts, base + utility styles
  components/             # Preloader, Nav, Hero, Marquee, Work, Services,
                          # Stats, About, Process, Testimonials, Contact,
                          # Footer, CustomCursor, Reveal, MagneticButton, CountUp
  data/projects.ts        # portfolio items (+ categories)
  data/site.ts            # services, process, stats, testimonials, clients, social
  hooks/                  # useLenis, useReducedMotion
```

## Making it yours (placeholders to swap)
- **Copy & stats** — `src/data/site.ts` and `src/data/projects.ts`.
- **Imagery** — currently deterministic `picsum.photos` stills treated with an amber
  duotone. Replace the `image` URLs in `data/projects.ts` and the `HERO_IMG` /
  `PORTRAIT` constants in `Hero.tsx` / `About.tsx` with real stills.
- **Showreel** — `SHOWREEL` in `src/components/Hero.tsx` points at a sample MP4;
  swap for your real reel export.
- **Contact form** — `src/components/Contact.tsx` uses a `mailto:` handler for now.
  Wire it to Formspree, Resend, or an API route for real submissions. Update
  `contactEmail` in `data/site.ts`.
- **Founder name / socials** — `About.tsx` and `data/site.ts`.

## Notes
- Fully responsive (375 / 768 / 1024 / 1440) with a mobile nav drawer.
- All motion respects `prefers-reduced-motion`; the custom cursor only mounts on
  fine-pointer devices.
