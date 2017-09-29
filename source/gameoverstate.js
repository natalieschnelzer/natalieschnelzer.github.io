var gameOverState = {}

gameOverState.preload = function(){
    game.load.image("go-bg", "assets/images/go-bg.jpg");
    game.load.image("playAgain", "assets/images/playAgain.jpg");
}

gameOverState.create = function(){
    game.add.sprite(0, 0, 'go-bg');
    var button = game.add.button(170, 380, 'playAgain', gameOverState.onClickAction);
    
}

gameOverState.update = function(){
    
}

gameOverState.onClickAction = function(){
    game.state.start("MainGame");
}