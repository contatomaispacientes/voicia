"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const data = [
  { value: 500, suffix: "+", label: "Médicos ativos" },
  { value: 50, suffix: "k+", label: "Consultas registradas" },
  { value: 98, suffix: "%", label: "Satisfação" },
  { value: 3, suffix: "h", label: "Economizadas/dia" },
];

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLDivElement>(".m-item");
    const numbers = el.querySelectorAll<HTMLParagraphElement>(".m-val");
    const dividers = el.querySelectorAll<HTMLDivElement>(".m-divider");

    gsap.set(items, { opacity: 0, y: 20 });
    gsap.set(dividers, { scaleY: 0, transformOrigin: "center" });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    gsap.to(dividers, {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.12,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    numbers.forEach((num, i) => {
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: data[i].value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate() {
          num.textContent = Math.round(proxy.val) + data[i].suffix;
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative border-y border-white/[0.04] py-10 overflow-hidden">
      <div className="absolute inset-0 dotgrid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 relative">
          {data.map((m, i) => (
            <div
              key={m.label}
              className="m-item relative px-4 md:px-8 py-4 flex flex-col items-center md:items-start"
            >
              {i > 0 && (
                <div className="m-divider hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-[#63AAA2]/30 to-transparent" />
              )}
              <p className="m-val font-display text-3xl sm:text-4xl lg:text-5xl font-bold accent-text tracking-tight">
                0
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#64748B] mt-2 font-medium">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
