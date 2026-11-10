import Link from "next/link";
import { ArcoDeVoz } from "@/components/ArcoDeVoz";
import { Navegador, Etiqueta, TituloDeSecao, PilulaDeOnda } from "@/components/Pecas";
import { Revelar } from "@/components/Revelar";
import { IconeCelular, IconeMicrofone, IconeProntuario } from "@/components/Icones";
import { Area, MatrizDePontos, Radar } from "@/components/Graficos";
import { PainelGravando } from "@/components/PainelGravando";
import { Planos } from "@/components/Planos";
import { Perguntas } from "@/components/Perguntas";
import { MarcaIcone } from "@/components/Marca";
import { CADASTRO, PERGUNTAS } from "@/lib/conteudo";

const PALAVRAS = [
  { rotulo: ["Escuta a", "consulta inteira"], palavra: "Transcrição" },
  { rotulo: ["Organizado", "em segundos"], palavra: "Prontuário" },
  { rotulo: ["Pronta para", "imprimir ou assinar"], palavra: "Receita" },
  { rotulo: ["Atestados, pedidos,", "laudos e relatórios"], palavra: "Documentos" },
];

const CARTOES = [
  { Icone: IconeMicrofone, titulo: ["Gravação com", "transcrição"], texto: "Grave pelo computador ou pelo celular. Dá para pausar e retomar no seu ritmo." },
  { Icone: IconeProntuario, titulo: ["Prontuário", "estruturado"], texto: "Queixa, história, exame físico, hipóteses e conduta nos campos da sua especialidade." },
  { Icone: IconeCelular, titulo: ["Celular como", "câmera"], texto: "Fotografe receitas e exames: a IA identifica o que é e põe cada dado no lugar certo." },
];

const SEGURANCA = [
  { t: "Servidor no Brasil", d: "O sistema e o banco de dados rodam em servidor no Brasil." },
  { t: "Criptografia", d: "Dados protegidos em trânsito e em repouso." },
  { t: "Direitos do paciente", d: "Exporte ou exclua os dados de um paciente a pedido dele." },
  { t: "Decisão do médico", d: "A IA sugere. Quem revisa, decide e assina é você." },
];

