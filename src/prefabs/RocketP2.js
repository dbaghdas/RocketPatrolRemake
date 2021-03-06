class RocketP2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x , y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);     

        this.movementSpeed = 6;
        this.isFiring = false;

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx

    }


    update() {
        if(this.isFiring) {
            this.y -= this.movementSpeed;
            if(this.y < borderUISize * 3) {
                this.reset();
                this.isFiring = false;
            }
        }
        else {
            if(keyA.isDown) {
                this.x -= this.movementSpeed;
            }
            if(keyD.isDown) {
                this.x += this.movementSpeed;
            }
            if(Phaser.Input.Keyboard.JustDown(keyF)) {
                this.isFiring = true;
                this.sfxRocket.play();  // play sfx

            }
        }
        // Sets boundaries for the rocket to not cross
        this.x = Phaser.Math.Clamp(this.x , borderUISize + borderPadding, game.config.width - borderUISize - borderPadding);
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }
}