"use client";

import { useEffect, useState } from "react";
import { MarcaIcone } from "./Marca";

/** Painel de gravação de mentira: relógio correndo e barras de voz. */
export function PainelGravando() {
  const [seg, setSeg] = useState(252);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setSeg((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seg / 60)).padStart(2, "0");
  const ss = String(seg % 60).padStart(2, "0");
  // Arredondado: o seno pode diferir na última casa entre servidor e navegador.
  const barras = Array.from({ length: 64 }, (_, i) => Math.round(18 + Math.abs(Math.sin(i * 0.8) * 0.5 + Math.sin(i * 0.19) * 0.6 + Math.sin(i * 2.7) * 0.2) * 60));

  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#0D2019,#06120E)] p-2.5 shadow-[0_60px_120px_-50px_rgba(0,0,0,.9)] sm:p-3">
      <div className="relative flex items-center justify-between overflow-hidden px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-5">
        <div className="pointer-events-none absolute left-1/2 top-full h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,218,161,.35),transparent)]" />
        <span className="inline-flex items-center gap-2 text-white">
          <MarcaIcone className="h-7 w-7" />
          <span className="text-[18px] tracking-[-0.02em]">Voic<span className="text-verde-vivo">IA</span></span>
        </span>
        <span className="hidden text-right text-[13px] leading-snug text-white/55 sm:block">Grave pelo computador<br />ou pelo celular.</span>
      </div>
      <div className="relative rounded-[22px] bg-white px-5 pb-4 pt-5 text-texto sm:px-7 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[13px] text-texto-2">
              <span className="ponto-gravando h-2 w-2 rounded-full bg-[#E5245A]" /> Gravando
            </p>
            <p className="mt-0.5 text-[30px] font-light tabular-nums tracking-[-0.03em] text-[#3F5650] sm:text-[36px]">{mm}:{ss}</p>
          </div>
          <div className="hidden flex-1 items-center gap-3 pt-5 sm:flex">
            <span className="h-px flex-1 border-t border-dashed border-[#CFDDD7]" />
            <svg viewBox="0 0 24 16" className="h-4 w-6 text-[#7E928C]" aria-hidden="true">{[3, 7, 11, 15, 19].map((x, i) => <rect key={x} x={x} y={8 - [3, 6, 8, 5, 3][i]} width="2" height={[3, 6, 8, 5, 3][i] * 2} rx="1" fill="currentColor" />)}</svg>
            <span className="h-px flex-1 border-t border-dashed border-[#CFDDD7]" />
          </div>
          <div className="flex items-center gap-2 pt-3">
            <span className="rounded-full border border-[#D5E6DE] px-2.5 py-0.5 text-[11px] text-texto-2">Consulta</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(160deg,#5FD9B0,#0E8A6E)] text-[11px] font-semibold text-white">MF</span>
          </div>
        </div>
        <div className="my-6 flex justify-center sm:my-8">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_30%,#1CB98B,#06523F)] text-white shadow-[0_12px_30px_-8px_rgba(8,129,99,.7),inset_0_2px_0_rgba(255,255,255,.35)]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </span>
        </div>
        <svg viewBox="0 0 640 90" className="block h-16 w-full sm:h-20" preserveAspectRatio="none" aria-hidden="true">
          {barras.map((h, i) => (
            <rect key={i} className="barra-viva" x={i * 10 + 2} y={90 - h} width="6" height={h} rx="2" fill="#6FD6B1" style={{ animationDelay: `${(i % 11) * 0.12}s`, transformOrigin: "bottom" }} />
          ))}
        </svg>
      </div>
    </div>
  );
}
