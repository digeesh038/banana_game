export default class HealthBarManager {
    constructor(scene) {
        this.scene = scene;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.initializeHealthBar();
    }

    initializeHealthBar() {
        this.healthBarWidth = 210;
        this.healthBarHeight = 25;
        this.healthBarMarginRight =110;
        this.healthBarMarginTop = 110;
        this.borderRadius = 15;
        this.borderRadius_1 = 8;
        this.healthBarBackground = this.scene.add.graphics();
        this.healthBarMain = this.scene.add.graphics();
        this.healthBarInner = this.scene.add.graphics();

        this.healthBarBackground.setDepth(4);
        this.healthBarMain.setDepth(4);
        this.healthBarInner.setDepth(4);

        this.updateHealthBar();
    }

    updateHealthBar() {
        this.healthBarBackground.clear();
        this.healthBarMain.clear();
        this.healthBarInner.clear();

        const barX = this.scene.cameras.main.width - this.healthBarWidth - this.healthBarMarginRight;
        const barY = this.healthBarMarginTop;

        // Background bar
        this.healthBarBackground.fillStyle(0x000000, 0.8);
        this.healthBarBackground.fillRoundedRect(barX, barY, this.healthBarWidth, this.healthBarHeight, this.borderRadius);

        // Main bar (full health)
        this.healthBarMain.fillStyle(0x00ff00);
        this.healthBarMain.fillRoundedRect(barX, barY, this.healthBarWidth, this.healthBarHeight, this.borderRadius);

        // Inner bar (current health)
        const healthWidth = Math.max(0, (this.health / this.maxHealth) * this.healthBarWidth);
        this.healthBarInner.fillStyle(0xff0000);
        this.healthBarInner.fillRoundedRect(barX + 5, barY + 5, healthWidth - 10, this.healthBarHeight - 10, this.borderRadius_1);
    }

    decreaseHealth(amount) {
        this.health -= amount;
        this.updateHealthBar();

        if (this.health <= 0) {
            this.handleGameOver();
        }
    }

    handleGameOver() {
        // Create a semi-transparent overlay
        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x000000, 0.9); // Black with 90% opacity
        overlay.fillRect(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);
        overlay.setDepth(19); // Ensure the overlay is below the text
    
        // Change the background color to red
        this.scene.cameras.main.backgroundColor.setTo(0xFF0000); // Set background to red
    
        // Create game over text
        this.gameOverText = this.scene.add.text(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY,
            "Game Over",
            {
                fontSize: "74px",
                fill: "#FFFFFF",
                fontFamily: "Arial",
                fontWeight: "bold",
            }
        );
        this.gameOverText.setOrigin(0.5).setDepth(30);
    
        // Add tween to fade out the text
        this.scene.tweens.add({
            targets: this.gameOverText,
            alpha: 1,
            onComplete: () => {
                this.showFinalScore(this.scene.score); // Pass the score to showFinalScore method
                this.scene.scene.pause(); // Pause the scene
            },
        });
    }
    

    showFinalScore(score) {
        this.finalScoreText = this.scene.add.text(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY + 80,
            `Score: ${score}`,
            {
                fontSize: "64px",
                fill: "#FFFFFF",
                fontFamily: "Arial",
                fontWeight: "bold",
                padding: { left: 10, right: 10, top: 30, bottom: 10 },
            }
        ).setOrigin(0.5).setDepth(20);
    }

    resetHealthBar() {
        this.health = this.maxHealth;
        this.updateHealthBar();
    }

    getHealth() {
        return this.health;
    }
}