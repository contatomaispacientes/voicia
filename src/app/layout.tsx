import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Rodape } from "@/components/Rodape";

// Mesma fonte da plataforma nova (app.voicia.com.br).
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voicia.com.br"),
  title: "VoicIA | Prontuário por voz com IA para médicos",
  description:
    "Grave a consulta e a VoicIA escreve o prontuário, a receita e os documentos. Você revisa, assina e volta a olhar para o paciente. 30 dias grátis.",
  keywords: ["prontuário por voz", "IA médica", "transcrição de consulta", "prontuário automático", "receita digital", "VoicIA"],
  icons: { icon: [{ url: "/marca/icone-voicia.svg", type: "image/svg+xml" }, { url: "/marca/icone-voicia-verde.png", type: "image/png" }], apple: "/marca/icone-voicia-verde.png" },
  openGraph: {
    title: "VoicIA | Prontuário por voz com IA",
    description: "Grave a consulta. A VoicIA escreve. Você revisa e assina.",
    type: "website",
    locale: "pt_BR",
    url: "https://voicia.com.br",
    siteName: "VoicIA",
    images: [{ url: "/marca/og-voicia.png", width: 1200, height: 630, alt: "VoicIA, prontuário por voz com IA" }],
  },
};

export const viewport: Viewport = { themeColor: "#03100C" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={interTight.variable}>
      <head>
        <link rel="preconnect" href="https://app.voicia.com.br" />
      </head>
      <body className="overflow-x-hidden">
        <Nav />
        <main>{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
