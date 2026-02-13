export class InputManager {
    constructor(scene) {
        Object.defineProperty(this, "scene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dragTarget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "dragOffset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { x: 0, y: 0 }
        });
        Object.defineProperty(this, "onDropCallback", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => { }
        });
        this.scene = scene;
    }
    enableDrag(target, onDrop) {
        this.onDropCallback = onDrop;
        target.setInteractive({ useHandCursor: true });
        target.on('pointerdown', (pointer) => {
            this.dragTarget = target;
            const pos = target.getCenterPoint();
            this.dragOffset = { x: pointer.x - pos.x, y: pointer.y - pos.y };
            this.scene.children.bringToTop(target);
        });
        this.scene.input.on('pointermove', (pointer) => {
            if (this.dragTarget) {
                this.dragTarget.x = pointer.x - this.dragOffset.x;
                this.dragTarget.y = pointer.y - this.dragOffset.y;
            }
        });
        this.scene.input.on('pointerup', (pointer) => {
            if (this.dragTarget) {
                this.onDropCallback(this.dragTarget, pointer.x, pointer.y);
                this.dragTarget = null;
            }
        });
    }
    disable() {
        this.dragTarget = null;
    }
}
