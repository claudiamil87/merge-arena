// Definições de tropas (balance data)
export interface TroopStats {
  name: string;
  cost: number;
  hp: number;
  damage: number;
  hitSpeed: number; // segundos
  range: number; // hexes (1 = melee)
  traits: string[];
  ability?: string;
  visual: {
    shape: 'circle' | 'rect' | 'triangle' | 'polygon';
    color: string;
    size: number;
    polygonSides?: number;
  };
}

export const TROOP_DATA: Record<string, TroopStats> = {
  guerreiro: {
    name: 'Guerreiro',
    cost: 2,
    hp: 800,
    damage: 80,
    hitSpeed: 1.2,
    range: 1,
    traits: ['Brawler', 'Clan'],
    visual: { shape: 'rect', color: '#E74C3C', size: 20 }
  },
  arqueira: {
    name: 'Arqueira',
    cost: 3,
    hp: 450,
    damage: 95,
    hitSpeed: 1.0,
    range: 3,
    traits: ['Ranger', 'Ace'],
    ability: 'Ataque duplo a cada 3 hits',
    visual: { shape: 'triangle', color: '#27AE60', size: 18 }
  },
  goblin: {
    name: 'Goblin',
    cost: 2,
    hp: 350,
    damage: 110,
    hitSpeed: 0.8,
    range: 1,
    traits: ['Assassin', 'Goblin'],
    ability: 'Pula para backline',
    visual: { shape: 'polygon', color: '#2ECC71', size: 16, polygonSides: 4 }
  },
  lanceiro: {
    name: 'Lanceiro',
    cost: 2,
    hp: 400,
    damage: 70,
    hitSpeed: 1.1,
    range: 2,
    traits: ['Ranger', 'Goblin'],
    visual: { shape: 'triangle', color: '#2ECC71', size: 22 }
  },
  cavaleiro: {
    name: 'Cavaleiro',
    cost: 4,
    hp: 1200,
    damage: 120,
    hitSpeed: 1.5,
    range: 1,
    traits: ['Noble', 'Brawler'],
    ability: 'Stun 1s no 1º ataque',
    visual: { shape: 'polygon', color: '#F1C40F', size: 24, polygonSides: 6 }
  },
  mago: {
    name: 'Mago',
    cost: 4,
    hp: 380,
    damage: 150,
    hitSpeed: 1.8,
    range: 3,
    traits: ['Blaster', 'Ace'],
    ability: 'Splash (adjacentes)',
    visual: { shape: 'circle', color: '#8E44AD', size: 22 }
  },
  gigante: {
    name: 'Gigante',
    cost: 5,
    hp: 2000,
    damage: 100,
    hitSpeed: 2.0,
    range: 1,
    traits: ['Juggernaut', 'Clan'],
    ability: 'Shield 15% p/ aliados atrás',
    visual: { shape: 'circle', color: '#2C3E50', size: 30 }
  },
  miniPEKKA: {
    name: 'Mini PEKKA',
    cost: 3,
    hp: 600,
    damage: 180,
    hitSpeed: 1.3,
    range: 1,
    traits: ['Juggernaut', 'Avenger'],
    ability: 'Dano 2x se último vivo',
    visual: { shape: 'rect', color: '#8E44AD', size: 20 }
  },
  curandeira: {
    name: 'Curandeira',
    cost: 3,
    hp: 500,
    damage: 40,
    hitSpeed: 2.0,
    range: 2,
    traits: ['Noble', 'Clan'],
    ability: 'Cura aliado com menor HP',
    visual: { shape: 'rect', color: '#FF69B4', size: 18 }
  },
  ninja: {
    name: 'Ninja',
    cost: 3,
    hp: 450,
    damage: 140,
    hitSpeed: 1.0,
    range: 1,
    traits: ['Assassin', 'Ace'],
    ability: 'Invis 2s ao entrar (não-targetável)',
    visual: { shape: 'polygon', color: '#95A5A6', size: 18, polygonSides: 5 }
  },
  bombardeador: {
    name: 'Bombardeiro',
    cost: 3,
    hp: 350,
    damage: 130,
    hitSpeed: 1.6,
    range: 2,
    traits: ['Blaster', 'Undead'],
    ability: 'Splash em area 2-hex radius',
    visual: { shape: 'circle', color: '#E67E22', size: 20 }
  },
  espectro: {
    name: 'Espectro',
    cost: 4,
    hp: 550,
    damage: 160,
    hitSpeed: 1.2,
    range: 1,
    traits: ['Assassin', 'Undead'],
    ability: 'Invis 1.5s a cada 5s',
    visual: { shape: 'circle', color: '#1ABC9C', size: 22 }
  }
};

export const ALL_TROOPS = Object.keys(TROOP_DATA);
