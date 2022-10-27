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
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
    });
    
    this.anims.create({
        key: 'turn',
        frames: [{key : 'hero', frame : 4}],
        frameRate: 20,
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
}

function update(){
    backgroundSand.tilePositionY -= 0.5;
    if (cursors.left.isDown){
        player.setVelocityX(-80);

    }else if(cursors.right.isDown){
        player.setVelocityX(80);

    }else{
        player.setVelocityY(60)
    }
    if (cursors.up.isDown ){
        player.setVelocityY(-330)
    }

}