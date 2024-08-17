export default class TreeManager {
  constructor(scene) {
    this.scene = scene;
    this.createTrees();
  }

  createTrees() {
    const treeWidth = 250;
    const treeHeight = window.innerHeight;

    // Create the left tree
    this.leftTree = this.scene.add.image(-120, window.innerHeight - 10, "left");
    this.leftTree.setOrigin(0, 0.99);
    this.leftTree.setDepth(3);
    this.leftTree.setDisplaySize(treeWidth, treeHeight);

    // Create the right tree
    this.rightTree = this.scene.add.image(
      window.innerWidth + 110,
      window.innerHeight - 10,
      "right"
    );
    this.rightTree.setOrigin(1, 0.99);
    this.rightTree.setDepth(3);
    this.rightTree.setDisplaySize(treeWidth, treeHeight);

    // Create the close image at the top of the right tree
    this.closeImage = this.scene.add
      .image(window.innerWidth - 110, 10, "close")
      .setOrigin(-0.5, -0.5)
      .setDepth(4)
      .setDisplaySize(60, 60);

    // Make the close image interactive and change cursor to pointer
    this.closeImage.setInteractive();
    this.closeImage.on("pointerover", () => {
      this.scene.input.setDefaultCursor("pointer");
    });
    this.closeImage.on("pointerout", () => {
      this.scene.input.setDefaultCursor("default");
    });
    this.closeImage.on("pointerdown", () => {
      this.scene.resetGame();
    });
    
    // Create the monkeyhead image at the top of the left tree
    this.scene.add
      .image(50, 10, "monkeyhead")
      .setOrigin(0.4, 0)
      .setDepth(4)
      .setDisplaySize(100, 105);
  }
}