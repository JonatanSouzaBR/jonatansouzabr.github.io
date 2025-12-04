export interface MasterclassDetail {
  id: string;
  title: string;
  tagline: string;
  maturity: string;
  duration: string;
  matchScore: number;
  genres: string[];
  thumbnail: string;
  heroImage: string;
  videoImage: string;
  description: string;
  mentor: string;
  mentorImage: string;
  tags: string[];
  price: number;
  top10Rank?: number;
  continueWatching?: boolean;
  progress?: number;
}

export interface MasterclassSummary {
  id: string;
  title: string;
  maturity: string;
  duration: string;
  thumbnail: string;
  tags: string[];
  matchScore?: number;
  top10Rank?: number;
  continueWatching?: boolean;
  progress?: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  tagline: string;
  maturity: string;
  duration: string;
  matchScore: number;
  genres: string[];
  heroImage: string;
}

const BASE_MASTERCLASSES: MasterclassDetail[] = [
  {
    id: 'lideranca-fusao',
    title: 'Liderança em Fusão de Startups',
    tagline: 'Ana Toledo guia CEOs no alinhamento cultural e na retenção de talentos em fusões aceleradas.',
    maturity: 'Sênior • Liderança',
    duration: 'Série de mentoria • 8 capítulos',
    matchScore: 97,
    genres: ['Liderança', 'Cultura', 'People'],
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&auto=format&fit=crop&q=80',
    videoImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&auto=format&fit=crop&q=80',
    description: 'Construa segurança cultural em cenários de fusão, aprenda a comunicar novas direções e retenha talentos-chave durante mudanças agressivas.',
    mentor: 'Ana Toledo',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['new', 'lideres'],
    price: 349
  },
  {
    id: 'produto-ia',
    title: 'Produto com IA Generativa Hands-on',
    tagline: 'Felipe Costa prototipa features com IA em tempo real, do discovery ao go-to-market.',
    maturity: 'Avançado • Produto digital',
    duration: 'Programa intensivo • 6 módulos',
    matchScore: 95,
    genres: ['Produto', 'IA', 'Growth'],
    thumbnail: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=1920&auto=format&fit=crop&q=80',
    videoImage: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=1920&auto=format&fit=crop&q=80',
    description: 'Implemente experimentos com IA generativa, desde a priorização até o rollout com guardrails responsáveis para squads de produto.',
    mentor: 'Felipe Costa',
    mentorImage: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&auto=format&fit=crop&q=80',
    tags: ['new', 'produto'],
    price: 329
  },
  {
    id: 'cx-playbook-omni',
    title: 'CX Playbook Omnichannel',
    tagline: 'Camila Ferreira transforma métricas de CS em rotinas diárias com dashboards vivos.',
    maturity: 'Intermediário • Experiência do Cliente',
    duration: 'Mentoria gravada • 10 episódios',
    matchScore: 92,
    genres: ['Customer Success', 'Jornada', 'Dados'],
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&auto=format&fit=crop&q=80',
    videoImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&auto=format&fit=crop&q=80',
    description: 'Estruture playbooks omnichannel com indicadores acionáveis e rotinas que aproximam produto, CS e operações em tempo real.',
    mentor: 'Camila Ferreira',
    mentorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    tags: ['new', 'people'],
    price: 319
  },
  {
    id: 'north-star-lab',
    title: 'North Star Strategy Lab',
    tagline: 'Descubra o indicador único que guia todas as suas decisões de produto.',
    maturity: 'Sênior',
    duration: '5h • frameworks editáveis',
    matchScore: 98,
    genres: ['Estratégia', 'Liderança'],
    thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1920&auto=format&fit=crop&q=90',
    description: 'Organize seu time em torno de um único objetivo mensurável, conectando métricas táticas à visão de longo prazo.',
    mentor: 'Davi Mendes',
    mentorImage: 'https://images.unsplash.com/photo-1544723795-432537f12f6c?w=400&auto=format&fit=crop&q=80',
    tags: ['new', 'top10', 'lideres'],
    price: 329,
    top10Rank: 1
  },
  {
    id: 'genai-studio',
    title: 'Discovery com IA Generativa',
    tagline: 'Scripts e prompts para destravar research em squads data-driven.',
    maturity: 'Avançado',
    duration: '3h40 • toolkits editáveis',
    matchScore: 95,
    genres: ['Produto', 'IA'],
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1483817101829-339b08e8d83f?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1483817101829-339b08e8d83f?w=1920&auto=format&fit=crop&q=90',
    description: 'Use IA para sintetizar entrevistas, gerar hipóteses e montar roteiros de discovery em dias, não semanas.',
    mentor: 'Luisa Prado',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['new', 'top10', 'produto'],
    price: 319,
    top10Rank: 2,
    continueWatching: true,
    progress: 28
  },
  {
    id: 'subscription-growth',
    title: 'Growth em Plataformas de Assinatura',
    tagline: 'Estruture jornadas pagas com cohorts e testes contínuos.',
    maturity: 'Avançado',
    duration: '2h50 • 6 capítulos',
    matchScore: 93,
    genres: ['Growth', 'Produto'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&auto=format&fit=crop&q=90',
    description: 'Construa loops de retenção e monetização para produtos por assinatura, com testes guiados por dados reais.',
    mentor: 'Rafael Linhares',
    mentorImage: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&auto=format&fit=crop&q=80',
    tags: ['top10', 'produto'],
    price: 309,
    top10Rank: 3
  },
  {
    id: 'okr-people-pro',
    title: 'OKRs para Times de People',
    tagline: 'Traduza cultura e clima em objetivos rastreáveis.',
    maturity: 'Intermediário',
    duration: '2h20 • planilhas na prática',
    matchScore: 90,
    genres: ['People', 'Processos'],
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&auto=format&fit=crop&q=90',
    description: 'Defina indicadores para clima, diversidade e performance com check-ins semanais replicáveis.',
    mentor: 'Helena Vaz',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['top10', 'people'],
    price: 289,
    top10Rank: 4
  },
  {
    id: 'pitch-masterclass',
    title: 'Storytelling Comercial e Pitch',
    tagline: 'Eleve suas apresentações com narrativas cinematográficas.',
    maturity: 'Todos os níveis',
    duration: '2h20 • frameworks editáveis',
    matchScore: 91,
    genres: ['Storytelling', 'Vendas'],
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&auto=format&fit=crop&q=90',
    description: 'Tenha roteiros que conectam dados e emoção, com frameworks reutilizáveis para vendas e liderança.',
    mentor: 'Igor Duarte',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['new', 'top10', 'criativos'],
    price: 279,
    top10Rank: 5
  },
  {
    id: 'fintech-ops-squad',
    title: 'Escalada de Operações em Fintechs',
    tagline: 'Sustente crescimento agressivo com processos antifraude.',
    maturity: 'Sênior',
    duration: '3h10 • estudos de caso',
    matchScore: 92,
    genres: ['Operações', 'Fintech'],
    thumbnail: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1920&auto=format&fit=crop&q=90',
    description: 'Implemente squads de risco, atendimento e operações com indicadores de SLA para cada fase do funil.',
    mentor: 'Marcos Paiva',
    mentorImage: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&auto=format&fit=crop&q=80',
    tags: ['top10', 'lideres'],
    price: 309,
    top10Rank: 6
  },
  {
    id: 'design-ops-remote',
    title: 'Design Ops para Squads Distribuídos',
    tagline: 'Industrialize decisões de design à distância.',
    maturity: 'Intermediário',
    duration: '3h05 • templates prontos',
    matchScore: 89,
    genres: ['Design', 'Processos'],
    thumbnail: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1920&auto=format&fit=crop&q=90',
    description: 'Monte pipelines para pesquisas, críticas assíncronas e handoffs com eficiência global.',
    mentor: 'Sofia Andrade',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['top10', 'produto'],
    price: 289,
    top10Rank: 7
  },
  {
    id: 'people-analytics-live',
    title: 'People Analytics na Prática',
    tagline: 'Dashboards que conectam sentimento e performance.',
    maturity: 'Avançado',
    duration: '4h • dashboards prontos',
    matchScore: 87,
    genres: ['People', 'Dados'],
    thumbnail: 'https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1920&auto=format&fit=crop&q=90',
    description: 'Construa painéis que relacionam engajamento, turnover e metas com insights acionáveis.',
    mentor: 'Bianca Rezende',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['top10', 'people', 'continue'],
    price: 299,
    top10Rank: 8,
    continueWatching: true,
    progress: 52
  },
  {
    id: 'okr-b2b',
    title: 'OKRs para Escala B2B',
    tagline: 'Playbook completo para alinhar vendas, marketing e produto.',
    maturity: 'Sênior',
    duration: '5h • playbook completo',
    matchScore: 94,
    genres: ['Estratégia', 'B2B'],
    thumbnail: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1920&auto=format&fit=crop&q=90',
    description: 'Alinhe previsões de receita e squads técnicos com cadência trimestral centrada em resultados.',
    mentor: 'Rodrigo Milani',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['lideres', 'continue'],
    price: 339,
    top10Rank: 9,
    continueWatching: true,
    progress: 42
  },
  {
    id: 'enterprise-research',
    title: 'Pesquisa com Clientes Enterprise',
    tagline: 'Crie roteiros que abrem portas em accounts estratégicos.',
    maturity: 'Intermediário',
    duration: '2h30 • roteiros aplicados',
    matchScore: 88,
    genres: ['Pesquisa', 'Enterprise'],
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&auto=format&fit=crop&q=90',
    description: 'Planeje entrevistas com C-levels, colete insights e converta descobertas em planos executáveis.',
    mentor: 'Laura Marchi',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['people', 'criativos'],
    price: 289,
    top10Rank: 10
  },
  {
    id: 'branding-founders',
    title: 'Branding Autoral para Founders',
    tagline: 'Construa autoridade com narrativas pessoais reais.',
    maturity: 'Todos os níveis',
    duration: '1h55 • exercícios guiados',
    matchScore: 83,
    genres: ['Branding', 'Storytelling'],
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&auto=format&fit=crop&q=90',
    description: 'Transforme valores pessoais em branding consistente, com assets visuais e textuais prontos.',
    mentor: 'Paula Kato',
    mentorImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop&q=80',
    tags: ['criativos'],
    price: 259
  },
  {
    id: 'governance-boardroom',
    title: 'Governança para Conselhos Consultivos',
    tagline: 'Implemente rotinas e indicadores para conselhos atuantes.',
    maturity: 'Sênior',
    duration: '2h40 • modelos oficiais',
    matchScore: 95,
    genres: ['Governança', 'Liderança'],
    thumbnail: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1920&auto=format&fit=crop&q=90',
    description: 'Construa agendas, comitês e painéis para conselhos consultivos que realmente destravam decisões.',
    mentor: 'Eduardo Leal',
    mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    tags: ['lideres'],
    price: 349
  },
  {
    id: 'diversity-blueprint',
    title: 'Diversidade como Estratégia de Negócio',
    tagline: 'Checklists para transformar discurso em metas tangíveis.',
    maturity: 'Intermediário',
    duration: '3h • checklists prontos',
    matchScore: 84,
    genres: ['People', 'Cultura'],
    thumbnail: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&auto=format&fit=crop&q=90',
    description: 'Monte metas, comitês e relatórios trimestrais de diversidade alinhados ao core business.',
    mentor: 'Clarice Matta',
    mentorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    tags: ['people'],
    price: 279
  },
  {
    id: 'feedback-radical-pro',
    title: 'Feedback Radical para Novas Lideranças',
    tagline: 'Domine conversas difíceis com frameworks simples.',
    maturity: 'Todos os níveis',
    duration: '2h • roteiros prontos',
    matchScore: 86,
    genres: ['Liderança', 'Comunicação'],
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1920&auto=format&fit=crop&q=90',
    description: 'Conduza conversas 1:1 com segurança jurídica e emocional, criando planos de melhoria reais.',
    mentor: 'Juliana Prado',
    mentorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    tags: ['lideres'],
    price: 259
  },
  {
    id: 'executive-comms',
    title: 'Comunicação Executiva para Conselhos',
    tagline: 'Traduza complexidade em narrativas estratégicas.',
    maturity: 'Sênior',
    duration: '2h20 • roteiros práticos',
    matchScore: 89,
    genres: ['Storytelling', 'Governança'],
    thumbnail: 'https://images.unsplash.com/photo-1521579971123-1192931a1452?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1450849608880-6f787542c88a?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1450849608880-6f787542c88a?w=1920&auto=format&fit=crop&q=90',
    description: 'Organize apresentações com visualização de dados e mensagens que engajam conselhos.',
    mentor: 'Ricardo Queiroz',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['criativos', 'lideres'],
    price: 309
  },
  {
    id: 'discovery-rituals',
    title: 'Rituais de Produto e Discovery Contínuo',
    tagline: 'Implemente cadência semanal de aprendizado com clientes.',
    maturity: 'Intermediário',
    duration: '3h • frameworks',
    matchScore: 88,
    genres: ['Produto', 'Pesquisa'],
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&auto=format&fit=crop&q=90',
    description: 'Crie squads que aprendem continuamente com clientes sem perder velocidade de entrega.',
    mentor: 'Vitor Kendi',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['produto'],
    price: 299
  },
  {
    id: 'revenue-ops-lab',
    title: 'Revenue Ops para SaaS B2B',
    tagline: 'Integre marketing, vendas e CS em um backoffice único.',
    maturity: 'Avançado',
    duration: '3h30 • planilhas editáveis',
    matchScore: 92,
    genres: ['Revenue', 'Operações'],
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&auto=format&fit=crop&q=90',
    description: 'Implemente processos de receita previsível com playbooks compartilhados entre todos os times.',
    mentor: 'Guilherme Azevedo',
    mentorImage: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&auto=format&fit=crop&q=80',
    tags: ['produto', 'lideres'],
    price: 339
  },
  {
    id: 'career-shift-leaders',
    title: 'Transição de Carreira para Liderança',
    tagline: 'Mapeie competências e reposicione sua narrativa profissional.',
    maturity: 'Intermediário',
    duration: '2h50 • exercícios guiados',
    matchScore: 90,
    genres: ['Carreira', 'Liderança'],
    thumbnail: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1529333168431-9a1629a19c91?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1529333168431-9a1629a19c91?w=1920&auto=format&fit=crop&q=90',
    description: 'Construa um plano de 90 dias para assumir posições de liderança com segurança.',
    mentor: 'Renata Góes',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['people', 'continue'],
    price: 289,
    continueWatching: true,
    progress: 61
  },
  {
    id: 'negotiation-enterprise',
    title: 'Negociação Enterprise Hands-on',
    tagline: 'Frameworks para lidar com ciclos longos e múltiplos decisores.',
    maturity: 'Avançado',
    duration: '3h05 • playbook completo',
    matchScore: 85,
    genres: ['Vendas', 'Enterprise'],
    thumbnail: 'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=1920&auto=format&fit=crop&q=90',
    description: 'Domine âncoras, concessões e gestão de stakeholders para fechar contratos milionários.',
    mentor: 'Tatiana Rios',
    mentorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    tags: ['lideres'],
    price: 319
  },
  {
    id: 'hunter-closer-pro',
    title: 'Hunter, Closer e Account Executivo',
    tagline: 'Crie rituais e métricas para cada perfil de vendas.',
    maturity: 'Intermediário',
    duration: '2h45 • roteiros comerciais',
    matchScore: 84,
    genres: ['Vendas', 'Processos'],
    thumbnail: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1920&auto=format&fit=crop&q=90',
    description: 'Implemente playbooks diferenciados para hunters, closers e accounts com transferências suaves.',
    mentor: 'Diego Antunes',
    mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    tags: ['criativos'],
    price: 279
  },
  {
    id: 'employee-branding-live',
    title: 'Employee Branding na Prática',
    tagline: 'Transforme colaboradores em embaixadores autênticos.',
    maturity: 'Livre',
    duration: 'Série curta • 6 episódios',
    matchScore: 80,
    genres: ['People', 'Marca Empregadora'],
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1920&auto=format&fit=crop&q=90',
    description: 'Monte campanhas internas e trilhas de conteúdo que fortalecem a reputação da sua marca empregadora.',
    mentor: 'Carol Souza',
    mentorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    tags: ['people'],
    price: 249
  },
  {
    id: 'women-tech-path',
    title: 'Carreira Global para Mulheres em Tech',
    tagline: 'Mapeie trilhas internacionais com mentoras que já chegaram lá.',
    maturity: 'Intermediário',
    duration: '3h • trilhas e templates',
    matchScore: 82,
    genres: ['Carreira', 'Diversidade'],
    thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&auto=format&fit=crop&q=90',
    description: 'Crie portfólios, networking e estratégias de mudança para hubs globais de tecnologia.',
    mentor: 'Letícia Kobayashi',
    mentorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tags: ['people', 'criativos'],
    price: 289
  },
  {
    id: 'coaching-ai',
    title: 'Coaching Executivo com IA',
    tagline: 'Integre IA generativa às suas sessões de mentoria.',
    maturity: 'Sênior',
    duration: '2h • sessões demonstrativas',
    matchScore: 87,
    genres: ['Liderança', 'IA'],
    thumbnail: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=1920&auto=format&fit=crop&q=90',
    description: 'Use IA para preparar sessões, construir planos de ação e dar feedback em escala.',
    mentor: 'Marcela Lima',
    mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    tags: ['lideres'],
    price: 319
  },
  {
    id: 'gamification-lab',
    title: 'Gamificação para Treinamentos',
    tagline: 'Transforme conteúdo corporativo em experiências memoráveis.',
    maturity: 'Intermediário',
    duration: '1h45 • canvas aplicável',
    matchScore: 83,
    genres: ['Learning', 'Design'],
    thumbnail: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&auto=format&fit=crop&q=90',
    videoImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&auto=format&fit=crop&q=90',
    description: 'Crie mecânicas de jogo para onboarding, reciclagem e programas de liderança rapidamente.',
    mentor: 'Bruno Cassiano',
    mentorImage: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&auto=format&fit=crop&q=80',
    tags: ['criativos'],
    price: 259
  }
];

export const MASTERCLASS_DETAIL_DATA = BASE_MASTERCLASSES.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, MasterclassDetail>);

