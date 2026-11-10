/**
 * O arco verde do topo: uma faixa de luz em meia-lua com um anel de ondas
 * sonoras em volta. Geometria fixa (sem aleatório) para o HTML do servidor e
 * o do navegador serem iguais.
 */
const CX = 600;
const CY = 760;
const N = 170;

function altura(i: number) {
  const t = i / N;
  const v = Math.abs(Math.sin(i * 1.7) * 0.55 + Math.sin(i * 0.37) * 0.35 + Math.sin(i * 5.3) * 0.25);
  const meio = Math.sin(Math.PI * t); // mais forte no topo
  return 8 + v * 46 * (0.35 + meio * 0.65);
}

export function ArcoDeVoz({ className = "" }: { className?: string }) {
  const barras = Array.from({ length: N }, (_, i) => {
    const ang = Math.PI + (Math.PI * (i + 0.5)) / N; // 180° → 360° (metade de cima)
    const h = altura(i);
    const r = 548;
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    const borda = Math.sin((Math.PI * (i + 0.5)) / N); // some nas pontas
    return {
      x1: (CX + cos * (r - h / 2)).toFixed(1),
      y1: (CY + sin * (r - h / 2)).toFixed(1),
      x2: (CX + cos * (r + h / 2)).toFixed(1),
      y2: (CY + sin * (r + h / 2)).toFixed(1),
      op: (0.15 + borda * 0.85).toFixed(2),
      atraso: ((i % 17) * 0.11).toFixed(2),
    };
  });

  return (
    <svg viewBox="0 0 1200 760" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="arco-faixa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9FFF1" />
          <stop offset=".035" stopColor="#5CEFC0" />
          <stop offset=".1" stopColor="#16B98B" />
          <stop offset=".22" stopColor="#0B8B69" />
          <stop offset=".36" stopColor="#075F48" />
          <stop offset=".5" stopColor="#043A2C" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id="arco-ondas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A6F5D6" />
          <stop offset="1" stopColor="#2FDAA1" stopOpacity=".2" />
        </linearGradient>
        <radialGradient id="arco-luz" cx=".5" cy="1" r=".6">
          <stop offset="0" stopColor="#2FDAA1" stopOpacity=".55" />
          <stop offset=".6" stopColor="#0E8A6E" stopOpacity=".12" />
          <stop offset="1" stopColor="#03100C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arco-sumir" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".72" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="arco-mascara">
          <rect width="1200" height="760" fill="url(#arco-sumir)" />
        </mask>
        <filter id="arco-borrar" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>

      <ellipse cx={CX} cy={CY} rx="620" ry="520" fill="url(#arco-luz)" />
      <g mask="url(#arco-mascara)">
        <circle className="brilho-arco" cx={CX} cy={CY} r="440" fill="none" stroke="#2FDAA1" strokeWidth="70" filter="url(#arco-borrar)" />
        <circle cx={CX} cy={CY} r="440" fill="none" stroke="url(#arco-faixa)" strokeWidth="92" />
        <circle cx={CX} cy={CY} r="398" fill="none" stroke="#02130E" strokeOpacity=".55" strokeWidth="8" />
        <circle cx={CX} cy={CY} r="487" fill="none" stroke="#DFFFF2" strokeOpacity=".55" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r="300" fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="1.2" />
      </g>
      <g stroke="url(#arco-ondas)" strokeWidth="2.6" strokeLinecap="round">
        {barras.map((b, i) => (
          <line key={i} className="barra-viva" x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} opacity={b.op} style={{ animationDelay: `${b.atraso}s` }} />
        ))}
      </g>
    </svg>
  );
}
