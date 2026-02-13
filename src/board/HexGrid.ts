import Phaser from 'phaser';
import { BOARD_CONFIG, HEX_CONFIG, ZONE_COLORS, GAME_CONFIG } from '../config/constants';

export class HexGrid {
  private scene: Phaser.Scene;
  private board: any; // rexBoard
  private tiles: Phaser.GameObjects.Graphics[] = [];
  private tileStates: Map<string, 'player' | 'enemy' | 'neutral'> = new Map();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create() {
    const cx = GAME_CONFIG.width / 2;
    const cy = GAME_CONFIG.height / 2 - 50;

    this.board = this.scene.rexBoard.add.board({
      grid: {
        gridType: 'hexagonGrid',
        x: cx,
        y: cy,
        cellWidth: HEX_CONFIG.cellWidth,
        cellHeight: HEX_CONFIG.cellHeight,
        staggeraxis: HEX_CONFIG.staggeraxis,
        staggerindex: HEX_CONFIG.staggerindex
      },
      width: BOARD_CONFIG.cols,
      height: BOARD_CONFIG.rows
    });

    // Criar tiles visuais
    this.board.iterateEachTile((tile: any) => {
      const key = `${tile.xy.x},${tile.xy.y}`;
      const zone = this.getZone(tile.xy.y);
      this.tileStates.set(key, zone);

      const graphics = this.scene.add.graphics();
      this.drawHex(graphics, tile.pixelX, tile.pixelY, zone);
      this.tiles.push(graphics);
    });

    return this.board;
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
      const angle = (Math.PI / 3) * i - (Math.PI / 6); // flat-top rotation
      points.push({
        x: x + size * Math.cos(angle),
        y: y + size * Math.sin(angle)
      });
    }

    const zoneColors = zone === 'player' ? ZONE_COLORS.player : zone === 'enemy' ? ZONE_COLORS.enemy : { base: '#34495E', accent: '#7F8C8D' };

    g.clear();
    g.fillStyle(zoneColors.base, 0.3);
    g.fillPoints(points, true);
    g.lineStyle(2, Phaser.Display.Color.ValueToColor(zoneColors.accent).color, 0.8);
    g.strokePoints(points, true);
  }

  highlightTile(tileKey: string, color: number = 0x00FF00) {
    // TODO: Implementar highlight
  }

  clearHighlights() {
    // TODO: Limpar highlights
  }

  getBoard() {
    return this.board;
  }
}
