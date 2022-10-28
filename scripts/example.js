
	
let game;
 
// global game options
let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2
}
 
window.onload = function() {
 
    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1334,
        height: 750,
        scene: playGame,
        backgroundColor: 0x444444,
 
        // physics settings
        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}
 
// playGame scene
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload(){
        this.load.image("platform", "platform.png");
        this.load.image("player", "player.png");
    }
    create(){
 
        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
 
        // pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(game.config.width, game.config.width / 2);
 
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "player");
        this.player.setGravityY(gameOptions.playerGravity);
 
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);
 
        // checking for input
        this.input.on("pointerdown", this.jump, this);
    }
 
    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX){
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else{
            platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }
 
    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
        }
    }
    update(){
 
        // game over
        if(this.player.y > game.config.height){
            this.scene.start("PlayGame");
        }
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }
    }
};
function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

The core of the script is the part where group are defined with callbacks to move platform from active to pooling group and from pooling group to active group.

We can add a lot more options, but I am showing you how to make the game look more interesting next time, meanwhile download the source code.

Get the first Phaser 3 book

Through 202 pages, 32 source code examples and an Android Studio project I will teach you how to build cross platform HTML5 games and build a game with you along the way.

Then you can turn your game into a native mobile App.

Never miss an update!

Join more than 13,000 developers and follow me on Facebook and Twitter

Subscribe to Emanuele's newsletter. 12,000 subscribers already receive news and special offers!

Email:
Post navigation
← Build endless runner games in Unity without writing a line of code with Infinite Runner Engine
HTML5 prototype of iOS game “Perfect Square!” updated to Phaser 3 – Build a physics game using only tweens →
215 GAME PROTOTYPES EXPLAINED WITH SOURCE CODE
// 1+2=3
// 100 rounds
// 10000000
// 2 Cars
// 2048
// A Blocky Christmas
// A Jumping Block
// A Life of Logic
// Angry Birds
// Angry Birds Space
// Artillery
// Astro-PANIC!
// Avoider
// Back to Square One
// Ball Game
// Ball vs Ball
// Ball: Revamped
// Balloon Invasion
// BallPusher
// Ballz
// Bar Balance
// Bejeweled
// Biggification
// Block it
// Blockage
// Bloons
// Boids
// Bombuzal
// Boom Dots
// Bouncing Ball
// Bouncing Ball 2
// Bouncy Light
// BoxHead
// Breakout
// Bricks
// Bubble Chaos
// Bubbles 2
// Card Game
// Castle Ramble
// Chronotron
// Circle Chain
// Circle Path
// Circle Race
// Circular endless runner
// Cirplosion
// CLOCKS - The Game
// Color Hit
// Color Jump
// ColorFill
// Columns
// Concentration
// Crossy Road
// Crush the Castle
// Cube Jump
// CubesOut
// Dash N Blast
// Dashy Panda
// Deflection
// Diamond Digger Saga
// Don't touch the spikes
// Dots
// Down The Mountain
// Drag and Match
// Draw Game
// Drop Wizard
// DROP'd
// Dudeski
// Dungeon Raid
// Educational Game
// Elasticity
// Endless Runner
// Erase Box
// Eskiv
// Farm Heroes Saga
// Filler
// Flappy Bird
// Fling
// Flipping Legend
// Floaty Light
// Fuse Ballz
// GearTaker
// Gem Sweeper
// Globe
// Goat Rider
// Gold Miner
// Grindstone
// GuessNext
// Helicopter
// Hero Emblems
// Hero Slide
// Hexagonal Tiles
// HookPod
// Hop Hop Hop Underwater
// Horizontal Endless Runner
// Hundreds
// Hungry Hero
// Hurry it's Christmas
// InkTd
// Iromeku
// Jet Set Willy
// Jigsaw Game
// Knife Hit
// Knightfall
// Legends of Runeterra
// Lep's World
// Line Rider
// Lumines
// Magick
// MagOrMin
// Mass Attack
// Math Game
// Maze
// Meeblings
// Memdot
// Metro Siberia Underground
// Mike Dangers
// Mikey Hooks
// Nano War
// Nodes
// o:anquan
// One Button Game
// One Tap RPG
// Ononmin
// Pacco
// Perfect Square!
// Perfectionism
// Phyballs
// Pixel Purge
// PixelField
// Planet Revenge
// Plants Vs Zombies
// Platform
// Platform game
// Plus+Plus
// Pocket Snap
// Poker
// Pool
// Pop the Lock
// Pop to Save
// Poux
// Pudi
// Pumpkin Story
// Puppet Bird
// Pyramids of Ra
// qomp
// Quick Switch
// Racing
// Radical
// Rebuild Chile
// Renju
// Rise Above
// Risky Road
// Roguelike
// Roly Poly
// Run Around
// Rush Hour
// SameGame
// SamePhysics
// Save the Totem
// Security
// Serious Scramblers
// Shrink it
// Sling
// Slingy
// Snowflakes
// Sokoban
// Space Checkers
// Space is Key
// Spellfall
// Spinny Gun
// Splitter
// Spring Ninja
// Sproing
// Stabilize!
// Stack
// Stairs
// Stick Hero
// String Avoider
// Stringy
// Sudoku
// Super Mario Bros
// Surfingers
// Survival Horror
// Talesworth Adventure
// Tetris
// The Impossible Line
// The Moops - Combos of Joy
// The Next Arrow
// Threes
// Tic Tac Toe
// Timberman
// Tiny Wings
// Tipsy Tower
// Toony
// Totem Destroyer
// Tower Defense
// Trick Shot
// Tunnelball
// Turn
// Turnellio
// TwinSpin
// vvvvvv
// Warp Shift
// Way of an Idea
// Whack a Creep
// Wheel of Fortune
// Where's my Water
// Wish Upon a Star
// Word Game
// Wordle
// Worms
// Yanga
// Yeah Bunny
// Zhed
// zNumbers
© 2006 - 2022 Emanuele Feronato
