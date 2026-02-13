import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';
import { RULER_DATA } from '../data/rulers';

export default class RulerSelectScene extends Phaser.Scene {
  private selectedRuler: string | null = null;

  constructor() {
    super({ key: 'RulerSelectScene' });
  }

  create() {
    const cx = GAME_CONFIG.width / 2;

    // Título
    this.add.text(cx, 60, 'ESCOLHA SEU RULER', {
      fontSize: '28px',
      fontFamily: 'Arial Black',
      color: '#F1C40F',
      stroke: '#000',
      strokeThickness: 3
    }).setOrigin(0.5);

    // Renderizar opções
    const startY = 150;
    const spacing = 180;

    RULER_DATA.forEach((ruler, idx) => {
      const y = startY + idx * spacing;
      const x = cx;

      // Container do card
      const card = this.createRulerCard(x, y, ruler);
      card.setInteractive({ useHandCursor: true });
      card.on('pointerdown', () => this.selectRuler(ruler.id, card));
    });

    // Botão confirmar
    const confirmBtn = this.createButton(cx, GAME_CONFIG.height - 80, 'CONFIRMAR', '#27AE60', () => {
      if (this.selectedRuler) {
        const state = this.registry.get('gameState') as any;
        state.selectedRuler = this.selectedRuler;
        this.scene.start('GameScene');
      } else {
        this.showToast('Selecione um ruler!');
      }
    });
  }

  private createRulerCard(x: number, y: number, ruler: any): Phaser.GameObjects.Container {
    const cardWidth = 300;
    const cardHeight = 140;

    const bg = this.add.rectangle(x, y, cardWidth, cardHeight, 0x2C3E50)
      .setStrokeStyle(3, 0x7F8C8D);

    // Ícone
    const icon = this.add.text(x - 100, y, ruler.icon, {
      fontSize: '64px'
    }).setOrigin(0.5);

    // Nome
    const name = this.add.text(x + 20, y - 40, ruler.name, {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    // Habilidade
    const ability = this.add.text(x + 20, y + 10, ruler.ability, {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#F1C40F'
    }).setOrigin(0, 0.5);

    // Descrição
    const desc = this.add.text(x + 20, y + 40, ruler.description, {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: '#BDC3C7',
      wordWrap: { width: 200 }
    }).setOrigin(0, 0.5);

    return this.add.container(x, y, [bg, icon, name, ability, desc]);
  }

  private selectRuler(rulerId: string, card: Phaser.GameObjects.Container) {
    this.selectedRuler = rulerId;
    // Highlight selecionado
    this.children.list.forEach(child => {
      if (child instanceof Phaser.GameObjects.Container && child !== card) {
        const bg = child.getAt(0) as Phaser.GameObjects.Rectangle;
        bg.setStrokeStyle(3, 0x7F8C8D);
      }
    });
    const bg = card.getAt(0) as Phaser.GameObjects.Rectangle;
    bg.setStrokeStyle(4, 0xF1C40F);
  }

  private createButton(x: number, y: number, label: string, color: string, callback: () => void) {
    const bg = this.add.rectangle(x, y, 200, 50, Phaser.Display.Color.ValueToColor(color).color)
      .setStrokeStyle(3, 0xFFFFFF);

    const text = this.add.text(x, y, label, {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const btn = this.add.container(x, y, [bg, text]);
    btn.setSize(200, 50);
    btn.setInteractive(new Phaser.Geom.Rectangle(-100, -25, 200, 50), Phaser.Geom.Rectangle.Contains);
    btn.on('pointerdown', callback);

    btn.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).lighten(20).color));
    btn.on('pointerout', () => bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).color));

    return btn;
  }

  private showToast(msg: string) {
    const cx = GAME_CONFIG.width / 2;
    const toast = this.add.text(cx, GAME_CONFIG.height - 150, msg, {
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
