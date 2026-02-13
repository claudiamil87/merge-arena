import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }
    create() {
        const cx = GAME_CONFIG.width / 2;
        const cy = GAME_CONFIG.height / 2;
        // Fundo gradiente simulado
        this.add.rectangle(cx, cy, GAME_CONFIG.width, GAME_CONFIG.height, 0x0f172a, 1);
        // Título maior e mais destacado
        const title = this.add.text(cx, cy - 200, 'MERGE ARENA', {
            fontSize: '64px',
            fontFamily: 'Arial Black',
            color: '#F1C40F',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);
        // Subtítulo
        this.add.text(cx, cy - 120, 'Auto-Battler Tático', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ECF0F1'
        }).setOrigin(0.5);
        // Botões maiores
        this.createButton(cx, cy + 20, '▶ JOGAR', '#27AE60', 220, 60, () => {
            this.scene.start('RulerSelectScene');
        });
        this.createButton(cx, cy + 110, '📊 ESTATÍSTICAS', '#3498DB', 260, 55, () => {
            this.showToast('Estatísticas em breve!');
        });
        this.createButton(cx, cy + 190, '⚙️ CONFIG', '#95A5A6', 200, 55, () => {
            this.showToast('Config em breve!');
        });
        // Versão
        this.add.text(cx, GAME_CONFIG.height - 50, 'v2.0 — por MiLord', {
            fontSize: '16px',
            color: '#7F8C8D'
        }).setOrigin(0.5);
        // Animação do título
        this.tweens.add({
            targets: title,
            y: title.y - 10,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    createButton(x, y, label, color, w, h, callback) {
        const bg = this.add.rectangle(x, y, w, h, Phaser.Display.Color.ValueToColor(color).color)
            .setStrokeStyle(4, 0xFFFFFF);
        const text = this.add.text(x, y, label, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        const btn = this.add.container(x, y, [bg, text]);
        btn.setSize(w, h);
        btn.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);
        btn.on('pointerdown', callback);
        btn.on('pointerover', () => {
            bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).lighten(20).color);
            bg.setStrokeStyle(4, 0xF1C40F);
        });
        btn.on('pointerout', () => {
            bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).color);
            bg.setStrokeStyle(4, 0xFFFFFF);
        });
        return btn;
    }
    showToast(msg) {
        const cx = GAME_CONFIG.width / 2;
        const toast = this.add.text(cx, GAME_CONFIG.height - 120, msg, {
            fontSize: '18px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5);
        this.tweens.add({
            targets: toast,
            alpha: 0,
            delay: 2500,
            duration: 500,
            onComplete: () => toast.destroy()
        });
    }
}
