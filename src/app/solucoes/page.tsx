"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../sections/Nav";
import Footer from "../sections/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ────────────────────────────────────────────────── */

const solutions = [
  {
    icon: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
    title: "Transcrição Inteligente",
    subtitle: "Registros automáticos por voz",
    desc: "A VoicIA escuta e transcreve consultas em tempo real, convertendo conversas médico-paciente em documentação clínica estruturada. O médico foca na conversa, a IA cuida do resto.",
    features: [
      "Transcrição em tempo real com precisão clínica de 98%",
      "Reconhecimento de termos médicos e abreviações",
      "Suporte a múltiplos idiomas e sotaques",
      "Separação automática de vozes (médico vs paciente)",
      "Funciona offline para áreas com internet instável",
    ],
  },
  {
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    title: "Prontuário Automatizado",
    subtitle: "Resumos clínicos apurados",
    desc: "Gere prontuários completos e estruturados automaticamente. Diagnósticos, condutas, prescrições e evolução do paciente — tudo organizado e pronto para integração com seu sistema de gestão.",
    features: [
      "Prontuários estruturados com SOAP, CID-10 e procedimentos",
      "Geração automática de resumo de alta",
      "Histórico completo de evolução do paciente",
      "Exportação para PDF, Word ou diretamente para o sistema",
      "Templates personalizáveis por especialidade",
    ],
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Assistente IA Clínico",
    subtitle: "Suporte médico com inteligência artificial",
    desc: "Um assistente treinado com protocolos clínicos e diretrizes médicas atualizadas que sugere diagnósticos diferenciais, verifica interações medicamentosas e auxilia na tomada de decisão clínica.",
    features: [
      "Sugestões de diagnóstico diferencial baseadas em sintomas",
      "Verificação automática de interações medicamentosas",
      "Alertas de alergias e contraindicações",
      "Base de dados com protocolos clínicos atualizados",
      "Pesquisa rápida em literatura médica via linguagem natural",
    ],
  },
  {
    icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
    title: "Gestão de Tempo",
    subtitle: "Reduz tempo e custos operacionais",
    desc: "Economize até 3 horas por dia eliminando tarefas administrativas manuais. Mais tempo com o paciente, menos tempo preenchendo formulários — com impacto direto na qualidade do atendimento.",
    features: [
      "Redução de até 70% no tempo de preenchimento",
      "Agendamento inteligente com previsão de duração",
      "Fila de espera automatizada com notificações",
      "Dashboard de produtividade individual e por equipe",
      "Relatórios automáticos de atendimentos mensais",
    ],
  },
  {
    icon: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
    title: "Integração Nativa",
    subtitle: "Conecte com seus sistemas existentes",
    desc: "Integre a VoicIA ao seu ecossistema clínico atual sem fricção. APIs robustas e conectores prontos para os principais sistemas de gestão de consultórios e hospitais do Brasil.",
    features: [
      "API RESTful documentada para integrações customizadas",
      "Conectores nativos para 15+ sistemas de gestão",
      "Exportação HL7/FHIR para interoperabilidade",
      "Single Sign-On (SSO) corporativo",
      "Webhooks para automações em tempo real",
    ],
  },
  {
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    title: "Segurança & LGPD",
    subtitle: "Privacidade com rigor hospitalar",
    desc: "Todos os dados são criptografados end-to-end, armazenados em servidores brasileiros certificados, com total conformidade à LGPD. Auditoria completa de acessos e modificações.",
    features: [
      "Criptografia AES-256 em trânsito e repouso",
      "Data centers brasileiros com certificação ISO 27001",
      "Logs completos de auditoria e acesso",
      "Consentimento do paciente integrado ao fluxo",
      "Relatórios de conformidade LGPD automatizados",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Conecte",
    desc: "Crie sua conta e integre a VoicIA ao seu sistema de gestão clínica em poucos minutos.",
    icon: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7",
  },
  {
    num: "02",
    title: "Atenda",
    desc: "Realize consultas normalmente enquanto a IA transcreve, documenta e sugere em tempo real.",
    icon: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2",
  },
  {
    num: "03",
    title: "Otimize",
    desc: "Receba prontuários prontos, insights de produtividade e mais tempo para o que importa: o paciente.",
    icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3",
  },
];

const specialties = [
  "Clínica Geral",
  "Cardiologia",
  "Pediatria",
  "Ortopedia",
  "Dermatologia",
  "Neurologia",
  "Ginecologia",
  "Psiquiatria",
  "Endocrinologia",
  "Gastroenterologia",
  "Oftalmologia",
  "Urologia",
];

/* ─── Page ────────────────────────────────────────────────── */

export default function SolucoesPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const sections = el.querySelectorAll(".sol-animate");

    sections.forEach((section) => {
      const header = section.querySelector(".sol-header");
      const items = section.querySelectorAll(".sol-item");

      if (header) {
        gsap.set(header, { opacity: 0, y: 40 });
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
      }

      if (items.length) {
        gsap.set(items, { opacity: 0, y: 50 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
        });
      }
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
            <div className="max-w-3xl mx-auto text-center sol-animate">
              <div className="sol-header">
                <span className="eyebrow mb-6">Soluções completas</span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="grad-text">Tudo que seu consultório</span>
                  <br />
                  <span className="accent-text">precisa em uma plataforma.</span>
                </h1>
                <p className="text-lg text-[#94A3B8] leading-relaxed max-w-xl mx-auto">
                  Da transcrição automática à gestão completa de prontuários — a VoicIA centraliza
                  ferramentas que economizam tempo e elevam a qualidade do seu atendimento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Detailed solutions ────────────────────── */}
        <section className="relative py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 lg:space-y-24">
            {solutions.map((sol, i) => (
              <div
                key={sol.title}
                className="sol-animate"
              >
                <div
                  className={`sol-item grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start ${
                    i % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                  style={i % 2 === 1 ? { direction: "rtl" } : undefined}
                >
                  {/* Text */}
                  <div style={{ direction: "ltr" }}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="halo-icon size-14 shrink-0">
                        <svg
                          width="28"
                          height="28"
                          fill="none"
                          stroke="#63AAA2"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d={sol.icon} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#63AAA2] font-medium">
                          {sol.subtitle}
                        </p>
                        <h2 className="font-display text-2xl lg:text-3xl font-bold text-white leading-tight">
                          {sol.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-[#94A3B8] text-base leading-relaxed mb-8">
                      {sol.desc}
                    </p>

                    <ul className="space-y-3">
                      {sol.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 group">
                          <div className="mt-0.5 size-5 rounded-full bg-[#63AAA2]/15 border border-[#63AAA2]/25 flex items-center justify-center shrink-0">
                            <svg
                              width="10"
                              height="10"
                              fill="none"
                              stroke="#63AAA2"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-sm text-[#CBD5E1] leading-relaxed">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual card */}
                  <div style={{ direction: "ltr" }}>
                    <div className="lum-card p-8 lg:p-10 group min-h-[320px] flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                        <div className="halo-icon size-10">
                          <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="#63AAA2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d={sol.icon} />
                          </svg>
                        </div>
                        <span className="font-display text-sm font-semibold text-white">
                          {sol.title}
                        </span>
                        <span className="ml-auto text-[10px] text-[#63AAA2] bg-[#63AAA2]/10 px-2 py-0.5 rounded-full font-medium border border-[#63AAA2]/20">
                          Ativo
                        </span>
                      </div>

                      {/* Simulated feature preview */}
                      <div className="space-y-3">
                        {sol.features.slice(0, 3).map((feat, fi) => (
                          <div key={fi} className="flex items-center gap-3">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-[#63AAA2]/40 to-[#63AAA2]/10"
                              style={{ width: `${70 - fi * 15}%` }}
                            />
                            <span className="text-[10px] text-[#64748B] truncate max-w-[120px]">
                              {feat.split(" ").slice(0, 3).join(" ")}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#64748B] uppercase tracking-wider">Status</span>
                          <span className="text-[#63AAA2] flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-[#63AAA2] animate-pulse" />
                            Operacional
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {i < solutions.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-[#63AAA2]/20 to-transparent mt-16 lg:mt-24" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ──────────────────────────── */}
        <section className="relative py-28 lg:py-36 border-t border-white/[0.04] overflow-hidden sol-animate">
          <div className="absolute inset-0 honeycomb opacity-30 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="sol-header text-center mb-20 max-w-2xl mx-auto">
              <span className="eyebrow mb-6">Como funciona</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="grad-text">Simples de começar,</span>
                <br />
                <span className="accent-text">poderoso para escalar.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connection line (desktop only) */}
              <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[#63AAA2]/40 via-[#63AAA2]/20 to-[#63AAA2]/40 pointer-events-none" />

              {steps.map((step) => (
                <div key={step.num} className="sol-item lum-card p-8 text-center relative group">
                  <div className="relative z-10">
                    <span className="font-display text-5xl font-bold accent-text leading-none mb-4 block">
                      {step.num}
                    </span>
                    <div className="halo-icon size-14 mx-auto mb-5">
                      <svg
                        width="26"
                        height="26"
                        fill="none"
                        stroke="#63AAA2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d={step.icon} />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Specialties ───────────────────────────── */}
        <section className="relative py-28 lg:py-36 overflow-hidden sol-animate">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,170,162,0.08),transparent_50%)]" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="sol-header text-center mb-16 max-w-2xl mx-auto">
              <span className="eyebrow mb-6">Especialidades</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="grad-text">Adaptada para</span>
                <br />
                <span className="accent-text">sua especialidade.</span>
              </h2>
              <p className="text-[#94A3B8] text-lg mt-5 leading-relaxed">
                A VoicIA se adapta ao vocabulário e fluxo de cada área médica.
                Quanto mais você usa, mais personalizada ela fica.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {specialties.map((spec) => (
                <div
                  key={spec}
                  className="sol-item lum-card group p-5 text-center cursor-default"
                >
                  <div className="halo-icon size-12 mx-auto mb-3">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="#63AAA2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <p className="font-display text-sm font-semibold text-white">
                    {spec}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 overflow-hidden sol-animate">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="sol-item relative rounded-3xl overflow-hidden border border-[#63AAA2]/20 bg-gradient-to-b from-[#0E1725] via-[#0E1725] to-[#080C15]">
              <div className="absolute inset-x-0 -bottom-20 h-[80%] atmo-glow pointer-events-none" style={{ opacity: 0.4 }} />
              <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay pointer-events-none" />

              <div className="absolute top-6 left-6 size-3 border-l border-t border-[#63AAA2]/50" />
              <div className="absolute top-6 right-6 size-3 border-r border-t border-[#63AAA2]/50" />
              <div className="absolute bottom-6 left-6 size-3 border-l border-b border-[#63AAA2]/50" />
              <div className="absolute bottom-6 right-6 size-3 border-r border-b border-[#63AAA2]/50" />

              <div className="relative z-10 px-6 py-20 sm:py-28 text-center max-w-3xl mx-auto">
                <span className="eyebrow mb-6">Comece agora</span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="grad-text">Pronto para transformar</span>
                  <br />
                  <span className="accent-text">sua rotina clínica?</span>
                </h2>
                <p className="text-lg text-[#94A3B8] max-w-lg mx-auto mb-10 leading-relaxed">
                  Teste gratuitamente e veja o impacto da VoicIA no seu consultório desde o primeiro dia.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://app.voicia.com.br/"
                    className="relative group px-8 py-4 rounded-xl bg-[#63AAA2] text-white font-semibold hover:bg-[#7BBFBA] hover:shadow-[0_0_50px_rgba(99,170,162,0.5)] transition-all overflow-hidden"
                  >
                    <span className="relative z-10">Agendar teste gratuito</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </a>
                  <a
                    href="/"
                    className="px-8 py-4 rounded-xl border border-[#63AAA2]/25 text-[#CBD5E1] font-semibold hover:border-[#63AAA2]/60 hover:text-white hover:bg-[#63AAA2]/5 transition-all"
                  >
                    Voltar ao início
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
