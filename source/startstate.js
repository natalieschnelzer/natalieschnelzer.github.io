var startState = {}

startState.preload = function(){
    game.load.image("start-bg", "assets/images/start-bg.jpg");
    game.load.image("playGame", "assets/images/playGame.jpg");
}

startState.create = function() {
    game.add.sprite(0, 0, 'start-bg');
    var button = game.add.button(170, 400, 'playGame', startState.onClickAction);
}

startState.update = function(){
    
}

startState.onClickAction = function(){
    game.state.start("MainGame");
}
