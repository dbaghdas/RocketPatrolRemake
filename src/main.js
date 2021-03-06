//
// Danny Baghdasarians
// Rocket Patrol Remake Modded
// 4/15/21
// Hours: 5 Hrs 
//
// Implement a simultaneous two-player mode (30)
// Add your own (copyright-free) background music to the Play scene (5)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Create a new scrolling tile sprite for the background (5)
// Replace the UI borders with new artwork (10)
// Create a new title screen (e.g., new artwork, typography, layout) (10)
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
// Total: (100)
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

let keyLEFT, keyRIGHT, keyF, keyR, keyA, keyD, keyP;