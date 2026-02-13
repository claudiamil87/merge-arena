import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';

export default class MenuScene extends Phaser.Scene {
  private title!: Phaser.GameObjects.Text;
  private playButton!: Phaser.GameObjects.Container;
  private statsButton!: Phaser.GameObjects.Container;
  private configButton!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const cx = GAME_CONFIG.width / 2;
    const cy = GAME_CONFIG.height / 2;

    // Título
    this.title = this.add.text(cx, cy - 150, 'MERGE ARENA', {
      fontSize: '48px',
      fontFamily: 'Arial Black',
      color: '#F1C40F',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Subtítulo
    this.add.text(cx, cy - 90, 'Auto-Battler Tático', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#BDC3C7'
    }).setOrigin(0.5);

    // Botões (usando retângulos coloridos)
    this.createButton(cx, cy + 20, '▶ JOGAR', '#27AE60', () => {
      this.scene.start('RulerSelectScene');
    });

    this.createButton(cx, cy + 90, '📊 ESTATÍSTICAS', '#3498DB', () => {
      // TODO: Implementar tela de stats
      this.showToast('Stats em breve!');
    });

    this.createButton(cx, cy + 160, '⚙️ CONFIG', '#95A5A6', () => {
      // TODO: Tela de configuração
      this.showToast('Config em breve!');
    });

    // Versão
    this.add.text(cx, GAME_CONFIG.height - 30, 'v2.0 by MiLord', {
      fontSize: '14px',
      color: '#7F8C8D'
    }).setOrigin(0.5);

    // Animação do título
    this.tweens.add({
      targets: this.title,
      y: this.title.y - 5,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private createButton(x: number, y: number, label: string, color: string, callback: () => void) {
    const bg = this.add.rectangle(x, y, 240, 50, Phaser.Display.Color.ValueToColor(color).color);
    bg.setStrokeStyle(3, 0xFFFFFF);
    bg.setInteractive({ useHandCursor: true });

    const text = this.add.text(x, y, label, {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const container = this.add.container(x, y, [bg, text]);
    container.setSize(240, 50);
    container.setInteractive(new Phaser.Geom.Rectangle(-120, -25, 240, 50), Phaser.Geom.Rectangle.Contains);
    container.on('pointerdown', callback);

    container.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).lighten(20).color));
    container.on('pointerout', () => bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).color));

    return container;
  }

  private showToast(msg: string) {
    const cx = GAME_CONFIG.width / 2;
    const toast = this.add.text(cx, GAME_CONFIG.height - 100, msg, {
      fontSize: '18px',
      backgroundColor: '#000000',
      color: '#FFFFFF',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);

    this.tweens.add({
      targets: toast,
      alpha: 0,
      delay: 2000,
      duration: 500,
      onComplete: () => toast.destroy()
    });
  }
}
