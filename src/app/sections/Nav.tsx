"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Soluções", href: "/solucoes" },
    { label: "Vantagens", href: "/vantagens" },
    { label: "Preços", href: "/precos" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0B1120]/90 backdrop-blur-xl border-b border-white/5" : ""
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a href="/" className="flex items-center">
          <Image
            src="/voicia-logo.png"
            alt="VoicIA"
            width={160}
            height={80}
            priority
            className="h-14 sm:h-16 w-auto"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a href="https://app.voicia.com.br/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Login</a>
          <a href="https://app.voicia.com.br/" className="text-sm font-semibold px-5 py-2 rounded-lg bg-[#5BA8A2] text-white hover:bg-[#7BBFBA] transition-colors">
            Agendar demo
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#111927] border-t border-white/5 px-6 py-6 space-y-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-[#94A3B8] hover:text-white">
              {l.label}
            </a>
          ))}
          <a href="https://app.voicia.com.br/" className="block text-center py-2.5 rounded-lg bg-[#5BA8A2] text-white font-semibold">
            Agendar demo
          </a>
        </div>
      )}
    </nav>
  );
}
