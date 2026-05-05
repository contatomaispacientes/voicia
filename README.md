# VoicIA — Plataforma Médica com IA

Landing page institucional e multi-página da **VoicIA**, plataforma de suporte médico com inteligência artificial que automatiza registros clínicos, gera resumos e auxilia na tomada de decisão clínica em tempo real.

---

## Stack

| Item | Detalhe |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Linguagem** | TypeScript |
| **Estilização** | Tailwind CSS v4 |
| **Animações** | GSAP 3 + ScrollTrigger, Framer Motion |
| **3D / WebGL** | Three.js (intro animation, canvas interativo) |
| **Fontes** | Plus Jakarta Sans (display) + Inter (body) via `next/font` |

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/contatomaispacientes/voicia.git
cd voicia

# Instale as dependências
npm install

# Desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

```bash
# Build de produção
npm run build
npm run start
```

---

## Estrutura de Pastas

```
site/
├── public/                        # Assets estáticos
│   ├── app-screenshot.png         # Screenshot do app (hero)
│   ├── logo-icon.png              # Logotipo
│   ├── Objeto3D_VoicIA.glb        # Modelo 3D da intro animation
│   └── MINILOGO_VoicIA.*          # Arquivos alternativos do modelo
│
├── src/
│   ├── app/                       # App Router (Next.js)
│   │   ├── layout.tsx             # Root layout: fontes + metadata
│   │   ├── page.tsx               # Home page (/)
│   │   ├── globals.css            # Design system global + Tailwind
│   │   │
│   │   ├── faq/page.tsx           # /faq
│   │   ├── precos/page.tsx        # /precos
│   │   ├── solucoes/page.tsx      # /solucoes
│   │   ├── vantagens/page.tsx     # /vantagens
│   │   │
│   │   └── sections/              # Componentes de seção (Home)
│   │       ├── Hero.tsx           # Hero: typewriter + scroll animation
│   │       ├── Nav.tsx            # Navbar fixa com scroll detection
│   │       ├── Metrics.tsx        # Counters animados com GSAP
│   │       ├── Features.tsx       # Bento grid de funcionalidades
│   │       ├── Advantages.tsx     # Split layout + chat IA animado
│   │       ├── Security.tsx       # Cards com halo icons
│   │       ├── Testimonials.tsx   # Cards de depoimentos com stars
│   │       ├── Pricing.tsx        # Plano com borda gradiente
│   │       ├── Faq.tsx            # Accordion animado
│   │       ├── CtaBanner.tsx      # Banner de conversão full-bleed
│   │       ├── Footer.tsx         # Rodapé editorial com wordmark
│   │       ├── SplitText.tsx      # Typewriter character-by-character
│   │       ├── IntroAnimation.tsx # Intro 3D (Three.js + GSAP)
│   │       ├── AppScreenshot.tsx  # Screenshot com entrada animada
│   │       └── HeroModel.tsx      # Modelo 3D flutuante (reutilizável)
│   │
│   └── components/
│       └── ui/
│           ├── container-scroll-animation.tsx  # Aceternity scroll reveal
│           └── sonic-waveform.tsx              # Canvas de ondas interativas
│
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Landing page completa (Hero, Metrics, Features, Advantages, Security, Testimonials, Pricing, FAQ, CTA) |
| `/solucoes` | 6 soluções detalhadas + processo em 3 steps + 12 especialidades |
| `/vantagens` | Stats animados + 6 benefícios + tabela antes/depois + depoimentos |
| `/precos` | 3 planos com toggle mensal/anual + trust badges + FAQ de preços |
| `/faq` | 24 perguntas em 6 categorias com busca em tempo real e filtros |

---

## Design System — "Clinical Noir"

Toda a linguagem visual é definida em `src/app/globals.css`.

### Cores

| Variável CSS | Hex | Uso |
|---|---|---|
| `--color-brand` | `#63AAA2` | Primária (teal) |
| `--color-brand-light` | `#7BBFBA` | Hover / destaque |
| `--color-navy` | `#24425C` | Secundária |
| `--color-surface` | `#080C15` | Background principal |
| `--color-surface-2` | `#0E1725` | Cards / elevação |
| `--color-subtle` | `#94A3B8` | Texto secundário |
| `--color-muted` | `#64748B` | Texto terciário |

### Classes CSS Globais

