import Phaser from 'phaser';
import { BOARD_CONFIG, HEX_CONFIG, ZONE_COLORS, GAME_CONFIG } from '../config/constants';
export class HexGrid {
    constructor(scene) {
        Object.defineProperty(this, "scene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tiles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "tileStates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "hexPositions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
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
        return { getHexPosition: (col, row) => this.hexPositions.get(`${col},${row}`) };
    }
    hexToPixel(col, row, cx, cy) {
        const size = HEX_CONFIG.cellWidth / 2;
        const x = cx + (col - (BOARD_CONFIG.cols - 1) / 2) * (size * 1.5);
        const y = cy + row * (size * Math.sqrt(3));
        return { x, y };
    }
    getZone(row) {
        if (row >= BOARD_CONFIG.playerZoneStartRow)
            return 'player';
        if (row < 2)
            return 'enemy';
        return 'neutral';
    }
    drawHex(g, x, y, zone) {
        const size = HEX_CONFIG.cellWidth / 2;
        const points = [];
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
