import Phaser from 'phaser';
import { BoardPlugin } from 'phaser3-rex-plugins';
import { GAME_CONFIG } from './constants';

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  backgroundColor: GAME_CONFIG.backgroundColor,
  parent: 'app',
  scene: [], // será preenchido no main.ts
  plugins: {
    scene: [
      {
        key: 'rexBoard',
        plugin: BoardPlugin,
        mapping: 'rexBoard'
      }
    ]
  },
  input: {
    activePointers: 3
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
