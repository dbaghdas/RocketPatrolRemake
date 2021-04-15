class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png'); 
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 80, frameHeight: 50, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.audio('backgroundMusic', 'assets/nanophage.mp3');
        this.load.image('smallspaceship', 'assets/spaceshipSmall.png');
        this.load.image('uiborder', 'assets/uiborder.png');
        this.load.image('greenborder', 'assets/greenBorder.png');
        this.load.image('rocket2', 'assets/rocket2.png');
    }

    create() {
        // Play background music
        this.sound.play('backgroundMusic');
        // Set Starfield Background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // Create a Rocket
        this.p1Rocket = new RocketP1(this, game.config.width/2 + 30, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);
        this.p2Rocket = new RocketP2(this, game.config.width/2 - 30, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5,0);
        
        // Create Ships
        this.ship1 = new Ship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship2 = new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship3 = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship4 = new ShipSmall(this, game.config.width, borderUISize*7 + borderPadding*4, 'smallspaceship', 0, 10).setOrigin(0,0);

        // UI Background
        this.greenborder = this.add.tileSprite(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 'greenborder').setOrigin(0,0);
        
        // UI Borders
        this.uiborder = this.add.tileSprite(0, 0, game.config.width, borderUISize, 'uiborder').setOrigin(0,0);
        this.uiborder = this.add.tileSprite(0, game.config.height - borderUISize, game.config.width, borderUISize, 'uiborder').setOrigin(0,0);
        this.uiborder = this.add.tileSprite(0, 0, borderUISize, game.config.height, 'uiborder').setOrigin(0,0);
        this.uiborder = this.add.tileSprite(game.config.width - borderUISize, 0, borderUISize, game.config.height, 'uiborder').setOrigin(0,0);
        
        // For Player 1
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // For Player 2
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 20
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

          // display score
        let scoreConfig1 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        // Score for player 2
        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig1);
        this.scoreRight = this.add.text(borderUISize + borderPadding + 450, borderUISize + borderPadding*2, this.p2Score, scoreConfig2);

                // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig1.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
            
    }

    update() {

        
        // Scroll the Starfield
        this.starfield.tilePositionX += -4;

        // Calls Update in rocket object
        this.p1Rocket.update();
        this.p2Rocket.update();

        // Calls Update in ship object
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();
        this.ship4.update();
        
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.shipExplode(this.p1Rocket, this.ship3);  
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.shipExplode(this.p1Rocket, this.ship2);  
        }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.shipExplode(this.p1Rocket, this.ship1);  
        }
        if (this.checkCollision(this.p1Rocket, this.ship4)) {
            this.shipExplode(this.p1Rocket, this.ship4);  
        }
        if (this.checkCollision(this.p2Rocket, this.ship3)) {
            this.shipExplode(this.p2Rocket, this.ship3); 
        }
        if (this.checkCollision(this.p2Rocket, this.ship2)) {
            this.shipExplode(this.p2Rocket, this.ship2); 
        }
        if (this.checkCollision(this.p2Rocket, this.ship1)) {
            this.shipExplode(this.p2Rocket, this.ship1); 
        }
        if (this.checkCollision(this.p2Rocket, this.ship4)) {
            this.shipExplode(this.p2Rocket, this.ship4); 
        }

        if (!this.gameOver) {               
            this.p1Rocket.update();  
            this.p1Rocket.update(); 
            this.ship1.update();           // update spaceships (x3)
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
        } 

          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                rocket.reset();
                return true;
        } else {
            return false;
        }
    }

    shipExplode(rocket, ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
          ship.reset();                       // reset ship position
          ship.alpha = 1;                     // make ship visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.sound.play('sfx_explosion');

        if(ship == this.ship4)
        {
            ship.points = 3;
        }
        else {
            ship.points = 1;
        }
        if(rocket == this.p1Rocket) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;  
        }
        else {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;  
        }
     
      }
}