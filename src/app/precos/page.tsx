"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../sections/Nav";
import Footer from "../sections/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ────────────────────────────────────────────────── */

const plans = [
  {
    name: "Starter",
    desc: "Para médicos começando a automatizar",
    price: { monthly: 0, annual: 0 },
    label: "Gratuito no primeiro mês",
    cta: "Começar agora",
    highlighted: false,
    features: [
      { text: "50 transcrições por mês", included: true },
      { text: "Resumos clínicos básicos", included: true },
      { text: "1 integração com sistema", included: true },
      { text: "Suporte por email", included: true },
      { text: "Assistente IA clínico", included: false },
      { text: "Templates personalizados", included: false },
      { text: "API de integração", included: false },
      { text: "Suporte prioritário", included: false },
    ],
  },
  {
    name: "Pro",
    desc: "Para consultórios que querem escalar",
    price: { monthly: "229,90", annual: "199,90" },
    label: "Mais popular",
    cta: "Agendar teste gratuito",
    highlighted: true,
    features: [
      { text: "Transcrições ilimitadas", included: true },
      { text: "Resumos clínicos avançados", included: true },
      { text: "Integração com 15+ sistemas", included: true },
      { text: "Suporte prioritário 24/7", included: true },
      { text: "Assistente IA clínico completo", included: true },
      { text: "Templates por especialidade", included: true },
      { text: "Dashboard de produtividade", included: true },
      { text: "API de integração", included: false },
    ],
  },
  {
    name: "Enterprise",
    desc: "Para clínicas e hospitais",
    price: { monthly: 0, annual: 0 },
    label: "Sob consulta",
    cta: "Falar com especialista",
    highlighted: false,
    features: [
      { text: "Tudo do Pro", included: true },
      { text: "API completa + webhooks", included: true },
      { text: "SSO corporativo", included: true },
      { text: "Múltiplas unidades", included: true },
      { text: "Onboarding dedicado", included: true },
      { text: "SLA personalizado", included: true },
      { text: "Relatórios LGPD", included: true },
      { text: "Gerente de conta", included: true },
    ],
  },
];

const faqs = [
  { q: "Posso testar antes de assinar?", a: "Sim. O plano Starter é gratuito para sempre e o plano Pro oferece 14 dias de teste gratuito sem necessidade de cartão de crédito." },
  { q: "Como funciona a cobrança?", a: "A cobrança é mensal (R$ 229,90/mês) ou anual (R$ 199,90/mês, cobrado R$ 2.398,80/ano). Você pode cancelar a qualquer momento sem multa ou taxa de cancelamento." },
  { q: "Posso trocar de plano depois?", a: "Sim. Você pode fazer upgrade ou downgrade a qualquer momento. A diferença é calculada proporcionalmente ao período restante." },
  { q: "O plano Enterprise tem preço fixo?", a: "Não. O Enterprise é personalizado de acordo com o número de profissionais, integrações necessárias e nível de suporte. Entre em contato para um orçamento." },
  { q: "Meus dados migram entre planos?", a: "Sim. Todos os seus dados, prontuários e configurações são preservados ao trocar de plano. Nenhuma informação é perdida." },
];

/* ─── Page ────────────────────────────────────────────────── */

