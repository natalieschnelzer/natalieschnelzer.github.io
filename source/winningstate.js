var winningState = {}

winningState.preload = function(){
    game.load.image("w-bg", "assets/images/w-bg.jpg");
    game.load.image("playAgain", "assets/images/playAgain.jpg");
}

winningState.create = function(){
    game.add.sprite(0, 0, 'w-bg');
    var button = game.add.button(170, 400, 'playAgain', winningState.onClickAction);
}

winningState.update = function(){
    
}

winningState.onClickAction = function(){
    game.state.start("MainGame");
}