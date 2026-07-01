import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { Preloader } from "./components/Preloader";
import { CustomCursor } from "./components/CustomCursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Work } from "./components/Work";
import { Services } from "./components/Services";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(true);

  useLenis(!loading && !reduced);

  // Prevent scroll under the preloader
  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Stats />
        <About />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
