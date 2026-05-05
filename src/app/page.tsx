import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import IntroAnimation from "./sections/IntroAnimation";
import Metrics from "./sections/Metrics";
import Features from "./sections/Features";
import Advantages from "./sections/Advantages";
import Security from "./sections/Security";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import Faq from "./sections/Faq";
import CtaBanner from "./sections/CtaBanner";
import Footer from "./sections/Footer";

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