export default function Inicio() {
  return (
    <>
      {/* ===== Topo escuro com o arco de voz ===== */}
      <section className="relative overflow-hidden bg-tinta pt-24 sm:pt-24">
        <div className="grade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="relative mx-auto max-w-[920px]">
            <ArcoDeVoz className="mx-auto block w-full max-w-[920px]" />
            <div className="relative -mt-[24%] text-center sm:absolute sm:inset-x-0 sm:bottom-[4%] sm:mt-0">
              <div className="mb-5 flex justify-center sm:mb-7"><Etiqueta>Prontuário por voz com IA</Etiqueta></div>
              <h1 className="texto-prata text-[clamp(42px,8.6vw,108px)] font-normal leading-[0.98] tracking-[-0.045em]">
                Prontuário
                <br className="sm:hidden" /> no automático
              </h1>
            </div>
          </div>
          <div className="relative mt-6 text-center sm:-mt-1">
            <p className="mx-auto max-w-[460px] text-[16px] leading-relaxed text-white/60 sm:text-[17px]">
              Grave a consulta e a VoicIA escreve. Você revisa, assina e volta a olhar para o paciente.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href={CADASTRO} className="botao-verde">Testar 30 dias grátis</a>
              <Link href="/solucoes/" className="botao-contorno !py-[0.95rem] !px-6">Conhecer as soluções</Link>
            </div>
          </div>

          <Revelar className="relative mt-16 sm:mt-20">
            <div className="pointer-events-none absolute -bottom-24 -left-40 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(14,160,120,.55),transparent)] blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-40 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(14,160,120,.55),transparent)] blur-2xl" />
            <Navegador src="/telas/consulta-claro.webp" alt="Tela de consulta da VoicIA: paciente no topo, contexto e medicamentos no centro, suporte médico à direita e o botão de gravar embaixo" className="relative" />
          </Revelar>
        </div>
        <div className="h-24 bg-gradient-to-b from-transparent to-[#03100C] sm:h-32" />
      </section>

      {/* ===== Palavras gigantes (claro) ===== */}
      <section className="bg-white text-texto">
        <div className="mx-auto max-w-[1180px] px-5 pt-6 sm:px-8">
          {PALAVRAS.map((p, i) => (
            <Revelar key={p.palavra} className="grid grid-cols-1 items-end gap-2 overflow-hidden border-t border-[#E3ECE8] pt-5 sm:grid-cols-[220px_1fr] sm:gap-8 sm:pt-6" atraso={i * 60}>
              <p className="text-[14px] leading-snug text-texto-2 sm:pb-6">{p.rotulo[0]}<br />{p.rotulo[1]}</p>
              <p className="palavra-gigante texto-grafite -mb-[0.14em] whitespace-nowrap pt-[0.06em] text-[clamp(34px,12vw,60px)] font-normal uppercase leading-[1.04] tracking-[-0.045em] sm:text-[clamp(52px,7.3vw,106px)]">{p.palavra}</p>
            </Revelar>
          ))}
          <div className="flex justify-center border-t border-[#E3ECE8] py-16">
            <Link href="/solucoes/" className="botao-preto">Ver todas as soluções</Link>
          </div>
        </div>
      </section>

      {/* ===== IA que acelera (cartões com ícones suaves) ===== */}
      <section className="relative -mt-px bg-white pb-28 pt-12 text-texto sm:pb-36">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Revelar><TituloDeSecao linha1="IA que acelera" linha2="a sua consulta" /></Revelar>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {CARTOES.map((c, i) => (
              <Revelar key={c.texto} atraso={i * 90} className="cartao-claro flex flex-col p-6 sm:p-7">
                <div className="flex h-44 items-center justify-center sm:h-52"><c.Icone className="h-36 w-36 sm:h-40 sm:w-40" /></div>
                <h3 className="mt-6 text-[19px] font-normal leading-tight tracking-[-0.015em]">{c.titulo[0]}<br />{c.titulo[1]}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-texto-2">{c.texto}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Suporte Médico (cartões empilhados) ===== */}
      <section className="relative -mt-px overflow-hidden bg-white text-texto">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Revelar className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <TituloDeSecao linha1="Um suporte médico" linha2="ao lado de cada consulta" />
            <Link href="/solucoes/#suporte" className="botao-preto self-start sm:self-auto">Conhecer o suporte</Link>
          </Revelar>
        </div>
        <div className="relative mt-14">
          <div className="absolute inset-x-0 bottom-0 top-[18%] bg-[linear-gradient(180deg,#FFFFFF_0%,#E3F6EE_45%,#0B3B2E_82%,#03100C_100%)]" />
          <div className="pointer-events-none absolute left-[4%] top-[30%] h-[60%] w-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(127,227,192,.55),transparent)] blur-2xl" />
          <div className="pointer-events-none absolute right-[4%] top-[30%] h-[60%] w-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(127,227,192,.55),transparent)] blur-2xl" />
          <Revelar className="relative mx-auto max-w-[920px] px-5 pb-28 sm:px-8 sm:pb-40">
            <div className="mx-auto h-10 w-[78%] rounded-t-[26px] border border-b-0 border-[#E3ECE8] bg-white/70" />
            <div className="mx-auto h-10 w-[89%] rounded-t-[26px] border border-b-0 border-[#E3ECE8] bg-white/85" />
            <div className="relative overflow-hidden rounded-[28px] border border-[#E3ECE8] bg-white shadow-[0_50px_100px_-40px_rgba(3,40,30,.55)]">
              <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(#EEF4F1_1px,transparent_1px),linear-gradient(90deg,#EEF4F1_1px,transparent_1px)] [background-size:25%_33%]" />
              <div className="relative grid grid-cols-[1fr_auto] gap-4 p-6 sm:p-10">
                <div>
                  <p className="texto-grafite text-[clamp(30px,4.4vw,52px)] leading-none tracking-[-0.04em]">Suporte Médico</p>
                  <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-texto-2">Diagnóstico diferencial, interações, diretrizes, exames e receitas a um clique, com o contexto da consulta.</p>
                  <p className="mt-4 text-[12px] text-[#8AA099]">Raciocínio clínico · Documentos · Pós-consulta</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[12px] text-texto-2">
                    <span className="rounded-full border border-[#DCE7E2] px-2.5 py-1">10 atalhos</span>
                    <span className="rounded-full border border-[#DCE7E2] px-2.5 py-1">Modelos seus</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#E3ECE8] bg-white/80 p-2 text-[#7E928C]">
                  <MarcaIcone className="h-8 w-8" />
                  {["M12 3v18M3 12h18", "m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z", "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z", "M4 5h6l2 2h8v12H4z", "M12 7v5l3 2M21 12a9 9 0 1 1-9-9"].map((d) => (
                    <svg key={d} viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ))}
                </div>
                <div className="col-span-2 flex justify-center pb-2 pt-4 sm:pt-6">
                  <PilulaDeOnda className="h-24 w-[86%] max-w-[460px] sm:h-36" />
                </div>
              </div>
            </div>
          </Revelar>
        </div>
      </section>

      {/* ===== Frase grande (escuro) ===== */}
      <section className="relative overflow-hidden bg-tinta px-5 py-28 sm:px-8 sm:py-40">
        <div className="grade pointer-events-none absolute inset-0 opacity-80" />
        <Revelar className="relative mx-auto max-w-[860px] text-center">
          <p className="text-[clamp(26px,3.6vw,42px)] font-light leading-[1.22] tracking-[-0.025em]">
            <span className="texto-menta">A VoicIA é a assistente de consultório que escuta, organiza e escreve com você. Do primeiro “bom dia” à receita impressa, </span>
            <span className="text-white/35">cada etapa foi pensada para devolver tempo ao médico.</span>
          </p>
        </Revelar>
      </section>

      {/* ===== Feita para a rotina real (gráficos) ===== */}
      <section className="relative -mt-px bg-tinta px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="mx-auto max-w-[1180px]">
          <Revelar><TituloDeSecao linha1="Feita para a" linha2="rotina real" escuro /></Revelar>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { G: Radar, t: ["28 especialidades,", "campos próprios"], d: "O prontuário muda conforme a sua área. Você liga, desliga e reordena os campos do seu jeito." },
              { G: MatrizDePontos, t: ["Do atestado", "ao laudo"], d: "Receitas, pedidos de exame, atestados, declarações, encaminhamentos, laudos e relatórios a partir da consulta." },
              { G: Area, t: ["Imprima ou", "assine digital"], d: "PDF com o logo da sua clínica e assinatura com certificado digital Bird ID, direto da VoicIA." },
            ].map((c, i) => (
              <Revelar key={c.d} atraso={i * 90} className="cartao-escuro flex flex-col p-6 sm:p-7">
                <div className="flex h-48 items-center justify-center"><c.G className="h-full w-full max-w-[260px]" /></div>
                <h3 className="mt-6 text-[19px] font-normal leading-tight tracking-[-0.015em] text-white">{c.t[0]}<br />{c.t[1]}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/55">{c.d}</p>
              </Revelar>
            ))}
          </div>

          <Revelar className="mt-20 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {SEGURANCA.map((s) => (
              <div key={s.t} className="bg-tinta p-6 sm:p-7">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-verde-vivo" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p className="mt-5 text-[16px] text-white">{s.t}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-white/50">{s.d}</p>
              </div>
            ))}
          </Revelar>
        </div>
      </section>

      {/* ===== Planos (claro) ===== */}
      <section className="bg-papel px-5 py-28 text-texto sm:px-8 sm:py-36">
        <div className="mx-auto max-w-[1180px]">
          <Revelar className="mb-12 text-center">
            <TituloDeSecao linha1="Um plano," linha2="tudo incluído" />
            <p className="mx-auto mt-5 max-w-md text-[16px] text-texto-2">Comece com 30 dias grátis e use a VoicIA nas suas consultas de verdade.</p>
          </Revelar>
          <Revelar><Planos /></Revelar>
        </div>
      </section>

      {/* ===== Dúvidas (claro) ===== */}
      <section className="relative -mt-px bg-papel px-5 pb-28 text-texto sm:px-8 sm:pb-36">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[360px_1fr]">
          <Revelar>
            <TituloDeSecao linha1="Dúvidas" linha2="mais comuns" />
            <Link href="/faq/" className="botao-preto mt-8">Ver todas as dúvidas</Link>
          </Revelar>
          <Revelar><Perguntas itens={PERGUNTAS.filter((p) => ["O que é a VoicIA?", "Preciso instalar alguma coisa?", "Funciona para a minha especialidade?", "A IA decide alguma coisa por mim?", "Onde ficam os dados?", "Posso testar antes de pagar?"].includes(p.p))} /></Revelar>
        </div>
      </section>

      {/* ===== Fechamento: painel gravando ===== */}
      <section className="relative overflow-hidden bg-tinta px-5 py-28 sm:px-8 sm:py-36">
        <div className="grade pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[900px]">
          <Revelar>
            <h2 className="text-[clamp(36px,5.6vw,68px)] font-normal leading-[1.02] tracking-[-0.04em]">
              <span className="texto-menta">Seu consultório com IA</span>
              <br />
              <span className="text-white/40">está pronto para gravar.</span>
            </h2>
          </Revelar>
          <Revelar className="mt-12"><PainelGravando /></Revelar>
          <Revelar className="mt-12 flex flex-wrap items-center gap-4">
            <a href={CADASTRO} className="botao-verde">Testar 30 dias grátis</a>
            <span className="text-[14px] text-white/50">Sem instalar nada. Cancele quando quiser.</span>
          </Revelar>
        </div>
      </section>
    </>
  );
}
