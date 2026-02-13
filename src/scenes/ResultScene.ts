import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultScene' });
  }

  create() {
    const cx = GAME_CONFIG.width / 2;
    const cy = GAME_CONFIG.height / 2;

    // Simular resultado (win ou loss)
    const won = Math.random() > 0.5;

    if (won) {
      this.add.text(cx, cy - 80, '🏆 VITÓRIA!', {
        fontSize: '48px',
        fontFamily: 'Arial Black',
        color: '#F1C40F',
        stroke: '#000000',
        strokeThickness: 6
      }).setOrigin(0.5);
    } else {
      this.add.text(cx, cy - 80, '💀 ELIMINADO', {
        fontSize: '42px',
        fontFamily: 'Arial Black',
        color: '#E74C3C',
        stroke: '#000000',
        strokeThickness: 6
      }).setOrigin(0.5);
    }

    // Stats mock
    this.add.text(cx, cy + 20, 'Rodadas: 6 | Merges: 12 | Dano: 4.500', {
      fontSize: '16px',
      color: '#BDC3C7'
    }).setOrigin(0.5);

    // Botão Jogar Novamente
    const btn = this.createButton(cx, cy + 100, 'JOGAR DENOVO', '#27AE60', () => {
      this.scene.start('RulerSelectScene');
    });

    // Botão Menu
    const menuBtn = this.createButton(cx, cy + 180, 'MENU', '#3498DB', () => {
      this.scene.start('MenuScene');
    });
  }

  private createButton(x: number, y: number, label: string, color: string, callback: () => void) {
    const bg = this.add.rectangle(x, y, 180, 45, Phaser.Display.Color.ValueToColor(color).color)
      .setStrokeStyle(3, 0xFFFFFF);

    const text = this.add.text(x, y, label, {
      fontSize: '18px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const btn = this.add.container(x, y, [bg, text]);
    btn.setSize(180, 45);
    btn.setInteractive(new Phaser.Geom.Rectangle(-90, -22, 180, 45), Phaser.Geom.Rectangle.Contains);
    btn.on('pointerdown', callback);

    btn.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).lighten(20).color));
    btn.on('pointerout', () => bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).color));

    return btn;
  }
}
