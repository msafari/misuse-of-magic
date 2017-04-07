var momLevelSelect = function () {};

momLevelSelect.prototype = {
  preload: function () {
  },

  create: function () { 
    console.log("hello");
    game.add.sprite(0, 0, 'background');
    titleStyle = { font: 'bold 25pt', fill: '#673ab7', align: 'center'};
    menuStyle = { font: 'bold 20pt', fill: '#FF0000'};
    headerBase = game.add.sprite(game.world.centerX, 50, 'headerBase');
    headerBase.anchor.setTo(0.5);
    header = game.add.text(game.world.centerX, 50, '-- LEVEL SELECT --', titleStyle);
    header.anchor.setTo(0.5);
    portalOne = game.add.sprite(50, 200, 'levelOnePortal');
    portalOne.inputEnabled = true;
    portalOne.events.onInputUp.add(function() { game.state.start("MomGame");});
    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {game.state.start("GameMenu")});
  }
}

