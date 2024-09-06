class UserInterfaceManager {
    constructor(scene) {
        this.scene = scene;
        this.timerText = null;
        this.scoreText = null;
        this.gameOverText = null;
        this.finalScoreText = null;
        this.restartButton = null;
    }

    createUI() {
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;
        const isMobile = viewportWidth <= 768;

        const leftMargin = viewportWidth * 0.05;
        const timerFontSize = isMobile ? Math.max(18, viewportWidth / 40) : Math.max(20, viewportWidth / 40);
        const scoreFontSize = isMobile ? Math.max(18, viewportWidth / 40) : Math.max(20, viewportWidth / 40);

        this.timerText = this.scene.add.text(
            leftMargin,
            isMobile ? viewportHeight * 0.05 : 20,
            `Time: ${this.scene.timer}`,
            {
                fontSize: `${timerFontSize}px`,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bolder",
                padding: { left: isMobile ? 190 : 250, right: 2, top: 26, bottom: 10 },
            }
        ).setOrigin(0, 0).setDepth(10);

        this.scoreText = this.scene.add.text(
            leftMargin,
            isMobile ? (viewportHeight * 0.05 + timerFontSize * 1.5) : 60,
            "Score: 0",
            {
                fontSize: `${scoreFontSize}px`,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold",
                padding: { left: isMobile ? 90 : 30, right: 2, top: 0, bottom: 10 },
            }
        ).setOrigin(0, 0).setDepth(10);
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
        const isMobile = viewportWidth <= 768;

        // Create a dark overlay
        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x000000, 0.9);
        overlay.fillRect(0, 0, viewportWidth, viewportHeight);
        overlay.setDepth(19);

        // Add the "Game Over" text
        const gameOverFontSize = isMobile ? Math.max(24, viewportWidth / 15) : Math.max(50, viewportWidth / 15);
        this.gameOverText = this.scene.add.text(
            viewportWidth / 2,
            viewportHeight / 2 - 50,
            "Game Over",
            {
                fontSize: `${gameOverFontSize}px`,
                fill: "#FFFFFF",
                fontFamily: "Arial",
                fontWeight: "bold",
            }
        ).setOrigin(0.5).setDepth(20);

        // Display the final score
        this.showFinalScore(this.scene.score);

        // Call the method to display the restart button
        this.createRestartButton(viewportWidth, viewportHeight);
    }

    createRestartButton(viewportWidth, viewportHeight) {
        const buttonWidth = 100;
        const buttonHeight = 100;

        this.restartButton = this.scene.add.sprite(
            viewportWidth / 2,
            viewportHeight / 2 + 100,
            'restart'
        ).setOrigin(0.5).setDisplaySize(buttonWidth, buttonHeight).setDepth(20)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            console.log('Restart button clicked');
            this.restartGame();
        });

        this.restartButton.on('pointerover', () => {
            this.restartButton.setTint(0xaaaaaa);
        });

        this.restartButton.on('pointerout', () => {
            this.restartButton.clearTint();
        });
    }

    restartGame() {
        console.log('Restarting game...');
        this.scene.scene.restart();
    }

    showFinalScore(score) {
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;

        const finalScoreFontSize = Math.max(24, viewportWidth / 20);
        this.finalScoreText = this.scene.add.text(
            viewportWidth / 2,
            viewportHeight / 2 + 50,
            `Score: ${score}`,
            {
                fontSize: `${finalScoreFontSize}px`,
                fill: "#FFFFFF",
                fontFamily: "Arial",
                fontWeight: "bold",
                padding: { left: 10, right: 10, top: 1, bottom: 10 },
            }
        ).setOrigin(0.5).setDepth(20);
    }
}

export default UserInterfaceManager;
