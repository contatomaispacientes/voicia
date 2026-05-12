import dynamic from "next/dynamic";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";

// IntroAnimation — Three.js (~600KB) isolado em chunk separado
const IntroAnimation = dynamic(() => import("./sections/IntroAnimation"));

// Seções abaixo do fold — chunks separados para reduzir bundle inicial
const Metrics     = dynamic(() => import("./sections/Metrics"));
const Features    = dynamic(() => import("./sections/Features"));
const Advantages  = dynamic(() => import("./sections/Advantages"));
const Security    = dynamic(() => import("./sections/Security"));
const Testimonials = dynamic(() => import("./sections/Testimonials"));
const Pricing     = dynamic(() => import("./sections/Pricing"));
const Faq         = dynamic(() => import("./sections/Faq"));
const CtaBanner   = dynamic(() => import("./sections/CtaBanner"));
const Footer      = dynamic(() => import("./sections/Footer"));

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Features />
        <Advantages />
        <Security />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
