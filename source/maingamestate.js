var mainGameState = {};

mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    game.load.image("space-bg", "assets/images/space-bg.jpg");
    game.load.image("spaceship", "assets/images/spaceship.png");
    game.load.image("alien", "assets/images/alien.png");
    game.load.audio("game-music", "assets/music/maingame.mp3");
}

mainGameState.create = function() { 
    game.add.sprite(0, 0, 'space-bg');
    
    var shipX = game.width * 0.5;
    var shipY = game.height * 0.8;
    
    this.spaceship = game.add.sprite(shipX, shipY, 'spaceship');
    this.spaceship.anchor.setTo(0.5, 0.5, 'spaceship');
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(this.spaceship);
    
    this.cursors = game.input.keyboard.createCursorKeys();
    
    //music
    this.music = game.add.audio("game-music");
    this.music.play();
    this.music.volume = 0.5;
    this.music.loop = true;
    
     //aliens
    this.alienTimer = 2.0;
}

mainGameState.update = function() {
    
    //moving the spacechip left & right
    if (this.cursors.right.isDown) {
        this.spaceship.body.velocity.x = 200;
    } 
    else if (this.cursors.left.isDown) {
        this.spaceship.body.velocity.x = -200;
    }
    else {
        this.spaceship.body.velocity.x = 0;
    }
    
    //to stop moving out from the screen
    if ((this.spaceship.x > game.width) && (this.spaceship.body.velocity.x > 0)) {
        this.spaceship.body.velocity.x = 0;
    }

    if ((this.spaceship.x < 0) && (this.spaceship.body.velocity.x < 0)) {
        this.spaceship.body.velocity.x = 0;
    }
    
    //aliens
    this.alienTimer -= game.time.physicsElapsed;
    
    if (this.alienTimer <= 0.0){
        console.log("SPAWN ALIEN");
        this.alienTimer = 2.0;
    }
    
    //console.log(game.time.physicsElapsed);
    

}