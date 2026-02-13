// Configurações globais do jogo
export const GAME_CONFIG = {
  width: 480,
  height: 854,
  backgroundColor: '#16213e', // Azul escuro mais vibrante
  scaleMode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH
};

export const HEX_CONFIG = {
  cellWidth: 64,
  cellHeight: 64,
  staggeraxis: 'x' as const,
  staggerindex: 'odd' as const
};

export const BOARD_CONFIG = {
  cols: 5,
  rows: 4,
  playerZoneStartRow: 2
};

export const TIMING = {
  deployPhaseSeconds: 30,
  battlePhaseSeconds: 30, // reduzido para teste
  frenzyStartSeconds: 10
};

export const ECONOMY = {
  initialElixir: 10, // mais elixir inicial
  elixirPerRound: 4,
  sellRefundFactor: 0.8,
  shopSize: 3
};

export const BENCH_CONFIG = {
  slots: 5
};

// Cores por trait
export const TRAIT_COLORS: Record<string, string> = {
  Brawler: '#E74C3C',
  Ranger: '#27AE60',
  Assassin: '#8E44AD',
  Blaster: '#E67E22',
  Noble: '#F1C40F',
  Juggernaut: '#2C3E50',
  Ace: '#1ABC9C',
  Clan: '#3498DB',
  Goblin: '#2ECC71',
  Undead: '#95A5A6',
  Avenger: '#C0392B'
};

// Cores das zonas do tabuleiro
export const ZONE_COLORS = {
  player: { base: '#1a3b5c', accent: '#3498DB' }, // azul mais claro
  enemy: { base: '#3b1a1a', accent: '#E74C3C' }
};
