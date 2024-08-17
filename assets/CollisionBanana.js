class CollisionManager {
    constructor(scene) {
        this.scene = scene;
        this.initCollisionDetection();
    }

    initCollisionDetection() {
        this.scene.matter.world.on('collisionstart', (event) => {
            const pairs = event.pairs;
            pairs.forEach(pair => {
                if (this.scene.player && this.scene.player.body) {
                    if ((pair.bodyA === this.scene.player.body && this.isBanana(pair.bodyB)) ||
                        (pair.bodyB === this.scene.player.body && this.isBanana(pair.bodyA))) {
                        const otherBody = pair.bodyA === this.scene.player.body ? pair.bodyB : pair.bodyA;
                        if (this.isBanana(otherBody)) {
                            this.handleBananaCollision(otherBody);
                        }
                    }
                }
            });
        });
    }

    isBanana(body) {
        return body.gameObject && body.gameObject.texture && body.gameObject.texture.key.startsWith('banana');
    }

    handleBananaCollision(bananaBody) {
        const banana = bananaBody.gameObject;
        if (banana && banana.active) {
            banana.destroy();
            this.scene.time.delayedCall(10, () => {
                this.scene.score += 1;
                this.scene.userInterfaceManager.updateScore(this.scene.score);
            });
        }
    }
}

export default CollisionManager;
