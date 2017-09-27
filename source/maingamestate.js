var mainGameState = {};

mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    game.load.image("space-bg", "assets/images/space-bg.jpg");
    game.load.image("spaceship", "assets/images/spaceship.png");
    
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
//    this.spaceship.body.velocity.x = 200;
}

mainGameState.update = function() {
    
    if (this.cursors.right.isDown) {
    console.log("RIGHT PRESSED");
    }
    
//    if (pressing-right){
//        set-right-velocity
//    } else if (pressing-left){
//        set-left-velocity
//    } else {
//        set-zero-velocity
//    }
    

}