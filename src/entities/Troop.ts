import Phaser from 'phaser';
import { TROOP_DATA, TroopStats } from '../data/troops';
import { TRAIT_COLORS, GAME_CONFIG } from '../config/constants';

export class Troop {
  id: string;
  typeId: string;
  stats: TroopStats;
  currentHP: number;
  mergeLevel: number;
  tileX: number = -1;
  tileY: number = -1;
  container: Phaser.GameObjects.Container;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, typeId: string, mergeLevel: number = 1, id?: string) {
    this.scene = scene;
    this.typeId = typeId;
    this.stats = TROOP_DATA[typeId];
    this.mergeLevel = mergeLevel;
    this.id = id || `${typeId}_${Date.now()}_${Math.random()}`;
    this.currentHP = this.stats.hp * this.getStatsMultiplier();

    this.container = this.createVisual();
  }

  private getStatsMultiplier(): number {
    const mults = [1.0, 1.8, 3.2, 5.5];
    return mults[this.mergeLevel - 1] || 1.0;
  }

  private createVisual(): Phaser.GameObjects.Container {
    const g = this.scene.add.graphics();
    const size = this.stats.visual.size * (1 + (this.mergeLevel - 1) * 0.2);
    const color = Phaser.Display.Color.ValueToColor(this.stats.visual.color).color;

    // Forma base
    g.fillStyle(color, 1);
    if (this.stats.visual.shape === 'circle') {
      g.fillCircle(0, 0, size / 2);
    } else if (this.stats.visual.shape === 'rect') {
      g.fillRect(-size / 2, -size / 2, size, size);
    } else if (this.stats.visual.shape === 'triangle') {
      this.drawPolygon(g, 3, size / 2, color);
    } else if (this.stats.visual.shape === 'polygon' && this.stats.visual.polygonSides) {
      this.drawPolygon(g, this.stats.visual.polygonSides, size / 2, color);
    }

    // Glow para ★3+
    if (this.mergeLevel >= 3) {
      g.lineStyle(3, 0xFFFFFF, 0.6);
      if (this.stats.visual.shape === 'circle') {
        g.strokeCircle(0, 0, size / 2 + 3);
      }
    }

    // ★ indicators
    const stars = this.scene.add.text(0, -size / 2 - 10, '★'.repeat(this.mergeLevel), {
      fontSize: '14px',
      color: '#F1C40F'
    }).setOrigin(0.5);

    // HP bar (linha abaixo)
    const hpWidth = size;
    const hpHeight = 4;
    const hpBg = this.scene.add.rectangle(0, size / 2 + 10, hpWidth, hpHeight, 0x000000, 0.5);
    const hpFill = this.scene.add.rectangle(0 - hpWidth / 2 + hpWidth * (this.currentHP / (this.stats.hp * this.getStatsMultiplier())), size / 2 + 10, 0, hpHeight, 0x00FF00);

    return this.scene.add.container(0, 0, [g, stars, hpBg, hpFill]);
  }

  private drawPolygon(g: Phaser.GameObjects.Graphics, sides: number, radius: number, color: number) {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
      points.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
    }
    g.fillPoints(points, true);
    g.lineStyle(2, color, 1);
    g.strokePoints(points, true);
  }

  setPosition(gridX: number, gridY: number, pixelX: number, pixelY: number) {
    this.tileX = gridX;
    this.tileY = gridY;
    this.container.setPosition(pixelX, pixelY);
  }

  addToScene() {
    this.container.setVisible(true);
  }

  removeFromScene() {
    this.container.setVisible(false);
    this.container.destroy();
  }

  takeDamage(amount: number): number {
    const actualDamage = Math.min(this.currentHP, amount);
    this.currentHP -= actualDamage;
    this.updateHPBar();
    return actualDamage;
  }

  private updateHPBar() {
    // TODO: implementar atualização da barra de HP
  }

  isDead(): boolean {
    return this.currentHP <= 0;
  }
}
