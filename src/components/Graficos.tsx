/* Gráficos decorativos dos cartões escuros. Mostram categorias reais (as
   especialidades, os documentos), sem inventar porcentagens. */

export function Radar({ className = "" }: { className?: string }) {
  const rotulos = ["Clínica", "Cardio", "Pediatria", "Ortopedia", "Gineco", "Psiquiatria"];
  const valores = [0.92, 0.78, 0.86, 0.64, 0.74, 0.58];
  const cx = 130, cy = 92, r = 64;
  const ponto = (i: number, k: number) => {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / 6;
    return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k];
  };
  const hex = (k: number) => Array.from({ length: 6 }, (_, i) => ponto(i, k).map((n) => n.toFixed(1)).join(",")).join(" ");
  const forma = valores.map((v, i) => ponto(i, v).map((n) => n.toFixed(1)).join(",")).join(" ");
  return (
    <svg viewBox="0 0 260 190" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="radar-f" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FE3C0" stopOpacity=".75" />
          <stop offset="1" stopColor="#0E8A6E" stopOpacity=".35" />
        </linearGradient>
      </defs>
      {[1, 0.66, 0.33].map((k) => <polygon key={k} points={hex(k)} fill="none" stroke="#2FDAA1" strokeOpacity={k === 1 ? 0.7 : 0.25} strokeWidth="1.2" />)}
      {Array.from({ length: 6 }, (_, i) => { const [x, y] = ponto(i, 1); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#2FDAA1" strokeOpacity=".2" />; })}
      <polygon points={forma} fill="url(#radar-f)" stroke="#BFF5DF" strokeWidth="1.4" />
      {valores.map((v, i) => { const [x, y] = ponto(i, v); return <circle key={i} cx={x} cy={y} r="2.6" fill="#E9FFF6" />; })}
      {rotulos.map((t, i) => {
        const [x, y] = ponto(i, 1.32);
        return <text key={t} x={x} y={y + 3} textAnchor="middle" fontSize="9.5" fill="#CFE9DF" fillOpacity=".75" fontFamily="inherit">{t}</text>;
      })}
    </svg>
  );
}

/** Matriz de pontos: os acesos formam barras (19 tipos de documento). */
export function MatrizDePontos({ className = "" }: { className?: string }) {
  const colunas = [2, 1, 3, 1, 2, 4, 1, 2, 1, 1, 0, 1];
  const linhas = 6;
  return (
    <svg viewBox="0 0 252 132" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ponto-aceso" cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#F2FFF9" />
          <stop offset="1" stopColor="#8FE5C4" />
        </radialGradient>
      </defs>
      {colunas.map((alt, c) =>
        Array.from({ length: linhas }, (_, l) => {
          const aceso = linhas - l <= alt;
          return <circle key={`${c}-${l}`} cx={10 + c * 21} cy={10 + l * 22} r="9" fill={aceso ? "url(#ponto-aceso)" : "#0E2A22"} className={aceso ? "cintila" : ""} style={aceso ? { animationDelay: `${(c * 0.21).toFixed(2)}s` } : undefined} />;
        }),
      )}
    </svg>
  );
}

export function Area({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 130" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="area-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2FDAA1" stopOpacity=".75" />
          <stop offset="1" stopColor="#2FDAA1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="area-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFF5E6" stopOpacity=".5" />
          <stop offset="1" stopColor="#CFF5E6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 110 L30 92 L58 98 L92 60 L120 74 L150 38 L176 56 L204 30 L232 50 L260 44 L260 130 L0 130 Z" fill="url(#area-b)" />
      <path d="M0 116 L34 104 L66 84 L98 92 L130 52 L160 70 L190 46 L222 64 L260 58 L260 130 L0 130 Z" fill="url(#area-a)" />
      <path d="M0 116 L34 104 L66 84 L98 92 L130 52 L160 70 L190 46 L222 64 L260 58" fill="none" stroke="#BFF5DF" strokeWidth="1.6" />
      <circle cx="130" cy="52" r="4" fill="#fff" />
      <g transform="translate(130 22)">
        <rect x="-38" y="-12" width="76" height="22" rx="11" fill="#0E2A22" stroke="#2FDAA1" strokeOpacity=".5" />
        <text x="0" y="3.5" textAnchor="middle" fontSize="10" fill="#DFFFF2" fontFamily="inherit">PDF assinado</text>
      </g>
    </svg>
  );
}
