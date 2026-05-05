"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const heading = el.querySelector(".c-heading");
    const subtitle = el.querySelector(".c-subtitle");
    const buttons = el.querySelector(".c-buttons");
    const glow = el.querySelector(".c-glow");
    const card = el.querySelector(".c-card");

    if (card) {
      gsap.set(card, { opacity: 0, scale: 0.95 });
      gsap.to(card, {
        opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }
    if (heading) {
      gsap.set(heading, { opacity: 0, y: 30 });
      gsap.to(heading, {
        opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }
    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 20 });
      gsap.to(subtitle, {
        opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }
    if (buttons) {
      gsap.set(buttons, { opacity: 0, y: 20 });
      gsap.to(buttons, {
        opacity: 1, y: 0, duration: 0.8, delay: 0.55, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }
    if (glow && !reducedMotion) {
      gsap.to(glow, {
        scale: 1.2, opacity: 0.55, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
      if (glow) gsap.killTweensOf(glow);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="c-card relative rounded-3xl overflow-hidden border border-[#63AAA2]/20 bg-gradient-to-b from-[#0E1725] via-[#0E1725] to-[#080C15]">
          {/* Animated warm glow */}
          <div className="c-glow absolute inset-x-0 -bottom-20 h-[80%] atmo-glow pointer-events-none" style={{ opacity: 0.4 }} />
          <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay pointer-events-none" />

          {/* Corner brackets */}
          <div className="absolute top-6 left-6 size-3 border-l border-t border-[#63AAA2]/50" />
          <div className="absolute top-6 right-6 size-3 border-r border-t border-[#63AAA2]/50" />
          <div className="absolute bottom-6 left-6 size-3 border-l border-b border-[#63AAA2]/50" />
          <div className="absolute bottom-6 right-6 size-3 border-r border-b border-[#63AAA2]/50" />

          <div className="relative z-10 px-6 py-20 sm:py-28 text-center max-w-3xl mx-auto">
            <span className="eyebrow mb-6">Pronto para começar</span>

            <h2 className="c-heading font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              <span className="grad-text">Transforme minutos digitados</span>
              <br />
              <span className="accent-text">em minutos de cuidado.</span>
            </h2>

            <p className="c-subtitle text-lg text-[#94A3B8] max-w-lg mx-auto mb-10 leading-relaxed">
              Comece agora e veja como a VoicIA pode transformar a rotina do seu consultório.
            </p>

            <div className="c-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="px-8 py-4 rounded-xl bg-[#63AAA2] text-white font-semibold hover:bg-[#7BBFBA] hover:shadow-[0_0_50px_rgba(99,170,162,0.5)] transition-all">
                Agendar teste gratuito
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#63AAA2] transition-colors">
                Falar com especialista
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
