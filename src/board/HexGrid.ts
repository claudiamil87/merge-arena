import Phaser from 'phaser';
import { BOARD_CONFIG, HEX_CONFIG, ZONE_COLORS, GAME_CONFIG } from '../config/constants';

export class HexGrid {
  private scene: Phaser.Scene;
  private tiles: Phaser.GameObjects.Graphics[] = [];
  private tileStates: Map<string, 'player' | 'enemy' | 'neutral'> = new Map();
  private hexPositions: Map<string, { x: number; y: number }> = new Map();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create() {
    const cx = GAME_CONFIG.width / 2;
    const cy = GAME_CONFIG.height / 2 - 50;

    // Criar grid manualmente
    for (let row = 0; row < BOARD_CONFIG.rows; row++) {
      for (let col = 0; col < BOARD_CONFIG.cols; col++) {
        const pos = this.hexToPixel(col, row, cx, cy);
        const key = `${col},${row}`;
        const zone = this.getZone(row);
        this.tileStates.set(key, zone);
        this.hexPositions.set(key, pos);

        const g = this.scene.add.graphics();
        this.drawHex(g, pos.x, pos.y, zone);
        this.tiles.push(g);
      }
    }

    return { getHexPosition: (col: number, row: number) => this.hexPositions.get(`${col},${row}`) };
  }

  private hexToPixel(col: number, row: number, cx: number, cy: number): { x: number; y: number } {
    const size = HEX_CONFIG.cellWidth / 2;
    const x = cx + (col - (BOARD_CONFIG.cols - 1) / 2) * (size * 1.5);
    const y = cy + row * (size * Math.sqrt(3));
    return { x, y };
  }

  private getZone(row: number): 'player' | 'enemy' | 'neutral' {
    if (row >= BOARD_CONFIG.playerZoneStartRow) return 'player';
    if (row < 2) return 'enemy';
    return 'neutral';
  }

  private drawHex(g: Phaser.GameObjects.Graphics, x: number, y: number, zone: 'player' | 'enemy' | 'neutral') {
    const size = HEX_CONFIG.cellWidth / 2;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - (Math.PI / 6);
      points.push({ x: x + size * Math.cos(angle), y: y + size * Math.sin(angle) });
    }
    const zoneColors = zone === 'player' ? ZONE_COLORS.player : zone === 'enemy' ? ZONE_COLORS.enemy : { base: '#34495E', accent: '#7F8C8D' };
    g.clear();
    g.fillStyle(Phaser.Display.Color.ValueToColor(zoneColors.base).color, 0.3);
    g.fillPoints(points, true);
    g.lineStyle(2, Phaser.Display.Color.ValueToColor(zoneColors.accent).color, 0.8);
    g.strokePoints(points, true);
  }
}
