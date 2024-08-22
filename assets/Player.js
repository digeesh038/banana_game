export default class PlayerManager {
  constructor(scene) {
    this.scene = scene;
    this.playerHeight = 230;
    this.playerWidth = 120;
    this.createPlayer();
    this.createAnimations();
    this.initializeControls();
    this.createProgressBar(0x000000); // Set the progress bar background color to black
  }

  createPlayer() {
    this.player = this.scene.matter.add.sprite(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "player1"
    );
    this.player.setDisplaySize(this.playerWidth, this.playerHeight);
    this.player.setCollisionCategory(1); // Ensure collision category is defined
    this.player.setCollidesWith([1]); // Ensure the player can collide with the branches
    this.player.setDepth(3); // Ensure the monkey is in front of clouds
    this.scene.player = this.player; // Assign player to scene
  }

  createAnimations() {
    this.scene.anims.create({
      key: "monkey",
      frames: [
        { key: "player1" },
        { key: "player2" },
        { key: "player3" },
        { key: "player4" },
        { key: "player5" },
        { key: "player6" },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.player.play("monkey");
  }

  initializeControls() {
    // Keyboard controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keys = this.scene.input.keyboard.addKeys({
      left: "A",
      right: "D",
    });

    // Touch input (for mobile devices)
    this.scene.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        this.movePlayerTo(pointer.x);
      }
    });

    this.scene.input.on('pointerdown', (pointer) => {
      this.movePlayerTo(pointer.x);
    });
  }

  createProgressBar(backgroundColor) {
    // Create a simple progress bar
    const progressBarWidth = 400;
    const progressBarHeight = 50;
    const progressBarX = (window.innerWidth - progressBarWidth) / 2;
    const progressBarY = window.innerHeight - progressBarHeight - 50;

    // Add the progress bar background with the specified color
    const progressBarBg = this.scene.add.graphics();
    progressBarBg.fillStyle(backgroundColor, 1);
    progressBarBg.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

    // Add the coin icon
    this.coinIcon = this.scene.add.image(progressBarX, progressBarY + progressBarHeight / 2, 'coin');
    this.coinIcon.setDisplaySize(50, 50);
    this.coinIcon.setInteractive();
    this.coinIcon.setDepth(5); // Make sure the coin is above other elements

    // Allow the coin icon to be dragged
    this.scene.input.setDraggable(this.coinIcon);

    // Set the player's movement limits
    const playerLeftLimit = 110;
    const playerRightLimit = window.innerWidth - 110;

    // Calculate the equivalent limits for the coin icon within the progress bar
    const coinLeftLimit = progressBarX + ((playerLeftLimit - 110) / (playerRightLimit - playerLeftLimit)) * (progressBarWidth - this.coinIcon.displayWidth);
    const coinRightLimit = progressBarX + progressBarWidth - this.coinIcon.displayWidth;

    this.scene.input.on('drag', (pointer, gameObject, dragX) => {
      if (gameObject === this.coinIcon) {
        // Limit the coin movement to within the progress bar
        if (dragX < coinLeftLimit) {
          dragX = coinLeftLimit;
        } else if (dragX > coinRightLimit) {
          dragX = coinRightLimit;
        }

        // Set the coin position
        this.coinIcon.x = dragX;

        // Move the player based on the coin's position
        const playerPositionX = playerLeftLimit + ((dragX - coinLeftLimit) / (coinRightLimit - coinLeftLimit)) * (playerRightLimit - playerLeftLimit);
        this.movePlayerTo(playerPositionX);
      }
    });
  }

  movePlayerTo(positionX) {
    const leftLimit = 110;
    const rightLimit = window.innerWidth - 110;

    // Move player directly to the positionX, constrained by the limits
    if (positionX < leftLimit) {
      this.player.x = leftLimit;
    } else if (positionX > rightLimit) {
      this.player.x = rightLimit;
    } else {
      this.player.x = positionX;
    }
  }

  updateMovement() {
    const moveSpeed = 15;

    // Handle keyboard input
    if (this.keys.left.isDown) {
      this.player.x -= moveSpeed;
    } else if (this.keys.right.isDown) {
      this.player.x += moveSpeed;
    }

    // Ensure the player does not move outside the space between the trees
    const leftLimit = 110;
    const rightLimit = window.innerWidth - 110;
    if (this.player.x < leftLimit) {
      this.player.x = leftLimit;
    } else if (this.player.x > rightLimit) {
      this.player.x = rightLimit;
    }
  }
}
