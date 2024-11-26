// AssetLoader.js
export default class AssetLoader {
  constructor(scene) {
    this.scene = scene;
    this.preload();
  }

  preload() {
    // Load images
    this.scene.load.image("cloud1", "game sprites/cloud 1.png");
    this.scene.load.image("cloud2", "game sprites/cloud 2.png");
    this.scene.load.image("cloud3", "game sprites/cloud 3.png");
    this.scene.load.image("cloud4", "game sprites/cloud 4.png");
    this.scene.load.image("cloud5", "game sprites/cloud 5.png");
    this.scene.load.image("cloud6", "game sprites/cloud 6.png");
    this.scene.load.image("cloud7", "game sprites/cloud 7.png");
    this.scene.load.image("cloud8", "game sprites/cloud 8.png");
    this.scene.load.image("cloud9", "game sprites/cloud 9.png");
    this.scene.load.image("cloud10", "game sprites/cloud 10.png");
    this.scene.load.image("cloud11", "game sprites/cloud 11.png");
    this.scene.load.image("cloud12", "game sprites/cloud 12.png");

    this.scene.load.image("sky", "game sprites/sky.png");

    this.scene.load.image("player1", "game sprites/MonkE/frame1.png");
    this.scene.load.image("player2", "game sprites/MonkE/frame2.png");
    this.scene.load.image("player3", "game sprites/MonkE/frame3.png");
    this.scene.load.image("player4", "game sprites/MonkE/frame4.png");
    this.scene.load.image("player5", "game sprites/MonkE/frame5.png");
    this.scene.load.image("player6", "game sprites/MonkE/frame6.png");

    this.scene.load.image("left", "game sprites/tree/right tree.png");
    this.scene.load.image("right", "game sprites/tree/left tree.png");

    this.scene.load.image("branch1", "game sprites/tree/branch.png"); // left
    this.scene.load.image("branch2", "game sprites/tree/branch 3.png"); // left
    this.scene.load.image("branch3", "game sprites/tree/branch 4.png"); // left
    this.scene.load.image("branch4", "game sprites/tree/branch 2.png"); // right
    this.scene.load.image("branch5", "game sprites/tree/branch 5.png"); // right
    this.scene.load.image("branch6", "game sprites/tree/branch 6.png"); // right
    this.scene.load.image("branch7", "game sprites/tree/branch 7.png"); // right
    this.scene.load.image("branch8", "game sprites/tree/branch 8.png"); // right

    this.scene.load.image("close", "UI/remove.png");
    this.scene.load.image("monkeyhead", "UI/monkey head 1.png");
    this.scene.load.image("monkey", "game sprites/MonkE/frame.svg");
    this.scene.load.image("banana", "UI/dccm_8pbl_230109-ai 1.png");
    this.scene.load.image("monkeyProgress", "game sprites/MonkE/frame4.png");
    this.scene.load.image("restart","UI/restart.png");
    }
}
