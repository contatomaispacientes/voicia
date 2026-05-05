"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../sections/Nav";
import Footer from "../sections/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ────────────────────────────────────────────────── */

const stats = [
  { value: "70%", label: "Redução no tempo de preenchimento de prontuários" },
  { value: "3h", label: "Economizadas por dia em tarefas administrativas" },
  { value: "98%", label: "Satisfação dos médicos que utilizam a plataforma" },
  { value: "2x", label: "Mais pacientes atendidos por turno" },
];

const comparisons = [
  {
    category: "Preenchimento de prontuário",
    without: "15-20 min por consulta digitando",
    with: "Automático durante a consulta",
  },
  {
    category: "Resumo clínico",
    without: "Escrita manual após atendimento",
    with: "Gerado em segundos com IA",
  },
  {
    category: "Interações medicamentosas",
    without: "Consulta manual em bulas e bases",
    with: "Alertas automáticos em tempo real",
  },
  {
    category: "Integração com sistemas",
    without: "Exportação manual, cópia e cola",
    with: "Sincronização nativa com 15+ sistemas",
  },
  {
    category: "Conformidade LGPD",
    without: "Processos manuais e planilhas",
    with: "Automação com logs e relatórios",
  },
];

const benefits = [
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    title: "Mais tempo com o paciente",
    desc: "Elimine horas de digitação. A IA documenta enquanto você conversa, permitindo contato visual e atenção total ao paciente.",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 12c0 4.97 2.865 9.27 7.034 11.354a.75.75 0 0 0 .392.146h.148a.75.75 0 0 0 .392-.146C15.135 21.27 18 16.97 18 12c0-1.394-.205-2.743-.591-4.016z",
    title: "Prontuários mais completos",
    desc: "Documentação clínica detalhada e padronizada que reduz erros, melhora a continuidade do cuidado e protege juridicamente.",
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Aumento de receita",
    desc: "Atenda mais pacientes por turno sem sacrificar qualidade. Médicos relatam aumento de até 40% na capacidade de atendimento.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
    title: "Experiência do paciente",
    desc: "Pacientes percebem a diferença quando o médico está presente na conversa em vez de focado na tela digitando.",
  },
  {
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15",
    title: "Redução de retrabalho",
    desc: "Prontuários gerados corretamente da primeira vez. Sem necessidade de revisões, correções ou complementações posteriores.",
  },
  {
    icon: "M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 1-1.806-2.236l.466-2.33a3 3 0 0 1 1.51-2.07l.371-.214a3 3 0 0 0 1.06-1.06l.214-.371a3 3 0 0 1 2.07-1.51l2.33-.466a2 2 0 0 1 2.236 1.806l.186.93",
    title: "Menos burnout médico",
    desc: "A carga administrativa é o principal fator de burnout em médicos. A VoicIA elimina o trabalho que mais drena energia.",
  },
];

const testimonials = [
  {
    quote: "Antes eu chegava em casa e ainda ficava 2 horas terminando prontuários. Agora saio do consultório com tudo pronto.",
    name: "Dra. Mariana Costa",
    role: "Clínica Geral — 12 anos de experiência",
    initials: "MC",
  },
  {
    quote: "O ROI foi imediato. No primeiro mês já consegui atender 8 pacientes a mais por semana sem aumentar o horário.",
    name: "Dr. Ricardo Almeida",
    role: "Cardiologista — Clínica Pulsare",
    initials: "RA",
  },
  {
    quote: "Meus pacientes comentam que agora eu olho para eles durante a consulta. Isso muda completamente a relação.",
    name: "Dra. Fernanda Lima",
    role: "Pediatra — Hospital Criança Feliz",
    initials: "FL",
  },
];

/* ─── Page ────────────────────────────────────────────────── */

