"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Marca } from "./Marca";
import { APP, CADASTRO } from "@/lib/conteudo";

const LINKS = [
  { href: "/solucoes/", rotulo: "Soluções" },
  { href: "/vantagens/", rotulo: "Vantagens" },
  { href: "/precos/", rotulo: "Preços" },
  { href: "/faq/", rotulo: "Dúvidas" },
];

export function Nav() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const caminho = usePathname();

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    const quadro = requestAnimationFrame(aoRolar);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Principal"
        className={`mx-auto flex max-w-[1180px] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          rolou || aberto ? "vidro-escuro shadow-[0_20px_40px_-24px_rgba(0,0,0,.8)]" : "border border-transparent"
        }`}
      >
        <Link href="/" aria-label="VoicIA, página inicial" className="text-white">
          <Marca />
        </Link>

        <ul className="hidden items-center gap-8 text-[14px] text-white/75 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`transition-colors hover:text-white ${caminho?.startsWith(l.href.slice(0, -1)) ? "text-white" : ""}`}
              >
                {l.rotulo}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a href={APP} className="px-3 py-2 text-[14px] text-white/75 transition-colors hover:text-white">Entrar</a>
          <a href={CADASTRO} className="botao-contorno">Testar grátis</a>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          <span className={`absolute h-[1.5px] w-5 bg-current transition-transform ${aberto ? "rotate-45" : "-translate-y-[4px]"}`} />
          <span className={`absolute h-[1.5px] w-5 bg-current transition-transform ${aberto ? "-rotate-45" : "translate-y-[4px]"}`} />
        </button>
      </nav>

      {aberto && (
        <div className="vidro-escuro mx-auto mt-2 max-w-[1180px] rounded-[28px] p-3 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setAberto(false)} className="block rounded-2xl px-4 py-3.5 text-[17px] text-white/85 hover:bg-white/5">
              {l.rotulo}
            </Link>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
            <a href={APP} className="botao-contorno !py-3">Entrar</a>
            <a href={CADASTRO} className="botao-verde !py-3 !text-[14px]">Testar grátis</a>
          </div>
        </div>
      )}
    </header>
  );
}
