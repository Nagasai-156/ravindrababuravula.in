import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { ProofStrip } from "./components/ProofStrip";
import { Pain } from "./components/Pain";
import { Compare } from "./components/Compare";
import { Projects } from "./components/Projects";
import { Curriculum } from "./components/Curriculum";
import { WeekRhythm } from "./components/WeekRhythm";
import { Stack } from "./components/Stack";
import { Who } from "./components/Who";
import { Mentors } from "./components/Mentors";
import { Testimonials } from "./components/Testimonials";
import { LeadMagnet } from "./components/LeadMagnet";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { initScrollDepth } from "./lib/track";
import "./ai-os.css";

export default function AiGeneralistOsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return initScrollDepth();
  }, []);

  return (
    <div className="aios-root grain">
      <Nav />
      <main>
        {/* hook */}
        <Hero />
        <Ticker />
        <ProofStrip />
        {/* problem */}
        <Pain />
        <Compare />
        {/* proof of the promise */}
        <Projects />
        <Curriculum />
        <WeekRhythm />
        <Stack />
        <Who />
        {/* credibility */}
        <Mentors />
        <Testimonials />
        {/* capture, then close */}
        {/* <LeadMagnet /> */}
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
