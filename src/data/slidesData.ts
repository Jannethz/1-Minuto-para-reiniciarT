import { ArteryInfo, ClinicalPoint, QuizQuestion } from '../types';

export const ARTERIES_DATA: ArteryInfo[] = [
  {
    id: 'etmoidal-anterior',
    name: 'Arteria Etmoidal Anterior',
    latinName: 'Arteria ethmoidalis anterior',
    system: 'interna',
    origin: 'Rama de la A. Oftálmica (Carótida Interna)',
    originTree: [
      'Arteria Carótida Común',
      'Arteria Carótida Interna (C1-C7)',
      'Arteria Oftálmica',
      'Arteria Etmoidal Anterior (rama septal anterior)'
    ],
    position: 'arriba-izquierda',
    positionLabel: 'Arriba / Adelante (Anterosuperior)',
    color: '#00F0FF',
    flowDirection: 'Desciende desde el techo etmoidal hacia la confluencia anteroinferior',
    description: 'Nace de la arteria oftálmica en la órbita, atraviesa el foramen etmoidal anterior hacia la fosa craneal anterior y desciende a través de la lámina cribosa para irrigar el tabique anterosuperior.',
    clinicalRelevance: 'Es el único aporte tributario del sistema de la carótida interna en el plexo. En traumatismos faciales o fracturas de la base del cráneo (lámina cribosa), puede ser fuente de epistaxis grave.',
    gauge: 3.5,
  },
  {
    id: 'esfenopalatina',
    name: 'Arteria Esfenopalatina',
    latinName: 'Arteria sphenopalatina (rami septales)',
    system: 'externa',
    origin: 'Rama terminal de la A. Maxilar (Carótida Externa)',
    originTree: [
      'Arteria Carótida Común',
      'Arteria Carótida Externa',
      'Arteria Maxilar Interna (3ª porción)',
      'Arteria Esfenopalatina (ramas nasales posteriores)'
    ],
    position: 'atras-derecha',
    positionLabel: 'Atrás / Derecha (Posterosuperior)',
    color: '#FF3366',
    flowDirection: 'Discurre hacia adelante y abajo desde el agujero esfenopalatino',
    description: 'Considerada la arteria nutricia principal de la cavidad nasal. Cruza la pared lateral y el tabique tras emerger del foramen esfenopalatino, anastomosándose en abanico anterior.',
    clinicalRelevance: 'Principal vaso responsable de epistaxis de gran volumen. Es la diana quirúrgica de elección para ligadura endoscópica transnasal en sangrados refractarios.',
    gauge: 4.5,
  },
  {
    id: 'palatina-mayor',
    name: 'Arteria Palatina Mayor',
    latinName: 'Arteria palatina major',
    system: 'externa',
    origin: 'Rama de la A. Palatina Descendente / Maxilar (Carótida Externa)',
    originTree: [
      'Arteria Carótida Externa',
      'Arteria Maxilar Interna',
      'Arteria Palatina Descendente',
      'Arteria Palatina Mayor (asciende por conducto incisivo)'
    ],
    position: 'abajo-derecha',
    positionLabel: 'Abajo / Derecha (Posteroinferior)',
    color: '#FF3366',
    flowDirection: 'Asciende desde el paladar duro a través del foramen incisivo',
    description: 'Desciende por el conducto palatino mayor hacia el paladar óseo duro y viaja anteriormente para atravesar el conducto incisivo hacia el tabique nasal inferior.',
    clinicalRelevance: 'Aporta flujo arterial de alta presión desde el piso de la cavidad nasal; en cirugías de septoplastia o palatoplastia es un hito de hemostasia crítico.',
    gauge: 3.2,
  },
  {
    id: 'labial-superior',
    name: 'Arteria Labial Superior (rama septal)',
    latinName: 'Arteria labialis superior (ramus septi nasi)',
    system: 'externa',
    origin: 'Rama de la A. Facial (Carótida Externa)',
    originTree: [
      'Arteria Carótida Externa',
      'Arteria Facial (ángulo mandibular)',
      'Arteria Labial Superior (labio superior)',
      'Rama Septal de la A. Labial Superior (columela)'
    ],
    position: 'abajo-adelante',
    positionLabel: 'Abajo / Adelante (Anteroinferior)',
    color: '#FF3366',
    flowDirection: 'Asciende desde la columela y el filtrum nasal hacia la zona de Little',
    description: 'Rama de la arteria facial que bordea el labio superior y emite una rama ascendente columelar que ingresa por la espina nasal anterior al tabique cartilaginoso.',
    clinicalRelevance: 'Es el vaso más superficial y el más accesible a la compresión digital externa sobre el ala nasal y el labio superior durante los primeros auxilios.',
    gauge: 3.0,
  },
];

