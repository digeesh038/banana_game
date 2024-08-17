class CloudManager {
  constructor(scene, cloudSpacing = 1859, cloudSpeed = 1.1) {
    this.scene = scene;
    this.clouds = [];
    this.cloudSpacing = cloudSpacing;
    this.cloudSpeed = cloudSpeed;

    this.initializeClouds();
  }

  initializeClouds() {
    const cloudCount = Math.ceil(window.innerWidth / this.cloudSpacing) + 1;
    for (let i = 0; i < cloudCount; i++) {
      this.createCloud(i * this.cloudSpacing);
    }
  }

  createCloud(xPosition) {
    const cloud = this.scene.add.sprite(
      xPosition,
      Phaser.Math.Between(0, window.innerHeight / 2),
      `cloud${Phaser.Math.Between(1, 12)}`
    );
    cloud.setDepth(1);
    cloud.setOrigin(0, 0);
    this.clouds.push(cloud);
  }

  updateClouds() {
    this.clouds.forEach(cloud => {
      cloud.x -= this.cloudSpeed;
      if (cloud.x < -cloud.displayWidth) {
        cloud.x = window.innerWidth;
        cloud.y = Phaser.Math.Between(0, window.innerHeight / 2);
      }
    });
  }

  resetClouds() {
    this.clouds.forEach((cloud, index) => {
      cloud.x = index * this.cloudSpacing;
      cloud.y = Phaser.Math.Between(0, window.innerHeight / 2);
    });
  }
}

export default CloudManager;
