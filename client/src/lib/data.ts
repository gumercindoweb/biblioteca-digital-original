// ============================================================
// BIBLIOTECA DIGITAL — Datos de recursos
// Diseño: Archivo Nocturno — negro cálido + ámbar dorado
// ============================================================

export type ResourceType = "libro" | "podcast" | "plataforma" | "youtube";
export type Status = "leyendo" | "en-cola" | "completado";

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
  status?: Status;
  url?: string;
  tags?: string[];
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
    url: "https://www.youtube.com/@TheDiaryOfACEO",
    tags: ["negocios", "emprendimiento", "mentalidad"],
  },
  {
    id: "yt-lewis-howes",
    title: "Lewis Howes Español",
    description: "Contenido de Lewis Howes sobre éxito, relaciones, negocios y desarrollo personal en español.",
    type: "youtube",
    category: "desarrollo-personal",
    url: "https://www.youtube.com/@LewisHowesEspañol",
    tags: ["éxito", "relaciones", "desarrollo personal"],
  },
  {
    id: "yt-dan-martell",
    title: "Dan Martell",
    description: "Estrategias de crecimiento, escalamiento de negocios y productividad para emprendedores.",
    type: "youtube",
    category: "negocios",
    url: "https://www.youtube.com/@danmartell",
    tags: ["crecimiento", "negocios", "productividad"],
  },
  {
    id: "yt-grant-cardone",
    title: "Grant Cardone",
    description: "Técnicas de ventas, negocios y mentalidad de abundancia para alcanzar el éxito.",
    type: "youtube",
    category: "ventas",
    url: "https://www.youtube.com/@GrantCardone",
    tags: ["ventas", "negocios", "mentalidad"],
  },
  {
    id: "yt-kale-anders",
    title: "Kale Anders",
    description: "Marketing digital, negocios online y estrategias de crecimiento para emprendedores.",
    type: "youtube",
    category: "marketing",
    url: "https://www.youtube.com/@KaleAnders",
    tags: ["marketing", "negocios digitales", "crecimiento"],
  },
  {
    id: "yt-alex-hormozi",
    title: "Alex Hormozi",
    description: "Adquisición de empresas, ventas de alto nivel y escalamiento de negocios rentables.",
    type: "youtube",
    category: "negocios",
    url: "https://www.youtube.com/@AlexHormozi",
    tags: ["negocios", "ventas", "escalamiento"],
  },
  {
    id: "yt-daniel-chapan",
    title: "Daniel Chapan",
    description: "Contenido sobre psicología, desarrollo personal, mentalidad y transformación de vida.",
    type: "youtube",
    category: "psicologia",
    url: "https://www.youtube.com/@DanielChapan",
    tags: ["psicología", "mentalidad", "transformación"],
  },
  // ─── PLATAFORMAS ────────────────────────────────────────────
  {
    id: "recordatorios-12",
    title: "12 Recordatorios — 12 Libros",
    description: "Plataforma o recurso con 12 recordatorios clave extraídos de 12 libros esenciales.",
    type: "plataforma",
    category: "desarrollo-personal",
    tags: ["resúmenes", "libros", "recordatorios"],
  },
];

export const resourceTypeLabels: Record<ResourceType, string> = {
  libro: "Libro",
  podcast: "Podcast",
  plataforma: "Plataforma",
  youtube: "YouTube",
};

export const statusLabels: Record<Status, string> = {
  leyendo: "Leyendo",
  "en-cola": "En cola",
  completado: "Completado",
};

export const statusColors: Record<Status, string> = {
  leyendo: "#C8922A",
  "en-cola": "#6B8E9E",
  completado: "#7B9E87",
};
