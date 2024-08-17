// PlayerManager.js
export default class PlayerManager {
  constructor(scene) {
    this.scene = scene;
    this.playerHeight = 330;
    this.playerWidth = 190;
    this.createPlayer();
    this.createAnimations();
    this.initializeControls();
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
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keys = this.scene.input.keyboard.addKeys({
      left: "A",
      right: "D",
    });
  }

  updateMovement() {
    const moveSpeed = 15;
    if (this.keys.left.isDown) {
      this.player.x -= moveSpeed;
    } else if (this.keys.right.isDown) {
      this.player.x += moveSpeed;
    }

    // Ensure the player does not move outside the space between the trees
    const leftLimit = 180;
    const rightLimit = window.innerWidth - 180;
    if (this.player.x < leftLimit) {
      this.player.x = leftLimit;
    } else if (this.player.x > rightLimit) {
      this.player.x = rightLimit;
    }
  }
}
