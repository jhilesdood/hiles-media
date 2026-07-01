import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { resolveVideo } from "../lib/video";

/**
 * Shared lightbox for the showreel and project videos. Accepts any link the
 * `resolveVideo` helper understands — a self-hosted file or a YouTube/Vimeo URL.
 */
export function VideoModal({
  open,
  onClose,
  src,
  poster,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
}) {
  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const video = src ? resolveVideo(src) : null;

  return (
    <AnimatePresence>
      {open && video && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-night/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-night transition-colors hover:bg-paper"
            >
              <X size={18} />
            </button>

            {video.kind === "file" ? (
              <video
                className="aspect-video w-full"
                src={video.src}
                poster={poster}
                controls
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <iframe
                className="aspect-video w-full"
                src={video.src}
                title="Video player"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
