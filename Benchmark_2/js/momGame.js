var momGame = function () {};

momGame.prototype = {
  preload: function () {
  },

  create: function () { 
    game.add.sprite(0, 0, 'level1Background');
    titleStyle = { font: 'bold 25pt', fill: '#673ab7', align: 'center'};
    menuStyle = { font: 'bold 20pt', fill: '#FF0000'};
    header = game.add.text(game.world.centerX, 50, 'a cool game will go here', titleStyle);
    placeholder = game.add.text(game.world.centerX, game.world.centerY, 'a cool game will go here');
    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {game.state.start("MomLevelSelect")});
  }
}