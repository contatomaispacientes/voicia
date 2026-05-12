"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const items = [
  { icon: "M7 11V7a5 5 0 0 1 10 0v4M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", title: "LGPD", desc: "Conformidade total com a Lei Geral de Proteção de Dados" },
  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Criptografia", desc: "Dados criptografados em trânsito e em repouso" },
  { icon: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11", title: "Auditoria", desc: "Logs completos de acesso e modificação de dados" },
  { icon: "M2 2h20v8H2zM2 14h20v8H2zM6 6h.01M6 18h.01", title: "Brasil", desc: "Servidores em data centers brasileiros certificados" },
];

export default function Security() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const header = el.querySelector(".s-header");
    const cards = el.querySelectorAll(".s-card");

    if (header) {
      gsap.set(header, { opacity: 0, y: 40 });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: header, start: "top 85%", once: true },
      });
    }

    gsap.set(cards, { opacity: 0, y: 50 });
    gsap.to(cards, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: cards[0], start: "top 85%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === header || t.vars.trigger === cards[0]) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 lg:py-36 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 honeycomb opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="s-header flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="eyebrow mb-6">Rigor hospitalar</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            <span className="grad-text">Privacidade e proteção</span>
            <br />
            <span className="accent-text">em cada camada.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="s-card lum-card group p-8 text-center min-h-[240px] flex flex-col items-center justify-center"
            >
              <div className="halo-icon size-14 mb-5">
                <svg width="26" height="26" fill="none" stroke="#63AAA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={item.icon} />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
