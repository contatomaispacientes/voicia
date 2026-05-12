"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AppScreenshot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runEntrance = () => {
      if (reducedMotion) {
        gsap.set(container, { opacity: 1, y: 0, rotateX: 0, scale: 1 });
        return;
      }
      gsap.fromTo(
        container,
        { y: 80, opacity: 0, rotateX: 8, scale: 0.96 },
        { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      );
    };

    // Sync entrance with the SplitText start — wait for intro-finished
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).__introFinished) {
      runEntrance();
    } else {
      const onDone = () => runEntrance();
      window.addEventListener("intro-finished", onDone, { once: true });
      // Safety fallback if the intro never dispatches
      const fallback = window.setTimeout(runEntrance, 6000);
      return () => {
        window.removeEventListener("intro-finished", onDone);
        window.clearTimeout(fallback);
      };
    }

    // Parallax on scroll — skip on mobile (scrub causes jank)
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop && !reducedMotion) {
      gsap.to(container, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <div
      className="relative w-full mx-auto"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={containerRef}
        className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
        style={{
          boxShadow: "0 0 60px rgba(91,168,162,0.08), 0 25px 60px rgba(0,0,0,0.4)",
          transformStyle: "preserve-3d",
          opacity: 0, // hidden until intro completes (prevents FOUC)
        }}
      >
        {/* Browser chrome bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-[#0B1120]">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#EF4444]/50" />
            <span className="size-3 rounded-full bg-[#EAB308]/50" />
            <span className="size-3 rounded-full bg-[#22C55E]/50" />
          </div>
          <div className="flex-1 mx-8">
            <div className="max-w-xs mx-auto h-7 rounded-md bg-white/[0.04] flex items-center justify-center">
              <svg className="size-3 text-[#64748B] mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-xs text-[#64748B]">app.voicia.com.br</span>
            </div>
          </div>
        </div>

        {/* Screenshot image — serve WebP quando suportado */}
        <picture>
          <source srcSet="/app-screenshot.webp" type="image/webp" />
          <Image
            ref={imgRef}
            src="/app-screenshot.png"
            alt="VoicIA - Interface do sistema de suporte médico"
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="w-full h-auto block"
            draggable={false}
          />
        </picture>
      </div>

    </div>
  );
}