const MASTERCLASS_ORDER = [
  'north-star-lab',
  'genai-studio',
  'subscription-growth',
  'okr-people-pro',
  'pitch-masterclass',
  'fintech-ops-squad',
  'design-ops-remote',
  'people-analytics-live',
  'okr-b2b',
  'enterprise-research',
  'branding-founders',
  'governance-boardroom',
  'diversity-blueprint',
  'feedback-radical-pro',
  'executive-comms',
  'discovery-rituals',
  'revenue-ops-lab',
  'career-shift-leaders',
  'negotiation-enterprise',
  'hunter-closer-pro',
  'employee-branding-live',
  'women-tech-path',
  'coaching-ai',
  'gamification-lab'
];

export const MASTERCLASS_SUMMARY: MasterclassSummary[] = MASTERCLASS_ORDER
  .map(id => MASTERCLASS_DETAIL_DATA[id])
  .filter((item): item is MasterclassDetail => Boolean(item))
  .map(item => ({
    id: item.id,
    title: item.title,
    maturity: item.maturity,
    duration: item.duration,
    thumbnail: item.thumbnail,
    tags: item.tags,
    matchScore: item.matchScore,
    top10Rank: item.top10Rank,
    continueWatching: item.continueWatching,
    progress: item.progress
  }));

const HERO_IDS = ['lideranca-fusao', 'produto-ia', 'cx-playbook-omni'];

export const HERO_SLIDES: HeroSlide[] = HERO_IDS
  .map(id => MASTERCLASS_DETAIL_DATA[id])
  .filter((item): item is MasterclassDetail => Boolean(item))
  .map(item => ({
    id: item.id,
    title: item.title,
    tagline: item.tagline,
    maturity: item.maturity,
    duration: item.duration,
    matchScore: item.matchScore,
    genres: item.genres,
    heroImage: item.heroImage
  }));

