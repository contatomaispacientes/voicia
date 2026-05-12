"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const testimonials = [
  { quote: "A VoicIA transformou minha rotina. Antes eu passava mais tempo digitando do que olhando para o paciente. Agora consigo focar no que realmente importa.", name: "Dra. Mariana Costa", role: "Clínica Geral", initials: "MC" },
  { quote: "O resumo clínico gerado automaticamente é impressionante. Economizo pelo menos 2 horas por dia e meus prontuários ficaram mais completos.", name: "Dr. Ricardo Almeida", role: "Cardiologista", initials: "RA" },
  { quote: "A inteligência artificial me ajuda com sugestões de diagnóstico diferencial e interações medicamentosas. É como ter um assistente sempre atualizado.", name: "Dra. Fernanda Lima", role: "Pediatra", initials: "FL" },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const header = el.querySelector(".t-header");
    const cards = el.querySelectorAll(".t-card");

    if (header) {
      gsap.set(header, { opacity: 0, y: 40 });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: header, start: "top 85%", once: true },
      });
    }

    gsap.set(cards, { opacity: 0, y: 70, rotateZ: (i) => (i - 1) * 2 });
    gsap.to(cards, {
      opacity: 1, y: 0, rotateZ: 0,
      duration: 0.9, stagger: 0.18, ease: "power3.out",
      scrollTrigger: { trigger: cards[0], start: "top 85%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === header || t.vars.trigger === cards[0]) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,170,162,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="t-header flex flex-col items-center text-center mb-20 max-w-2xl mx-auto">
          <span className="eyebrow mb-6">O que dizem</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            <span className="grad-text">Experiências reais</span>
            <br />
            <span className="accent-text">de quem usa.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="t-card lum-card group p-8 relative">
              {/* Giant background quote mark */}
              <span className="absolute top-6 right-6 font-display text-7xl leading-none text-[#63AAA2]/[0.08] select-none pointer-events-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-3.5 text-[#63AAA2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-[#CBD5E1] leading-relaxed mb-8 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div className="relative">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#63AAA2] to-[#24425C] flex items-center justify-center ring-2 ring-[#63AAA2]/20">
                    <span className="text-xs font-bold text-white">{t.initials}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-[#63AAA2] uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
