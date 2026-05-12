"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once — prevents redundant module-level registrations across 12+ components
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
