"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Mostra o conteúdo com um leve movimento quando ele entra na tela.
 * Começa visível (sem JS, ou com movimento reduzido, nada fica escondido):
 * só "espera" o que ainda está abaixo da tela no primeiro desenho.
 */
export function Revelar({ children, className = "", atraso = 0, como: Tag = "div" }: { children: ReactNode; className?: string; atraso?: number; como?: ElementType }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    // Classe direto no elemento: é só aparência, não precisa de render.
    el.classList.add("esperando");
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.remove("esperando");
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`revelar ${className}`} style={{ transitionDelay: `${atraso}ms` }}>
      {children}
    </Tag>
  );
}
