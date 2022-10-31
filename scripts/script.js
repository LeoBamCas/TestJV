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
    this.load.spritesheet('hero','/img/adventurer.png',{frameWidth: 44, frameHeight : 58})
    this.load.spritesheet('flame', '/img/flame.png',{frameWidth: 126, frameHeight: 128})
    this.load.image('bush', '/img/bush.png')
    this.load.image('bone', '/img/bone.png')
    this.load.image('spaceship', '/img/ufo.png')
}


let score = 0;
function create(){
    backgroundSand = this.add.tileSprite(450,200, 900,1630, 'backgroundSand')
    player = this.physics.add.sprite(450,350,'hero').setScale(1);
    player.setCollideWorldBounds(true);
    bushes = this.physics.add.group();
   
    bones = this.physics.add.group();
    cursors = this.input.keyboard.createCursorKeys()
    gameOver = false;


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', {start:5, end: 7}),
        frameRate: 10,
    })
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', {start: 10, end: 12}),
        frameRate: 10
    })
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('hero', {start : 15, end: 17}),
        frameRate: 15
    })
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('hero', {start : 0, end: 2}),
        frameRate: 10
    })
    this.anims.create({
        key: 'still',
        frames: [{key : 'hero', frame: 16}],
        frameRate: 20
    })
    
    this.anims.create({
        key: "burn",
        frames: this.anims.generateFrameNumbers('flame', {start:0, end:32}),
        frameRate : 15,
        repeat: true,
        
    })
    
    
    
    timedEvent = this.time.delayedCall(6000, onEvent,[],this)
    timedEvent = this.time.delayedCall(3000, setBone, [], this)
    flames = this.physics.add.staticGroup({
        key:'flame',
        repeat:10,
        setXY: {x:50,y:536,stepX:80}
    })
    this.physics.add.collider(bushes,player);
    this.physics.add.collider(flames, player, getFried, null, this)
    this.physics.add.overlap(bones, player, getBones, null, this)
    
    function getBones(player, bone){
        bone.disableBody(true, true)
        score +=1
    }
    
    if (score >= 3){
        timedEvent = this.time.delayedCall(3000, setUfo, [], this)
        this.physics.add.collider(ufo, player, flyAway, null, this)
    }
}



function update(){
    backgroundSand.tilePositionY -= 0.5;
    player.setVelocityX(0);
    if (cursors.left.isDown){
        player.setVelocityX(-90);
        player.anims.play('left', true)

    }else if(cursors.right.isDown){
        player.setVelocityX(90);
        player.anims.play('right', true)

     } else if (cursors.up.isDown ){
            player.setVelocityY(-90)
            player.anims.play('up', true)
        }else if(cursors.down.isDown){
            player.setVelocityY(120)
            player.anims.play('down', true)
        }
    else{
        player.setVelocityY(30)
        player.anims.play('still', true)
    }
    flames.children.iterate(function(child){
        child.anims.play('burn', true)
    })

}

function onEvent(){
    if(gameOver === false && score < 15){
    var bush = bushes.create(Math.floor(Math.random()*900),0, 'bush').setScale(0.5);
    bush.setVelocityY(30);
    bush.setPushable(false);

        timedEvent = this.time.delayedCall(6000, onEvent,[],this)
    }
}
function setBone(){
    if(gameOver === false && score<15){
        var bone = bones.create(Math.floor(Math.random()*900),0, 'bone').setScale(0.5);
        bone.setVelocityY(30);
        bone.setPushable(false);
    
            timedEvent = this.time.delayedCall(6000, setBone,[],this)
        }
}

function getFried(){
    player.setTint(0xff0000);
    this.physics.pause()
    player.anims.play('burn', true)
    gameOver = true;

}

function setUfo(){
    ufo = this.physics.add.image(450,0,'spaceship')
    ufo.setVelocityY(30)
}

function flyAway(){
    player.setTint(0x71e842);
    this.physics.pause()
    player.anims.play('burn', true)
    gameOver = true;

}