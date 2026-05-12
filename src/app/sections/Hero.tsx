"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SonicWaveformCanvas from "@/components/ui/sonic-waveform";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);

  // Wait for IntroAnimation to finish before starting Hero animations
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).__introFinished) {
      setIntroDone(true);
      return;
    }
    const onDone = () => setIntroDone(true);
    window.addEventListener("intro-finished", onDone, { once: true });
    const fallback = window.setTimeout(() => setIntroDone(true), 6000);
    return () => {
      window.removeEventListener("intro-finished", onDone);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!introDone) return;
    const el = sectionRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const subtitle = el.querySelector(".h-subtitle");
    const ctas = el.querySelector(".h-ctas");
    const trust = el.querySelector(".h-trust");
    const glow = el.querySelector(".h-glow");

    gsap.set([subtitle, ctas, trust], { opacity: 0, y: 22 });

    const reveal = gsap.to([subtitle, ctas, trust], {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: 3.2,
      ease: "power3.out",
    });

    if (glow) {
      gsap.to(glow, {
        opacity: 0.9, scale: 1.04,
        duration: 4.5, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
    }

    // Screenshot entrance + scroll parallax
    const screenshot = screenshotRef.current;
    let parallaxTrigger: ScrollTrigger | null = null;
    if (screenshot) {
      gsap.fromTo(
        screenshot,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 3.4,
          ease: "power3.out",
        }
      );

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        const p = gsap.to(screenshot, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: screenshot,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        parallaxTrigger = p.scrollTrigger ?? null;
      }
    }

    return () => {
      reveal.kill();
      if (glow) gsap.killTweensOf(glow);
      parallaxTrigger?.kill();
    };
  }, [introDone]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 lg:pt-32 overflow-hidden"
    >
      <SonicWaveformCanvas />

      {/* Atmosphere layers */}
      <div
        className="h-glow pointer-events-none absolute inset-x-0 bottom-[-25%] h-[75vh] z-0 atmo-glow"
        style={{ opacity: 0.65 }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] dotgrid opacity-20" />
      <div className="pointer-events-none absolute inset-0 z-[1] grain opacity-[0.05] mix-blend-overlay" />

      {/* Corner brackets — editorial framing */}
      <div className="pointer-events-none absolute top-24 left-6 size-3 border-l border-t border-[#63AAA2]/30 z-[2]" />
      <div className="pointer-events-none absolute top-24 right-6 size-3 border-r border-t border-[#63AAA2]/30 z-[2]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Centered intro content ───────────────── */}
        <div className="flex flex-col items-center text-center pt-4 lg:pt-6">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl min-h-[2.2em]">
            {introDone && (
              <>
                <SplitText
                  text="Suporte médico de"
                  delay={0.3}
                  stagger={0.07}
                  showCursor
                  hideCursorOnComplete
                  charClassName="text-white"
                />
                <br />
                <SplitText
                  text="atendimento humanizado"
                  delay={1.6}
                  stagger={0.07}
                  showCursor
                  charClassName="text-[#63AAA2]"
                />
              </>
            )}
          </h1>

          <p
            className="h-subtitle text-base md:text-lg text-[#94A3B8] max-w-xl mb-8 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Automatize registros clínicos, foque no paciente e ganhe tempo.
            A plataforma que transforma minutos digitados em minutos de cuidado.
          </p>

          {/* CTAs */}
          <div
            className="h-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6"
            style={{ opacity: 0 }}
          >
            <a
              href="https://app.voicia.com.br/"
              className="relative group px-8 py-4 rounded-xl bg-[#63AAA2] text-white font-semibold text-sm sm:text-base text-center overflow-hidden transition-all hover:bg-[#7BBFBA] hover:shadow-[0_0_50px_rgba(99,170,162,0.5)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Agendar teste gratuito
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="/solucoes"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#63AAA2]/25 text-[#CBD5E1] font-semibold text-sm sm:text-base hover:border-[#63AAA2]/60 hover:text-white hover:bg-[#63AAA2]/5 transition-all"
            >
              Conheça as soluções
            </a>
          </div>

          {/* Trust strip */}
          <div
            className="h-trust flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#64748B] justify-center"
            style={{ opacity: 0 }}
          >
            <div className="flex items-baseline gap-1.5">
              <span className="accent-text font-display font-bold text-base">500+</span>
              <span className="uppercase tracking-[0.15em]">Médicos</span>
            </div>
            <span className="text-[#1E293B]">·</span>
            <div className="flex items-baseline gap-1.5">
              <span className="accent-text font-display font-bold text-base">50k+</span>
              <span className="uppercase tracking-[0.15em]">Consultas</span>
            </div>
            <span className="text-[#1E293B]">·</span>
            <div className="flex items-baseline gap-1.5">
              <span className="accent-text font-display font-bold text-base">98%</span>
              <span className="uppercase tracking-[0.15em]">Satisfação</span>
            </div>
          </div>
        </div>

        {/* ── Container scroll animation with screenshot ── */}
        <div ref={screenshotRef} style={{ opacity: 0 }}>
          <ContainerScroll>
            <Image
              src="/app-screenshot.png"
              alt="VoicIA - Interface do sistema de suporte médico"
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
