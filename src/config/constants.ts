// Configurações globais do jogo
export const GAME_CONFIG = {
  width: 480,
  height: 854,
  backgroundColor: '#1a1a2e'
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
  battlePhaseSeconds: 45,
  frenzyStartSeconds: 10
};

export const ECONOMY = {
  initialElixir: 5,
  elixirPerRound: 4,
  sellRefundFactor: 0.8, // devolve 80% do custo
  shopSize: 3
};

export const BENCH_CONFIG = {
  slots: 5
};

export const MERGE_CONFIG = {
  levels: [1, 2, 3, 4],
  statsMultipliers: [1.0, 1.8, 3.2, 5.5]
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
  player: { base: '#2C3E50', accent: '#3498DB' },
  enemy: { base: '#4a2c2c', accent: '#E74C3C' }
};
