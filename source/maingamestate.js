var mainGameState = {};

mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    game.load.image("space-bg", "assets/images/space-bg.jpg");
    game.load.image("tilebg2", "assets/images/tilebg2.png");
    game.load.image("spaceship", "assets/images/spaceship.png");
    game.load.image("alien", "assets/images/alien.png");
    game.load.image("bulletStar", "assets/images/bulletStar.png");
    game.load.audio("game-music", "assets/music/maingame.mp3");

}

mainGameState.create = function() { 
    game.add.sprite(0, 0, 'space-bg');
    tilebg2 = game.add.tileSprite(0, 0, 500, 500, 'tilebg2');
    
    var shipX = game.width * 0.5;
    var shipY = game.height * 0.87;
    
    this.spaceship = game.add.sprite(shipX, shipY, 'spaceship');
    this.spaceship.anchor.setTo(0.5, 0.5, 'spaceship');
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(this.spaceship);
    this.spaceship.body.immovable = true;
    
    this.cursors = game.input.keyboard.createCursorKeys();
    
    //music
    this.music = game.add.audio("game-music");
    this.music.play();
    this.music.volume = 0.4;
    this.music.loop = true;
    
    //aliens
    this.alienTimer = 1;
    this.aliens = game.add.group();
    
    //firering
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.bulletTimer = 0.7;
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
    this.playerLives = 5;
    var textStyle = {font: "16px Arial", fill: "#ffffff", alight: "center"}
    
    this.livesTitle = game.add.text(game.width * 0.1, 30, "LIVES", textStyle);
    this.livesTitle.fixedToCamera = true;
    this.livesTitle.anchor.setTo(0.5, 0.5);
    
    this.livesValue = game.add.text(game.width * 0.1, 50, "0", textStyle);
    this.livesValue.fixedToCamera = true;
    this.livesValue.anchor.setTo(0.5, 0.5);
    
}

mainGameState.update = function() {
    
    //background scrolling
    tilebg2.tilePosition.y += 1;
    
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
    
    //aliens dropping every 1 sec
    this.alienTimer -= game.time.physicsElapsed;
    if (this.alienTimer <= 0.0){
        console.log("SPAWN ALIEN");
        this.alienTimer = 1;
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
        this.spawnBulletStar();
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
    
    //adding scores
    this.scoreValue.setText(this.playerScore);
    
    //checking if the aliens & spaceship collide
    game.physics.arcade.collide(this.aliens, this.spaceship, mainGameState.onAlienSpaceshipCollision, null, this);
    
    //loosing lives
    this.livesValue.setText(this.playerLives);
    
    //winning state when lives => 10
    if(this.playerScore >= 10){
        this.music.stop();
        game.state.start("Winning");
    }
    
    //game over state when lives =< 0
    if(this.playerLives <= 0){
        this.music.stop();
        game.state.start("GameOver");
    }
}

mainGameState.spawnAliens = function(){
    
    var alienX = game.rnd.integerInRange(50, 450);
    var alienY = -50;
    
    var alien = game.add.sprite(alienX, alienY, 'alien');
    alien.anchor.setTo(0.5, 0.5);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(alien);
    
    alien.body.velocity.y = game.rnd.integerInRange(100, 200);
    
    //grouping aliens
    this.aliens.add(alien);
}

mainGameState.spawnBulletStar = function(){
    
    if (this.bulletTimer <0){
        this.bulletTimer = 0.7;
        
        var bulletStar = game.add.sprite(this.spaceship.x, (this.spaceship.y-55), 'bulletStar');
        bulletStar.anchor.setTo(0.5, 0.5);
    
        game.physics.arcade.enable(bulletStar);
        bulletStar.body.velocity.setTo(0, -150);
        
        //grouping bullets
        this.bullets.add(bulletStar);
    }
}

mainGameState.onAlienBulletCollision = function(object1, object2){
    console.log("COLLISION");
    object1.pendingDestroy = true;
    object2.pendingDestroy = true;
    
    this.playerScore += 1;
    console.log("SCORE");
}

mainGameState.onAlienSpaceshipCollision = function(object1, object2){
    console.log("COLLISION");
    if(object1.key.includes("alien")) {
        object1.pendingDestroy = true;
    } else {
        object2.pendingDestroy = true;
    }
    
    this.playerLives -= 1;
    console.log("LIVES");
}