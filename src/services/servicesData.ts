export interface ServiceDetail {
  id: string;
  title: string;
  shortDescription: string;
  extendedDescription: string;
  iconName: string; // Map to Lucide icon in UI
  quoteProjectId: string; // Maps to projectTypes in quoteStore
  deliveryTime: string;
  keyBenefits: string[];
  suggestedStack: { name: string; category: string }[];
  deliverables: string[];
  stat: string;
}

export const SERVICES_DETAILS: ServiceDetail[] = [
  {
    id: 'landing-pages',
    title: 'Landing Pages Premium',
    shortDescription: 'Páginas de conversión diseñadas para cautivar y convertir. Cada elemento está estratégicamente diseñado para maximizar resultados.',
    extendedDescription: 'Nuestras Landing Pages Premium no son plantillas genéricas. Son experiencias inmersivas 3D optimizadas para velocidad extrema (LCP < 1.2s), con animaciones GSAP integradas que guían el scroll del usuario hacia la conversión, diseño UX orientado a la psicología del consumidor y SEO técnico desde la primera línea de código.',
    iconName: 'Monitor',
    quoteProjectId: 'landing',
    deliveryTime: '7 - 14 días hábiles',
    stat: '+300% conversión promedio',
    keyBenefits: [
      'Velocidad de carga ultra-rápida (PageSpeed 95+)',
      'Narrativa visual interactiva basada en scroll-driven animations',
      'Optimización SEO On-Page para indexación inmediata',
      'Integración directa con CRMs y analítica de comportamiento (Hotjar/GA4)'
    ],
    suggestedStack: [
      { name: 'React / Vite', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Estilos' },
      { name: 'GSAP', category: 'Animaciones' },
      { name: 'Framer Motion', category: 'Transiciones' }
    ],
    deliverables: [
      'Código fuente optimizado y documentado',
      'Panel de control de leads (si aplica)',
      'Capacitación de uso de 1 hora',
      'Soporte técnico post-lanzamiento por 30 días'
    ]
  },
  {
    id: 'sistemas-web',
    title: 'Sistemas Web Integrados',
    shortDescription: 'Plataformas empresariales conectadas con tus sistemas existentes. ERP, CRM y APIs trabajando en armonía.',
    extendedDescription: 'Desarrollamos sistemas a medida para automatizar operaciones de negocio complejas. Conectamos bases de datos relacionales, pasarelas de pago, sistemas de facturación electrónica y APIs de terceros en un único ecosistema fluido y seguro. Ideal para intranet corporativa, gestión de flotas o automatización interna.',
    iconName: 'Layers',
    quoteProjectId: 'corporate',
    deliveryTime: '4 - 8 semanas',
    stat: 'Eficiencia operativa incrementada',
    keyBenefits: [
      'Reducción de hasta un 60% de tareas repetitivas manuales',
      'Consolidación de bases de datos fragmentadas',
      'Arquitectura de seguridad robusta y roles de usuario ACL',
      'Reportes y analíticas en tiempo real personalizados'
    ],
    suggestedStack: [
      { name: 'Next.js', category: 'Framework' },
      { name: 'TypeScript', category: 'Lenguaje' },
      { name: 'NestJS / Node.js', category: 'Backend' },
      { name: 'PostgreSQL / Prisma', category: 'BBDD' }
    ],
    deliverables: [
      'Modelado de base de datos relacional',
      'Acceso al repositorio GitHub de la organización',
      'Documentación OpenAPI (Swagger) interactiva',
      'Soporte y mantenimiento por 90 días'
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce de Alta Escala',
    shortDescription: 'Tiendas online que manejan millones de transacciones. Rendimiento optimizado para picos de tráfico extremos.',
    extendedDescription: 'Creamos plataformas de comercio electrónico robustas con arquitecturas headless o monolíticas optimizadas. Diseñadas para resistir picos de tráfico extremos durante campañas como Black Friday o Cyber Days, implementando pasarelas internacionales de pago, cálculo automatizado de envíos, y pasarelas de cupones complejas.',
    iconName: 'ShoppingCart',
    quoteProjectId: 'ecommerce',
    deliveryTime: '4 - 6 semanas',
    stat: 'Cero caídas en picos extremos',
    keyBenefits: [
      'Proceso de checkout simplificado en una sola página (One-step checkout)',
      'Escalabilidad en la nube autoadministrable',
      'Integración con múltiples courier logísticos en Perú y Latam',
      'Sincronización automatizada con stock e inventarios físicos'
    ],
    suggestedStack: [
      { name: 'Next.js / Headless', category: 'Frontend' },
      { name: 'Shopify Plus API', category: 'E-commerce Engine' },
      { name: 'Stripe / Culqi / MercadoPago', category: 'Pagos' },
      { name: 'Redis / Edge Caching', category: 'Rendimiento' }
    ],
    deliverables: [
      'Configuración e integración de pasarelas de pago',
      'Módulo de logística configurado',
      'Backoffice personalizado para gestión de catálogo',
      'Manual interactivo de administración de tienda'
    ]
  },
  {
    id: 'saas-apps',
    title: 'Aplicaciones SaaS',
    shortDescription: 'Software como servicio desde cero. Arquitectura multi-tenant, escalable y segura para modelos de suscripción.',
    extendedDescription: 'Construimos el núcleo de tu modelo de negocio digital. Creamos arquitecturas multi-inquilino (multi-tenant) seguras con aislamiento de datos, integraciones de suscripciones recurrentes (Stripe/PayPal), paneles de administración para los usuarios e infraestructura de nube optimizada para el menor coste operativo posible.',
    iconName: 'Cloud',
    quoteProjectId: 'webapp',
    deliveryTime: '8 - 12 semanas',
    stat: 'Arquitectura escalable a millones',
    keyBenefits: [
      'Arquitectura de microservicios o serverless de bajo costo',
      'Panel de control de facturación del cliente con Stripe Billing',
      'Métricas financieras automatizadas (MRR, Churn rate, LTV)',
      'Sistemas de onboarding automatizados para nuevos clientes'
    ],
    suggestedStack: [
      { name: 'React / Next.js', category: 'Frontend' },
      { name: 'Node.js / Express', category: 'Backend' },
      { name: 'Docker / AWS', category: 'Infraestructura' },
      { name: 'Supabase / Firebase', category: 'Autenticación' }
    ],
    deliverables: [
      'Infraestructura en la nube configurada como código',
      'Acceso a paneles analíticos del negocio',
      'Manuales de API para desarrolladores externos',
      'Soporte Enterprise 24/7 durante los primeros 30 días'
    ]
  },
  {
    id: 'ia-automation',
    title: 'Automatización con IA',
    shortDescription: 'Integración de inteligencia artificial para automatizar procesos, generar contenido y potenciar la toma de decisiones.',
    extendedDescription: 'Aprovecha la potencia de los Modelos de Lenguaje (LLMs) y Visión Computacional para automatizar flujos de trabajo en tu empresa. Desarrollamos agentes automatizados de atención al cliente calificados con tu propia base de conocimiento, herramientas internas de análisis predictivo y generadores inteligentes de contenido.',
    iconName: 'Brain',
    quoteProjectId: 'enterprise',
    deliveryTime: '3 - 6 semanas',
    stat: '-70% costos operativos de soporte',
    keyBenefits: [
      'Procesamiento masivo de datos no estructurados en segundos',
      'Agentes conversacionales autónomos con contexto empresarial',
      'Ahorro masivo de tiempo en la clasificación de tickets/leads',
      'Análisis de tendencias de mercado automatizadas'
    ],
    suggestedStack: [
      { name: 'OpenAI API / Claude API', category: 'Modelos IA' },
      { name: 'Python / LangChain', category: 'Desarrollo IA' },
      { name: 'Pinecone / Vector DB', category: 'Base Vectorial' },
      { name: 'FastAPI', category: 'Microservicios' }
    ],
    deliverables: [
      'Agente de IA calibrado y testeado en producción',
      'Integración con plataformas de mensajería (Slack/WhatsApp/Web)',
      'Panel de auditoría de prompts y costes',
      'Garantía de refinamiento de modelos por 30 días'
    ]
  },
  {
    id: 'consultoria',
    title: 'Consultoría Tecnológica',
    shortDescription: 'Asesoramiento estratégico para la transformación digital. Definimos la hoja de ruta tecnológica de tu negocio.',
    extendedDescription: 'Alineamos tu visión de negocio con las mejores herramientas del mercado. Realizamos auditorías de código, optimizaciones de coste de infraestructura en la nube, planes de migración de sistemas heredados (legacy) a la web moderna y asesoría integral de ciberseguridad.',
    iconName: 'Compass',
    quoteProjectId: 'enterprise',
    deliveryTime: 'Por proyecto o mensual',
    stat: 'Ahorro de hasta 40% en nube',
    keyBenefits: [
      'Auditorías técnicas objetivas de código e infraestructura',
      'Mitigación proactiva de brechas de seguridad (OWASP Top 10)',
      'Asesoramiento imparcial para la compra/desarrollo de software',
      'Capacitación de tus equipos de desarrollo en buenas prácticas'
    ],
    suggestedStack: [
      { name: 'AWS IAM / CloudWatch', category: 'Auditoría Nube' },
      { name: 'OWASP / SonarQube', category: 'Seguridad' },
      { name: 'Jira / Confluence', category: 'Gobernanza' },
      { name: 'TypeScript / Clean Architecture', category: 'Estándar' }
    ],
    deliverables: [
      'Documento de Análisis de Arquitectura y Código',
      'Informe detallado de Seguridad y Vulnerabilidades',
      'Hoja de Ruta Tecnológica recomendada',
      'Sesiones de consultoría semanales directas con el CTO'
    ]
  }
];
