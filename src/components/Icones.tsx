/* Ícones grandes e suaves (gradiente menta) dos cartões, no espírito da referência. */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#B8F0DA" />
        <stop offset="1" stopColor="#E9FBF3" />
      </linearGradient>
      <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7FD9B7" />
        <stop offset="1" stopColor="#B8EBD7" />
      </linearGradient>
    </defs>
  );
}

export function IconeMicrofone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <Defs id="mic" />
      <rect x="54" y="14" width="52" height="86" rx="26" fill="url(#mic-f)" stroke="url(#mic-s)" strokeWidth="2.5" />
      <path d="M38 72c0 23 19 42 42 42s42-19 42-42" fill="none" stroke="url(#mic-s)" strokeWidth="7" strokeLinecap="round" />
      <path d="M80 114v22M58 140h44" stroke="url(#mic-s)" strokeWidth="7" strokeLinecap="round" />
      <path d="M68 44h24M68 58h24" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".9" />
    </svg>
  );
}

export function IconeProntuario({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <Defs id="doc" />
      <path d="M50 14h52l26 26v100a6 6 0 0 1-6 6H50a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" fill="url(#doc-f)" stroke="url(#doc-s)" strokeWidth="2.5" />
      <path d="M102 14v26h26" fill="#D5F4E7" stroke="url(#doc-s)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M66 62h46M66 80h46M86 98h26" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="58" cy="108" r="30" fill="url(#doc-f)" stroke="url(#doc-s)" strokeWidth="2.5" />
      <path d="m45 108 9 9 18-19" fill="none" stroke="url(#doc-s)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconeCelular({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <Defs id="cel" />
      <rect x="46" y="10" width="68" height="140" rx="16" fill="url(#cel-f)" stroke="url(#cel-s)" strokeWidth="2.5" />
      <rect x="66" y="18" width="28" height="6" rx="3" fill="#fff" opacity=".9" />
      <circle cx="80" cy="80" r="22" fill="none" stroke="url(#cel-s)" strokeWidth="6" />
      <circle cx="80" cy="80" r="9" fill="url(#cel-s)" />
      <path d="M56 50v-8a6 6 0 0 1 6-6h8M104 50v-8a6 6 0 0 0-6-6h-8M56 110v8a6 6 0 0 0 6 6h8M104 110v8a6 6 0 0 1-6 6h-8" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