export default function PrecosPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const sections = el.querySelectorAll(".p-animate");

    sections.forEach((section) => {
      const header = section.querySelector(".p-header");
      const items = section.querySelectorAll(".p-item");

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
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
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
        <section className="relative pt-32 pb-28 lg:pt-40 lg:pb-36 overflow-hidden">
          <div className="absolute inset-0 dotgrid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 grain opacity-[0.05] mix-blend-overlay pointer-events-none" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh] atmo-glow opacity-50" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center p-animate">
              <div className="p-header">
                <span className="eyebrow mb-6">Preços</span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="grad-text">Investimento que se paga</span>
                  <br />
                  <span className="accent-text">na primeira semana.</span>
                </h1>
                <p className="text-lg text-[#94A3B8] leading-relaxed max-w-xl mx-auto mb-10">
                  Planos flexíveis para cada etapa do seu consultório. Comece grátis, escale quando precisar.
                </p>

                {/* Toggle mensal / anual */}
                <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#0E1725] p-1">
                  <button
                    onClick={() => setAnnual(false)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!annual ? "bg-[#63AAA2] text-white" : "text-[#94A3B8] hover:text-white"
                      }`}
                  >
                    Mensal
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${annual ? "bg-[#63AAA2] text-white" : "text-[#94A3B8] hover:text-white"
                      }`}
                  >
                    Anual
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">-13%</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Plans ────────────────────────────────── */}
        <section className="relative pt-10 pb-28 lg:pt-14 lg:pb-36 overflow-hidden p-animate">
          <div className="absolute inset-0 honeycomb opacity-20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {plans.map((plan) => {
                const price = annual ? plan.price.annual : plan.price.monthly;
                const isCustom = plan.name === "Enterprise";

                return (
                  <div
                    key={plan.name}
                    className={`p-item relative rounded-3xl overflow-hidden ${plan.highlighted
                        ? ""
                        : "lum-card"
                      }`}
                  >
                    {/* Highlighted card — gradient border */}
                    {plan.highlighted && (
                      <div className="absolute inset-0 rounded-3xl p-[1.5px] bg-gradient-to-b from-[#63AAA2] via-[#63AAA2]/30 to-transparent">
                        <div className="w-full h-full rounded-3xl bg-[#0E1725]" />
                      </div>
                    )}

                    <div className="relative z-10 p-8 lg:p-10 flex flex-col min-h-[640px]">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
                          <p className="text-xs text-[#94A3B8] mt-0.5">{plan.desc}</p>
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${plan.highlighted
                              ? "bg-[#63AAA2] text-white"
                              : "bg-[#63AAA2]/10 text-[#63AAA2] border border-[#63AAA2]/20"
                            }`}
                        >
                          {plan.label}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        {isCustom ? (
                          <div>
                            <span className="font-display text-5xl font-bold text-white">Custom</span>
                            <p className="text-xs text-[#64748B] mt-2">Preço sob consulta</p>
                          </div>
                        ) : price === 0 ? (
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-sm text-[#94A3B8]">R$</span>
                              <span className="font-display text-5xl font-bold accent-text">0</span>
                            </div>
                            <p className="text-xs text-[#64748B] mt-2">Grátis para sempre</p>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-sm text-[#94A3B8]">R$</span>
                              <span className="font-display text-5xl font-bold accent-text">{price}</span>
                              <span className="text-sm text-[#64748B]">/mês</span>
                            </div>
                            {annual && (
                              <p className="text-xs text-[#64748B] mt-2">
                                Cobrado anualmente · R$ 2.398,80/ano
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

                      {/* Features */}
                      <ul className="space-y-3 mb-10 flex-1">
                        {plan.features.map((f) => (
                          <li key={f.text} className="flex items-center gap-3">
                            {f.included ? (
                              <div className="size-5 rounded-full bg-[#63AAA2]/15 border border-[#63AAA2]/25 flex items-center justify-center shrink-0">
                                <svg width="10" height="10" fill="none" stroke="#63AAA2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            ) : (
                              <div className="size-5 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                                <svg width="10" height="10" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </div>
                            )}
                            <span className={`text-sm ${f.included ? "text-[#CBD5E1]" : "text-[#64748B]"}`}>
                              {f.text}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <a
                        href="https://app.voicia.com.br/"
                        className={`block w-full text-center py-4 rounded-xl font-semibold transition-all ${plan.highlighted
                            ? "bg-[#63AAA2] text-white hover:bg-[#7BBFBA] hover:shadow-[0_0_50px_rgba(99,170,162,0.5)]"
                            : "border border-[#63AAA2]/25 text-[#CBD5E1] hover:border-[#63AAA2]/60 hover:text-white hover:bg-[#63AAA2]/5"
                          }`}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Trust badges ──────────────────────────── */}
        <section className="relative py-16 border-y border-white/[0.04] p-animate">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Criptografia end-to-end" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "LGPD certificado" },
                { icon: "M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z", label: "Cancele quando quiser" },
                { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z", label: "Sem cartão no teste" },
              ].map((badge) => (
                <div key={badge.label} className="p-item flex items-center gap-3">
                  <div className="halo-icon size-10 shrink-0">
                    <svg width="18" height="18" fill="none" stroke="#63AAA2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={badge.icon} />
                    </svg>
                  </div>
                  <p className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium leading-tight">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────── */}
        <section className="relative py-28 lg:py-36 overflow-hidden p-animate">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="p-header text-center mb-16 max-w-2xl mx-auto">
              <span className="eyebrow mb-6">Dúvidas sobre preços</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="grad-text">Perguntas</span>
                <br />
                <span className="accent-text">frequentes.</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`p-item rounded-2xl border transition-all duration-300 ${openFaq === i
                      ? "border-[#63AAA2]/30 bg-gradient-to-b from-[#63AAA2]/[0.04] to-transparent"
                      : "border-white/[0.06] bg-[#0E1725]/50 hover:border-white/[0.12]"
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className={`flex-1 text-sm sm:text-base font-medium pr-4 transition-colors ${openFaq === i ? "text-white" : "text-[#CBD5E1]"}`}>
                      {faq.q}
                    </span>
                    <div className={`shrink-0 size-8 rounded-full flex items-center justify-center transition-all ${openFaq === i ? "bg-[#63AAA2] text-white rotate-45" : "bg-white/[0.04] text-[#64748B]"}`}>
                      <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </button>
                  <div className={`grid transition-all duration-500 ease-out ${openFaq === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 text-sm text-[#94A3B8] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 overflow-hidden p-animate">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="p-item relative rounded-3xl overflow-hidden border border-[#63AAA2]/20 bg-gradient-to-b from-[#0E1725] via-[#0E1725] to-[#080C15]">
              <div className="absolute inset-x-0 -bottom-20 h-[80%] atmo-glow pointer-events-none" style={{ opacity: 0.4 }} />
              <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay pointer-events-none" />

              <div className="absolute top-6 left-6 size-3 border-l border-t border-[#63AAA2]/50" />
              <div className="absolute top-6 right-6 size-3 border-r border-t border-[#63AAA2]/50" />
              <div className="absolute bottom-6 left-6 size-3 border-l border-b border-[#63AAA2]/50" />
              <div className="absolute bottom-6 right-6 size-3 border-r border-b border-[#63AAA2]/50" />

              <div className="relative z-10 px-6 py-20 sm:py-28 text-center max-w-3xl mx-auto">
                <span className="eyebrow mb-6">Sem compromisso</span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="grad-text">Ainda com dúvidas?</span>
                  <br />
                  <span className="accent-text">Fale com a gente.</span>
                </h2>
                <p className="text-lg text-[#94A3B8] max-w-lg mx-auto mb-10 leading-relaxed">
                  Nossa equipe está pronta para ajudar você a encontrar o plano ideal para o seu consultório.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://app.voicia.com.br/"
                    className="relative group px-8 py-4 rounded-xl bg-[#63AAA2] text-white font-semibold hover:bg-[#7BBFBA] hover:shadow-[0_0_50px_rgba(99,170,162,0.5)] transition-all overflow-hidden"
                  >
                    <span className="relative z-10">Falar com especialista</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </a>
                  <a
                    href="/vantagens"
                    className="px-8 py-4 rounded-xl border border-[#63AAA2]/25 text-[#CBD5E1] font-semibold hover:border-[#63AAA2]/60 hover:text-white hover:bg-[#63AAA2]/5 transition-all"
                  >
                    Ver vantagens
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
