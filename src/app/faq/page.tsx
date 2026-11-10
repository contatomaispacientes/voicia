import type { Metadata } from "next";
import { TopoDePagina } from "@/components/TopoDePagina";
import { ChamadaFinal } from "@/components/Pecas";
import { Revelar } from "@/components/Revelar";
import { Perguntas } from "@/components/Perguntas";
import { PERGUNTAS, PRIVACIDADE, TERMOS } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Dúvidas | VoicIA",
  description: "Respostas sobre como a VoicIA funciona, segurança dos dados, LGPD, planos e cobrança.",
};

export default function Duvidas() {
  return (
    <>
      <TopoDePagina etiqueta="Central de dúvidas" titulo="Como podemos" apagado="ajudar?" texto="As perguntas que os médicos mais fazem antes de começar." />

      <section className="bg-papel px-5 py-24 text-texto sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[920px]">
          <Revelar><Perguntas itens={PERGUNTAS} filtros /></Revelar>
          <Revelar className="mt-16 grid gap-4 sm:grid-cols-2">
            <div className="cartao-claro p-7">
              <p className="text-[18px] tracking-[-0.01em]">Dados pessoais e LGPD</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-texto-2">Fale com o encarregado de dados em <a className="text-verde-forte underline underline-offset-2" href="mailto:dpo@voicia.com.br">dpo@voicia.com.br</a>.</p>
            </div>
            <div className="cartao-claro p-7">
              <p className="text-[18px] tracking-[-0.01em]">Documentos legais</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-texto-2">
                Leia os <a className="text-verde-forte underline underline-offset-2" href={TERMOS}>termos de uso</a> e a <a className="text-verde-forte underline underline-offset-2" href={PRIVACIDADE}>política de privacidade</a>.
              </p>
            </div>
          </Revelar>
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
