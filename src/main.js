//
// Danny Baghdasarians
// Rocket Patrol Remake Modded
// 4/15/21
// Hours: 
//
// Implement a simultaneous two-player mode P1: [<- -> F] P2: [A D SPACE] (30)
// Add your own (copyright-free) background music to the Play scene (5)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Create a new scrolling tile sprite for the background (5)
// Total: (60)
//
// Sources:
// Tri-Tachyon - Nanophage (Background Music) : https://freemusicarchive.org/music/Tri-Tachyon/the-garden-of-kadesh-ep/nanophage

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