"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../sections/Nav";
import Footer from "../sections/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ────────────────────────────────────────────────── */

const categories = [
  {
    label: "Geral",
    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01",
    faqs: [
      { q: "O que é a VoicIA?", a: "A VoicIA é uma plataforma de suporte médico com inteligência artificial que automatiza registros clínicos, gera resumos, verifica interações medicamentosas e auxilia na tomada de decisão — tudo em tempo real durante a consulta." },
      { q: "Para quem a VoicIA é indicada?", a: "Para médicos, clínicas e hospitais que querem reduzir o tempo gasto em tarefas administrativas e melhorar a qualidade do atendimento. A plataforma se adapta a múltiplas especialidades médicas." },
      { q: "Preciso instalar algo no computador?", a: "Não. A VoicIA funciona 100% no navegador, sem instalação. Basta acessar app.voicia.com.br, fazer login e começar a usar. Também oferecemos apps nativos para iOS e Android." },
      { q: "A VoicIA funciona offline?", a: "A transcrição básica funciona offline com armazenamento local. Quando a conexão é restabelecida, os dados são sincronizados automaticamente. Funcionalidades de IA (resumos, sugestões) requerem conexão." },
    ],
  },
  {
    label: "Funcionalidades",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    faqs: [
      { q: "Como funciona a transcrição por voz?", a: "A VoicIA utiliza modelos de linguagem treinados especificamente para contexto médico. Basta iniciar a gravação durante a consulta — a IA transcreve, identifica termos clínicos e separa automaticamente as falas do médico e do paciente." },
      { q: "A VoicIA substitui o prontuário eletrônico?", a: "Não. A VoicIA complementa seu prontuário eletrônico existente, automatizando o preenchimento e gerando resumos clínicos que podem ser exportados diretamente para o seu sistema." },
      { q: "Quais formatos de prontuário são suportados?", a: "A VoicIA gera prontuários em formato SOAP, CID-10, resumo de alta e evolução médica. Todos os formatos são personalizáveis e exportáveis em PDF, Word ou via integração direta com seu sistema." },
      { q: "O assistente IA pode prescrever medicamentos?", a: "Não. O assistente IA sugere diagnósticos diferenciais e verifica interações medicamentosas, mas toda decisão clínica e prescrição é exclusivamente do médico. A IA é uma ferramenta de apoio, não de decisão." },
      { q: "A VoicIA funciona para todas as especialidades?", a: "Sim. A VoicIA é treinada com protocolos clínicos de múltiplas especialidades e se adapta ao vocabulário e fluxo de cada área. Atualmente suportamos mais de 12 especialidades com templates específicos." },
    ],
  },
  {
    label: "Integrações",
    icon: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
    faqs: [
      { q: "Quais sistemas de gestão são compatíveis?", a: "A VoicIA integra com mais de 15 sistemas de gestão clínica do mercado brasileiro, incluindo os principais ERPs de saúde. A integração é feita via API segura e nosso time acompanha todo o processo." },
      { q: "Como funciona a integração via API?", a: "Oferecemos uma API RESTful completa com documentação interativa. Disponível nos planos Pro e Enterprise, a API permite automações customizadas, webhooks em tempo real e exportação HL7/FHIR para interoperabilidade." },
      { q: "Posso usar a VoicIA com o sistema que já tenho?", a: "Na maioria dos casos, sim. Além dos conectores nativos, oferecemos exportação universal em PDF e formatos padronizados. Para sistemas sem conector nativo, nossa equipe técnica pode desenvolver uma integração dedicada." },
    ],
  },
  {
    label: "Segurança",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    faqs: [
      { q: "Meus dados e dos pacientes estão seguros?", a: "Absolutamente. Todos os dados são criptografados com AES-256 em trânsito e em repouso, armazenados em servidores brasileiros certificados ISO 27001, em total conformidade com a LGPD." },
      { q: "A VoicIA está em conformidade com a LGPD?", a: "Sim. Implementamos todas as exigências da LGPD: consentimento do paciente integrado ao fluxo, logs completos de auditoria, relatórios de conformidade automatizados, DPO dedicado e processo de exclusão de dados sob demanda." },
      { q: "Onde ficam armazenados os dados?", a: "Todos os dados são armazenados em data centers brasileiros com certificação ISO 27001 e SOC 2 Type II. Não transferimos dados para fora do Brasil em nenhuma circunstância." },
      { q: "Quem tem acesso aos dados dos pacientes?", a: "Apenas o médico responsável e profissionais explicitamente autorizados. A equipe VoicIA não tem acesso aos dados clínicos. Todos os acessos são registrados em logs de auditoria imutáveis." },
    ],
  },
  {
    label: "Preços",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z",
    faqs: [
      { q: "Posso testar antes de assinar?", a: "Sim. O plano Starter é gratuito para sempre com 50 transcrições/mês. O plano Pro oferece 14 dias de teste gratuito sem cartão de crédito." },
      { q: "Como funciona a cobrança?", a: "A cobrança é mensal ou anual (com desconto de 16%). Aceitamos cartão de crédito, boleto e PIX. Você pode cancelar a qualquer momento sem multa." },
      { q: "Posso trocar de plano?", a: "Sim. Upgrade ou downgrade a qualquer momento. A diferença é calculada proporcionalmente ao período restante. Todos os dados são preservados na mudança." },
      { q: "Qual o tempo de implementação?", a: "A implementação é rápida. Em poucos minutos você já pode começar a usar. Para planos Enterprise, oferecemos onboarding dedicado com treinamento da equipe em até 48 horas." },
      { q: "Vocês oferecem desconto para clínicas?", a: "Sim. O plano Enterprise oferece preços personalizados para múltiplos profissionais, com descontos progressivos a partir de 5 licenças. Entre em contato para um orçamento." },
    ],
  },
  {
    label: "Suporte",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-5 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
    faqs: [
      { q: "Como entro em contato com o suporte?", a: "Plano Starter: suporte por email com resposta em até 24h. Plano Pro: chat ao vivo e email com resposta prioritária. Enterprise: gerente de conta dedicado + suporte 24/7 por telefone." },
      { q: "Vocês oferecem treinamento?", a: "Sim. Todos os planos incluem tutoriais em vídeo e documentação completa. O plano Pro inclui webinars mensais. O Enterprise inclui treinamento presencial ou remoto para toda a equipe." },
      { q: "Qual o SLA de disponibilidade?", a: "Garantimos 99.9% de uptime para todos os planos pagos. O plano Enterprise oferece SLA personalizado com compensação contratual em caso de indisponibilidade." },
    ],
  },
];

