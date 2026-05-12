import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once — prevents redundant module-level registrations across 12+ components
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
