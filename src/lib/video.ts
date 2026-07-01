/**
 * Normalises a video link into something the player can use.
 *
 * Paste any of these as a project's `video` (or the Hero `SHOWREEL`):
 *   • A self-hosted file ...... "/videos/showreel.mp4"
 *   • A YouTube link .......... "https://youtu.be/aqz-KE-bpKQ"
 *   • A Vimeo link ............ "https://vimeo.com/123456789"
 *   • An unlisted Vimeo link .. "https://vimeo.com/123456789/abc123"  (keeps the hash)
 *
 * "youtube" / "vimeo" render in an <iframe>; anything else is treated as a
 * direct video file and plays in a native <video> element.
 */
export type VideoKind = "youtube" | "vimeo" | "file";

export interface ResolvedVideo {
  kind: VideoKind;
  src: string;
}

export function resolveVideo(url: string): ResolvedVideo {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt) {
    return {
      kind: "youtube",
      src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`,
    };
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
  if (vimeo) {
    const hash = vimeo[2] ? `&h=${vimeo[2]}` : "";
    return {
      kind: "vimeo",
      src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1${hash}`,
    };
  }

  return { kind: "file", src: url };
}
