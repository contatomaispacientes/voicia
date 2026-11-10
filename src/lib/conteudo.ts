// Tudo o que o site afirma sobre a VoicIA vem do que a plataforma faz hoje
// (app.voicia.com.br, nov/2026). Nada de número ou depoimento inventado.

export const APP = "https://app.voicia.com.br";
export const CADASTRO = `${APP}/auth`;
export const TERMOS = `${APP}/termos.html`;
export const PRIVACIDADE = `${APP}/privacidade.html`;
export const API_DOCS = `${APP}/api-docs`;

export const PRECO = {
  mensal: "247",
  mensalCentavos: "00",
  // Igual ao Stripe (lookup keys voicia_monthly / voicia_yearly), conferido em 10/11/2026.
  anual: "197",
  anualCentavos: "00",
  anualTotal: "2.364,00",
  testeDias: 30,
};

export const ESPECIALIDADES = [
  "Clínica Geral", "Cardiologia", "Pediatria", "Ortopedia", "Ginecologia", "Obstetrícia",
  "Dermatologia", "Endocrinologia", "Neurologia", "Psiquiatria", "Gastroenterologia", "Geriatria",
  "Oftalmologia", "Otorrinolaringologia", "Pneumologia", "Reumatologia", "Urologia", "Oncologia",
  "Hematologia", "Infectologia", "Mastologia", "Neurocirurgia", "Coloproctologia", "Cirurgia",
  "Medicina do Esporte", "Nutrologia", "Nutrição", "Psicologia",
];

export const ATALHOS_DO_SUPORTE = [
  { grupo: "Raciocínio clínico", itens: ["Diagnóstico diferencial", "Interações medicamentosas", "Diretrizes atuais", "Literatura recente", "Insights"] },
  { grupo: "Documentos", itens: ["Receita", "Exames", "Relatórios"] },
  { grupo: "Depois da consulta", itens: ["Pós-consulta", "Análise de exames"] },
];

export const DOCUMENTOS = [
  "Receita", "Pedido de exames", "Atestado", "Declaração de comparecimento", "Encaminhamento",
  "Laudo médico", "Relatório de acompanhamento", "Relatório para convênio", "Relatório para afastamento/INSS",
  "Relatório cirúrgico",
];

export type Pergunta = { categoria: string; p: string; r: string };

export const PERGUNTAS: Pergunta[] = [
  { categoria: "Geral", p: "O que é a VoicIA?", r: "É uma plataforma de prontuário por voz com inteligência artificial. Você grava a consulta, a VoicIA transcreve, organiza o prontuário nos campos da sua especialidade e prepara receitas e documentos para você revisar e assinar." },
  { categoria: "Geral", p: "Preciso instalar alguma coisa?", r: "Não. A VoicIA funciona no navegador, em app.voicia.com.br. No celular, você pode usar o navegador ou o app VoicIA, que serve de microfone e de câmera para a consulta aberta no computador." },
  { categoria: "Geral", p: "A VoicIA substitui o meu prontuário eletrônico?", r: "Não precisa substituir. Muitos médicos usam a VoicIA para escrever e depois copiam ou baixam o texto para o sistema da clínica. Ela também guarda o histórico de cada paciente, se você preferir usar só ela." },
  { categoria: "Uso", p: "Como funciona a gravação?", r: "Você aperta Gravar no computador ou no celular e conduz a consulta normalmente. Dá para pausar e retomar. Ao finalizar, a IA monta o prontuário com queixa, história, exame físico, hipóteses, conduta e prescrição." },
  { categoria: "Uso", p: "Funciona para a minha especialidade?", r: "A VoicIA tem campos de prontuário próprios para 28 especialidades, de clínica geral a cardiologia, pediatria, ortopedia e psiquiatria, e você pode ligar, desligar e reordenar os campos do jeito que trabalha." },
  { categoria: "Uso", p: "Posso usar o celular para fotografar exames e receitas?", r: "Sim. O celular se conecta à consulta aberta no computador pelo QR code. Você fotografa o documento e a IA identifica se é receita, exame ou outro documento e coloca cada informação no lugar certo." },
  { categoria: "Uso", p: "A IA decide alguma coisa por mim?", r: "Não. O Suporte Médico sugere diagnósticos diferenciais, aponta interações e resume diretrizes, mas toda decisão e toda prescrição são do médico. Você revisa tudo antes de imprimir ou assinar." },
  { categoria: "Uso", p: "Consigo assinar digitalmente?", r: "Sim. Você pode conectar seu certificado digital Bird ID (Soluti) nas configurações e assinar os documentos dentro da VoicIA. Também dá para imprimir ou baixar em PDF com o logo da sua clínica." },
  { categoria: "Segurança", p: "Onde ficam os dados?", r: "O sistema e o banco de dados rodam em servidor no Brasil. Os dados são criptografados em trânsito e em repouso. Alguns serviços de IA usados para transcrever e estruturar o texto podem processar dados fora do Brasil, sempre com as salvaguardas descritas na política de privacidade." },
  { categoria: "Segurança", p: "Como a VoicIA cuida da LGPD?", r: "O médico ou a clínica é o controlador dos dados dos pacientes e a VoicIA atua como operadora. A plataforma permite exportar e excluir os dados de um paciente a pedido dele, e há um encarregado de dados (DPO) para atender titulares." },
  { categoria: "Planos", p: "Posso testar antes de pagar?", r: "Sim. Você tem 30 dias grátis para usar a VoicIA na sua rotina. Pode cancelar quando quiser." },
  { categoria: "Planos", p: "Como funciona a cobrança?", r: "A assinatura pode ser mensal ou anual, com desconto no anual. O pagamento é processado pelo Stripe e você cancela quando quiser, sem multa." },
  { categoria: "Planos", p: "Tem plano para clínicas e hospitais?", r: "Sim. Para equipes com vários médicos, integrações ou necessidades específicas, montamos uma proposta sob medida." },
];
