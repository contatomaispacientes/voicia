"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links: Record<string, string[]> = {
  Produto: ["Soluções", "Preços", "Integrações", "Atualizações"],
  Empresa: ["Sobre", "Blog", "Carreiras", "Contato"],
  Legal: ["Termos de uso", "Privacidade", "LGPD"],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const cols = el.querySelectorAll(".f-col");

    gsap.set(cols, { opacity: 0, y: 30 });
    gsap.to(cols, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 dotgrid opacity-20 pointer-events-none" />

      {/* Huge brand wordmark as background */}
      <div className="absolute inset-x-0 -bottom-10 flex justify-center pointer-events-none select-none">
        <span className="font-display text-[24vw] lg:text-[18vw] font-bold leading-none tracking-tighter bg-gradient-to-b from-[#63AAA2]/[0.05] to-transparent bg-clip-text text-transparent">
          VoicIA
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="f-col col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/voicia-logo.png"
                alt="VoicIA"
                width={160}
                height={64}
                className="h-14 w-auto"
              />
            </div>
            <p className="font-display text-2xl lg:text-3xl font-bold leading-tight mb-3 max-w-sm">
              <span className="grad-text">Tecnologia que </span>
              <span className="accent-text">cuida de quem cuida.</span>
            </p>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-sm">
              Suporte médico de atendimento humanizado. Automatize registros clínicos e foque no paciente.
            </p>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="f-col">
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#63AAA2] font-semibold mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#64748B]">&copy; 2025 VoicIA. Todos os direitos reservados.</span>
          <div className="flex gap-5">
            {["LinkedIn", "Instagram", "Twitter"].map((s) => (
              <a key={s} href="#" className="text-xs text-[#64748B] hover:text-[#63AAA2] transition-colors uppercase tracking-wider">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
