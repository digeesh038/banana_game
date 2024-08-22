export default class BranchManager {
    constructor(scene) {
        this.scene = scene;
        this.branches = [];
        this.branchSpeed = 10; // Adjust as needed
        this.branchSpacing = 1200; // Adjust the branch spacing between branches
        this.spawnLeft = true;

        // Detect if the game is running on a mobile device
        this.isMobile = window.innerWidth <= 768; // Example breakpoint for mobile

        // Define margins
        this.marginLeft = 0; // Adjust as needed
        this.marginRight = 0;

        // Define tree width (assuming this is fixed for both sides)
        this.treeWidth = this.isMobile ? 420 : 840; // Adjust for mobile

        // Define branch sizes (scaled down for mobile)
        this.largerBranchSizes = {
            left: {
                branch1: this.getBranchSize(800, 460),
                branch2: this.getBranchSize(645, 460),
                branch3: this.getBranchSize(645, 460),
                width: this.getBranchSize(800, 460)
            },
            right: {
                branch4: this.getBranchSize(770, 400),
                branch5: this.getBranchSize(800, 480),
                branch6: this.getBranchSize(800, 480),
                branch7: this.getBranchSize(800, 118),
                branch8: this.getBranchSize(800, 118)
            }
        };

        // Define branch keys
        this.branchKeys = [
            'branch1', 'branch2', 'branch3',
            'branch4', 'branch5', 'branch6',
            'branch7', 'branch8'
        ];

        this.initializeBranches();

        this.scene.time.addEvent({
            delay: 3000, // Adjust as needed
            callback: () => this.spawnBranch(),
            loop: true,
        });
    }

    // Helper function to scale branch sizes for mobile
    getBranchSize(width, height) {
        const scale = this.isMobile ? 0.5 : 1; // Scale down by 50% for mobile
        return { width: width * scale, height: height * scale };
    }

    initializeBranches() {
        const branchCount = Math.ceil(window.innerHeight / this.branchSpacing) + 1;
        for (let i = 0; i < branchCount; i++) {
            this.createBranch(i * this.branchSpacing);
        }
    }

    createBranch(xPosition) {
        let branchKey = Phaser.Math.Between(1, 8);
        let branch = this.scene.add.sprite(
            xPosition,
            Phaser.Math.Between(0, window.innerHeight - 2100),
            `branch${branchKey}`
        );
        branch.setDepth(2);
        branch.setOrigin(0, 2);
    }

    isBranch(body) {
        // Check if the body belongs to a branch
        return body.gameObject && this.branchKeys.includes(body.gameObject.texture.key);
    }

    updateBranches() {
        this.branches = this.branches.filter(branch => {
            if (branch && branch.y !== undefined) {
                branch.y -= this.branchSpeed;
                if (branch.y + branch.displayHeight < 0) {
                    this.scene.tweens.add({
                        targets: branch,
                        alpha: 0,
                        duration: 1000,
                        onComplete: () => {
                            branch.destroy();
                        }
                    });
                    return false;
                }
                return true;
            }
            return false;
        });
    }

    spawnBranch() {
        let branchX, branchY, branchImageKey, branchSize;
    
        if (this.spawnLeft) {
            // Calculate position and size for left side branches
            branchImageKey = `branch${Phaser.Math.Between(1, 3)}`;
            branchSize = this.largerBranchSizes.left[branchImageKey];
            branchX = Phaser.Math.Between(this.marginLeft, this.marginLeft + this.treeWidth - branchSize.width);
            branchY = window.innerHeight + branchSize.height;
        } else {
            // Calculate position and size for right side branches
            branchImageKey = `branch${Phaser.Math.Between(4, 8)}`;
            branchSize = this.largerBranchSizes.right[branchImageKey];
            branchX = Phaser.Math.Between(window.innerWidth - this.marginRight - this.treeWidth + branchSize.width, window.innerWidth - this.marginRight);
            branchY = window.innerHeight + branchSize.height;
        }
    
        const branch = this.scene.add.sprite(branchX, branchY, branchImageKey);
        branch.setDepth(2);
        branch.setDisplaySize(branchSize.width, branchSize.height);
        branch.setOrigin(0, 0);
    
        // Add Matter.js physics body with the same size as the sprite
        const branchBody = this.scene.matter.add.gameObject(branch, {
            shape: {
                type: 'rectangle',
                width: branch.displayWidth,
                height: branch.displayHeight
            }
        });
        branchBody.setSensor(true); // Set the sensor property to true
    
        this.branches.push(branch);
    
        this.scene.tweens.add({
            targets: branch,
            y: -branchSize.height,
            duration: 4000,
            ease: 'easeInOut',
            onComplete: () => {
                branch.destroy();
                this.branches.splice(this.branches.indexOf(branch), 1);
            }
        });
    
        this.spawnLeft = !this.spawnLeft;
    }
    
}
