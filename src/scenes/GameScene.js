import Phaser from 'phaser';
import { GAME_CONFIG, TIMING, ECONOMY, BENCH_CONFIG } from '../config/constants';
import { HexGrid } from '../board/HexGrid';
import { Troop } from '../entities/Troop';
import { TROOP_DATA } from '../data/troops';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        Object.defineProperty(this, "hexGrid", {
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
        });
        Object.defineProperty(this, "gameState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "benchSlots", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "shopCards", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "troopsOnBoard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "benchTroops", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "deployTimerEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isBattlePhase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "elixirText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "roundText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timerText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    create() {
        this.gameState = this.registry.get('gameState');
        this.hexGrid = new HexGrid(this);
        this.board = this.hexGrid.create();
        this.createHUD();
        this.createBench();
        this.createShop();
        this.startDeployPhase();
    }
    createHUD() {
        const padding = 10;
        const barHeight = 40;
        const y = padding + barHeight / 2;
        // Fundo da barra superior
        this.add.rectangle(GAME_CONFIG.width / 2, y, GAME_CONFIG.width - 20, barHeight, 0x000000, 0.7)
            .setStrokeStyle(2, 0x7F8C8D);
        // Round
        this.roundText = this.add.text(20, y, `Rodada ${this.gameState.round}`, {
            fontSize: '18px',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
        // Timer
        this.timerText = this.add.text(GAME_CONFIG.width / 2, y, `Deploy ${this.gameState.deployTimer}s`, {
            fontSize: '18px',
            color: '#F1C40F',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        // Elixir
        this.elixirText = this.add.text(GAME_CONFIG.width - 20, y, `💰 ${this.gameState.elixir}`, {
            fontSize: '20px',
            color: '#2ECC71',
            fontStyle: 'bold'
        }).setOrigin(1, 0.5);
    }
    createBench() {
        const benchY = GAME_CONFIG.height - 60;
        const startX = 40;
        const slotSize = 60;
        const gap = 10;
        for (let i = 0; i < BENCH_CONFIG.slots; i++) {
            const x = startX + i * (slotSize + gap);
            const slot = this.createSlot(x, benchY, slotSize);
            this.benchSlots.push(slot);
        }
        // Label Bench
        this.add.text(startX - 5, benchY - 20, 'BENCH', {
            fontSize: '12px',
            color: '#BDC3C7'
        }).setOrigin(0, 0.5);
    }
    createSlot(x, y, size) {
        const bg = this.add.rectangle(0, 0, size, size, 0x34495E, 0.8).setStrokeStyle(2, 0x7F8C8D);
        const slot = this.add.container(x, y, [bg]);
        slot.setSize(size, size);
        slot.setInteractive({ useHandCursor: true });
        return slot;
    }
    createShop() {
        const shopY = GAME_CONFIG.height - 130;
        const startX = 40;
        const cardWidth = 120;
        const cardHeight = 80;
        const gap = 10;
        for (let i = 0; i < ECONOMY.shopSize; i++) {
            const x = startX + i * (cardWidth + gap);
            const card = this.createShopCard(x, shopY, cardWidth, cardHeight, i);
            card.setInteractive({ useHandCursor: true });
            card.on('pointerdown', () => this.buyTroop(i));
            this.shopCards.push(card);
        }
        // Label Loja
        this.add.text(startX - 5, shopY - 20, 'LOJA', {
            fontSize: '12px',
            color: '#BDC3C7'
        }).setOrigin(0, 0.5);
    }
    createShopCard(x, y, w, h, index) {
        const bg = this.add.rectangle(x, y, w, h, 0x2980B9).setStrokeStyle(3, 0xFFFFFF);
        const costText = this.add.text(x, y - h / 2 + 15, `💰 ?`, {
            fontSize: '16px',
            color: '#F1C40F',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        const nameText = this.add.text(x, y, '???', {
            fontSize: '12px',
            color: '#ECF0F1'
        }).setOrigin(0.5);
        return this.add.container(x, y, [bg, costText, nameText]);
    }
    startDeployPhase() {
        this.isBattlePhase = false;
        this.gameState.deployTimer = TIMING.deployPhaseSeconds;
        this.updateHUD();
        this.generateShop();
        if (this.deployTimerEvent)
            this.deployTimerEvent.remove();
        this.deployTimerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.onDeployTick,
            callbackScope: this,
            loop: true
        });
        this.showPhaseText('Deploy Phase');
    }
    onDeployTick() {
        this.gameState.deployTimer--;
        this.updateHUD();
        if (this.gameState.deployTimer <= 0) {
            this.deployTimerEvent?.remove();
            this.startBattlePhase();
        }
    }
    startBattlePhase() {
        this.isBattlePhase = true;
        this.showPhaseText('Batalha!');
        this.disableShop();
        // Simples auto-battle por alguns segundos
        let battleTime = TIMING.battlePhaseSeconds;
        const battleTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                battleTime--;
                if (battleTime <= 0) {
                    battleTimer.remove();
                    this.endBattle();
                }
            }
        });
        // TODO: implementar CombatEngine
    }
    endBattle() {
        // Calcular resultado
        const damage = Math.floor(Math.random() * 3) + 1;
        this.gameState.playerHP -= damage;
        this.gameState.elixir += ECONOMY.elixirPerRound;
        this.gameState.round++;
        this.gameState.deployTimer = TIMING.deployPhaseSeconds;
        // Reset board
        this.clearBoard();
        this.clearBench();
        this.startDeployPhase();
    }
    generateShop() {
        const allTypes = Object.keys(TROOP_DATA);
        this.gameState.shop = [];
        for (let i = 0; i < ECONOMY.shopSize; i++) {
            const type = allTypes[Math.floor(Math.random() * allTypes.length)];
            const cost = TROOP_DATA[type].cost;
            this.gameState.shop.push({ type, cost });
        }
        this.updateShopUI();
    }
    updateShopUI() {
        this.shopCards.forEach((card, idx) => {
            if (this.gameState.shop[idx]) {
                const data = TROOP_DATA[this.gameState.shop[idx].type];
                const bg = card.getAt(0);
                const costText = card.getAt(1);
                const nameText = card.getAt(2);
                bg.setFillStyle(Phaser.Display.Color.ValueToColor('#2980B9').color);
                costText.setText(`💰 ${data.cost}`);
                nameText.setText(data.name);
            }
        });
    }
    buyTroop(shopIndex) {
        if (this.isBattlePhase)
            return;
        const shopItem = this.gameState.shop[shopIndex];
        if (!shopItem)
            return;
        if (this.gameState.elixir < shopItem.cost) {
            this.showToast('Elixir insuficiente!');
            return;
        }
        // Deduz elixir
        this.gameState.elixir -= shopItem.cost;
        // Cria tropa
        const troop = new Troop(this, shopItem.type, 1);
        this.benchTroops.push(troop);
        // Atualiza bench UI
        this.updateBenchUI();
        // Atualiza shop
        this.gameState.shop[shopIndex] = null;
        this.generateShop(); // simplificado: regera tudo
        this.updateHUD();
    }
    updateBenchUI() {
        // Limpar bench visual
        this.benchSlots.forEach(slot => {
            slot.removeAll();
        });
        // Colocar tropas no bench
        this.benchTroops.forEach((troop, idx) => {
            if (idx < BENCH_CONFIG.slots) {
                const slot = this.benchSlots[idx];
                const slotCenter = new Phaser.Geom.Point(slot.x, slot.y);
                troop.container.setPosition(slotCenter.x, slotCenter.y);
                slot.add(troop.container);
                troop.addToScene();
            }
        });
    }
    clearBoard() {
        this.troopsOnBoard.forEach(t => t.removeFromScene());
        this.troopsOnBoard = [];
    }
    clearBench() {
        this.benchTroops.forEach(t => t.removeFromScene());
        this.benchTroops = [];
    }
    updateHUD() {
        this.elixirText.setText(`💰 ${this.gameState.elixir}`);
        this.roundText.setText(`Rodada ${this.gameState.round}`);
        this.timerText.setText(this.isBattlePhase ? 'Batalha!' : `Deploy ${this.gameState.deployTimer}s`);
    }
    showPhaseText(text) {
        const cx = GAME_CONFIG.width / 2;
        const cy = GAME_CONFIG.height / 2;
        const phaseText = this.add.text(cx, cy, text, {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            color: '#F1C40F',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);
        this.tweens.add({
            targets: phaseText,
            alpha: 0,
            y: cy - 50,
            duration: 1500,
            onComplete: () => phaseText.destroy()
        });
    }
    disableShop() {
        this.shopCards.forEach(card => card.disableInteractive());
    }
    showToast(msg) {
        const cx = GAME_CONFIG.width / 2;
        const toast = this.add.text(cx, GAME_CONFIG.height - 200, msg, {
            fontSize: '16px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);
        this.tweens.add({
            targets: toast,
            alpha: 0,
            delay: 1500,
            duration: 500,
            onComplete: () => toast.destroy()
        });
    }
}
