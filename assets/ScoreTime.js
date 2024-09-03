class UserInterfaceManager {
    constructor(scene) {
        this.scene = scene;
        this.timerText = null;
        this.scoreText = null;
        this.gameOverText = null;
        this.finalScoreText = null;
        this.restartButton = null; // Added for restart button
    }

    createUI() {
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;

        const isMobile = viewportWidth <= 768;

        if (isMobile) {
            const leftMargin = viewportWidth * 0.05;
            const topMargin = viewportHeight * 0.05;
            const timerFontSize = Math.max(18, viewportWidth / 40);
            const scoreFontSize = Math.max(18, viewportWidth / 40);

            this.timerText = this.scene.add.text(
                leftMargin,
                topMargin,
                `Time: ${this.scene.timer}`,
                {
                    fontSize: `${timerFontSize}px`,
                    fill: "#fff",
                    fontFamily: "Arial",
                    fontWeight: "bolder",
                    padding: { left: 190, right: 2, top: 26, bottom: 10 },
                }
            ).setOrigin(0, 0).setDepth(10);

            this.scoreText = this.scene.add.text(
                leftMargin,
                topMargin + timerFontSize * 1.5,
                "Score: 0",
                {
                    fontSize: `${scoreFontSize}px`,
                    fill: "#fff",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    padding: { left: 90, right: 2, top: 0, bottom: 10 },
                }
            ).setOrigin(0, 0).setDepth(10);
        } else {
            const leftMargin = viewportWidth * 0.05;
            const timerFontSize = Math.max(20, viewportWidth / 40);
            const scoreFontSize = Math.max(20, viewportWidth / 40);

            this.timerText = this.scene.add.text(
                leftMargin,
                20,
                `Time: ${this.scene.timer}`,
                {
                    fontSize: `${timerFontSize}px`,
                    fill: "#fff",
                    fontFamily: "Arial",
                    fontWeight: "bolder",
                    padding: { left: 250, right: 2, top: 40, bottom: 10 },
                }
            ).setOrigin(0, 0).setDepth(10);

            this.scoreText = this.scene.add.text(
                leftMargin,
                60,
                "Score: 0",
                {
                    fontSize: `${scoreFontSize}px`,
                    fill: "#fff",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    padding: { left: 30, right: 2, top: 0, bottom: 10 },
                }
            ).setOrigin(0, 0).setDepth(10);
        }
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

        if (this.restartButton) {
            this.restartButton.destroy();
        }

        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x000000, 0.9);
        overlay.fillRect(0, 0, viewportWidth, viewportHeight);
        overlay.setDepth(19);

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

        const buttonWidth = isMobile ? Math.max(150, viewportWidth * 0.4) : 200;
        const buttonHeight = isMobile ? Math.max(40, viewportHeight * 0.07) : 50;
        const buttonX = viewportWidth / 2;
        const buttonY = viewportHeight / 2 + (isMobile ? 150 : 100);

        const topMarginForLaptop = isMobile ? 0 : -30;

        const buttonBackground = this.scene.add.graphics()
            .fillStyle(0x007bff)
            .fillRoundedRect(buttonX - buttonWidth / 2, buttonY - buttonHeight / 2 - topMarginForLaptop, buttonWidth, buttonHeight, 10)
            .setDepth(20);

        this.restartButton = this.scene.add.text(
            buttonX,
            buttonY - topMarginForLaptop,
            'Restart',
            {
                fontSize: `${Math.max(20, viewportWidth / 30)}px`,
                fill: "#FFFFFF",
                fontFamily: "Arial",
                fontWeight: "bold",
                align: 'center',
            }
        ).setOrigin(0.5).setDepth(20);

        // Make the restart button interactive
        this.restartButton
            .setInteractive()
            .on('pointerover', () => {
                this.scene.input.setDefaultCursor('pointer');
            })
            .on('pointerout', () => {
                this.scene.input.setDefaultCursor('default');
            })
            .on('pointerdown', () => {
                this.restartGame();
            });

        if (this.gameOverText) {
            this.scene.tweens.add({
                targets: this.gameOverText,
                alpha: 0,
                duration: 1000,
            });
        }
    }

    restartGame() {
        if (typeof this.scene.resetGame === 'function') {
            this.scene.resetGame(); // Call the resetGame method if it exists
        } else {
            this.scene.scene.restart(); // Fallback to restarting the scene
        }
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
