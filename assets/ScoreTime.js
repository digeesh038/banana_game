class UserInterfaceManager {
    constructor(scene) {
        this.scene = scene;
        this.timerText = null;
        this.scoreText = null;
        this.gameOverText = null;
        this.finalScoreText = null;
    }

    createUI() {
        const marginRight = 600;
        const marginLeft = 250;

        this.timerText = this.scene.add
            .text(
                window.innerWidth - marginRight - 750 + marginLeft,
                40,
                `Time: ${this.scene.timer}`,
                {
                    fontSize: "40px",
                    fill: "#fff",
                    fontFamily: "Arial",
                    fontWeight: "bolder",
                    padding: { left: 0, right: 10, top: 17, bottom: 10 },
                }
            )
            .setDepth(4);

        this.scoreText = this.scene.add
            .text(window.innerWidth - 620 - 750, 57, "Score: 0", {
                fontSize: "40px",
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold",
            })
            .setDepth(4);
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
        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x000000, 0.9); // Black with 90% opacity
        overlay.fillRect(0, 0, window.innerWidth, window.innerHeight);
        overlay.setDepth(19); // Ensure the overlay is below the text

        this.gameOverText = this.scene.add.text(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY,
            "Game Over" ,
            {
                fontSize: "74px",
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
        this.finalScoreText = this.scene.add
            .text(
                window.innerWidth / 2,
                window.innerHeight / 2 + 50,
                `Score: ${score}`,
                {
                    fontSize: "64px",
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