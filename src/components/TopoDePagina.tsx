import type { ReactNode } from "react";
import { ArcoDeVoz } from "./ArcoDeVoz";
import { Etiqueta } from "./Pecas";

/** Topo escuro das páginas internas: o arco da página inicial, mais discreto. */
export function TopoDePagina({ etiqueta, titulo, apagado, texto, children }: { etiqueta: string; titulo: string; apagado?: string; texto?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-tinta px-5 pb-24 pt-36 text-center sm:px-8 sm:pb-28 sm:pt-44">
      <div className="grade pointer-events-none absolute inset-0" />
      <ArcoDeVoz className="pointer-events-none absolute left-1/2 top-[-6%] w-[1400px] max-w-none -translate-x-1/2 opacity-45 sm:top-[-22%]" />
      <div className="relative mx-auto max-w-[900px]">
        <div className="mb-7 flex justify-center"><Etiqueta>{etiqueta}</Etiqueta></div>
        <h1 className="text-[clamp(40px,7vw,88px)] font-normal leading-[1] tracking-[-0.045em]">
          <span className="texto-prata">{titulo}</span>
          {apagado && (
            <>
              <br />
              <span className="text-white/40">{apagado}</span>
            </>
          )}
        </h1>
        {texto && <p className="mx-auto mt-7 max-w-[540px] text-[16px] leading-relaxed text-white/60 sm:text-[17px]">{texto}</p>}
        {children && <div className="mt-9 flex flex-wrap items-center justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
