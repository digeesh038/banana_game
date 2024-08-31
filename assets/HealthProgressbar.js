export default class HealthBarManager {
    constructor(scene) {
        this.scene = scene;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.initializeHealthBar();
    }

    initializeHealthBar() {
        // Get viewport dimensions
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;

        // Determine if the screen size is considered "mobile" or "laptop"
        // Adjust the threshold based on your specific needs
        const isMobile = viewportWidth <= 768; // Example threshold for mobile devices

        // Define health bar dimensions and margins based on the screen size
        if (isMobile) {
            this.healthBarWidth = viewportWidth * 0.5; // Adjust for mobile
            this.healthBarHeight = viewportHeight * 0.03; // Consistent size on mobile
            this.healthBarMarginLeft = viewportWidth * 0.2; // Margin from the left for mobile
            this.healthBarMarginTop = viewportHeight * 0.1; // Margin from the top for mobile
        } else {
            this.healthBarWidth = viewportWidth * 0.35; // Adjust for larger screens (laptop)
            this.healthBarHeight = viewportHeight * 0.03; // Consistent height
            this.healthBarMarginLeft = viewportWidth * 0.06; // Margin from the left for larger screens
            this.healthBarMarginTop = viewportHeight * 0.13; // Margin from the top for larger screens
        }

        // Border radius settings
        this.borderRadius = this.healthBarHeight * 0.5; // Half of height for rounded corners
        this.borderRadius_1 = this.borderRadius * 0.5; // Smaller radius for inner bar

        // Create the graphics objects
        this.healthBarBackground = this.scene.add.graphics();
        this.healthBarMain = this.scene.add.graphics();
        this.healthBarInner = this.scene.add.graphics();

        // Set depth to ensure visibility
        this.healthBarBackground.setDepth(4);
        this.healthBarMain.setDepth(4);
        this.healthBarInner.setDepth(4);

        this.updateHealthBar();
    }

    updateHealthBar() {
        this.healthBarBackground.clear();
        this.healthBarMain.clear();
        this.healthBarInner.clear();

        // Calculate position based on viewport size
        const barX = this.healthBarMarginLeft;
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
        overlay.fillRect(0, 0, this.scene.scale.width, this.scene.scale.height);
        overlay.setDepth(19); // Ensure the overlay is below the text

        // Change the background color to red
        this.scene.cameras.main.backgroundColor.setTo(0xFF0000); // Set background to red

        // Create game over text
        this.gameOverText = this.scene.add.text(
            this.scene.scale.width / 2,
            this.scene.scale.height / 2,
            "Game Over",
            {
                fontSize: `${Math.max(40, this.scene.scale.width / 20)}px`, // Responsive font size
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
            duration: 1000,
            onComplete: () => {
                this.showFinalScore(this.scene.score); // Pass the score to showFinalScore method
                this.scene.scene.pause(); // Pause the scene
            },
        });
    }

    showFinalScore(score) {
        this.finalScoreText = this.scene.add.text(
            this.scene.scale.width / 2,
            this.scene.scale.height / 2 + 80,
            `Score: ${score}`,
            {
                fontSize: `${Math.max(28, this.scene.scale.width / 25)}px`, // Responsive font size
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
