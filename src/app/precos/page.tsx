import type { Metadata } from "next";
import { TopoDePagina } from "@/components/TopoDePagina";
import { ChamadaFinal, TituloDeSecao } from "@/components/Pecas";
import { Revelar } from "@/components/Revelar";
import { Planos } from "@/components/Planos";
import { Perguntas } from "@/components/Perguntas";
import { PERGUNTAS } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Preços | VoicIA",
  description: "Um plano com tudo incluído, mensal ou anual, com 30 dias grátis. Condições sob medida para clínicas e hospitais.",
};

export default function Precos() {
  return (
    <>
      <TopoDePagina etiqueta="Preços" titulo="Um plano." apagado="Tudo incluído." texto="Comece com 30 dias grátis. Depois, escolha entre mensal e anual. Cancele quando quiser." />

      <section className="bg-papel px-5 py-24 text-texto sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1180px]">
          <Revelar><Planos /></Revelar>
        </div>
      </section>

      <section className="relative -mt-px bg-papel px-5 pb-28 text-texto sm:px-8 sm:pb-36">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[360px_1fr]">
          <Revelar><TituloDeSecao linha1="Dúvidas sobre" linha2="planos e cobrança" /></Revelar>
          <Revelar><Perguntas itens={PERGUNTAS.filter((p) => p.categoria === "Planos")} /></Revelar>
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
