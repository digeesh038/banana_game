export default class ProgressBarManager {
    constructor(scene, maxTime = 60, startPositionY = 670) {
        this.scene = scene;
        this.maxTime = maxTime;
        this.startPositionY = startPositionY;
        this.progressBarWidth = 80;
        this.progressBarHeight = 680;
        this.progressBarX = 18;
        this.progressBarY = scene.cameras.main.height - this.progressBarHeight - 50;
        this.borderRadius = 40;
        this.monkeyImageHeight = 160;

        this.createVerticalProgressBar();
    }

    createVerticalProgressBar() {
        // Create the background of the progress bar
        this.scene.progressBar = this.scene.add.graphics();
        this.scene.progressBarFill = this.scene.add.graphics();

        // Create the monkey image inside the progress bar
        this.scene.monkeyImage = this.scene.add.image(
            this.progressBarX + this.progressBarWidth / 2,
            this.startPositionY,
            'monkeyProgress'
        );
        this.scene.monkeyImage.setOrigin(0.5, 1); // Set origin to center-bottom
        this.scene.monkeyImage.setDepth(6);
        this.scene.monkeyImage.displayWidth = 80; // Set the width of the monkey image
        this.scene.monkeyImage.displayHeight = this.monkeyImageHeight; // Set the height of the monkey image

        // Draw the progress bar background
        this.scene.progressBar.fillStyle(0xD2B48C, 0.5); // Background color (brown with 50% opacity)
        this.scene.progressBar.fillRoundedRect(
            this.progressBarX,
            this.progressBarY,
            this.progressBarWidth,
            this.progressBarHeight,
            this.borderRadius
        );

        // Ensure the progress bar is above other elements
        this.scene.progressBar.setDepth(5); // Background depth

        // Initialize the progress bar fill
        this.updateVerticalProgressBar(this.maxTime);
    }

    updateVerticalProgressBar(timer) {
        // Calculate the progress as a value between 0 and 1
        const progress = Math.min(Math.max(timer / this.maxTime, 0), 1); 

        // Calculate the new Y position of the monkey image based on the progress
        const newY = this.progressBarY + this.progressBarHeight - (progress * (this.progressBarHeight - this.monkeyImageHeight)); 

        // Ensure the monkey image is positioned correctly within the progress bar
        this.scene.monkeyImage.y = newY; 

        // Calculate the filled height based on the progress
        const filledHeight = progress * this.progressBarHeight;

        // Clear the previous filled portion
        this.scene.progressBarFill.clear();

        // Draw the filled portion of the progress bar
        this.scene.progressBarFill.fillStyle(0x00ff00); // Fill color (green)
        this.scene.progressBarFill.fillRoundedRect(
            this.progressBarX,
            this.progressBarY + this.progressBarHeight - filledHeight,
            this.progressBarWidth,
            filledHeight,
            this.borderRadius
        );
    }

    resetProgressBar() {
        const initialTimer = this.maxTime;
        this.scene.monkeyImage.y = this.progressBarY + this.progressBarHeight;
        this.scene.progressBarFill.clear();
        this.updateVerticalProgressBar(initialTimer);
    }
}