```css
.eyebrow      /* Pill com dot pulsante — label de seção */
.lum-card     /* Card com borda luminosa e glow no hover */
.halo-icon    /* Ícone com gradiente e halo radial teal */
.grad-text    /* Gradiente de texto branco → cinza */
.accent-text  /* Gradiente de texto teal */
.dotgrid      /* Background com grid de pontos teal */
.honeycomb    /* Background com padrão hexagonal SVG */
.grain        /* Overlay de ruído analógico SVG */
.atmo-glow    /* Sunrise glow teal (usado no fundo de seções) */
```

---

## Sistema de Animações

### 1. Intro 3D — `IntroAnimation.tsx`
- Carrega `Objeto3D_VoicIA.glb` via Three.js `GLTFLoader`
- Sequência GSAP: **pop-in** → **flip 360° eixo Y** → **bounce punch** → **shrink out**
- Ao finalizar, dispara `CustomEvent("intro-finished")` no `window` e seta `window.__introFinished = true`
- **Todos os demais componentes aguardam esse evento** antes de iniciar suas animações

### 2. Typewriter — `SplitText.tsx`

```tsx
<SplitText
  text="Texto aqui"
  delay={0.3}           // atraso em segundos antes de começar
  stagger={0.07}        // intervalo entre cada caractere
  showCursor            // exibe cursor barra
  hideCursorOnComplete  // oculta cursor ao terminar (para encadear)
  charClassName="text-[#63AAA2]"  // classe aplicada a cada char
/>
```

O cursor acompanha cada caractere revelado em tempo real via `gsap.timeline`.

### 3. ScrollTrigger — seções

Cada seção aplica animações de entrada ao scroll com `once: true`:

| Seção | Efeito |
|---|---|
| Metrics | Counters numéricos 0 → valor + stagger reveal |
| Features | Header fade-up + cards stagger com scale |
| Advantages | Colunas slide-in da esquerda/direita + list stagger |
| Security | Cards stagger com `rotateX` (profundidade) |
| Testimonials | Cards stagger com leve `rotateZ` |
| Pricing | Scale bounce (`back.out`) + stagger dos perks |
| FAQ | Header + items fade-up |
| CtaBanner | Heading → subtitle → buttons (sequencial) |
| Footer | Colunas com stagger suave |

### 4. Container Scroll — `container-scroll-animation.tsx`
Port da [Aceternity UI](https://ui.aceternity.com/components/container-scroll-animation):
- Card rotaciona `20° → 0°` no eixo X + scale `1.05 → 1` conforme o scroll
- Usa `useScroll` + `useTransform` do Framer Motion

### 5. Sonic Waveform — `sonic-waveform.tsx`
- Canvas 2D com 50 linhas de ondas senoidais em loop
- Movimento do mouse influencia a amplitude das ondas em tempo real
- **Desativado automaticamente** em mobile e `prefers-reduced-motion`
- Pausa quando fora da viewport via `IntersectionObserver`

---

## Dependências Principais

| Pacote | Versão | Uso |
|---|---|---|
| `next` | 16.2.3 | Framework |
| `react` | 19.2.4 | UI |
| `gsap` | ^3.15.0 | Animações + ScrollTrigger |
| `framer-motion` | latest | Container scroll |
| `three` | ^0.134.0 | Intro 3D + WebGL |
| `lucide-react` | latest | Ícones SVG |
| `tailwindcss` | ^4 | Estilização |
| `vanta` | ^0.5.24 | (legado, mantido no bundle) |

---

## Performance

- Sonic Waveform **desativado em mobile** (viewport ≤ 768px)
- Three.js **pausa renderização** quando fora da viewport (`IntersectionObserver`)
- Pixel ratio **limitado a 1.5** para reduzir carga GPU
- `prefers-reduced-motion` **respeitado** em todas as animações GSAP e Three.js
- `next/image` com `priority` nas imagens acima do fold
- Fontes **self-hosted** via `next/font` — sem requisição externa, zero CLS

---

## Contribuição

```bash
# 1. Crie uma branch para sua feature
git checkout -b feat/nome-da-feature

# 2. Faça seus commits com mensagens semânticas
git commit -m "feat: descrição da mudança"

# 3. Envie e abra um Pull Request
git push origin feat/nome-da-feature
```

---

## Licença

Projeto proprietário — VoicIA © 2025. Todos os direitos reservados.
