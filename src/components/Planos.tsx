"use client";

import { useState } from "react";
import { APP, CADASTRO, PRECO } from "@/lib/conteudo";

const INCLUI = [
  "Gravação e transcrição das consultas",
  "Prontuário estruturado por especialidade",
  "Suporte Médico com IA em cada consulta",
  "Receitas, atestados, pedidos, laudos e relatórios",
  "Celular como microfone e câmera",
  "Histórico de pacientes e consultas",
  "PDF com o logo da sua clínica",
  "Assinatura com certificado digital (Bird ID)",
];

export function Planos({ escuro = false }: { escuro?: boolean }) {
  const [anual, setAnual] = useState(true);
  const inteiro = anual ? PRECO.anual : PRECO.mensal;
  const centavos = anual ? PRECO.anualCentavos : PRECO.mensalCentavos;

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div role="radiogroup" aria-label="Forma de cobrança" className={`inline-flex rounded-full p-1 ${escuro ? "border border-white/12 bg-white/[0.04]" : "border border-[#D5E6DE] bg-white"}`}>
          {[
            { v: false, t: "Mensal" },
            { v: true, t: "Anual" },
          ].map((o) => (
            <button
              key={o.t}
              type="button"
              role="radio"
              aria-checked={anual === o.v}
              onClick={() => setAnual(o.v)}
              className={`rounded-full px-5 py-2 text-[14px] transition-colors ${anual === o.v ? "bg-[linear-gradient(180deg,#19B88C,#0B8A6A)] text-white shadow-[0_6px_18px_-6px_rgba(14,138,110,.7)]" : escuro ? "text-white/60 hover:text-white" : "text-texto-2 hover:text-texto"}`}
            >
              {o.t}
              {o.v && <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[11px] ${anual ? "bg-white/20" : "bg-verde-gelo text-verde-forte"}`}>−19%</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[980px] gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className={`relative overflow-hidden rounded-[30px] p-7 sm:p-10 ${escuro ? "cartao-escuro" : "cartao-claro"}`}>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(47,218,161,.28),transparent)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <p className={`text-[15px] font-medium ${escuro ? "text-white" : "text-texto"}`}>VoicIA Profissional</p>
              <span className="rounded-full bg-verde-gelo px-3 py-1 text-[12px] font-medium text-verde-forte">{PRECO.testeDias} dias grátis</span>
            </div>
            <p className={`mt-6 flex items-baseline gap-1 tracking-[-0.04em] ${escuro ? "text-white" : "text-texto"}`}>
              <span className="text-[20px] font-normal">R$</span>
              <span className="text-[64px] font-light leading-none">{inteiro}</span>
              <span className="text-[22px] font-light">,{centavos}</span>
              <span className={`ml-1 text-[15px] tracking-normal ${escuro ? "text-white/50" : "text-texto-2"}`}>/mês</span>
            </p>
            <p className={`mt-2 text-[13px] ${escuro ? "text-white/50" : "text-texto-2"}`}>
              {anual ? `Cobrado por ano: R$ ${PRECO.anualTotal}` : "Cobrado todo mês. Cancele quando quiser."}
            </p>
            <ul className={`mt-8 grid gap-3 text-[14.5px] sm:grid-cols-2 ${escuro ? "text-white/80" : "text-texto"}`}>
              {INCLUI.map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#DDF5EA" /><path d="m6 10.2 2.6 2.6L14 7.5" fill="none" stroke="#088163" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {i}
                </li>
              ))}
            </ul>
            <a href={CADASTRO} className="botao-verde mt-9 w-full sm:w-auto">Começar 30 dias grátis</a>
          </div>
        </div>

        <div className={`flex flex-col rounded-[30px] p-7 sm:p-10 ${escuro ? "cartao-escuro" : "border border-[#13372C] bg-[linear-gradient(180deg,#0A1E18,#03100C)] text-white"}`}>
          <p className="text-[15px] font-medium text-white">Clínicas e hospitais</p>
          <p className="mt-6 text-[40px] font-light leading-none tracking-[-0.04em] text-white">Sob medida</p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">Condições para equipes com vários médicos, integração com o seu sistema e acompanhamento na implantação.</p>
          <ul className="mt-7 space-y-3 text-[14px] text-white/75">
            {["Tudo do Profissional", "Condições para equipes", "Integração via API", "Implantação acompanhada"].map((i) => (
              <li key={i} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-verde-vivo" />{i}</li>
            ))}
          </ul>
          <div className="mt-auto pt-9">
            <a href={APP} className="botao-contorno w-full !py-3.5">Falar com a equipe</a>
          </div>
        </div>
      </div>
      <p className={`mt-8 text-center text-[13px] ${escuro ? "text-white/45" : "text-texto-2"}`}>Pagamento processado pelo Stripe · Cancele quando quiser, sem multa</p>
    </div>
  );
}
