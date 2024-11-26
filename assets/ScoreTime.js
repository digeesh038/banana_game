class UserInterfaceManager {
    constructor(scene) {
        this.scene = scene;
        this.timerText = null;
        this.scoreText = null;
        this.gameOverText = null;
        this.finalScoreText = null;
        this.uiBaseDepth = 20; // Base depth for UI elements
        this.closeButton = null; // Track the close button
    }

    // Method to set dynamic depth
    setElementDepth(element, relativeDepth) {
        const finalDepth = this.uiBaseDepth + relativeDepth;
        element.setDepth(finalDepth);
        this.scene.children.bringToTop(element); // Ensure it's on top
        return finalDepth;
    }

    // Method to create a reusable button
    createButton(x, y, texture, width, height, depth, onClick) {
        const button = this.scene.add.image(x, y, texture)
            .setOrigin(0.5)
            .setDepth(depth)
            .setDisplaySize(width, height)
            .setInteractive();

        // Change cursor to pointer on hover
        button.on("pointerover", () => {
            this.scene.input.setDefaultCursor("pointer");
        });
        button.on("pointerout", () => {
            this.scene.input.setDefaultCursor("default");
        });

        // Default onClick if none is provided
        const handleClick = typeof onClick === 'function' ? onClick : () => {};

        // Trigger the callback function on click
        button.on("pointerdown", handleClick);

        return button;
    }

    // Method to create a button with text
    createButtonWithText(x, y, texture, buttonText, width, height, depth, onClick) {
        // Create the button image
        const button = this.scene.add.image(x, y, texture)
            .setOrigin(0.5)
            .setDepth(depth)
            .setDisplaySize(width, height)
            .setInteractive();

        // Change cursor to pointer on hover
        button.on("pointerover", () => {
            this.scene.input.setDefaultCursor("pointer");
        });
        button.on("pointerout", () => {
            this.scene.input.setDefaultCursor("default");
        });

        // Default onClick if none is provided
        const handleClick = typeof onClick === 'function' ? onClick : () => {};

        // Trigger the callback function on click
        button.on("pointerdown", handleClick);

        // Add text to the button
        const text = this.scene.add.text(
            x,                 // Centered horizontally on the button
            y,                 // Centered vertically
            buttonText,
            {
                fontSize: `${Math.min(width, height) / 2}px`, // Text size relative to button size
                fill: "#FFFFFF",
                fontFamily: "Arial",
                fontWeight: "bold",
            }
        ).setOrigin(0.5);

        // Set the text depth to appear above the button
        this.setElementDepth(text, depth + 1);

        return { button, text }; // Return both button and text in case further handling is needed
    }

    createUI() {
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;
        const isMobile = viewportWidth <= 768;
        const isTablet = viewportWidth <= 1024;

        const leftMargin = isMobile ? viewportWidth * 0.05 : viewportWidth * 0.1;
        const timerFontSize = isMobile ? Math.max(18, viewportWidth / 40) : Math.max(24, viewportWidth / 40);
        const scoreFontSize = isMobile ? Math.max(18, viewportWidth / 40) : Math.max(24, viewportWidth / 40);

        // Timer text
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
        ).setOrigin(0, 0);
        this.setElementDepth(this.timerText, 1);

        // Score text
        let scoreYPosition = isMobile ? (viewportHeight * 0.05 + timerFontSize * 1.5) : 45;
        this.scoreText = this.scene.add.text(
            leftMargin,
            scoreYPosition,
            "Score: 0",
            {
                fontSize: `${scoreFontSize}px`,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold",
                padding: { left: isMobile ? 90 : 30, right: 2, top: 0, bottom: 10 },
            }
        ).setOrigin(0, 0);
        this.setElementDepth(this.scoreText, 2);

        // Restart button (hidden initially)
        const closeButtonWidth = isMobile ? 80 : 120;
        const closeButtonHeight = isMobile ? 80 : 120;

        const marginRight = isMobile ? 123 : 660;
        const marginBottom = isMobile ? 210 : 30;

        const closeButtonX = viewportWidth - closeButtonWidth - marginRight;
        const closeButtonY = viewportHeight - closeButtonHeight - marginBottom;

        // Create the close button but keep it invisible initially
        this.closeButton = this.createButtonWithText(
            closeButtonX,
            closeButtonY,
            "restart",
            " ",
            closeButtonWidth,
            closeButtonHeight,
            50, 
            () => {} // Default empty function if onClick isn't provided
        );

        this.closeButton.button.setVisible(false); // Hide the button initially
    }

    // Function to create and show the Game Over screen
    showGameOver() {
        const viewportWidth = this.scene.scale.width;
        const viewportHeight = this.scene.scale.height;
        const isMobile = viewportWidth <= 768;
// Background overlay
const overlay = this.scene.add.graphics();
overlay.fillStyle(0x000000, 0.9);
overlay.fillRect(0, 0, viewportWidth, viewportHeight);

// Set depth for the overlay
const overlayDepth = this.setElementDepth(overlay, 18);  // Depth value set to 18

        // Game Over text
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
        ).setOrigin(0.5);
        this.setElementDepth(this.gameOverText, 39);

        // Final score
        this.showFinalScore(this.scene.score);

        // Show the restart button
        this.closeButton.button.setVisible(true); // Make the button visible after game over
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
            }
        ).setOrigin(0.5);
        this.setElementDepth(this.finalScoreText, 39);
    }
}

export default UserInterfaceManager;
