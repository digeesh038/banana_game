export default class PlayerManager {
  constructor(scene) {
    this.scene = scene;
    this.initializePlayerDimensions();
    this.createPlayer();
    this.createAnimations();
    this.initializeControls();
  }

  initializePlayerDimensions() {
    // Define dimensions as percentages of viewport size
    const isMobile = window.innerWidth <= 800; // Consider this threshold for mobile
    const baseWidth = 120;
    const baseHeight = 230;

    if (isMobile) {
      // Mobile dimensions
      this.playerWidth = baseWidth;
      this.playerHeight = baseHeight;
    } else {
      // Laptop dimensions (scaled up)
      this.playerWidth = baseWidth * 1.5; // Increase size for laptop
      this.playerHeight = baseHeight * 1.5; // Increase size for laptop
    }
  }

  createPlayer() {
    this.player = this.scene.matter.add.sprite(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
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

  movePlayerTo(pointerX) {
    const leftLimit = this.playerWidth / 2;
    const rightLimit = this.scene.scale.width - this.playerWidth / 2;

    // Move player directly to the pointer position
    if (pointerX < leftLimit) {
      this.player.x = leftLimit;
    } else if (pointerX > rightLimit) {
      this.player.x = rightLimit;
    } else {
      this.player.x = pointerX;
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
    const leftLimit = this.playerWidth / 2;
    const rightLimit = this.scene.scale.width - this.playerWidth / 2;
    if (this.player.x < leftLimit) {
      this.player.x = leftLimit;
    } else if (this.player.x > rightLimit) {
      this.player.x = rightLimit;
    }
  }
}
