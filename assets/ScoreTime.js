class UserInterfaceManager {
    constructor(scene) {
        this.scene = scene;
        this.timerText = null;
        this.scoreText = null;
        this.gameOverText = null;
        this.finalScoreText = null;
    }

    createUI() {
        // Get the viewport size using Phaser's scale manager
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;

        // Define margins from the left edge
        const leftMargin = viewportWidth * 0.05; // 5% of the viewport width

        // Adjust text positioning and font size dynamically
        const timerFontSize = Math.max(20, viewportWidth / 40);
        const scoreFontSize = Math.max(20, viewportWidth / 40);

        this.timerText = this.scene.add
            .text(
                leftMargin,                // Position from the left
                20,                        // Adjust vertically if needed
                `Time: ${this.scene.timer}`,
                {
                    fontSize: `${timerFontSize}px`,
                    fill: "#fff",
                    fontFamily: "Arial",
                    fontWeight: "bolder",
                    padding: { left: 10, right: 2, top: 40, bottom: 10 },
                }
            )
            .setOrigin(-2, 0) // Left align text
            .setDepth(10);

        this.scoreText = this.scene.add
            .text(
                leftMargin,                // Position from the left
                60,                        // Adjust vertically if needed
                "Score: 0",
                {
                    fontSize: `${scoreFontSize}px`,
                    fill: "#fff",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                }
            )
            .setOrigin(-1, 0) // Left align text
            .setDepth(10);
    }

    updateTimer(timer) {
        if (this.timerText) {
            this.timerText.setText(`Time: ${Math.max(Math.floor(timer), 0)}`);
        }
    }

    updateScore(score) {
        if (this.scoreText) {
            this.scoreText.setText(`Score: ${score}`);
        }
    }

    showGameOver() {
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;

        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x000000, 0.9); // Black with 90% opacity
        overlay.fillRect(0, 0, viewportWidth, viewportHeight);
        overlay.setDepth(19); // Ensure the overlay is below the text

        this.gameOverText = this.scene.add.text(
            viewportWidth / 2,
            viewportHeight / 2,
            "Game Over",
            {
                fontSize: `${Math.max(50, viewportWidth / 15)}px`,
                fill: "#FFFFFF",
                fontFamily: "Arial",
                fontWeight: "bold",
            }
        );
        this.gameOverText.setOrigin(0.5).setDepth(20);

        this.scene.tweens.add({
            targets: this.gameOverText,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                this.scene.scene.restart();
            },
        });
    }

    showFinalScore(score) {
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;

        this.finalScoreText = this.scene.add
            .text(
                viewportWidth / 2,
                viewportHeight / 2 + 50,
                `Score: ${score}`,
                {
                    fontSize: `${Math.max(32, viewportWidth / 20)}px`,
                    fill: "#FFFFFF",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    padding: { left: 10, right: 10, top: 70, bottom: 10 },
                }
            )
            .setOrigin(0.5)
            .setDepth(20);
    }
}

export default UserInterfaceManager;
