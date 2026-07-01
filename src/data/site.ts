export interface Service {
  no: string;
  title: string;
  copy: string;
  tags: string[];
}

export const services: Service[] = [
  {
    no: "01",
    title: "Video Production",
    copy: "End-to-end film for brands and artists — concept, direction, crew, and camera. We build the frame that makes people stop scrolling.",
    tags: ["Commercials", "Music Video", "Documentary"],
  },
  {
    no: "02",
    title: "Short-Form & Social",
    copy: "Native, vertical-first content engineered for reach. Hooks that land in three seconds and series that keep them coming back.",
    tags: ["Reels & TikTok", "YouTube", "Content Engines"],
  },
  {
    no: "03",
    title: "Brand Content",
    copy: "Story systems that give a brand a voice on screen — campaign films, launch reels, and the connective tissue between them.",
    tags: ["Campaigns", "Launch Films", "Strategy"],
  },
  {
    no: "04",
    title: "Post & Color",
    copy: "The finish that sells the feeling. Editorial, sound, and a signature warm grade that makes every frame feel intentional.",
    tags: ["Editorial", "Color Grade", "Sound Design"],
  },
];

export interface Step {
  no: string;
  title: string;
  copy: string;
}

export const process: Step[] = [
  {
    no: "01",
    title: "Discover",
    copy: "We dig into the brief, the audience, and the feeling. Every project starts with a point of view before a single frame.",
  },
  {
    no: "02",
    title: "Design",
    copy: "Treatment, look, and shot language. We map the story so the shoot day runs on instinct, not improvisation.",
  },
  {
    no: "03",
    title: "Direct",
    copy: "On set we protect the vision and chase the unrepeatable moments — the ones that make an edit feel alive.",
  },
  {
    no: "04",
    title: "Deliver",
    copy: "Cut, colored, scored, and formatted for every screen it will live on. Handed over ready to move numbers.",
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Reels shipped" },
  { value: 2, suffix: "M", label: "Views generated" },
  { value: 60, suffix: "+", label: "Brands & artists" },
  { value: 2, suffix: "", label: "Awards & features" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** avatar — swap for a real headshot later */
  image: string;
}

// Deterministic placeholder headshots (picsum) — replace with real photos.
const face = (seed: string) => `https://picsum.photos/seed/${seed}/240/240`;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Hiles Media didn't just shoot our launch — they gave the brand a heartbeat. The film outperformed every paid channel we ran that quarter.",
    name: "Elena Prakash",
    role: "VP Brand, Maison Dune",
    image: face("hiles-elena"),
  },
  {
    quote:
      "The most instinctive team we've ever had on set. They see the shot before it happens and the edit lands every single time.",
    name: "Marcus Bell",
    role: "Founder, Vanta Athletics",
    image: face("hiles-marcus"),
  },
  {
    quote:
      "They turned a two-week brief into the best-performing film we've ever released. Fast, fearless, and obsessed with the details that matter.",
    name: "Priya Raman",
    role: "Head of Content, Northbound",
    image: face("hiles-priya"),
  },
  {
    quote:
      "Every frame felt intentional. Hiles Media gave our launch the cinematic weight we didn't know it was missing.",
    name: "Daniel Okafor",
    role: "CMO, Aperol House",
    image: face("hiles-daniel"),
  },
  {
    quote:
      "It's like having a creative director, a DP, and an editor who all share one brain. The vision never gets lost in the hand-off.",
    name: "Sofia Marchetti",
    role: "Producer, Field Notes",
    image: face("hiles-sofia"),
  },
  {
    quote:
      "The grade alone sold the campaign. They make everything feel warmer, richer, more alive — you can't look away.",
    name: "James Whitlock",
    role: "Creative Lead, Coastal Co.",
    image: face("hiles-james"),
  },
];

export const clients = [
  "Aperol House",
  "Maison Dune",
  "Northbound",
  "Vanta Athletics",
  "Field Notes",
  "Coastal Co.",
];

export const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export const contactEmail = "joey@hilesmedia.com";
