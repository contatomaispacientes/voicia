"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "Até 70% de redução no tempo de preenchimento de prontuários",
  "IA treinada com protocolos clínicos e diretrizes médicas atualizadas",
  "Integração com os principais sistemas de gestão clínica",
  "Suporte a múltiplas especialidades médicas",
  "Transcrição em tempo real com precisão clínica avançada",
];

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const leftCol = el.querySelector(".a-left");
    const rightCol = el.querySelector(".a-right");
    const listItems = el.querySelectorAll(".a-item");
    const chatBubbles = el.querySelectorAll(".a-bubble");
    const pulse = el.querySelector(".a-pulse");

    if (leftCol) {
      gsap.set(leftCol, { opacity: 0, x: -60 });
      gsap.to(leftCol, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    }
    if (rightCol) {
      gsap.set(rightCol, { opacity: 0, x: 60 });
      gsap.to(rightCol, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    }

    gsap.set(listItems, { opacity: 0, x: -20 });
    gsap.to(listItems, {
      opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: listItems[0], start: "top 85%", once: true },
    });

    if (chatBubbles.length && !reducedMotion) {
      gsap.set(chatBubbles, { opacity: 0, y: 20 });
      gsap.to(chatBubbles, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.5, delay: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: rightCol, start: "top 75%", once: true },
      });
    }

    if (pulse && !reducedMotion) {
      gsap.to(pulse, {
        scale: 1.3, opacity: 0, duration: 1.8, ease: "power2.out", repeat: -1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el || t.vars.trigger === listItems[0] || t.vars.trigger === rightCol) t.kill();
      });
      if (pulse) gsap.killTweensOf(pulse);
    };
  }, []);

  return (
    <section ref={sectionRef} id="vantagens" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(36,66,92,0.25),transparent_55%)]" />
      <div className="absolute inset-0 dotgrid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="a-left">
          <span className="eyebrow mb-6 inline-flex">Por que VoicIA</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
            <span className="grad-text">Eficiência clínica</span>
            <br />
            <span className="accent-text">na prática.</span>
          </h2>
          <p className="text-[#94A3B8] text-lg mb-10 max-w-md leading-relaxed">
            Veja como a VoicIA transforma cada minuto da rotina do seu consultório.
          </p>

          <ul className="space-y-3.5 mb-10">
            {items.map((item) => (
              <li key={item} className="a-item flex items-start gap-3 group">
                <div className="mt-0.5 size-5 rounded-full bg-[#63AAA2]/15 border border-[#63AAA2]/25 flex items-center justify-center shrink-0 group-hover:bg-[#63AAA2]/25 transition-colors">
                  <svg width="10" height="10" fill="none" stroke="#63AAA2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-[#CBD5E1] leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>

          <a href="#precos" className="inline-flex px-7 py-3.5 rounded-xl bg-[#63AAA2] text-white font-semibold hover:bg-[#7BBFBA] hover:shadow-[0_0_40px_rgba(99,170,162,0.4)] transition-all">
            Agendar teste gratuito
          </a>
        </div>

        {/* Visual — dramatic AI chat */}
        <div className="a-right relative">
          <div className="lum-card p-6 lg:p-7 relative">
            {/* Header bar */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
              <div className="relative">
                <div className="size-8 rounded-lg bg-gradient-to-br from-[#63AAA2] to-[#24425C] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">IA</span>
                </div>
                <span className="a-pulse absolute inset-0 rounded-lg bg-[#63AAA2]/40" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Assistente VoicIA</p>
                <p className="text-[10px] text-[#63AAA2]">● Transcrevendo em tempo real</p>
              </div>
              <span className="text-[10px] text-[#63AAA2] bg-[#63AAA2]/10 px-2 py-1 rounded-full font-medium border border-[#63AAA2]/20">Ativo</span>
            </div>

            {/* Chat bubbles */}
            <div className="space-y-4">
              <div className="a-bubble">
                <p className="text-[10px] uppercase tracking-wider text-[#64748B] mb-1.5">Paciente</p>
                <div className="rounded-xl bg-[#151F30] border border-white/[0.04] p-3.5">
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Cefaleia recorrente há 3 semanas, com piora matinal. Histórico de hipertensão controlada. Medicação atual: Losartana 50mg.
                  </p>
                </div>
              </div>

              <div className="a-bubble">
                <p className="text-[10px] uppercase tracking-wider text-[#63AAA2] mb-1.5 flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-[#63AAA2]" />
                  VoicIA sugere
                </p>
                <div className="rounded-xl bg-gradient-to-br from-[#63AAA2]/10 to-[#63AAA2]/5 border border-[#63AAA2]/20 p-3.5">
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Considerar avaliação neurológica e monitoramento de PA. Verificar interação medicamentosa antes de nova prescrição.
                  </p>
                </div>
              </div>

              <div className="a-bubble flex flex-wrap gap-1.5 pt-1">
                {["Gerar prontuário", "Ver interações", "Solicitar exames"].map((a) => (
                  <span key={a} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.03] text-[#94A3B8] border border-white/[0.06] hover:border-[#63AAA2]/30 hover:text-[#63AAA2] transition-colors cursor-pointer">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Glow behind */}
          <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,170,162,0.18),transparent_70%)] blur-3xl" />
        </div>
      </div>
    </section>
  );
}
