import Phaser from 'phaser';
import { phaserConfig } from './config/gameConfig';
import BootScene from './scenes/BootScene';
import MenuScene from './scenes/MenuScene';
import RulerSelectScene from './scenes/RulerSelectScene';
import GameScene from './scenes/GameScene';
import ResultScene from './scenes/ResultScene';

// Configurar cenas no gameConfig
phaserConfig.scene = [BootScene, MenuScene, RulerSelectScene, GameScene, ResultScene];

// Criar jogo
const game = new Phaser.Game(phaserConfig);

// Trap para errors
window.addEventListener('error', (e) => {
  console.error('Game error:', e.error);
});
