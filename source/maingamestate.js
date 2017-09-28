var mainGameState = {};

mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    game.load.image("space-bg", "assets/images/space-bg.jpg");
    game.load.image("spaceship", "assets/images/spaceship.png");
    game.load.image("alien", "assets/images/alien.png");
    game.load.image("bulletSimple", "assets/images/bulletSimple.png");
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
    this.aliens = game.add.group();
    
    //firering
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.bulletTimer = 1.0;
    this.bullets = game.add.group();
    
    //score
    this.playerScore = 0;
    var textStyle = {font: "16px Arial", fill: "#ffffff", alight: "center"}
    
    this.scoreTitle = game.add.text(game.width * 0.9, 30, "SCORE", textStyle);
    this.scoreTitle.fixedToCamera = true;
    this.scoreTitle.anchor.setTo(0.5, 0.5);
    
    this.scoreValue = game.add.text(game.width * 0.9, 50, "0", textStyle);
    this.scoreValue.fixedToCamera = true;
    this.scoreValue.anchor.setTo(0.5, 0.5);
    
    //lives
    this.playerLives = 0;
    var textStyle = {font: "16px Arial", fill: "#ffffff", alight: "center"}
    
    this.livesTitle = game.add.text(game.width * 0.1, 30, "LIVES", textStyle);
    this.livesTitle.fixedToCamera = true;
    this.livesTitle.anchor.setTo(0.5, 0.5);
    
    this.livesValue = game.add.text(game.width * 0.1, 50, "0", textStyle);
    this.livesValue.fixedToCamera = true;
    this.livesValue.anchor.setTo(0.5, 0.5);
    
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
    
    //aliens dropping every 2 sec
    this.alienTimer -= game.time.physicsElapsed;
    if (this.alienTimer <= 0.0){
        console.log("SPAWN ALIEN");
        this.alienTimer = 2.0;
        this.spawnAliens();
    }
    
    //clean up the aliens out of the screen
    for( var i = 0; i < this.aliens.children.length; i++ ) {
        if ( this.aliens.children[i].y > (game.height + 200) ) {
            this.aliens.children[i].destroy();
        }
    }
    
    //fireing with z
    if (this.fireKey.isDown) {
        console.log("FIRE KEY PRESSED");
        this.spawnBulletSimple();
    }
    
    //timer fireing
    this.bulletTimer -= game.time.physicsElapsed;
    
    //clean up the bullets out of the screen
    for( var i = 0; i < this.bullets.children.length; i++ ) {
        if ( this.bullets.children[i].y < (-100) ) {
            this.bullets.children[i].destroy();
        }
    }
    
    //checking if the aliens & bullets collide
    game.physics.arcade.collide(this.aliens, this.bullets, mainGameState.onAlienBulletCollision, null, this);
    
    //adding points
    this.scoreValue.setText(this.playerScore);
}

mainGameState.spawnAliens = function(){
    
    var alienX = game.rnd.integerInRange(50, 450);
    var alienY = -50;
    
    var alien = game.add.sprite(alienX, alienY, 'alien');
    alien.anchor.setTo(0.5, 0.5);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(alien);
    
    alien.body.velocity.y = game.rnd.integerInRange(60, 200);
    
    //grouping aliens
    this.aliens.add(alien);
}

mainGameState.spawnBulletSimple = function(){
    
    if (this.bulletTimer <0){
        this.bulletTimer = 1;
        
        var bulletSimple = game.add.sprite(this.spaceship.x, this.spaceship.y, 'bulletSimple');
    
        bulletSimple.anchor.setTo(0.5, 0.5);
    
        game.physics.arcade.enable(bulletSimple);
    
        bulletSimple.body.velocity.setTo(0, -150);
        
        //grouping bullets
        this.bullets.add(bulletSimple);
    }
}

mainGameState.onAlienBulletCollision = function(object1, object2){
    console.log("COLLISION");
    object1.pendingDestroy = true;
    object2.pendingDestroy = true;
    
    this.playerScore += 1;
    console.log("SCORE");
}