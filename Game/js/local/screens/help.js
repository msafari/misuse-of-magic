var help = function () {};

help.prototype = {
  preload: function () {
  },

  create: function () { 
    menuClick = game.add.audio("menuClick");

    game.add.sprite(0, 0, 'background');
    titleStyle = { font: 'bold 25pt', fill: '#673ab7', align: 'center'};
    menuStyle = { font: 'bold 20pt', fill: '#FF0000'};
    helpBase = game.add.sprite(100,75,"helpBase");
    header = game.add.sprite((game.camera.width / 2), 50, "helpBar");
    header.anchor.setTo(0.5);
    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {menuClick.play(); game.state.start("GameMenu")});
  }
}