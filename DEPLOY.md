# Deploying Hiles Media to Vercel

The site is a static Vite build (no backend). Vercel auto-detects it — no config file needed.

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | **Vite**        |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Install command  | `npm install`   |

## ⚠️ Do this first: move the showreel off self-hosting

The showreel (`public/videos/showreel.mp4`) is a ~192 MB master. It is **git-ignored on
purpose** — GitHub rejects files over 100 MB and it would burn Vercel's bandwidth. Before
launch:

1. Upload the master to **Vimeo** (or YouTube / Cloudflare Stream).
2. Copy the share link.
3. In `src/components/Hero.tsx`, change `SHOWREEL` to that link, e.g.
   `const SHOWREEL = "https://vimeo.com/XXXXXXXXX";`
   (The player auto-detects Vimeo/YouTube links — see `src/lib/video.ts`.)

The project-card videos already use embed links, so they need nothing.

## Option A — GitHub + Vercel (recommended, auto-deploys on every push)

```bash
# from the project root (git is already initialised)
git commit -m "Initial commit"
gh repo create hiles-media --private --source=. --push   # or create the repo in the GitHub UI
```

Then at [vercel.com/new](https://vercel.com/new): **Add New → Project → Import** the GitHub repo →
Deploy. Every `git push` afterwards ships a new version, with preview URLs for branches.

## Option B — Vercel CLI (no GitHub needed)

```bash
npm i -g vercel
vercel          # first run links/creates the project
vercel --prod   # ship to production
```

## Custom domain

Vercel Project → **Settings → Domains** → add `hilesmedia.com` and follow the DNS
instructions (add the records at your registrar). HTTPS is automatic.

## Notes

- No environment variables are required (the contact form uses `mailto:`).
- Local source media in `public/videos/` stays on your machine for development and is
  never committed or deployed.