export const CLINICAL_POINTS_DATA: ClinicalPoint[] = [
  {
    id: 'localizacion',
    iconName: 'MapPin',
    title: 'Localización Estratégica',
    shortDesc: '>90% de los sangrados nasales ocurren en esta zona.',
    fullDesc: 'Ubicado en el tercio anteroinferior del tabique cartilaginoso (Área de Little). Por su proximidad al vestíbulo nasal (a solo 1-1.5 cm del orificio de la narina), es el foco predilecto de epistaxis en niños y adultos jóvenes.',
    badge: '>90% Casos',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'mecanismo',
    iconName: 'AlertTriangle',
    title: 'Mecanismo Fisiopatológico',
    shortDesc: 'Fina capa mucopericóndrica + vasculatura expuesta a aire seco y traumatismo.',
    fullDesc: 'La mucosa que recubre el cartílago cuadrangular es extremadamente delgada y carece de submucosa gruesa protectora. Las turbulencias del flujo de aire inhalado desecan el epitelio, provocando costras, fisuras capilares, rascado o microtraumatismos.',
    badge: 'Microtrauma',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'manejo',
    iconName: 'Stethoscope',
    title: 'Manejo Clínico Escalonado',
    shortDesc: 'Presión digital directa sobre las alas nasales o cauterización focal.',
    fullDesc: 'Paso 1: Maniobra de Trotter (inclinación anterior de cabeza + pinzamiento bimanual por 10-15 min continuos). Paso 2: Vasoconstricción tópica (oximetazolina o fenilefrina). Paso 3: Cauterio químico con nitrato de plata o taponamiento reabsorbible.',
    badge: 'Protocolo Trotter',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
];

export const SLIDES_META = [
  {
    id: 1,
    title: 'Diapositiva Magistral: Plexo de Kiesselbach',
    subtitle: 'Irrigación del Tabique Nasal & Correlación con Epistaxis Anterior',
    badge: 'Anatomía & Clínica',
  },
  {
    id: 2,
    title: 'Árbol Hemodinámico: Carótida Interna vs Externa',
    subtitle: 'Arquitectura vascular dual y gradiente tensional nasal',
    badge: 'Fisiología Vascular',
  },
  {
    id: 3,
    title: 'Diagnóstico Diferencial: Epistaxis Anterior vs Posterior',
    subtitle: 'Plexo de Kiesselbach (Little) vs Plexo de Woodruff',
    badge: 'Correlación Clínica',
  },
  {
    id: 4,
    title: 'Protocolo de Urgencias: Algoritmo Terapéutico',
    subtitle: 'Secuencia estandarizada de 5 fases en sangrado activo',
    badge: 'Guía Práctica',
  },
  {
    id: 5,
    title: 'Flashcards & Evaluación de Retención',
    subtitle: 'Comprobación interactiva para clases y exámenes médicos',
    badge: 'Autoevaluación',
  },
  {
    id: 6,
    title: 'Guía de Diseño Canva & Recursos Exportables',
    subtitle: 'Receta paso a paso, códigos HEX exactos y prompts de búsqueda',
    badge: 'Recursos Gráficos',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cuál de las siguientes arterias que nutren el Plexo de Kiesselbach proviene del sistema de la CARÓTIDA INTERNA?',
    options: [
      'Arteria Esfenopalatina',
      'Arteria Etmoidal Anterior',
      'Arteria Palatina Mayor',
      'Arteria Labial Superior (rama septal)'
    ],
    correctIndex: 1,
    explanation: '¡Correcto! La Arteria Etmoidal Anterior es rama de la arteria oftálmica, la cual emerge directamente de la Carótida Interna. Las otras tres arterias provienen de ramas de la Carótida Externa.',
    source: 'Anatomía Humana de Rouvière & Moore Clinically Oriented Anatomy',
  },
  {
    id: 2,
    question: '¿Qué porcentaje aproximado de todos los episodios de epistaxis se originan en el área de Little / Plexo de Kiesselbach?',
    options: [
      'Menos del 25%',
      'Aproximadamente 50%',
      '> 90%',
      'Casi el 100% ocurre en el plexo de Woodruff'
    ],
    correctIndex: 2,
    explanation: '¡Excelente! Más del 90% de las epistaxis son anteriores y se originan en el plexo de Kiesselbach, debido a la exposición a desecación aérea, temperatura y microtraumatismo digital.',
    source: 'Guías Clínicas AAO-HNS (American Academy of Otolaryngology)',
  },
  {
    id: 3,
    question: '¿Cuál es la primera medida inmediata recomendada en el manejo de una epistaxis anterior?',
    options: [
      'Taponamiento nasal posterior con sonda balón',
      'Inclinar la cabeza hacia atrás para detener la salida de sangre',
      'Presión digital firme sobre las alas nasales inclinando la cabeza hacia adelante (Trotter)',
      'Cauterización bilateral inmediata con nitrato de plata al 90%'
    ],
    correctIndex: 2,
    explanation: '¡Muy bien! Se debe comprimir el tercio inferior de la nariz (alas nasales cartilaginosas) con la cabeza inclinada hacia ADELANTE durante 10-15 minutos. Inclinar la cabeza hacia atrás está contraindicado porque causa deglución y aspiración sanguínea.',
    source: 'Protocolos de Emergencias Otorrinolaringológicas',
  },
  {
    id: 4,
    question: '¿Por cuál orificio o conducto asciende la Arteria Palatina Mayor hacia el tabique anterior para llegar al plexo?',
    options: [
      'Conducto Incisivo (Palatino Anterior)',
      'Foramen Esfenopalatino',
      'Lámina Cribosa',
      'Conducto Óptico'
    ],
    correctIndex: 0,
    explanation: '¡Exacto! La Arteria Palatina Mayor viaja por el paladar duro y asciende al tabique a través del conducto incisivo (fosa incisiva), comunicando la cavidad oral con la nasal.',
    source: 'Anatomía de Netter & Gray',
  }
];

export const CANVA_GUIDE_ITEMS = {
  colors: [
    { name: 'Fondo Principal (Deep Navy)', hex: '#0B192C', role: 'Lienzo oscuro científico para máximo contraste' },
    { name: 'Fondo Secundario (Dark Slate)', hex: '#102A43', role: 'Paneles clínicos y contenedores semitransparentes' },
    { name: 'Carótida Externa (Crimson Red)', hex: '#FF3366', role: 'Arterias Esfenopalatina, Palatina Mayor y Labial Sup.' },
    { name: 'Carótida Interna (Electric Cyan)', hex: '#00F0FF', role: 'Arteria Etmoidal Anterior (origen intracraneal)' },
    { name: 'Plexo Anastomótico (Golden Glow)', hex: '#FFD166', role: 'Área de Little / Punto de confluencia y epistaxis' },
    { name: 'Acento Clínico / Éxito (Emerald)', hex: '#10B981', role: 'Puntos clave, resolución y hemostasia' },
  ],
  searchKeywords: [
    { en: 'Human skull side view vector', es: 'Silueta craneal vista lateral', use: 'Fondo con 30-40% de opacidad' },
    { en: 'Nasal septum anatomy vector', es: 'Tabique nasal anatómico', use: 'Estructura central cartilaginosa y ósea' },
    { en: 'Blood vessel network lines', es: 'Red de vasos sanguíneos', use: 'Arborización de las 4 arterias' },
    { en: 'Circular magnifying glass frame', es: 'Marco lupa circular', use: 'Efecto zoom en el tercio anteroinferior' },
    { en: 'Red glow neon effect', es: 'Resplandor rojo / dorado', use: 'Iluminación focal del Área de Little' },
    { en: 'Medical warning badge icon', es: 'Iconos médicos de alerta', use: 'Bloque clínico inferior de epistaxis' },
  ],
  typography: {
    titles: 'Outfit / Montserrat (Bold 700 - 800) - Mayúsculas controladas',
    body: 'Plus Jakarta Sans / Inter (Regular 400 - Medium 500)',
    monospaced: 'JetBrains Mono para calibre de vasos y estadísticas (>90%)',
  },
  stepByStep: [
    { step: 1, title: 'Configurar Lienzo', detail: 'Crea diseño Presentación (16:9 - 1920x1080 px). Aplica fondo #0B192C.' },
    { step: 2, title: 'Silueta Anatómica Base', detail: 'Añade corte lateral sagital de cabeza/cráneo a transparencia del 35%.' },
    { step: 3, title: 'Efecto Lupa (Zoom)', detail: 'Inserta marco circular sobre tercio anteroinferior del tabique y añade borde con sombra dorada #FFD166.' },
    { step: 4, title: 'Trazado de las 4 Arterias', detail: 'Usa líneas conectoras con terminal en punto. 1 azul (#00F0FF) arriba y 3 rojas (#FF3366) atrás y abajo.' },
    { step: 5, title: 'Bloque Clínico Inferior', detail: 'Tarjeta flotante translúcida (#102A43 con 85% opacidad) con los 3 puntos clave: Localización, Mecanismo y Manejo.' },
  ]
};
