"use client";

import { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const faqs = [
  { q: "Quais integrações vocês aceitam e como funciona?", a: "A VoicIA integra com os principais sistemas de gestão clínica do mercado. A integração é feita via API segura e nosso time de suporte acompanha todo o processo de configuração." },
  { q: "A VoicIA substitui o prontuário eletrônico?", a: "Não. A VoicIA complementa seu prontuário eletrônico existente, automatizando o preenchimento e gerando resumos clínicos que podem ser exportados diretamente para o seu sistema." },
  { q: "Meus dados e dos meus pacientes estão seguros?", a: "Absolutamente. Todos os dados são criptografados em trânsito e em repouso, armazenados em servidores brasileiros certificados, em total conformidade com a LGPD." },
  { q: "A VoicIA funciona para todas as especialidades médicas?", a: "Sim. A VoicIA é treinada com protocolos clínicos de múltiplas especialidades e se adapta ao vocabulário e fluxo de cada área. Quanto mais você usa, mais personalizada ela fica." },
  { q: "Qual o tempo de implementação?", a: "A implementação é rápida. Em poucos minutos você já pode começar a usar. Nosso time oferece onboarding personalizado para garantir que você aproveite todas as funcionalidades." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const header = el.querySelector(".q-header");
    const items = el.querySelectorAll(".q-item");

    if (header) {
      gsap.set(header, { opacity: 0, y: 40 });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: header, start: "top 85%", once: true },
      });
    }

    gsap.set(items, { opacity: 0, y: 30 });
    gsap.to(items, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === header || t.vars.trigger === items[0]) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="q-header flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="eyebrow mb-6">Dúvidas comuns</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            <span className="grad-text">Respostas para</span>
            <br />
            <span className="accent-text">o que importa.</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`q-item relative rounded-2xl border transition-all duration-300 ${
                open === i
                  ? "border-[#63AAA2]/30 bg-gradient-to-b from-[#63AAA2]/[0.04] to-transparent"
                  : "border-white/[0.06] bg-[#0E1725]/50 hover:border-white/[0.12]"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-5 px-6 py-5 text-left"
              >
                <span className={`flex-1 text-sm sm:text-base font-medium pr-4 transition-colors ${open === i ? "text-white" : "text-[#CBD5E1]"}`}>
                  {faq.q}
                </span>
                <div className={`shrink-0 size-8 rounded-full flex items-center justify-center transition-all ${open === i ? "bg-[#63AAA2] text-white rotate-45" : "bg-white/[0.04] text-[#64748B]"}`}>
                  <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>
              <div className={`grid transition-all duration-500 ease-out ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 text-sm text-[#94A3B8] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
