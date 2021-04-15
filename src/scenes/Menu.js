class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }    

    preload() {
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.image('menubg', 'assets/menubackground.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '38px',
            backgroundColor: '#222021',
            color: '#FACADE',
            align: 'right',
            padding: {
            top: 1,
            bottom: 1,
            },
            fixedWidth: 0
        }
        this.menubg = this.add.tileSprite(0, 0, 640, 480, 'menubg').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderUISize, 'ROCKET PATROL MODDED', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.8 - borderUISize - borderUISize, '2 PLAYER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.4, 'P1: Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.1, 'P2: Use A and D to move & (SPACE) to fire', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


    }

    update() {
      
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }

    }
}