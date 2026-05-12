"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const perks = [
  "Transcrição ilimitada de consultas",
  "Resumos clínicos automáticos",
  "Suporte médico com IA",
  "Integração com sistemas de gestão",
  "Suporte prioritário",
  "Atualizações contínuas",
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const header = el.querySelector(".p-header");
    const card = el.querySelector(".p-card");
    const perkItems = el.querySelectorAll(".p-perk");

    if (header) {
      gsap.set(header, { opacity: 0, y: 40 });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: header, start: "top 85%", once: true },
      });
    }
    if (card) {
      gsap.set(card, { opacity: 0, scale: 0.92, y: 50 });
      gsap.to(card, {
        opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.3)",
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
      });
    }
    gsap.set(perkItems, { opacity: 0, x: -20 });
    gsap.to(perkItems, {
      opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: card, start: "top 80%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === header || t.vars.trigger === card) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="precos" className="relative py-28 lg:py-36 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 atmo-glow-top opacity-50" />
      <div className="absolute inset-0 honeycomb opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-header flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="eyebrow mb-6">Investimento</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            <span className="grad-text">Transforme seu consultório</span>
            <br />
            <span className="accent-text">sem compromisso.</span>
          </h2>
        </div>

        {/* Pricing card */}
        <div className="max-w-md mx-auto">
          <div className="p-card relative rounded-3xl overflow-hidden">
            {/* Animated gradient edge */}
            <div className="absolute inset-0 rounded-3xl p-[1.5px] bg-gradient-to-b from-[#63AAA2] via-[#63AAA2]/30 to-transparent">
              <div className="w-full h-full rounded-3xl bg-[#0E1725]" />
            </div>

            <div className="relative z-10 p-8 sm:p-10">
              <div className="mb-8">
                <span className="eyebrow">Plano PRO</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-[#94A3B8]">R$</span>
                  <span className="font-display text-7xl font-bold accent-text leading-none">0</span>
                  <span className="text-base text-[#94A3B8] ml-1">,00</span>
                </div>
                <p className="text-xs text-[#64748B] mt-3 uppercase tracking-wider">
                  Para começar — sem cartão de crédito
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#63AAA2]/30 to-transparent mb-8" />

              <ul className="space-y-3 mb-10">
                {perks.map((p) => (
                  <li key={p} className="p-perk flex items-center gap-3">
                    <div className="size-5 rounded-full bg-[#63AAA2]/15 border border-[#63AAA2]/25 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" fill="none" stroke="#63AAA2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#CBD5E1]">{p}</span>
                  </li>
                ))}
              </ul>

              <a href="https://app.voicia.com.br/" className="block w-full text-center py-4 rounded-xl bg-[#63AAA2] text-white font-semibold hover:bg-[#7BBFBA] hover:shadow-[0_0_50px_rgba(99,170,162,0.5)] transition-all">
                Começar agora — é grátis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
