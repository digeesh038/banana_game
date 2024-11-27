import Background from "./assets/BackGround.js";
import Banana from "./assets/Banana.js";
import BranchManager from "./assets/Branch.js";
import CloudManager from "./assets/Cloud.js";
import ProgressBarManager from "./assets/LeftProgressbar.js";
import PlayerManager from "./assets/Player.js";
import HealthBarManager from "./assets/HealthProgressbar.js";
import TreeManager from "./assets/Sidetree.js";
import AssetLoader from "./assets/Preload.js";
import UserInterfaceManager from "./assets/ScoreTime.js";
import CollisionBanana from "./assets/CollisionBanana.js";
import CollisionBranch from "./assets/CollisionBranch.js";

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.timer = 8;
        this.maxTime = 8;
        this.elapsedTime = 0;
        this.score = 0;
    }

    preload() {
        this.AssetLoader = new AssetLoader(this);
    }

    create() {
        this.backGround = new Background(this);
        this.bananaManager = new Banana(this);
        this.branchManager = new BranchManager(this);
        this.cloudManager = new CloudManager(this);
        this.playerManager = new PlayerManager(this);
        this.healthBarManager = new HealthBarManager(this);
        this.treeManager = new TreeManager(this);
        this.progressBarManager = new ProgressBarManager(this, this.maxTime, 670);
        this.userInterfaceManager = new UserInterfaceManager(this);
        this.userInterfaceManager.createUI();
        this.CollisionManager = new CollisionBanana(this);
        this.add.image(0, 0, "sky").setOrigin(0, 0).setDisplaySize(window.innerWidth, window.innerHeight);

        // Initialize collisionManager for branches
        this.collisionManager = new CollisionBranch(this, this.playerManager.player, this.branchManager, this.healthBarManager);

        // Create player and branch collision categories
        const playerCategory = this.matter.world.nextCategory();
        const branchCategory = this.matter.world.nextCategory();

        // Set collision categories for player and branches
        this.playerManager.player.setCollisionCategory(playerCategory);
        this.branchManager.branches.forEach(branch => {
            branch.setCollisionCategory(branchCategory);
            branch.setCollidesWith(playerCategory);
        });
        document.getElementById("reset-button").onclick = () => {
            console.log("Reset button clicked");
            location.reload(); // Reloads the game webpage
            document.getElementById("game-hud").style.display = "none";
        };
    }

    update(time, delta) {
        this.elapsedTime += delta / 1000;

        this.branchManager.updateBranches();
        if (this.timer > 0) {
            this.timer -= delta / 1000;
            this.userInterfaceManager.updateTimer(this.timer);
            this.progressBarManager.updateVerticalProgressBar(this.timer);
        } else {
            this.timer = 0;
            this.userInterfaceManager.showGameOver();
            this.userInterfaceManager.showFinalScore(this.score);
            this.scene.pause();
        }

        if (this.bananaManager) {
            this.bananaManager.updateBananas();
        }

        this.cloudManager.updateClouds();
        if (this.playerManager) {
            this.playerManager.updateMovement();
        }
    }

    resetGame() {
        this.progressBarManager.resetProgressBar();
        this.timer = this.maxTime;
        this.score = 0;
        this.elapsedTime = 0;
        this.userInterfaceManager.updateTimer(this.timer);
        this.scene.restart();
    }
}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: 1536,
        height: 821,
    },
    scene: GameScene,
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 0 },
            //debug: true,
        },
    },
};

const game = new Phaser.Game(config);
const buttonImgSrc = "./UI/restart.png"; // Path to your reset button image
const buttonImg = document.getElementById('reset-button-img');
buttonImg.src = buttonImgSrc;
window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

export { game };
