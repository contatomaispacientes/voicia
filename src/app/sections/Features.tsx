"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const header = el.querySelector(".f-header");
    const cards = el.querySelectorAll(".f-card");

    if (header) {
      gsap.set(header, { opacity: 0, y: 40 });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: header, start: "top 85%", once: true },
      });
    }

    gsap.set(cards, { opacity: 0, y: 60 });
    gsap.to(cards, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: cards[0], start: "top 85%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === header || t.vars.trigger === cards[0]) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="solucoes" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[400px] atmo-glow-top opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="f-header flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
          <span className="eyebrow mb-6">O que a VoicIA faz</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
            <span className="grad-text">Ferramentas que otimizam</span>
            <br />
            <span className="accent-text">sua rotina no consultório</span>
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-xl">
            Uma plataforma completa que transforma o tempo digitado em tempo de cuidado ao paciente.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* Featured card — spans 4 cols */}
          <div className="f-card lum-card md:col-span-4 p-8 lg:p-10 group min-h-[360px] flex flex-col justify-between">
            <div className="flex items-start justify-between mb-6">
              <div className="halo-icon size-14">
                <svg width="28" height="28" fill="none" stroke="#63AAA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                </svg>
              </div>
            </div>

            <div className="max-w-md mb-8">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                Registros automáticos por voz
              </h3>
              <p className="text-sm lg:text-base text-[#94A3B8] leading-relaxed">
                Transcreve e documenta consultas em tempo real. O médico foca na conversa,
                a IA cuida da documentação clínica com precisão diagnóstica.
              </p>
            </div>

            {/* Audio waveform visualization */}
            <div className="flex items-end gap-1 h-12">
              {[0.3, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 1, 0.6, 0.3, 0.8, 0.5, 0.9, 0.4, 0.7, 0.6, 0.3, 0.8, 0.5].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#63AAA2]/30 to-[#63AAA2] rounded-full animate-pulse"
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 80}ms`, animationDuration: "1.2s" }}
                />
              ))}
            </div>
          </div>

          {/* Side card — top right */}
          <div className="f-card lum-card md:col-span-2 p-8 group flex flex-col justify-between min-h-[360px]">
            <div className="flex items-start justify-between mb-6">
              <div className="halo-icon size-12">
                <svg width="22" height="22" fill="none" stroke="#63AAA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-2 leading-tight">
                Resumos clínicos apurados
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Prontuário estruturado com diagnósticos, condutas e prescrições — sem esforço manual.
              </p>
            </div>
          </div>

          {/* Bottom card — wide */}
          <div className="f-card lum-card md:col-span-3 p-8 group min-h-[260px] flex flex-col justify-between">
            <div className="flex items-start justify-between mb-6">
              <div className="halo-icon size-12">
                <svg width="22" height="22" fill="none" stroke="#63AAA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2 leading-tight">
                  Reduz tempo e custos
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Economize até 3 horas por dia em tarefas administrativas.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-4xl font-bold accent-text">3h</p>
                <p className="text-[10px] uppercase tracking-wider text-[#64748B] mt-0.5">por dia</p>
              </div>
            </div>
          </div>

          {/* Bottom card — stats */}
          <div className="f-card lum-card md:col-span-3 p-8 group min-h-[260px] flex flex-col justify-between">
            <div className="flex items-start justify-between mb-6">
              <div className="halo-icon size-12">
                <svg width="22" height="22" fill="none" stroke="#63AAA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2 leading-tight">
                  Integração nativa
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Conecta com os principais sistemas de gestão clínica do mercado.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-4xl font-bold accent-text">15+</p>
                <p className="text-[10px] uppercase tracking-wider text-[#64748B] mt-0.5">sistemas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
