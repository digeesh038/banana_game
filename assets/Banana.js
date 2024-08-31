class Banana {
  constructor(scene) {
    this.scene = scene;
    this.bananas = scene.add.group({ runChildUpdate: true });

    // Define the limits for banana spawning
    this.leftLimit = 100; // Adjust this value based on the position of the left tree
    this.rightLimit = scene.sys.canvas.width - 100; // Adjust this value based on the position of the right tree

    // Determine if the device is mobile or laptop
    this.isMobile = scene.sys.canvas.width <= 768; // Mobile threshold

    // Adjust banana size for mobile devices
    this.bananaScale = this.isMobile ? 0.5 : 1; // 0.5 scale for mobile, 1 for laptop

    this.scheduleBananaSpawning();
  }

  scheduleBananaSpawning() {
    this.scene.time.addEvent({
      delay: 3000, // 3 seconds delay
      callback: () => this.spawnBanana(),
      loop: true,
    });
  }

  spawnBanana() {
    const x = Phaser.Math.Between(this.leftLimit, this.rightLimit);
    const y = this.scene.sys.canvas.height;
    const banana = this.scene.matter.add.image(x, y, "banana");

    // Scale the banana based on the device type
    banana.setScale(this.bananaScale);

    banana.setVelocityY(0); // Move banana upwards
    banana.setCollisionCategory(1); // Ensure bananas have the same collision category
    banana.setDepth(1); // Set depth for bananas
    this.bananas.add(banana);

    // Assign banana to its body gameObject
    banana.body.gameObject = banana;

    // Remove banana when out of bounds
    this.scene.time.addEvent({
      delay: 10000, // 10 seconds delay
      callback: () => banana.destroy(),
      callbackScope: this.scene
    });
  }

  updateBananas() {
    this.bananas.getChildren().forEach(banana => {
      banana.y -= 2; // Adjust the speed of the banana falling
      if (banana.y <= -banana.displayHeight) {
        banana.destroy();
      }
    });
  }
}

export default Banana;
