// ============================================================
// BIBLIOTECA DIGITAL — Datos de recursos
// Diseño: Archivo Nocturno — negro cálido + ámbar dorado
// ============================================================

export type ResourceType = "libro" | "podcast" | "plataforma" | "youtube";
export type Status = "en-cola" | "leyendo" | "completado";
export type NoteType = "aprendizaje" | "semilla" | "conexion";

export type Note = {
  id: string;
  type: NoteType;
  content: string;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  numeral: string;
  color: string;
};

export type Resource = {
  id: string;
  title: string;
  author?: string;
  description?: string;
  type: ResourceType;
  category: string;
  status: Status;
  url?: string;
  tags?: string[];
  notes?: Note[];
};

export const categories: Category[] = [
  { id: "todos", name: "Todos", numeral: "∞", color: "#C8922A" },
  { id: "marketing", name: "Marketing", numeral: "I", color: "#C8922A" },
  { id: "ventas", name: "Ventas", numeral: "II", color: "#B87333" },
  { id: "negocios", name: "Negocios", numeral: "III", color: "#A0785A" },
  { id: "psicologia", name: "Psicología", numeral: "IV", color: "#8B6B8A" },
  { id: "espiritualidad", name: "Espiritualidad", numeral: "V", color: "#7B9E87" },
  { id: "desarrollo-personal", name: "Desarrollo Personal", numeral: "VI", color: "#9E8B7B" },
  { id: "finanzas", name: "Finanzas", numeral: "VII", color: "#6B8E9E" },
];

export const statusLabels: Record<Status, string> = {
  "en-cola": "En cola",
  "leyendo": "En reproducción",
  "completado": "Completado",
};

export const statusColors: Record<Status, string> = {
  "en-cola": "#C8922A",
  "leyendo": "#7B9E87",
  "completado": "#6B8E9E",
};

export const resourceTypeLabels: Record<ResourceType, string> = {
  "libro": "Libro",
  "podcast": "Podcast",
  "plataforma": "Plataforma",
  "youtube": "YouTube",
};

