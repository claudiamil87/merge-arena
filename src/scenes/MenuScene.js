import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }
    create() {
        const cx = GAME_CONFIG.width / 2;
        const cy = GAME_CONFIG.height / 2;
        // Fundo visível e contrastante
        this.cameras.main.setBackgroundColor('#1a1a2e');
        // Título
        const title = this.add.text(cx, 120, 'MERGE ARENA', {
            fontSize: '56px',
            fontFamily: 'Arial Black',
            color: '#F1C40F',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);
        // Subtítulo
        this.add.text(cx, 190, 'Auto-Battler Tático', {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#BDC3C7'
        }).setOrigin(0.5);
        // Botões --- centralizados verticalmente
        const buttonYStart = 320;
        const buttonSpacing = 100;
        this.createButton(cx, buttonYStart, '▶ JOGAR', '#27AE60', 240, 65, () => {
            this.scene.start('RulerSelectScene');
        });
        this.createButton(cx, buttonYStart + buttonSpacing, '📊 ESTATÍSTICAS', '#3498DB', 280, 60, () => {
            this.showToast('Estatísticas em breve!');
        });
        this.createButton(cx, buttonYStart + buttonSpacing * 2, '⚙️ CONFIG', '#95A5A6', 220, 60, () => {
            this.showToast('Config em breve!');
        });
        // Versão
        this.add.text(cx, GAME_CONFIG.height - 60, 'v2.0 — Merge Arena MVP', {
            fontSize: '16px',
            color: '#7F8C8D'
        }).setOrigin(0.5);
        // Animação
        this.tweens.add({
            targets: title,
            y: title.y - 8,
            duration: 1800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    createButton(x, y, label, color, w, h, callback) {
        // Sombra do botão (mais visível)
        const shadow = this.add.rectangle(x + 3, y + 3, w, h, 0x000000, 0.4);
        const bg = this.add.rectangle(x, y, w, h, Phaser.Display.Color.ValueToColor(color).color)
            .setStrokeStyle(4, 0xFFFFFF);
        const text = this.add.text(x, y, label, {
            fontSize: '26px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        const btn = this.add.container(x, y, [shadow, bg, text]);
        btn.setSize(w, h);
        btn.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);
        btn.on('pointerdown', callback);
        btn.on('pointerover', () => {
            bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).lighten(15).color);
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
        const toast = this.add.text(cx, GAME_CONFIG.height - 100, msg, {
            fontSize: '18px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: { x: 15, y: 8 }
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
