// Definições de Modifiers (regras especiais por partida)
export interface Modifier {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const MODIFIER_DATA: Modifier[] = [
  {
    id: 'elixir_rico',
    name: 'Elixir Rico',
    description: '+2 elixir por rodada',
    icon: '💰'
  },
  {
    id: 'forca_inicial',
    name: 'Força Inicial',
    description: 'Primeira tropa comprada é 2★',
    icon: '⭐'
  },
  {
    id: 'bench_power',
    name: 'Bench Power',
    description: 'Tropas no bench: +10% stats/rodada',
    icon: '🪑'
  },
  {
    id: 'frenzy_total',
    name: 'Frenzy Total',
    description: 'Frenzy dura toda a batalha',
    icon: '⚡'
  },
  {
    id: 'eco_match',
    name: 'Eco Match',
    description: 'Tropas custam -1 (mín 1)',
    icon: '🏷️'
  },
  {
    id: 'mega_merge',
    name: 'Mega Merge',
    description: 'Merges dão +2 elixir (em vez de +1)',
    icon: '🔄'
  },
  {
    id: 'arena_grande',
    name: 'Arena Grande',
    description: '+2 slots no campo desde Round 1',
    icon: '📐'
  },
  {
    id: 'loja_caotica',
    name: 'Loja Caótica',
    description: 'Loja mostra 5 opções em vez de 3',
    icon: '🎰'
  }
];
