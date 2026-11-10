import { useId } from "react";

/** Símbolo da VoicIA: duas pétalas de luz em V e o ponto (a IA ouvindo), num bloco de vidro verde. */
export function MarcaIcone({ className = "h-8 w-8" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2=".35" y2="1">
          <stop offset="0" stopColor="#7FE3C0" />
          <stop offset=".48" stopColor="#14A47E" />
          <stop offset="1" stopColor="#06624B" />
        </linearGradient>
        <radialGradient id={`${id}g`} cx=".5" cy="1.05" r=".7">
          <stop offset="0" stopColor="#DDF7EC" stopOpacity=".95" />
          <stop offset=".55" stopColor="#5FD9B0" stopOpacity=".35" />
          <stop offset="1" stopColor="#5FD9B0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}p`} cx=".5" cy=".35" r=".75">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".65" stopColor="#ECFBF5" />
          <stop offset="1" stopColor="#B3EBD5" />
        </radialGradient>
      </defs>
      <rect width="256" height="256" rx="66" fill={`url(#${id}b)`} />
      <rect width="256" height="256" rx="66" fill={`url(#${id}g)`} />
      <rect x="1.5" y="1.5" width="253" height="253" rx="64.5" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2.5" />
      <g fill={`url(#${id}p)`}>
        <path transform="translate(99 138) rotate(-27)" d="M0,-66 C32,-33 32,33 0,66 C-32,33 -32,-33 0,-66 Z" />
        <path transform="translate(157 138) rotate(27)" d="M0,-66 C32,-33 32,33 0,66 C-32,33 -32,-33 0,-66 Z" />
        <circle cx="128" cy="58" r="15" />
      </g>
    </svg>
  );
}

/** Logo completo: símbolo + nome ("Voic" na cor do texto, "IA" em verde). */
export function Marca({ className = "", tamanho = "text-[22px]", icone = "h-8 w-8" }: { className?: string; tamanho?: string; icone?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <MarcaIcone className={icone} />
      <span className={`${tamanho} font-normal tracking-[-0.02em]`}>
        Voic<span className="ml-[0.04em] text-verde-vivo">IA</span>
      </span>
    </span>
  );
}
