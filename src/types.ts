export type CarotidSystem = 'interna' | 'externa' | 'anastomosis';

export interface ArteryInfo {
  id: string;
  name: string;
  latinName: string;
  system: CarotidSystem;
  origin: string;
  originTree: string[];
  position: 'arriba-izquierda' | 'atras-derecha' | 'abajo-derecha' | 'abajo-adelante';
  positionLabel: string;
  color: string;
  flowDirection: string;
  description: string;
  clinicalRelevance: string;
  gauge: number; // visual thickness in px
}

export interface ClinicalPoint {
  id: string;
  iconName: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  badgeColor: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
}
