import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TopoDePagina } from "@/components/TopoDePagina";
import { ChamadaFinal, Navegador, TituloDeSecao } from "@/components/Pecas";
import { Revelar } from "@/components/Revelar";
import { ATALHOS_DO_SUPORTE, CADASTRO, DOCUMENTOS, ESPECIALIDADES } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Soluções | VoicIA",
  description: "Gravação e transcrição, prontuário por especialidade, Suporte Médico com IA, documentos, pacientes e o celular como câmera. Conheça tudo o que a VoicIA faz.",
};

function Item({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15.5px] leading-relaxed text-texto">
      <svg viewBox="0 0 20 20" className="mt-[3px] h-[18px] w-[18px] shrink-0" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#DDF5EA" /><path d="m6 10.2 2.6 2.6L14 7.5" fill="none" stroke="#088163" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span>{children}</span>
    </li>
  );
}

function Bloco({ id, numero, titulo, apagado, texto, itens, visual, invertido = false }: { id: string; numero: string; titulo: string; apagado: string; texto: string; itens: ReactNode[]; visual: ReactNode; invertido?: boolean }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[#E3ECE8] py-20 sm:py-28">
      <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${invertido ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Revelar>
          <p className="mb-5 text-[13px] tracking-[0.14em] text-verde-forte">{numero}</p>
          <TituloDeSecao linha1={titulo} linha2={apagado} />
          <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-texto-2">{texto}</p>
          <ul className="mt-8 space-y-3.5">{itens.map((i, k) => <Item key={k}>{i}</Item>)}</ul>
        </Revelar>
        <Revelar atraso={120}>{visual}</Revelar>
      </div>
    </section>
  );
}

function Chips({ itens, destaque = false }: { itens: string[]; destaque?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {itens.map((t) => (
        <span key={t} className={`rounded-full px-3.5 py-2 text-[14px] ${destaque ? "bg-[linear-gradient(180deg,#19B88C,#0B8A6A)] text-white shadow-[0_6px_16px_-8px_rgba(14,138,110,.8)]" : "border border-[#D5E6DE] bg-white text-texto"}`}>{t}</span>
      ))}
    </div>
  );
}

export default function Solucoes() {
  return (
    <>
      <TopoDePagina
        etiqueta="Soluções"
        titulo="Toda a consulta"
        apagado="num lugar só."
        texto="Da gravação à receita assinada: a VoicIA cuida da escrita para você cuidar do paciente."
      >
        <a href={CADASTRO} className="botao-verde">Testar 30 dias grátis</a>
      </TopoDePagina>

      <div className="bg-white">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Bloco
            id="gravacao"
            numero="01 · GRAVAÇÃO"
            titulo="Você conversa."
            apagado="A VoicIA escuta."
            texto="Aperte Gravar e conduza a consulta como sempre. Ao finalizar, a conversa vira texto e o prontuário começa a ser montado."
            itens={["Grave pelo computador ou pelo celular", "Pause e retome quando precisar", "Contexto do paciente e medicamentos em uso antes de começar", "Celular conectado à consulta pelo QR code"]}
            visual={<Navegador src="/telas/consulta-claro.webp" alt="Tela de consulta da VoicIA" escuro={false} />}
          />
          <Bloco
            id="prontuario"
            numero="02 · PRONTUÁRIO"
            titulo="Prontuário pronto,"
            apagado="do seu jeito."
            texto="A IA organiza a consulta nos campos da sua especialidade: queixa principal, história, exame físico, resultados de exames, hipóteses diagnósticas, conduta e prescrição."
            itens={["Campos próprios para 28 especialidades", "Ligue, desligue e reordene os campos", "Revise e edite antes de salvar", "Copie para o seu sistema ou guarde na VoicIA"]}
            visual={<Navegador src="/telas/consulta-escuro.webp" alt="Tela de consulta da VoicIA no modo escuro" />}
            invertido
          />
          <Bloco
            id="suporte"
            numero="03 · SUPORTE MÉDICO"
            titulo="Um colega de IA"
            apagado="a um clique."
            texto="Na barra lateral da consulta, o Suporte Médico usa o contexto do paciente para ajudar no raciocínio e na papelada. Ele sugere; a decisão é sempre sua."
            itens={["10 atalhos em 3 grupos", "Crie e salve seus próprios modelos", "Respostas com base no que foi dito na consulta"]}
            visual={
              <div className="cartao-claro space-y-7 p-7 sm:p-9">
                {ATALHOS_DO_SUPORTE.map((g, i) => (
                  <div key={g.grupo}>
                    <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-texto-2">{g.grupo}</p>
                    <Chips itens={g.itens} destaque={i === 0} />
                  </div>
                ))}
              </div>
            }
          />
          <Bloco
            id="documentos"
            numero="04 · DOCUMENTOS"
            titulo="Da consulta"
            apagado="ao papel assinado."
            texto="Gere os documentos a partir do que aconteceu na consulta, revise e entregue impresso, em PDF ou assinado digitalmente."
            itens={["PDF com o logo e os dados da sua clínica", "Assinatura com certificado digital Bird ID (Soluti)", "Tudo fica no histórico do paciente"]}
            visual={<div className="cartao-claro p-7 sm:p-9"><Chips itens={DOCUMENTOS} /></div>}
            invertido
          />
          <Bloco
            id="pacientes"
            numero="05 · PACIENTES"
            titulo="O histórico"
            apagado="na ponta dos dedos."
            texto="Cada consulta fica guardada com o paciente. Ao digitar o nome, a VoicIA mostra as consultas anteriores e você retoma de onde parou."
            itens={["Busca por nome", "Queixa e hipóteses de cada consulta", "Documentos e fotos ligados à consulta", "Exporte ou exclua os dados a pedido do paciente (LGPD)"]}
            visual={<Navegador src="/telas/pacientes-claro.webp" alt="Lista de pacientes da VoicIA com nomes fictícios" escuro={false} />}
          />
          <Bloco
            id="celular"
            numero="06 · CELULAR"
            titulo="O celular vira"
            apagado="microfone e câmera."
            texto="Abra a consulta no computador e conecte o celular pelo QR code. Ele grava o áudio e fotografa receitas, exames e laudos do paciente."
            itens={["App VoicIA no celular, ou direto no navegador", "Um botão só para capturar documentos", "A IA identifica se é receita, exame ou outro documento", "Cada informação vai para o campo certo do prontuário"]}
            visual={
              <div className="flex justify-center">
                <div className="w-[260px] rounded-[44px] border border-[#1B2A25] bg-[#0B1512] p-2.5 shadow-[0_50px_100px_-40px_rgba(3,40,30,.6)] sm:w-[300px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/telas/celular-claro.webp" alt="VoicIA no celular" className="block w-full rounded-[36px]" loading="lazy" />
                </div>
              </div>
            }
            invertido
          />
        </div>
      </div>

      {/* Especialidades e integrações */}
      <section className="bg-papel px-5 py-24 text-texto sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1180px]">
          <Revelar className="max-w-2xl">
            <TituloDeSecao linha1="Campos próprios para" linha2="28 especialidades" />
            <p className="mt-5 text-[16px] leading-relaxed text-texto-2">Ao escolher sua especialidade, o prontuário já vem com os campos que fazem sentido para a sua área.</p>
          </Revelar>
          <Revelar className="mt-10"><Chips itens={ESPECIALIDADES} /></Revelar>

          <Revelar className="mt-24 grid gap-4 md:grid-cols-3">
            {[
              { t: "DoctorOS", d: "A VoicIA funciona dentro do DoctorOS, sem trocar de sistema no meio do atendimento." },
              { t: "Monitore Health", d: "Dados de saúde que o paciente registra no app Monitore aparecem para o médico, e os exames lidos voltam para ele." },
              { t: "API documentada", d: "Para clínicas que querem ligar a VoicIA ao próprio sistema." },
            ].map((c) => (
              <div key={c.t} className="cartao-claro p-7">
                <p className="text-[12px] uppercase tracking-[0.14em] text-verde-forte">Integração</p>
                <p className="mt-3 text-[20px] tracking-[-0.015em]">{c.t}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-texto-2">{c.d}</p>
              </div>
            ))}
          </Revelar>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-white px-5 py-24 text-texto sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1180px]">
          <Revelar><TituloDeSecao linha1="Como funciona" linha2="na prática" /></Revelar>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-[#E3ECE8] bg-[#E3ECE8] md:grid-cols-3">
            {[
              ["01", "Grave", "Abra a consulta, confira o paciente e aperte Gravar no computador ou no celular."],
              ["02", "Revise", "Ao finalizar, o prontuário aparece organizado. Ajuste o que quiser e use o Suporte Médico."],
              ["03", "Entregue", "Imprima, baixe em PDF ou assine digitalmente receitas e documentos."],
            ].map(([n, t, d]) => (
              <Revelar key={n} className="bg-white p-8 sm:p-10">
                <p className="texto-grafite text-[56px] font-light leading-none tracking-[-0.04em]">{n}</p>
                <p className="mt-8 text-[20px] tracking-[-0.015em]">{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-texto-2">{d}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
