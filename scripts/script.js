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
    this.load.spritesheet('hero','/img/barbarian.png',{frameWidth: 100, frameHeight : 100})
    this.load.spritesheet('flame', '/img/flame.png',{frameWidth: 126, frameHeight: 128})
    this.load.image('bush', '/img/bush.png')
    this.load.image('bone', '/img/bone.png')
    this.load.image('bone2', '/img/bone2.png')
    this.load.image('bone3', '/img/bone3.png')
    this.load.image('platform', '/img/platform.png')
    this.load.image('spaceship', '/img/ufo.png')
    this.load.audio('dirt', '/sound/dirt.mp3')
    this.load.audio('fire', '/sound/fire.mp3')
}


let score = 0;
function create(){
    backgroundSand = this.add.tileSprite(450,200, 900,1630, 'backgroundSand')
    player = this.physics.add.sprite(450,300,'hero').setScale(1);
    player.setCollideWorldBounds(true);
    bushes = this.physics.add.group();
    platform = this.physics.add.sprite(450,550,'platform')
    ufo = this.physics.add.image(450,-100,'spaceship').setScale(0.5)

    this.dirtSound = this.sound.add('dirt')
    this.fireSound = this.sound.add('fire')
   
    bones = this.physics.add.group();
    cursors = this.input.keyboard.createCursorKeys()
    gameOver = false;


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', {start:4, end: 7}),
        frameRate: 10,
    })
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', {start: 0, end: 3}),
        frameRate: 10
    })
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('hero', {start : 12, end: 15}),
        frameRate: 15
    })
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('hero', {start : 8, end: 11}),
        frameRate: 10
    })
    this.anims.create({
        key: 'still',
        frames: [{key : 'hero', frame: 0}],
        frameRate: 20
    })
    
    this.anims.create({
        key: "burn",
        frames: this.anims.generateFrameNumbers('flame', {start:0, end:32}),
        frameRate : 15,
        repeat: true,
        
    })

    this.anims.create({
        key: 'boneRotate',
        frames: [{key : 'bone'},{key: 'bone2'}, {key: 'bone3'}],
        frameRate: 10,
    })
    
    
    timedEvent = this.time.delayedCall(6000, onEvent,[],this)
    timedEvent = this.time.delayedCall(3000, setBone, [], this)
    flames = this.physics.add.staticGroup({
        key:'flame',
        repeat:10,
        setXY: {x:50,y:536,stepX:80}
    })
    this.physics.add.collider(bushes,player);
    this.physics.add.collider(platform, player, getFriedP, null, this)
    this.physics.add.overlap(bones, player, getBones, null, this)
    this.physics.add.overlap(platform, [bushes,bones], getFried, null, this)

    
    function getBones(player, bone){
        bone.disableBody(true, true)
        score +=1
        this.dirtSound.play()
    }
    
}



function update(){

    if(gameOver === false){

        backgroundSand.tilePositionY -= 1;
        player.setVelocityX(0);
        if (cursors.left.isDown){
            player.setVelocityX(-100);
            player.anims.play('left', true)
            
        }else if(cursors.right.isDown){
            player.setVelocityX(100);
            player.anims.play('right', true)
            
        } else if (cursors.up.isDown ){
            player.setVelocityY(-90)
            player.anims.play('up', true)
        }else if(cursors.down.isDown){
            player.setVelocityY(120)
                player.anims.play('down', true)
        }
        else{
                player.setVelocityY(60)
                player.anims.play('still', true)
        }

        if(cursors.space.isDown){
            player.setScale(1.5);
            
        }else if (cursors.space.isUp){
            player.setScale(1)
            
        }
    }
        
        flames.children.iterate(function(child){
            child.anims.play('burn', true)
        })
        bones.children.iterate(function(child){
            child.anims.play('boneRotate', true)
        })
        if (score >= 15){
            timedEvent = this.time.delayedCall(3000, setUfo, [], this)
        }
        this.physics.add.collider(ufo, player, flyAway, null, this)
        
    }
    
    function onEvent(){
        if(gameOver === false && score < 15){
            var bush = bushes.create(Math.floor(Math.random()*900),-50, 'bush').setScale(0.5);
            bush.setVelocityY(60);
            bush.setPushable(false);
            
            timedEvent = this.time.delayedCall(6000, onEvent,[],this)
        }
    }
    function setBone(){
        if(gameOver === false && score<15){
            var bone = bones.create(Math.floor(Math.random()*900),-50, 'bone').setScale(0.5);
            bone.setVelocityY(60);
            bone.setPushable(false);
            
            timedEvent = this.time.delayedCall(6000, setBone,[],this)
        }
    }
    
    function getFriedP(){
        this.fireSound.play() 
        player.setTint(0xff0000);
        player.anims.play('burn', true)
            this.physics.pause()
            gameOver = true;         
    }
    function getFried(flames, object){
        this.fireSound.play()
        object.anims.play('burn', true)      
        object.setTint(0xff0000);
    }

    
    function setUfo(){
        
        ufo.setVelocityY(60)
    }
    
    function flyAway(){
        player.setTint(0x71e842);
    this.physics.pause()
    gameOver = true;

}