export const resources: Resource[] = [
  // ─── LIBROS ────────────────────────────────────────────────
  {
    id: "influencia",
    title: "Influencia",
    author: "Robert Cialdini",
    description: "Los principios psicológicos de la persuasión y cómo aplicarlos en ventas y marketing.",
    type: "libro",
    category: "ventas",
    status: "en-cola",
    tags: ["persuasión", "psicología", "ventas"],
  },
  {
    id: "fiesta-cocteles",
    title: "La fiesta de cócteles de dos horas",
    author: "Nico Gray",
    description: "Cómo construir relaciones valiosas y expandir tu red de contactos de forma auténtica.",
    type: "libro",
    category: "negocios",
    status: "en-cola",
    tags: ["networking", "relaciones", "social"],
  },
  {
    id: "disena-tu-vida",
    title: "Diseña tu vida",
    author: "Dave Evans y Bill Burnett",
    description: "Aplica el pensamiento de diseño para construir una vida significativa y satisfactoria.",
    type: "libro",
    category: "desarrollo-personal",
    status: "en-cola",
    tags: ["diseño", "propósito", "vida"],
  },
  {
    id: "montana-eres-tu",
    title: "La montaña eres tú",
    author: "Brianna Wiest",
    description: "Cómo superar el autosabotaje y transformar los obstáculos internos en fortaleza.",
    type: "libro",
    category: "psicologia",
    status: "en-cola",
    tags: ["autosabotaje", "crecimiento", "mentalidad"],
  },
  {
    id: "poder-conciencia",
    title: "El poder de la conciencia",
    author: "Neville Goddard",
    description: "Cómo usar la imaginación y la conciencia para manifestar la realidad deseada.",
    type: "libro",
    category: "espiritualidad",
    status: "en-cola",
    tags: ["manifestación", "conciencia", "ley de atracción"],
  },
  {
    id: "kybalion",
    title: "El Kybalion",
    author: "Tres Iniciados",
    description: "Los siete principios herméticos que gobiernan el universo y la mente humana.",
    type: "libro",
    category: "espiritualidad",
    status: "en-cola",
    tags: ["hermetismo", "filosofía", "principios"],
  },
  {
    id: "poder-mente-subconsciente",
    title: "El poder de tu mente subconsciente",
    author: "Joseph Murphy",
    description: "Técnicas para reprogramar el subconsciente y alcanzar el éxito y la prosperidad.",
    type: "libro",
    category: "espiritualidad",
    status: "en-cola",
    tags: ["subconsciente", "programación mental", "éxito"],
  },
  {
    id: "hombre-simbolos",
    title: "El hombre y sus símbolos",
    author: "Carl Jung",
    description: "Una exploración profunda del inconsciente y el lenguaje simbólico de los sueños.",
    type: "libro",
    category: "psicologia",
    status: "en-cola",
    tags: ["inconsciente", "sueños", "arquetipos"],
  },
  {
    id: "cabala-mistica",
    title: "La Cábala Mística",
    author: "Dion Fortune",
    description: "Estudio profundo del árbol de la vida y la tradición cabalística occidental.",
    type: "libro",
    category: "espiritualidad",
    status: "en-cola",
    tags: ["cábala", "misticismo", "árbol de la vida"],
  },
  {
    id: "corpus-hermeticum",
    title: "Corpus Hermeticum",
    author: "Hermes Trismegisto",
    description: "Textos fundacionales de la tradición hermética y la filosofía esotérica occidental.",
    type: "libro",
    category: "espiritualidad",
    status: "en-cola",
    tags: ["hermetismo", "filosofía antigua", "esotérico"],
  },
  {
    id: "fe-es-tu-fortuna",
    title: "Tu fe es tu fortuna",
    author: "Neville Goddard",
    description: "Cómo la fe y la imaginación son las fuerzas creadoras de nuestra realidad.",
    type: "libro",
    category: "espiritualidad",
    status: "en-cola",
    tags: ["fe", "manifestación", "imaginación"],
  },
  // ─── YOUTUBE ────────────────────────────────────────────────
  {
    id: "yt-diary-ceo",
    title: "The Diary of a CEO",
    description: "Steven Bartlett comparte historias de emprendimiento, negocios y mentalidad de éxito con invitados de alto nivel.",
    type: "youtube",
    category: "negocios",
    status: "en-cola",
    url: "https://www.youtube.com/@TheDiaryOfACEO",
    tags: ["negocios", "emprendimiento", "mentalidad"],
  },
  {
    id: "yt-lewis-howes",
    title: "Lewis Howes Español",
    description: "Contenido de Lewis Howes sobre éxito, relaciones, negocios y desarrollo personal en español.",
    type: "youtube",
    category: "desarrollo-personal",
    status: "en-cola",
    url: "https://www.youtube.com/@LewisHowesEspañol",
    tags: ["éxito", "relaciones", "desarrollo personal"],
  },
  {
    id: "yt-dan-martell",
    title: "Dan Martell",
    description: "Estrategias de crecimiento, escalamiento de negocios y productividad para emprendedores.",
    type: "youtube",
    category: "negocios",
    status: "en-cola",
    url: "https://www.youtube.com/@danmartell",
    tags: ["crecimiento", "negocios", "productividad"],
  },
  {
    id: "yt-grant-cardone",
    title: "Grant Cardone",
    description: "Técnicas de ventas, negocios y mentalidad de abundancia para alcanzar el éxito.",
    type: "youtube",
    category: "ventas",
    status: "en-cola",
    url: "https://www.youtube.com/@GrantCardone",
    tags: ["ventas", "negocios", "mentalidad"],
  },
  {
    id: "yt-kale-anders",
    title: "Kale Anders",
    description: "Marketing digital, negocios online y estrategias de crecimiento para emprendedores.",
    type: "youtube",
    category: "marketing",
    status: "en-cola",
    url: "https://www.youtube.com/@KaleAnders",
    tags: ["marketing", "negocios digitales", "crecimiento"],
  },
  {
    id: "yt-alex-hormozi",
    title: "Alex Hormozi",
    description: "Adquisición de empresas, ventas de alto nivel y escalamiento de negocios rentables.",
    type: "youtube",
    category: "negocios",
    status: "en-cola",
    url: "https://www.youtube.com/@AlexHormozi",
    tags: ["negocios", "ventas", "escalamiento"],
  },
  {
    id: "yt-daniel-chapan",
    title: "Daniel Chapan",
    description: "Contenido sobre psicología, desarrollo personal, mentalidad y transformación de vida.",
    type: "youtube",
    category: "psicologia",
    status: "en-cola",
    url: "https://www.youtube.com/@DanielChapan",
    tags: ["psicología", "mentalidad", "transformación"],
  },
  {
    id: "yt-simon-squibb",
    title: "Simon Squibb",
    description: "Estrategias de negocios, emprendimiento y mentalidad empresarial para crecer exponencialmente.",
    type: "youtube",
    category: "negocios",
    status: "en-cola",
    url: "https://www.youtube.com/@SimonSquibb",
    tags: ["negocios", "emprendimiento", "estrategia"],
  },
  {
    id: "yt-sadhguru-espanol",
    title: "Sadhguru Español",
    description: "Enseñanzas sobre espiritualidad, meditación, consciencia y transformación personal.",
    type: "youtube",
    category: "espiritualidad",
    status: "en-cola",
    url: "https://www.youtube.com/@SadhguruEspañol",
    tags: ["espiritualidad", "meditación", "consciencia"],
  },
  {
    id: "yt-manuel-trejove",
    title: "Manuel Trejove",
    description: "Contenido sobre marketing, negocios digitales y estrategias de crecimiento online.",
    type: "youtube",
    category: "marketing",
    status: "en-cola",
    url: "https://www.youtube.com/@manueltrejove",
    tags: ["marketing", "negocios digitales", "estrategia"],
  },
  {
    id: "yt-tony-robbins",
    title: "Tony Robbins Live",
    description: "Seminarios y contenido de Tony Robbins sobre éxito, finanzas y transformación personal.",
    type: "youtube",
    category: "desarrollo-personal",
    status: "en-cola",
    url: "https://www.youtube.com/@TonyRobbinsLive",
    tags: ["éxito", "finanzas", "transformación"],
  },
  {
    id: "yt-borja-vilaseca",
    title: "Borja Vilaseca",
    description: "Reflexiones sobre filosofía, desarrollo personal y transformación de consciencia.",
    type: "youtube",
    category: "espiritualidad",
    status: "en-cola",
    url: "https://www.youtube.com/@borjavilaseca",
    tags: ["filosofía", "consciencia", "transformación"],
  },
  {
    id: "yt-financial-mentors",
    title: "Financial Mentors TV Español",
    description: "Educación financiera, inversión y estrategias para construir riqueza.",
    type: "youtube",
    category: "finanzas",
    status: "en-cola",
    url: "https://www.youtube.com/c/FinancialMentorsTVEspañol",
    tags: ["finanzas", "inversión", "riqueza"],
  },
  {
    id: "yt-shark-tank-latam",
    title: "Shark Tank Latam",
    description: "Pitch de emprendedores y análisis de negocios con inversionistas destacados.",
    type: "youtube",
    category: "negocios",
    status: "en-cola",
    url: "https://www.youtube.com/@SharkTankLatam",
    tags: ["negocios", "emprendimiento", "inversión"],
  },
  {
    id: "yt-tengo-un-plan",
    title: "Tengo un Plan Podcast",
    description: "Podcast sobre emprendimiento, negocios y mentalidad de éxito.",
    type: "youtube",
    category: "negocios",
    status: "en-cola",
    url: "https://www.youtube.com/@tengounplanpodcast",
    tags: ["emprendimiento", "negocios", "podcast"],
  },
  {
    id: "yt-mark-tilbury",
    title: "Mark Tilbury",
    description: "Educación financiera, inversión y estrategias para construir riqueza y libertad financiera.",
    type: "youtube",
    category: "finanzas",
    status: "en-cola",
    url: "https://www.youtube.com/@marktilbury",
    tags: ["finanzas", "inversión", "riqueza"],
  },
  // ─── PLATAFORMAS ────────────────────────────────────────────
  {
    id: "recordatorios-12",
    title: "12 Recordatorios — 12 Libros",
    description: "Plataforma o recurso con 12 recordatorios clave extraídos de 12 libros esenciales.",
    type: "plataforma",
    category: "desarrollo-personal",
    status: "en-cola",
    tags: ["resúmenes", "libros", "recordatorios"],
  },
  // ─── PODCASTS (Videos sueltos) ────────────────────────────────
  {
    id: "podcast-7-things-avoid-rich",
    title: "7 Cosas que Debes Evitar si Quieres Ser Rico",
    description: "Mark Tilbury comparte 7 cosas que debes evitar si quieres ser rico. Estrategias clave para la riqueza.",
    type: "podcast",
    category: "finanzas",
    status: "en-cola",
    url: "https://youtu.be/KMbFjoHUYbA",
    tags: ["riqueza", "finanzas", "estrategia"],
  },
  {
    id: "podcast-wish-knew-business",
    title: "Lo Que Desearía Haber Sabido Antes de Empezar un Negocio",
    description: "Lecciones clave de Mark Tilbury sobre qué desearía haber sabido antes de empezar un negocio.",
    type: "podcast",
    category: "negocios",
    status: "en-cola",
    url: "https://youtu.be/A54VFBYfF9U",
    tags: ["emprendimiento", "negocios", "lecciones"],
  },
  {
    id: "podcast-started-scratch",
    title: "Si Empezara de Cero Nuevamente, Haría Esto",
    description: "Mark Tilbury revela qué haría diferente si empezara de cero en su camino hacia la riqueza.",
    type: "podcast",
    category: "finanzas",
    status: "en-cola",
    url: "https://youtu.be/6IiEoSHw9gY",
    tags: ["finanzas", "estrategia", "experiencia"],
  },
  {
    id: "podcast-7-signs-millionaire",
    title: "7 Señales de que Serás Millonario Pronto",
    description: "Mark Tilbury identifica 7 señales que indican que te convertirás en millonario pronto.",
    type: "podcast",
    category: "finanzas",
    status: "en-cola",
    url: "https://youtu.be/JqJ2l4frTrU",
    tags: ["riqueza", "millonario", "señales"],
  },
  {
    id: "podcast-print-on-demand",
    title: "La Única Guía de Print On Demand que Necesitas en 2026 (Con IA)",
    description: "Guía completa de print on demand con AI para principiantes. Cómo generar ingresos pasivos.",
    type: "podcast",
    category: "negocios",
    status: "en-cola",
    url: "https://youtu.be/9tKeNT-k4kk",
    tags: ["negocios", "AI", "ingresos pasivos"],
  },
  {
    id: "podcast-paycheck-routine",
    title: "Haz Esto Cada Vez que Recibas tu Salario (Rutina 2026)",
    description: "Rutina de Mark Tilbury para gestionar tu salario y construir riqueza consistentemente.",
    type: "podcast",
    category: "finanzas",
    status: "en-cola",
    url: "https://youtu.be/sPm9pynCS0k",
    tags: ["finanzas", "presupuesto", "hábitos"],
  },
  {
    id: "podcast-10k-month-route",
    title: "La Ruta Más Inteligente para Ganar $10,000/Mes en 2026",
    description: "La ruta más inteligente para generar $10,000 mensuales según Mark Tilbury.",
    type: "podcast",
    category: "negocios",
    status: "en-cola",
    url: "https://youtu.be/mwYsapR6cYk",
    tags: ["ingresos", "negocios", "estrategia"],
  },
  {
    id: "podcast-smartest-financial-freedom",
    title: "El Camino Más Inteligente Hacia la Libertad Financiera en 2026",
    description: "Camino más inteligente hacia la libertad financiera con estrategias probadas.",
    type: "podcast",
    category: "finanzas",
    status: "en-cola",
    url: "https://youtu.be/C_UeYBBogPA",
    tags: ["libertad financiera", "estrategia", "finanzas"],
  },
  {
    id: "podcast-ai-dropshipping",
    title: "Probé Dropshipping con IA Durante una Semana (Resultados Reales)",
    description: "Experimento de Mark Tilbury con dropshipping potenciado por AI. Resultados reales.",
    type: "podcast",
    category: "negocios",
    status: "en-cola",
    url: "https://youtu.be/rhuYy9LP72M",
    tags: ["dropshipping", "AI", "ecommerce"],
  },
  {
    id: "podcast-10k-student",
    title: "Haz Esto para Ganar $10,000 Como Estudiante",
    description: "Guía práctica para estudiantes que quieren ganar $10,000 rápidamente.",
    type: "podcast",
    category: "negocios",
    status: "en-cola",
    url: "https://youtu.be/BvDAUqLQ-uc",
    tags: ["estudiantes", "ingresos", "negocios"],
  },
  {
    id: "podcast-24-hours-richest-entrepreneur",
    title: "Pasé 24 Horas con el Empresario de YouTube Más Rico",
    description: "Experiencia de 24 horas con un empresario exitoso de YouTube. Lecciones y insights valiosos.",
    type: "podcast",
    category: "negocios",
    status: "en-cola",
    url: "https://youtu.be/cLdMjVvP7kE",
    tags: ["emprendimiento", "YouTube", "éxito"],
  },
];
