import type { ReactNode } from "react";
import { Revelar } from "./Revelar";
import { CADASTRO } from "@/lib/conteudo";

/** Janela de navegador em volta de uma tela da plataforma. */
export function Navegador({ src, alt, endereco = "app.voicia.com.br", escuro = true, className = "" }: { src: string; alt: string; endereco?: string; escuro?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[18px] sm:rounded-[22px] ${escuro ? "border border-white/12 bg-[#0B1713] shadow-[0_60px_120px_-40px_rgba(0,0,0,.9),0_0_0_1px_rgba(255,255,255,.03)]" : "border border-[#DCE7E2] bg-white shadow-[0_50px_100px_-50px_rgba(8,70,55,.45)]"} ${className}`}>
      <div className={`flex items-center gap-3 px-3.5 py-2.5 sm:px-4 ${escuro ? "border-b border-white/8" : "border-b border-[#E6EEEA]"}`}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className={`mx-auto flex min-w-0 max-w-[340px] flex-1 items-center justify-center gap-1.5 truncate rounded-full px-3 py-1 text-[11px] ${escuro ? "bg-white/6 text-white/55" : "bg-[#F1F6F3] text-[#5B716C]"}`}>
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0" aria-hidden="true"><path d="M3.5 5.5V4a2.5 2.5 0 0 1 5 0v1.5M3 5.5h6v4.5H3z" fill="none" stroke="currentColor" strokeWidth="1.1" /></svg>
          {endereco}
        </div>
        <div className="w-[42px]" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" loading="lazy" decoding="async" />
    </div>
  );
}

export function Etiqueta({ children, escuro = true }: { children: ReactNode; escuro?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] tracking-[0.02em] ${escuro ? "border border-white/12 bg-white/[0.04] text-white/70" : "border border-[#D5E6DE] bg-white/70 text-[#3E5751]"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-verde-vivo shadow-[0_0_10px_#2FDAA1]" />
      {children}
    </span>
  );
}

/** Título de seção em duas linhas, a segunda mais apagada (como a referência). */
export function TituloDeSecao({ linha1, linha2, escuro = false, className = "" }: { linha1: string; linha2?: string; escuro?: boolean; className?: string }) {
  return (
    <h2 className={`text-[clamp(34px,4.6vw,56px)] font-normal leading-[1.04] tracking-[-0.035em] ${className}`}>
      <span className={escuro ? "texto-menta" : "texto-grafite"}>{linha1}</span>
      {linha2 && (
        <>
          <br />
          <span className={escuro ? "text-white/45" : "text-[#7E928C]"}>{linha2}</span>
        </>
      )}
    </h2>
  );
}

/** Fechamento das páginas: chamada final em fundo escuro. */
export function ChamadaFinal({ titulo = "Seu consultório com IA", subtitulo = "está pronto para começar.", texto = "Teste a VoicIA por 30 dias na sua rotina real. Sem instalar nada." }: { titulo?: string; subtitulo?: string; texto?: string }) {
  return (
    <section className="relative overflow-hidden bg-tinta px-5 py-28 text-center sm:px-8 sm:py-36">
      <div className="grade pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-[70%] h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,218,161,.28),transparent)]" />
      <Revelar className="relative mx-auto max-w-3xl">
        <h2 className="text-[clamp(38px,6vw,76px)] font-normal leading-[1.02] tracking-[-0.04em]">
          <span className="texto-prata">{titulo}</span>
          <br />
          <span className="text-white/40">{subtitulo}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-white/60">{texto}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={CADASTRO} className="botao-verde">Testar 30 dias grátis</a>
        </div>
      </Revelar>
    </section>
  );
}

/** Pílula de onda sonora (cinza-verde com barras brancas). */
export function PilulaDeOnda({ className = "" }: { className?: string }) {
  const n = 46;
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(120%_140%_at_50%_0%,#5E7A72_0%,#31453F_45%,#9FB3AC_100%)] shadow-[inset_0_2px_0_rgba(255,255,255,.25),0_30px_60px_-30px_rgba(8,70,55,.6)] ${className}`}>
      <svg viewBox={`0 0 ${n * 10} 80`} className="h-[46%] w-[72%]" aria-hidden="true">
        {Array.from({ length: n }, (_, i) => {
          const h = 10 + Math.abs(Math.sin(i * 0.9) * 0.6 + Math.sin(i * 0.23) * 0.5) * 62;
          return <rect key={i} className="barra-viva" x={i * 10 + 3} y={40 - h / 2} width="3.2" height={h} rx="1.6" fill="#F2FBF7" style={{ animationDelay: `${(i % 9) * 0.13}s` }} />;
        })}
      </svg>
    </div>
  );
}
