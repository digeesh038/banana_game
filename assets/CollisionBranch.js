export default class CollisionBranch {
    constructor(scene, player, branchManager, healthBarManager) {
        this.scene = scene;
        this.player = player;
        this.branchManager = branchManager;
        this.healthBarManager = healthBarManager; // Health manager
        this.isRedOverlayActive = false;

        this.setupCollisionDetection();
    }

    setupCollisionDetection() {
        this.scene.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;

                // Check if the player has collided with any branch
                const isBranchA = this.branchManager.isBranch(bodyA);
                const isBranchB = this.branchManager.isBranch(bodyB);

                const keyA = bodyA.gameObject ? bodyA.gameObject.texture.key : null;
                const keyB = bodyB.gameObject ? bodyB.gameObject.texture.key : null;

                if ((keyA && isBranchA && this.branchManager.branchKeys.includes(keyA) && bodyB === this.player.body) ||
                    (keyB && isBranchB && this.branchManager.branchKeys.includes(keyB) && bodyA === this.player.body)) {
                    
                    if (!this.isRedOverlayActive) {
                        this.triggerRedOverlay();
                        console.log('%cPlayer hit a branch!', 'color: red; font-size: 20px; font-weight: bold;');
                    }
                }
            });
        });
    }

    triggerRedOverlay() {
        if (this.isRedOverlayActive) return; // Prevent multiple overlays

        this.isRedOverlayActive = true;

        // Reduce player's health by 1
        this.healthBarManager.decreaseHealth(1);

        const camera = this.scene.cameras.main;
        const width = camera.width;
        const height = camera.height;

        // Create a red overlay covering the entire screen
        const overlay = this.scene.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0xff0000
        );

        overlay.setAlpha(0.7);
        overlay.setDepth(1000); // Ensure it is on top of other elements

        // Fade out the red overlay after 1 second
        this.scene.tweens.add({
            targets: overlay,
            alpha: 0,
            duration: 900, // 1 second duration
            onComplete: () => {
                overlay.destroy();
                this.isRedOverlayActive = false; // Allow new overlays
            }
        });
    }
}
