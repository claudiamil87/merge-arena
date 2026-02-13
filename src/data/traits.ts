// Definições de Traits e suas sinergias
export interface TraitBonus {
  atTwo: string; // descrição do bônus com 2 tropas
  atFour?: string; // bônus com 4 tropas (se aplicável)
}

export const TRAIT_DATA: Record<string, TraitBonus & { troops: string[] }> = {
  Brawler: {
    troops: ['Guerreiro', 'Cavaleiro'],
    atTwo: '+15% HP para Brawlers',
    atFour: '+30% HP, +10% attack speed'
  },
  Ranger: {
    troops: ['Arqueira', 'Lanceiro'],
    atTwo: '+15% hit speed (stack 10x)',
    atFour: '+25% hit speed (stack 15x)'
  },
  Assassin: {
    troops: ['Goblin', 'Ninja', 'Espectro'],
    atTwo: 'Assassins pulam para backline',
    atFour: '+50% crit damage'
  },
  Blaster: {
    troops: ['Mago', 'Bombardeiro'],
    atTwo: '+1 range',
    atFour: '+2 range, +15% splash'
  },
  Noble: {
    troops: ['Cavaleiro', 'Curandeira'],
    atTwo: 'Front: -20% dmg; Back: +20% dmg',
    atFour: 'Front: -40%; Back: +40%'
  },
  Juggernaut: {
    troops: ['Gigante', 'Mini PEKKA'],
    atTwo: 'Aliados atrás: 15% shield 8s',
    atFour: '30% shield'
  },
  Ace: {
    troops: ['Arqueira', 'Mago', 'Ninja'],
    atTwo: '★ mais alto = Captain: +20% hit speed ao time 4s após kill',
    atFour: '2 Captains'
  },
  Clan: {
    troops: ['Guerreiro', 'Gigante', 'Curandeira'],
    atTwo: '+10% HP global',
    atFour: '+20% HP global'
  },
  Goblin: {
    troops: ['Goblin', 'Lanceiro'],
    atTwo: '+1 Goblin grátis próxima rodada',
    atFour: '60% chance de Goblin raro'
  },
  Undead: {
    troops: ['Bombardeiro', 'Espectro'],
    atTwo: 'Curse no inimigo com mais HP: +20% dmg ao morrer',
    atFour: 'Curse em 2, -50% max HP'
  },
  Avenger: {
    troops: ['Mini PEKKA'],
    atTwo: '+30% dmg para Avengers',
    atFour: 'Último vivo: dano dobrado'
  }
};

export const ACTIVE_TRAIT_THRESHOLD = 2; // número mínimo para ativar
