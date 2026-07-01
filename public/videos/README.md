# Self-hosted videos

Drop your exported video files in this folder. Anything here is served at the
site root, so a file named `showreel.mp4` is reachable at `/videos/showreel.mp4`.

## To use your showreel
1. Export a web-optimised **H.264 .mp4** (1080p is plenty; aim for < ~40 MB so
   it loads fast — this is a preview, not the master).
2. Save it here as `showreel.mp4`.
3. In `src/components/Hero.tsx`, change the `SHOWREEL` line to:
   `const SHOWREEL = "/videos/showreel.mp4";`

## Tips
- Keep self-hosted files short/compressed. For long or many videos, paste a
  YouTube/Vimeo link instead (see `src/data/projects.ts`) — the player handles
  streaming for you.
- To compress with ffmpeg:
  `ffmpeg -i input.mov -vcodec libx264 -crf 24 -preset slow -movflags +faststart -an showreel.mp4`
  (`-an` drops audio; remove it to keep sound. `+faststart` lets it stream while loading.)
