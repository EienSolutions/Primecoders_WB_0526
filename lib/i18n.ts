// lib/i18n.ts — translations EN/ES (migrated from i18n.jsx).

export type Lang = 'es' | 'en';

export interface I18nLeaf {
  es: string;
  en: string;
}

export interface I18nLeafArr {
  es: string[];
  en: string[];
}

export const I18N = {
  // ── Nav ──────────────────────────────────────────────
  nav: {
    pillars:  { es: 'Pillars',   en: 'Pillars'   },
    lab:      { es: 'The_Lab',   en: 'The_Lab'   },
    vault:    { es: 'The_Vault', en: 'The_Vault' },
    stack:    { es: 'Stack',     en: 'Stack'     },
    contact:  { es: 'Contact',   en: 'Contact'   },
    status:   { es: 'SYS_ONLINE · MX', en: 'SYS_ONLINE · MX' },
  },

  // ── Hero ─────────────────────────────────────────────
  hero: {
    tagPrimary:   { es: 'Data-First Engineering', en: 'Data-First Engineering' },
    tagSecondary: { es: '~/primecoders', en: '~/primecoders' },
    sub: {
      es: 'Construimos plataformas web y móviles de alto rendimiento, impulsadas por ciencia de datos y arquitecturas en la nube ultra-eficientes.',
      en: 'We build high-performance web & mobile platforms, powered by data science and ultra-efficient cloud architectures.',
    },
    cta1:   { es: '▸ Iniciar Alianza', en: '▸ Start Alliance' },
    cta2:   { es: 'Ver The Lab',       en: 'See The Lab'      },
    badge1: { es: 'uptime',            en: 'uptime' },
    badge2: { es: 'aws_cost_saved',    en: 'aws_cost_saved' },
    badge3: { es: 'ml_inferences/day', en: 'ml_inferences/day' },
    head: {
      default: {
        es: { pre: 'Code.', mid: 'Data.', tail: 'Growth.', sub: 'Tu socio tecnológico definitivo.' },
        en: { pre: 'Code.', mid: 'Data.', tail: 'Growth.', sub: 'Your definitive tech partner.' },
      },
      sharper: {
        es: { pre: 'Ship_software.', mid: 'Read_signals.', tail: 'Scale_business.', sub: 'Ingeniería que entiende de negocio.' },
        en: { pre: 'Ship_software.', mid: 'Read_signals.', tail: 'Scale_business.', sub: 'Engineering that speaks business.' },
      },
      bold: {
        es: { pre: 'Build', mid: 'Decide', tail: 'Win', sub: 'Plataformas data-first para empresas que escalan.' },
        en: { pre: 'Build', mid: 'Decide', tail: 'Win', sub: 'Data-first platforms for companies that scale.' },
      },
    },
    terminalLines: {
      es: [
        '$ primecoders init --client="tu_negocio"',
        '› analizando flujo de datos...........[ok]',
        '› arquitectura: serverless + edge.....[ok]',
        '› ml_pipeline: scikit + sagemaker.....[ok]',
        '› aws_budget: optimizado -34%.........[ok]',
        '$ deploy --target=growth',
        '✓ socio tecnológico online.',
      ],
      en: [
        '$ primecoders init --client="your_business"',
        '› analyzing data streams..............[ok]',
        '› architecture: serverless + edge.....[ok]',
        '› ml_pipeline: scikit + sagemaker.....[ok]',
        '› aws_budget: optimized -34%..........[ok]',
        '$ deploy --target=growth',
        '✓ tech partner online.',
      ],
    },
  },

  // ── Pillars ──────────────────────────────────────────
  pillars: {
    tag: { es: '// pillars · diferenciadores', en: '// pillars · differentiators' },
    title: {
      es: ['Tres ejes. Cero ', 'improvisación', '.'],
      en: ['Three pillars. Zero ', 'improvisation', '.'],
    },
    sub: {
      es: 'Cada decisión técnica está atada a un resultado de negocio. Sin ceremonia, sin slop.',
      en: 'Every technical decision tied to a business outcome. No ceremony, no slop.',
    },
    p1Tag: { es: 'data-driven', en: 'data-driven' },
    p1Title: {
      es: ['Decisiones que ', 'se miden', ', no que se intuyen.'],
      en: ['Decisions that ', 'measure', ', not ones that guess.'],
    },
    p1Body: {
      es: 'Analítica, ciencia de datos y ML desde el día uno. Cada feature lleva un evento; cada evento alimenta un dashboard accionable.',
      en: 'Analytics, data science and ML from day one. Every feature emits an event; every event feeds an actionable dashboard.',
    },
    m1: { es: 'revenue_lift',    en: 'revenue_lift' },
    m2: { es: 'time_to_insight', en: 'time_to_insight' },
    p2Tag:   { es: 'scale ↗', en: 'scale ↗' },
    p2Title: { es: 'Arquitecturas que crecen contigo', en: 'Architectures that scale with you' },
    p2Body: {
      es: 'Full-stack TypeScript de alto rendimiento. De 100 usuarios a 10M sin reescribir.',
      en: 'High-performance full-stack TypeScript. From 100 users to 10M without a rewrite.',
    },
    p3Tag: { es: 'aws · cloud', en: 'aws · cloud' },
    p3Title: {
      es: ['AWS sin ', 'desperdiciar', ' presupuesto'],
      en: ['AWS without ', 'wasting', ' budget'],
    },
    p3Body: {
      es: 'Serverless inteligente, blindaje de datos y observabilidad real.',
      en: 'Smart serverless, hardened data, real observability.',
    },
  },

  // ── Lab ──────────────────────────────────────────────
  lab: {
    tag: { es: '// the_lab · soluciones', en: '// the_lab · solutions' },
    title: {
      es: ['Donde el código se vuelve ', 'palanca', ' de negocio.'],
      en: ['Where code becomes business ', 'leverage', '.'],
    },
    sub: {
      es: 'Cuatro frentes en los que ya tenemos calibrado el playbook. Cada uno con su problema, su stack y su outcome.',
      en: 'Four fronts where the playbook is calibrated. Each with its problem, its stack, and its outcome.',
    },
    re: {
      title: { es: 'Chatbots con IA + CRM/CMS', en: 'AI Chatbots + CRM/CMS' },
      sub: {
        es: 'Conectamos propiedades con clientes calificados, sin que un humano levante el teléfono a las 2 a.m.',
        en: 'We match properties to qualified leads without a human picking up the phone at 2am.',
      },
      bot1: {
        es: 'Hola Marta 👋 ¿Sigues buscando depa de 2 rec en Roma Norte, max $45k?',
        en: 'Hi Marta 👋 Still hunting for a 2-bed in Roma Norte, max $45k?',
      },
      user1: {
        es: 'Sí, pero ahora también estoy abierta a Condesa.',
        en: "Yes, but now I'm also open to Condesa.",
      },
      bot2: {
        es: 'Tengo 3 que coinciden. Te paso ficha del que más se ajusta a tu historial:',
        en: "Got 3 matches. Here's the closest fit to your history:",
      },
      sentiment: {
        es: 'sentiment: alto · lead_score: 0.87',
        en: 'sentiment: high · lead_score: 0.87',
      },
      pipelineLabel: { es: 'crm.pipeline', en: 'crm.pipeline' },
      leads24h:      { es: 'leads/24h',    en: 'leads/24h'    },
      stages: {
        hot:        { es: 'hot',        en: 'hot' },
        qualifying: { es: 'qualifying', en: 'qualifying' },
        tour:       { es: 'tour',       en: 'tour' },
        cold:       { es: 'cold',       en: 'cold' },
      },
      propUnits: { es: '78m² · 2rec',    en: '78m² · 2bed' },
      propPrice: { es: '$ 41,500 / mes', en: '$ 41,500 / mo' },
      match:     { es: 'match 94%',      en: 'match 94%' },
      outcome:   { es: 'time-to-lead -76%', en: 'time-to-lead -76%' },
    },
    auto: {
      title: { es: 'Inventario en tiempo real', en: 'Real-time inventory' },
      sub: {
        es: 'CMS para concesionarias con control de stock multi-sucursal y portales públicos sincronizados.',
        en: 'Dealership CMS with multi-branch stock control and synced public-facing portals.',
      },
      stockLabel: { es: 'stock.live',                en: 'stock.live' },
      syncStatus: { es: 'sync_status (last_24h)',    en: 'sync_status (last_24h)' },
      outcome:    { es: 'stock accuracy 99.4%',      en: 'stock accuracy 99.4%' },
    },
    bi: {
      title: { es: 'Dashboards y Data Lakes', en: 'Dashboards & Data Lakes' },
      sub: {
        es: 'Centralizamos facturación, POS y CRM en una sola fuente de verdad accionable.',
        en: 'We centralize billing, POS and CRM into one actionable source of truth.',
      },
      revenue:   { es: 'revenue_mtd',     en: 'revenue_mtd' },
      revSub:    { es: '+18% vs prev',    en: '+18% vs prev' },
      conv:      { es: 'conv_rate',       en: 'conv_rate' },
      convSub:   { es: '+0.6 pts',        en: '+0.6 pts' },
      funnelLbl: { es: 'funnel · pos+web', en: 'funnel · pos+web' },
      outcome:   { es: 'reporting time -89%', en: 'reporting time -89%' },
    },
    ai: {
      title: { es: 'Automatización con IA aplicada', en: 'Applied AI automation' },
      sub: {
        es: 'Procesos repetitivos → modelos entrenados → equipo liberado para lo que importa.',
        en: 'Repetitive processes → trained models → team freed for what matters.',
      },
      labels: {
        problem: { es: 'problem', en: 'problem' },
        stack:   { es: 'stack',   en: 'stack' },
        outcome: { es: 'outcome', en: 'outcome' },
      },
      a1: {
        title:   { es: 'OCR + clasificación de facturas', en: 'OCR + invoice classification' },
        problem: { es: 'Capturista revisa 600 docs/día.', en: 'Data-entry reviews 600 docs/day.' },
        outcome: { es: '14h/sem → 22min',                  en: '14h/wk → 22min' },
      },
      a2: {
        title:   { es: 'Forecast de demanda multi-SKU', en: 'Multi-SKU demand forecasting' },
        problem: { es: 'Stockouts por intuición.',       en: 'Stockouts driven by guesswork.' },
        outcome: { es: 'mape 6.4%',                      en: 'mape 6.4%' },
      },
      a3: {
        title:   { es: 'Atención conversacional 24/7', en: 'Conversational support 24/7' },
        problem: { es: 'Tickets repetidos saturan soporte.', en: 'Repetitive tickets clog support.' },
        outcome: { es: 'csat 4.7 ▲',                          en: 'csat 4.7 ▲' },
      },
    },
    case:         { es: 'case ▸', en: 'case ▸' },
    outcomeLabel: { es: 'outcome', en: 'outcome' },
  },

  // ── Vault ────────────────────────────────────────────
  vault: {
    tag: { es: '// the_vault · resultados', en: '// the_vault · results' },
    title: {
      es: ['Métricas que ', 'hablarán', ' por sí solas.'],
      en: ['Metrics that ', 'will speak', ' for themselves.'],
    },
    sub: {
      es: 'Próximamente revelaremos el impacto operativo real. Mientras tanto, este es el formato.',
      en: "We'll soon reveal the real operational impact. Meanwhile, this is the format.",
    },
    demoTitle:   { es: 'DEMO DATA',                                        en: 'DEMO DATA' },
    demoSub:     { es: '· placeholder · loading_real_metrics ·',            en: '· placeholder · loading_real_metrics ·' },
    headerLabel: { es: 'vault.dashboard ▸ overview',                        en: 'vault.dashboard ▸ overview' },
    demoMode:    { es: 'demo_mode',                                         en: 'demo_mode' },
    last30:      { es: 'last 30d ▾',                                        en: 'last 30d ▾' },
    kpi: {
      cost:    { es: 'aws_cost_saved', en: 'aws_cost_saved' },
      costSub: { es: 'rolling 6mo',    en: 'rolling 6mo' },
      dep:     { es: 'deploys/week',   en: 'deploys/week' },
      depSub:  { es: 'zero-downtime',  en: 'zero-downtime' },
      ml:      { es: 'ml_inferences',  en: 'ml_inferences' },
      mlSub:   { es: 'per day',        en: 'per day' },
      up:      { es: 'uptime',         en: 'uptime' },
      upSub:   { es: 'last 12mo',      en: 'last 12mo' },
    },
    revenueLabel: { es: 'revenue_impact (placeholder)', en: 'revenue_impact (placeholder)' },
    before:       { es: 'before',                       en: 'before' },
    after:        { es: 'after',                        en: 'after' },
    topEvents:    { es: 'top events · live demo',       en: 'top events · live demo' },
    disclaimer: {
      es: '▸ los números mostrados son ilustrativos · se sustituirán por casos reales firmados por cliente',
      en: '▸ numbers shown are illustrative · will be replaced by signed client case studies',
    },
  },

  // ── Stack ────────────────────────────────────────────
  stack: {
    tag: { es: '// stack · herramientas', en: '// stack · tooling' },
    title: {
      es: ['El ', 'arsenal', '. Sin religiosidad: cada herramienta gana su lugar.'],
      en: ['The ', 'arsenal', '. No religion: each tool earns its place.'],
    },
    sub: {
      es: 'Optamos por lo aburrido cuando funciona, lo afilado cuando hace diferencia. Sin lock-ins innecesarios.',
      en: 'Boring when it works, sharp when it matters. No unnecessary lock-ins.',
    },
    groups: {
      g1: { es: 'web · mobile', en: 'web · mobile' },
      g2: { es: 'backend',      en: 'backend' },
      g3: { es: 'cloud · data', en: 'cloud · data' },
    },
    outputLine: {
      es: '9 herramientas core · 100% type-safe · multi-cloud-ready',
      en: '9 core tools · 100% type-safe · multi-cloud-ready',
    },
  },

  // ── Contact ──────────────────────────────────────────
  contact: {
    tag: { es: '// contact · alianza', en: '// contact · alliance' },
    title: {
      es: ['¿Reto técnico o un mar de datos sin explorar? ', 'Hablemos', '.'],
      en: ['Tech challenge or a sea of unexplored data? ', "Let's talk", '.'],
    },
    sub: {
      es: 'Una llamada de 30 minutos. Si tu problema no encaja con nosotros, te lo decimos al final de la llamada y te recomendamos a alguien que sí.',
      en: "A 30-minute call. If your problem isn't our fit, we tell you at the end and recommend someone who is.",
    },
    cta1:      { es: '▸ Agendar llamada', en: '▸ Schedule a call' },
    formTitle: { es: 'new_alliance.form', en: 'new_alliance.form' },
    formDraft: { es: 'draft',             en: 'draft' },
    formSent:  { es: '✓ encrypted_payload', en: '✓ encrypted_payload' },
    formError: { es: '✗ error',           en: '✗ error' },
    formSending: { es: '… enviando',      en: '… sending' },
    fields: {
      name:  { es: '01 · nombre',           en: '01 · name' },
      email: { es: '02 · email',            en: '02 · email' },
      type:  { es: '03 · tipo de proyecto', en: '03 · project type' },
      msg:   { es: '04 · cuéntanos',        en: '04 · tell us' },
    },
    placeholders: {
      name:  { es: '¿Cómo te llamas?',  en: "What's your name?" },
      email: { es: 'tu@empresa.com',    en: 'you@company.com' },
      msg: {
        es: '¿Qué quieres construir, medir o automatizar?',
        en: 'What do you want to build, measure or automate?',
      },
    },
    projectTypes: {
      Web:    { es: 'Web',    en: 'Web' },
      Mobile: { es: 'Mobile', en: 'Mobile' },
      Data:   { es: 'Data',   en: 'Data' },
      AWS:    { es: 'AWS',    en: 'AWS' },
    },
    submit:  { es: '▸ Iniciar Alianza', en: '▸ Start Alliance' },
    sending: { es: '… Enviando',         en: '… Sending' },
    submitted: {
      es: '✓ Recibido — te respondemos en <24h',
      en: "✓ Got it — we'll reply within <24h",
    },
    errored: {
      es: '✗ No se pudo enviar — escríbenos a hola@primecoders.dev',
      en: "✗ Couldn't send — email us at hola@primecoders.dev",
    },
    stats: {
      response: { es: 'response_time',  en: 'response_time' },
      respVal:  { es: '< 24h',          en: '< 24h' },
      fit:      { es: 'fit_call',       en: 'fit_call' },
      fitVal:   { es: '30min · gratis', en: '30min · free' },
      tz:       { es: 'timezone',       en: 'timezone' },
      tzVal:    { es: 'CDMX · UTC-6',   en: 'CDMX · UTC-6' },
      nda:      { es: 'nda',            en: 'nda' },
      ndaVal:   { es: 'bajo solicitud', en: 'on request' },
    },
    formNote: {
      es: 'payload encrypted in transit · gdpr+lfpdppp compliant',
      en: 'payload encrypted in transit · gdpr+lfpdppp compliant',
    },
  },

  // ── Footer ───────────────────────────────────────────
  foot: {
    tagline: {
      es: 'Socios tecnológicos clave que impulsan el crecimiento y la eficiencia del negocio mediante IA y datos.',
      en: 'Key tech partners powering business growth and efficiency through AI and data.',
    },
    map:     { es: 'Mapa',           en: 'Sitemap' },
    contact: { es: 'Contacto',       en: 'Contact' },
    online:  { es: 'systems_online', en: 'systems_online' },
    rights: {
      es: '© 2025 PrimeCoders · todos los derechos reservados',
      en: '© 2025 PrimeCoders · all rights reserved',
    },
  },
} as const;

// Resolver — returns the language value, preserving its type.
export function t<T extends { es: unknown; en: unknown }>(node: T, lang: Lang): T['es'] {
  return (node[lang] ?? node.es ?? node.en) as T['es'];
}
