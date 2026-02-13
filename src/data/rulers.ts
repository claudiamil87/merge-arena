// Definições de Rulers (líderes)
export interface Ruler {
  id: string;
  name: string;
  icon: string;
  ability: string;
  description: string;
  visual: {
    shape: 'crown' | 'diamond' | 'triangle';
    color: string;
  };
}

export const RULER_DATA: Ruler[] = [
  {
    id: 'rei_tatico',
    name: 'Rei Tático',
    icon: '👑',
    ability: 'Resiliência',
    description: 'Perder rodada → +4 elixir extra',
    visual: { shape: 'crown', color: '#F1C40F' }
  },
  {
    id: 'imperatriz_arcana',
    name: 'Imperatriz Arcana',
    icon: '💎',
    ability: 'Fusão Mística',
    description: 'Cada merge → +1 elixir bônus',
    visual: { shape: 'diamond', color: '#9B59B6' }
  },
  {
    id: 'general_goblin',
    name: 'General Goblin',
    icon: '🟢',
    ability: 'Exército Verde',
    description: 'Começa com 1 Goblin grátis; Goblins -1 custo',
    visual: { shape: 'triangle', color: '#2ECC71' }
  }
];
