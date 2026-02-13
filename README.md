# Merge Arena

Auto-battler tático inspirado no modo Merge Tactics do Clash Royale.

## Stack
- Phaser 3 + TypeScript
- Vite (build/dev)
- Rex Board Plugin (grid hexagonal)

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Estrutura do Projeto

```
src/
├── config/      # Configurações e constantes
├── data/        # Balance data (tropas, traits, rulers, modifiers)
├── scenes/      # Cenas do Phaser (Boot, Menu, RulerSelect, Game, Result)
├── core/        # Sistemas principais (GameState, RoundManager, CombatEngine)
├── entities/    # Classes de Tropa, Player
├── board/       # HexGrid com Rex Board Plugin
├── ui/          # HUD, Shop, Bench, TraitBar
├── effects/     # Partículas e efeitos screen
├── audio/       # Audio procedural
└── utils/       # Helpers
```

## Status: MVP Development
Fase 1 — Foundation em andamento.
- [x] Setup Vite + Phaser + TypeScript
- [x] Estrutura de dados das tropas
- [x] HexGrid renderizado
- [ ] Drag & drop
- [ ] Merge automático
- [ ] Full troop rendering (12 tropas)

Veja o PRD completo em docs/PRD.md (não incluído aqui por brevidade).
