var momGame = function () {};

momGame.prototype = {
  preload: function () {
  },

  create: function () { 
    game.add.sprite(0, 0, 'level1Background');
    titleStyle = { font: 'bold 25pt', fill: '#673ab7', align: 'center'};
    menuStyle = { font: 'bold 20pt', fill: '#FF0000'};

    placeholder = game.add.text(game.world.centerX, game.world.centerY, 'a cool game will go here');
    gameUI = game.add.sprite(50, 25, "gameUI");
    hearts = game.add.group();
    
    for (var i = 0; i < 5; i++) {
        var heart = hearts.create(150 + (i * 35), 35, 'heartbreak');
        heart.frame = 0;
    }
    xButton = game.add.sprite(850, 35, "xButton");
    pauseButton = game.add.sprite(900, 35, "pauseButton");
    //playButton = game.add.sprite(850, 35, "playButton");
    //playButton.visible = false;
    controlsButton = game.add.sprite(950, 35, "controlsButton");
    helpButton = game.add.sprite(1000, 35, "helpButton");
    treeButton = game.add.sprite(1050, 35, "treeButton");
    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {game.state.start("MomLevelSelect")});
  }
}