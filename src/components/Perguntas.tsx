"use client";

import { useMemo, useState } from "react";
import type { Pergunta } from "@/lib/conteudo";

/** Lista de perguntas abre-e-fecha, com filtro por categoria (opcional). */
export function Perguntas({ itens, filtros = false }: { itens: Pergunta[]; filtros?: boolean }) {
  const categorias = useMemo(() => ["Todas", ...Array.from(new Set(itens.map((i) => i.categoria)))], [itens]);
  const [cat, setCat] = useState("Todas");
  const lista = cat === "Todas" ? itens : itens.filter((i) => i.categoria === cat);

  return (
    <div>
      {filtros && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Categorias">
          {categorias.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-[14px] transition-colors ${cat === c ? "bg-texto text-white" : "border border-[#D5E6DE] bg-white text-texto-2 hover:text-texto"}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="divide-y divide-[#DCE7E2] border-y border-[#DCE7E2]">
        {lista.map((i) => (
          <details key={i.p} className="group py-1">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[17px] tracking-[-0.01em] text-texto sm:text-[19px]">
              {i.p}
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D5E6DE] text-verde-forte transition-colors group-open:bg-verde-forte group-open:text-white">
                <span className="absolute h-[1.5px] w-3 bg-current" />
                <span className="absolute h-3 w-[1.5px] bg-current transition-transform group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 pr-12 text-[15.5px] leading-relaxed text-texto-2">{i.r}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
