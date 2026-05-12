import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Apenas os pesos realmente usados no site
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "VoicIA | Suporte Médico de Atendimento Humanizado",
  description:
    "Automatize registros clínicos, foque no paciente e ganhe tempo. A plataforma completa de suporte médico com IA.",
  keywords: ["suporte médico", "IA médica", "prontuário automático", "transcrição médica", "VoicIA"],
  openGraph: {
    title: "VoicIA | Suporte Médico de Atendimento Humanizado",
    description: "Automatize registros clínicos, foque no paciente e ganhe tempo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jakarta.variable} antialiased`}>
      <head>
        {/* Preconnect ao domínio do app */}
        <link rel="preconnect" href="https://app.voicia.com.br" />
        {/* Preload da imagem hero (LCP) */}
        <link
          rel="preload"
          as="image"
          href="/app-screenshot.png"
          type="image/png"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