const allFaqs = categories.flatMap((cat, ci) =>
  cat.faqs.map((faq, fi) => ({ ...faq, category: cat.label, catIdx: ci, faqIdx: fi }))
);

/* ─── Page ────────────────────────────────────────────────── */

export default function FaqPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Filtered results
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q && activeCategory === null) return allFaqs;
    return allFaqs.filter((faq) => {
      const matchCat = activeCategory === null || faq.catIdx === activeCategory;
      const matchSearch = !q || faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  // Scroll-triggered entrance
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const sections = el.querySelectorAll(".f-animate");
    sections.forEach((section) => {
      const header = section.querySelector(".f-header");
      if (header) {
        gsap.set(header, { opacity: 0, y: 40 });
        gsap.to(header, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Animate FAQ items on filter change
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".faq-q");
    if (!items.length) return;
    gsap.fromTo(items, { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out",
    });
  }, [activeCategory, search]);

  const faqKey = (ci: number, fi: number) => `${ci}-${fi}`;
  const totalCount = allFaqs.length;

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
            <div className="max-w-3xl mx-auto text-center f-animate">
              <div className="f-header">
                <span className="eyebrow mb-6">Centro de ajuda</span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="grad-text">Como podemos</span>
                  <br />
                  <span className="accent-text">te ajudar?</span>
                </h1>

                {/* Search bar */}
                <div className="relative max-w-lg mx-auto mt-10">
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(99,170,162,0.15),transparent_70%)] blur-xl pointer-events-none" />
                  <div className="relative flex items-center rounded-2xl border border-white/[0.08] bg-[#0E1725]/80 backdrop-blur-md overflow-hidden focus-within:border-[#63AAA2]/40 transition-colors">
                    <svg
                      className="size-5 text-[#64748B] ml-5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar perguntas..."
                      className="w-full bg-transparent text-white text-sm sm:text-base px-4 py-4 outline-none placeholder:text-[#64748B]"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="mr-4 text-[#64748B] hover:text-white transition-colors"
                      >
                        <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Category pills ───────────────────────── */}
        <section className="relative pt-10 pb-6 lg:pt-14 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => { setActiveCategory(null); setOpenFaq(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCategory === null
                    ? "bg-[#63AAA2] text-white shadow-[0_0_25px_rgba(99,170,162,0.35)]"
                    : "border border-white/[0.08] bg-[#0E1725]/60 text-[#94A3B8] hover:text-white hover:border-white/[0.15]"
                  }`}
              >
                Todas
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === null ? "bg-white/20" : "bg-white/[0.05]"}`}>
                  {totalCount}
                </span>
              </button>

              {categories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => { setActiveCategory(activeCategory === i ? null : i); setOpenFaq(null); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCategory === i
                      ? "bg-[#63AAA2] text-white shadow-[0_0_25px_rgba(99,170,162,0.35)]"
                      : "border border-white/[0.08] bg-[#0E1725]/60 text-[#94A3B8] hover:text-white hover:border-white/[0.15]"
                    }`}
                >
                  <svg
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    className="shrink-0"
                  >
                    <path d={cat.icon} />
                  </svg>
                  {cat.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === i ? "bg-white/20" : "bg-white/[0.05]"}`}>
                    {cat.faqs.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Content ──────────────────────────── */}
        <section className="relative py-12 lg:py-20 overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            {/* Results count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs text-[#64748B] uppercase tracking-wider">
                {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
                {search && (
                  <span className="text-[#94A3B8]"> para &ldquo;{search}&rdquo;</span>
                )}
              </p>
              {(search || activeCategory !== null) && (
                <button
                  onClick={() => { setSearch(""); setActiveCategory(null); setOpenFaq(null); }}
                  className="text-xs text-[#63AAA2] hover:text-[#7BBFBA] transition-colors"
                >
                  Limpar filtros
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="halo-icon size-16 mx-auto mb-6">
                  <svg width="28" height="28" fill="none" stroke="#63AAA2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-sm text-[#94A3B8] mb-6">
                  Tente buscar com termos diferentes ou explore as categorias acima.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#63AAA2] hover:text-[#7BBFBA] transition-colors"
                >
                  Falar com suporte
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((faq) => {
                  const key = faqKey(faq.catIdx, faq.faqIdx);
                  const isOpen = openFaq === key;

                  return (
                    <div
                      key={key}
                      className={`faq-q rounded-2xl border transition-all duration-300 ${isOpen
                          ? "border-[#63AAA2]/30 bg-gradient-to-b from-[#63AAA2]/[0.06] to-transparent shadow-[0_0_40px_rgba(99,170,162,0.08)]"
                          : "border-white/[0.06] bg-[#0E1725]/50 hover:border-white/[0.12]"
                        }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : key)}
                        className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer"
                      >
                        <div className="flex-1">
                          {/* Category badge */}
                          <span className={`inline-block text-[10px] uppercase tracking-[0.15em] font-medium mb-2 transition-colors ${isOpen ? "text-[#63AAA2]" : "text-[#64748B]"}`}>
                            {faq.category}
                          </span>
                          <p className={`text-sm sm:text-base font-medium transition-colors ${isOpen ? "text-white" : "text-[#CBD5E1]"}`}>
                            {faq.q}
                          </p>
                        </div>

                        <div className={`shrink-0 size-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen
                            ? "bg-[#63AAA2] text-white rotate-45 shadow-[0_0_20px_rgba(99,170,162,0.4)]"
                            : "bg-white/[0.04] text-[#64748B] border border-white/[0.06]"
                          }`}>
                          <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </button>

                      <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                          <div className="px-6">
                            <div className="h-px bg-gradient-to-r from-[#63AAA2]/20 via-[#63AAA2]/10 to-transparent mb-5" />
                            <p className="text-sm text-[#94A3B8] leading-[1.8]">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Contact strip ─────────────────────────── */}
        <section className="relative py-12 f-animate">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="f-header lum-card p-8 flex flex-col sm:flex-row items-center gap-6 group">
              <div className="halo-icon size-14 shrink-0">
                <svg width="26" height="26" fill="none" stroke="#63AAA2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  Não encontrou o que procurava?
                </h3>
                <p className="text-sm text-[#94A3B8]">
                  Nossa equipe responde em até 2 horas — sem robôs, sem filas.
                </p>
              </div>
              <a
                href="#"
                className="shrink-0 px-6 py-3 rounded-xl bg-[#63AAA2] text-white text-sm font-semibold hover:bg-[#7BBFBA] hover:shadow-[0_0_30px_rgba(99,170,162,0.4)] transition-all"
              >
                Falar com suporte
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 overflow-hidden f-animate">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="f-header relative rounded-3xl overflow-hidden border border-[#63AAA2]/20 bg-gradient-to-b from-[#0E1725] via-[#0E1725] to-[#080C15]">
              <div className="absolute inset-x-0 -bottom-20 h-[80%] atmo-glow pointer-events-none" style={{ opacity: 0.4 }} />
              <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay pointer-events-none" />

              <div className="absolute top-6 left-6 size-3 border-l border-t border-[#63AAA2]/50" />
              <div className="absolute top-6 right-6 size-3 border-r border-t border-[#63AAA2]/50" />
              <div className="absolute bottom-6 left-6 size-3 border-l border-b border-[#63AAA2]/50" />
              <div className="absolute bottom-6 right-6 size-3 border-r border-b border-[#63AAA2]/50" />

              <div className="relative z-10 px-6 py-20 sm:py-24 text-center max-w-3xl mx-auto">
                <span className="eyebrow mb-6">Pronto para começar</span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="grad-text">Teste a VoicIA</span>
                  <br />
                  <span className="accent-text">gratuitamente.</span>
                </h2>
                <p className="text-lg text-[#94A3B8] max-w-lg mx-auto mb-10 leading-relaxed">
                  Sem cartão de crédito. Sem compromisso. Comece em 2 minutos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/precos"
                    className="relative group px-8 py-4 rounded-xl bg-[#63AAA2] text-white font-semibold hover:bg-[#7BBFBA] hover:shadow-[0_0_50px_rgba(99,170,162,0.5)] transition-all overflow-hidden"
                  >
                    <span className="relative z-10">Ver planos e preços</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </a>
                  <a
                    href="/solucoes"
                    className="px-8 py-4 rounded-xl border border-[#63AAA2]/25 text-[#CBD5E1] font-semibold hover:border-[#63AAA2]/60 hover:text-white hover:bg-[#63AAA2]/5 transition-all"
                  >
                    Explorar soluções
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
