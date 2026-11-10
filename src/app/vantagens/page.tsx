import type { Metadata } from "next";
import { TopoDePagina } from "@/components/TopoDePagina";
import { ChamadaFinal, Navegador, TituloDeSecao } from "@/components/Pecas";
import { Revelar } from "@/components/Revelar";
import { CADASTRO } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Vantagens | VoicIA",
  description: "Menos teclado, mais consulta. Veja o que muda na rotina do médico que usa a VoicIA para escrever o prontuário, a receita e os documentos.",
};

const BENEFICIOS = [
  { t: "Olho no paciente", d: "Você conversa enquanto a VoicIA registra. A tela deixa de ficar entre você e quem está sendo atendido." },
  { t: "Prontuário mais completo", d: "A consulta inteira é considerada, então detalhes ditos de passagem não se perdem na hora de escrever." },
  { t: "Menos trabalho depois do expediente", d: "O prontuário sai pronto ao fim da consulta, em vez de ficar acumulado para o fim do dia." },
  { t: "Sem redigitar receita", d: "Medicamentos e orientações da consulta viram receita e documentos para você só revisar." },
  { t: "No seu ritmo", d: "Pause, retome, edite e reestruture. Nada é salvo ou entregue sem você ver antes." },
  { t: "Do celular também", d: "Use o celular para gravar e para fotografar o que o paciente trouxe, com a consulta aberta no computador." },
];

const COMPARACAO = [
  ["Registro da consulta", "Digitado durante ou depois do atendimento", "Gravado e organizado pela IA"],
  ["Prontuário", "Escrito campo por campo", "Montado nos campos da sua especialidade"],
  ["Receita e documentos", "Redigitados a partir do prontuário", "Gerados da consulta para revisar"],
  ["Exames trazidos pelo paciente", "Lidos e transcritos à mão", "Fotografados e lidos pela IA"],
  ["Consulta de apoio", "Busca em outras abas e livros", "Suporte Médico com o contexto da consulta"],
];

export default function Vantagens() {
  return (
    <>
      <TopoDePagina etiqueta="Vantagens" titulo="Menos teclado." apagado="Mais consulta." texto="A VoicIA devolve ao médico o tempo e a atenção que a escrita do prontuário costuma levar.">
        <a href={CADASTRO} className="botao-verde">Testar 30 dias grátis</a>
      </TopoDePagina>

      <section className="bg-white px-5 py-24 text-texto sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1180px]">
          <Revelar><TituloDeSecao linha1="O que muda" linha2="na sua rotina" /></Revelar>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFICIOS.map((b, i) => (
              <Revelar key={b.t} atraso={(i % 3) * 80} className="cartao-claro p-7 sm:p-8">
                <p className="texto-grafite text-[40px] font-light leading-none tracking-[-0.04em]">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-8 text-[20px] leading-tight tracking-[-0.015em]">{b.t}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-texto-2">{b.d}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-papel px-5 py-24 text-texto sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1180px]">
          <Revelar><TituloDeSecao linha1="Antes e depois" linha2="da VoicIA" /></Revelar>
          <Revelar className="mt-12 overflow-hidden rounded-[28px] border border-[#DCE7E2] bg-white">
            <div className="hidden grid-cols-[1.1fr_1fr_1fr] border-b border-[#E3ECE8] bg-[#F7FBF9] px-7 py-4 text-[12px] uppercase tracking-[0.14em] text-texto-2 md:grid">
              <span />
              <span>Sem a VoicIA</span>
              <span className="text-verde-forte">Com a VoicIA</span>
            </div>
            {COMPARACAO.map(([etapa, antes, depois]) => (
              <div key={etapa} className="grid gap-2 border-b border-[#E3ECE8] px-7 py-5 last:border-0 md:grid-cols-[1.1fr_1fr_1fr] md:items-center md:gap-6">
                <span className="text-[16px] tracking-[-0.01em]">{etapa}</span>
                <span className="text-[14.5px] text-texto-2"><span className="mr-2 text-[11px] uppercase tracking-[0.12em] text-[#9AABA5] md:hidden">Sem</span>{antes}</span>
                <span className="flex items-center gap-2 text-[14.5px] text-texto">
                  <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] shrink-0" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#DDF5EA" /><path d="m6 10.2 2.6 2.6L14 7.5" fill="none" stroke="#088163" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {depois}
                </span>
              </div>
            ))}
          </Revelar>
        </div>
      </section>

      <section className="relative overflow-hidden bg-tinta px-5 py-24 sm:px-8 sm:py-32">
        <div className="grade pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Revelar>
            <TituloDeSecao linha1="Claro ou escuro," linha2="sempre leve." escuro />
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/60">Interface em vidro, pensada para o dia inteiro de consultório. Você escolhe o tema que descansa mais a vista.</p>
          </Revelar>
          <Revelar atraso={120}><Navegador src="/telas/consulta-escuro.webp" alt="VoicIA no modo escuro" /></Revelar>
        </div>
      </section>

      <ChamadaFinal titulo="Mais tempo com o paciente" subtitulo="começa na próxima consulta." />
    </>
  );
}
