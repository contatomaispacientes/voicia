import Link from "next/link";
import { Marca } from "./Marca";
import { API_DOCS, APP, CADASTRO, PRIVACIDADE, TERMOS } from "@/lib/conteudo";

const COLUNAS = [
  { titulo: "Produto", links: [["Soluções", "/solucoes/"], ["Vantagens", "/vantagens/"], ["Preços", "/precos/"], ["Dúvidas", "/faq/"]] },
  { titulo: "Plataforma", links: [["Entrar", APP], ["Criar conta", CADASTRO], ["Documentação da API", API_DOCS]] },
  { titulo: "Legal", links: [["Termos de uso", TERMOS], ["Privacidade", PRIVACIDADE]] },
];

export function Rodape() {
  return (
    <footer className="relative overflow-hidden bg-tinta pt-24 text-white">
      <div className="mx-auto grid max-w-[1180px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Marca tamanho="text-[clamp(56px,9vw,104px)] leading-none" icone="h-[clamp(56px,9vw,104px)] w-[clamp(56px,9vw,104px)]" className="!gap-5" />
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-white/55">
            Prontuário por voz com inteligência artificial. Você atende; a VoicIA escreve.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {COLUNAS.map((c) => (
            <div key={c.titulo}>
              <p className="mb-4 text-[12px] uppercase tracking-[0.14em] text-white/40">{c.titulo}</p>
              <ul className="space-y-2.5 text-[14px] text-white/75">
                {c.links.map(([rotulo, href]) => (
                  <li key={rotulo}>
                    {href.startsWith("/") ? (
                      <Link href={href} className="hover:text-white">{rotulo}</Link>
                    ) : (
                      <a href={href} className="inline-flex items-center gap-1 hover:text-white">
                        {rotulo}
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 opacity-60" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-24 flex max-w-[1180px] flex-col gap-2 border-t border-white/10 px-5 py-8 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} VoicIA · DOCTOR OS TEC LTDA · CNPJ 65.821.410/0001-49</p>
        <p>São Paulo, Brasil</p>
      </div>
    </footer>
  );
}
