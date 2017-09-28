var winningState = {}

winningState.preload = function(){
    game.load.image("w-bg", "assets/images/w-bg.jpg");
}

winningState.create = function(){
     game.add.sprite(0, 0, 'w-bg');
}

winningState.update = function(){
    
}