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
        Object.defineProperty(this, "board", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // rexBoard
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
        this.board.iterateEachTile((tile) => {
            const xNum = tile.pixelX;
            const yNum = tile.pixelY;
            const key = `${tile.xy.x},${tile.xy.y}`;
            const zone = this.getZone(tile.xy.y);
            this.tileStates.set(key, zone);
            const graphics = this.scene.add.graphics();
            this.drawHex(graphics, xNum, yNum, zone);
            this.tiles.push(graphics);
        });
        return this.board;
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
    highlightTile(tileKey, color = 0x00FF00) {
        // TODO: Implementar highlight
    }
    clearHighlights() {
        // TODO: Limpar highlights
    }
    getBoard() {
        return this.board;
    }
}
