export type Category = "Film" | "Social" | "Brand";

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: Category;
  /** short descriptor shown on hover */
  discipline: string;
  /** placeholder image — swap for real stills later */
  image: string;
  /**
   * The video that opens in the modal when the card is clicked.
   * Paste a YouTube link, a Vimeo link, or a self-hosted "/videos/x.mp4" path —
   * `resolveVideo` (src/lib/video.ts) figures out how to play it.
   * The sample links below are PLACEHOLDERS — replace with your real work.
   */
  video: string;
  /** rough aspect to vary the masonry rhythm */
  span: "tall" | "wide" | "square";
}

// Deterministic placeholder imagery (picsum). Treated with a duotone amber
// overlay in the UI so mixed stock reads as one cohesive editorial system.
// Request stills at ~1.6× the layout size so they stay crisp on retina/phone screens.
const RETINA = 1.6;
const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${Math.round(w * RETINA)}/${Math.round(h * RETINA)}`;

// Placeholder videos so the click-to-play modal works out of the box.
// SAMPLE_EMBED shows a YouTube embed; SAMPLE_FILE is a self-hosted-style .mp4.
const SAMPLE_EMBED = "https://youtu.be/aqz-KE-bpKQ";
const SAMPLE_FILE =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const projects: Project[] = [
  {
    id: "nocturne",
    title: "Nocturne",
    client: "Aperol House",
    year: "2025",
    category: "Film",
    discipline: "Brand Film · Direction",
    image: img("hiles-nocturne", 900, 1200),
    video: SAMPLE_EMBED,
    span: "tall",
  },
  {
    id: "afterglow",
    title: "Afterglow",
    client: "Maison Dune",
    year: "2025",
    category: "Brand",
    discipline: "Campaign · Art Direction",
    image: img("hiles-afterglow", 1200, 800),
    video: SAMPLE_FILE,
    span: "wide",
  },
  {
    id: "loop-city",
    title: "Loop City",
    client: "Northbound",
    year: "2024",
    category: "Social",
    discipline: "Short-Form Series",
    image: img("hiles-loopcity", 900, 900),
    video: SAMPLE_FILE,
    span: "square",
  },
  {
    id: "salt-air",
    title: "Salt & Air",
    client: "Coastal Co.",
    year: "2024",
    category: "Film",
    discipline: "Documentary · Color",
    image: img("hiles-saltair", 900, 900),
    video: SAMPLE_FILE,
    span: "square",
  },
  {
    id: "midnight-run",
    title: "Midnight Run",
    client: "Vanta Athletics",
    year: "2025",
    category: "Social",
    discipline: "Vertical · 12-Part Drop",
    image: img("hiles-midnight", 900, 1200),
    video: SAMPLE_EMBED,
    span: "tall",
  },
  {
    id: "the-makers",
    title: "The Makers",
    client: "Field Notes Coffee",
    year: "2023",
    category: "Brand",
    discipline: "Brand Story · Edit",
    image: img("hiles-makers", 1200, 800),
    video: SAMPLE_FILE,
    span: "wide",
  },
];

export const categories: ("All" | Category)[] = ["All", "Film", "Social", "Brand"];
