const phaserConfig = {
    type: Phaser.AUTO,
    parent: "game",
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0},
            debug: false,
        }

    },
    scene: {
        init : init,
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(phaserConfig);

var backgroundSand;

function init(){

}

function preload(){
    this.load.image("backgroundSand", "/img/sable.png")
    this.load.spritesheet('hero','/img/hero.png',{frameWidth: 24, frameHeight : 25})
}

function create(){
    backgroundSand = this.add.tileSprite(450,200, 900,1630, 'backgroundSand')
    player = this.physics.add.sprite(450,500,'hero').setScale(5);
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys()

function update(){
    backgroundSand.tilePositionY -= 0.5;
    player.setVelocityX(0);
    if (cursors.left.isDown){
        player.setVelocityX(-90);

    }else if(cursors.right.isDown){
        player.setVelocityX(90);

    }else{
        player.setVelocityY(60)
    }
    if (cursors.up.isDown ){
        player.setVelocityY(-90)
    }

}