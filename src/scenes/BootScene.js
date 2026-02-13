import Phaser from 'phaser';
export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }
    preload() {
        // Sem assets externos - tudo será renderizado proceduralmente
    }
    create() {
        // Inicializa sistemas globais
        this.registry.set('gameState', {
            round: 1,
            playerHP: 10,
            elixir: 5,
            bench: [],
            field: [],
            shop: [],
            selectedRuler: null,
            selectedModifier: null,
            enemies: [],
            traitsActive: {},
            deployTimer: 30
        });
        this.scene.start('MenuScene');
    }
}
