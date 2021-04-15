//
// Danny Baghdasarians
// Rocket Patrol Remake Modded
// 4/15/21
// Hours: 
//
// Implement a simultaneous two-player mode P1: [<- -> F] P2: [A D SPACE] (30)
//

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR, keyA, keyD, keySPACE;