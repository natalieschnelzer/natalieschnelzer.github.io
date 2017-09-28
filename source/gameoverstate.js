var gameOverState = {}

gameOverState.preload = function(){
    game.load.image("go-bg", "assets/images/go-bg.jpg");
}

gameOverState.create = function(){
     game.add.sprite(0, 0, 'go-bg');
}

gameOverState.update = function(){
    
}