export default function VantagensPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const sections = el.querySelectorAll(".v-animate");

    sections.forEach((section) => {
      const header = section.querySelector(".v-header");
      const items = section.querySelectorAll(".v-item");

      if (header) {
        gsap.set(header, { opacity: 0, y: 40 });
        gsap.to(header, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
      }

      if (items.length) {
        gsap.set(items, { opacity: 0, y: 50 });
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
        });
      }
    });

    // Counter animation for stats
    const counters = el.querySelectorAll<HTMLElement>(".v-counter");
    counters.forEach((counter) => {
      gsap.set(counter, { opacity: 0, scale: 0.8 });
      gsap.to(counter, {
        opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)",
        scrollTrigger: { trigger: counter, start: "top 85%", once: true },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Nav />
      <div ref={pageRef}>
        {/* ── Hero ─────────────────────────────────── */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 dotgrid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 grain opacity-[0.05] mix-blend-overlay pointer-events-none" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh] atmo-glow opacity-50" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center v-animate">
              <div className="v-header">
                <span className="eyebrow mb-6">Vantagens</span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="grad-text">Por que médicos escolhem</span>
                  <br />
                  <span className="accent-text">a VoicIA todo dia.</span>
                </h1>
                <p className="text-lg text-[#94A3B8] leading-relaxed max-w-xl mx-auto">
                  Não é só sobre tecnologia — é sobre devolver ao médico o que ele mais precisa: tempo, foco e qualidade de vida.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────── */}
        <section className="relative py-16 border-y border-white/[0.04] v-animate">
          <div className="absolute inset-0 dotgrid opacity-20 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="v-counter text-center">
                  <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold accent-text mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] uppercase tracking-wider leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits grid ────────────────────────── */}
        <section className="relative py-28 lg:py-36 overflow-hidden v-animate">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(36,66,92,0.20),transparent_55%)]" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="v-header text-center mb-20 max-w-2xl mx-auto">
              <span className="eyebrow mb-6">Benefícios</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="grad-text">O impacto vai além</span>
                <br />
                <span className="accent-text">do consultório.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <div key={b.title} className="v-item lum-card group p-8 flex flex-col">
                  <div className="halo-icon size-14 mb-6">
                    <svg width="26" height="26" fill="none" stroke="#63AAA2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={b.icon} />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{b.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed flex-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Before / After comparison ──────────── */}
        <section className="relative py-28 lg:py-36 border-t border-white/[0.04] overflow-hidden v-animate">
          <div className="absolute inset-0 honeycomb opacity-30 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="v-header text-center mb-16 max-w-2xl mx-auto">
              <span className="eyebrow mb-6">Antes vs depois</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="grad-text">A diferença é</span>
                <br />
                <span className="accent-text">imediata.</span>
              </h2>
            </div>

            {/* Table header */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 mb-4 px-5">
                <span className="text-xs uppercase tracking-[0.2em] text-[#64748B] font-medium">&nbsp;</span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#64748B] font-medium text-center">Sem VoicIA</span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#63AAA2] font-medium text-center">Com VoicIA</span>
              </div>

              <div className="space-y-3">
                {comparisons.map((c) => (
                  <div
                    key={c.category}
                    className="v-item lum-card grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] gap-4 p-5 items-center group"
                  >
                    <p className="font-display text-sm font-semibold text-white">{c.category}</p>

                    <div className="flex items-center gap-2 sm:justify-center">
                      <span className="size-1.5 rounded-full bg-red-400/60 shrink-0" />
                      <p className="text-xs text-[#94A3B8]">{c.without}</p>
                    </div>

                    <div className="flex items-center gap-2 sm:justify-center">
                      <span className="size-1.5 rounded-full bg-[#63AAA2] shrink-0" />
                      <p className="text-xs text-[#CBD5E1]">{c.with}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────── */}
        <section className="relative py-28 lg:py-36 overflow-hidden v-animate">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,170,162,0.08),transparent_50%)]" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="v-header text-center mb-20 max-w-2xl mx-auto">
              <span className="eyebrow mb-6">Quem já usa</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="grad-text">Histórias reais de</span>
                <br />
                <span className="accent-text">transformação.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <div key={t.name} className="v-item lum-card group p-8 relative">
                  <span className="absolute top-6 right-6 font-display text-7xl leading-none text-[#63AAA2]/[0.08] select-none pointer-events-none">
                    &ldquo;
                  </span>

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
                    <div className="size-10 rounded-full bg-gradient-to-br from-[#63AAA2] to-[#24425C] flex items-center justify-center ring-2 ring-[#63AAA2]/20">
                      <span className="text-xs font-bold text-white">{t.initials}</span>
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

        {/* ── CTA ───────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 overflow-hidden v-animate">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="v-item relative rounded-3xl overflow-hidden border border-[#63AAA2]/20 bg-gradient-to-b from-[#0E1725] via-[#0E1725] to-[#080C15]">
              <div className="absolute inset-x-0 -bottom-20 h-[80%] atmo-glow pointer-events-none" style={{ opacity: 0.4 }} />
              <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay pointer-events-none" />

              <div className="absolute top-6 left-6 size-3 border-l border-t border-[#63AAA2]/50" />
              <div className="absolute top-6 right-6 size-3 border-r border-t border-[#63AAA2]/50" />
              <div className="absolute bottom-6 left-6 size-3 border-l border-b border-[#63AAA2]/50" />
              <div className="absolute bottom-6 right-6 size-3 border-r border-b border-[#63AAA2]/50" />

              <div className="relative z-10 px-6 py-20 sm:py-28 text-center max-w-3xl mx-auto">
                <span className="eyebrow mb-6">Experimente grátis</span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="grad-text">Pronto para ganhar</span>
                  <br />
                  <span className="accent-text">3 horas por dia?</span>
                </h2>
                <p className="text-lg text-[#94A3B8] max-w-lg mx-auto mb-10 leading-relaxed">
                  Comece agora sem cartão de crédito e veja o impacto desde a primeira consulta.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/#precos"
                    className="relative group px-8 py-4 rounded-xl bg-[#63AAA2] text-white font-semibold hover:bg-[#7BBFBA] hover:shadow-[0_0_50px_rgba(99,170,162,0.5)] transition-all overflow-hidden"
                  >
                    <span className="relative z-10">Agendar teste gratuito</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </a>
                  <a
                    href="/solucoes"
                    className="px-8 py-4 rounded-xl border border-[#63AAA2]/25 text-[#CBD5E1] font-semibold hover:border-[#63AAA2]/60 hover:text-white hover:bg-[#63AAA2]/5 transition-all"
                  >
                    Ver soluções
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
