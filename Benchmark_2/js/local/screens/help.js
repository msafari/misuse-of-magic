var help = function () {};

help.prototype = {
  preload: function () {
  },

  create: function () { 
    game.sound.stopAll();
    menuTheme = game.add.audio("menuTheme");
    menuTheme.loop = true;
    menuTheme.play();
    menuClick = game.add.audio("menuClick");

    game.add.sprite(0, 0, 'background');
    titleStyle = { font: 'bold 25pt', fill: '#673ab7', align: 'center'};
    menuStyle = { font: 'bold 20pt', fill: '#FF0000'};
    helpBase = game.add.sprite(100,75,"helpBase");
    headerBase = game.add.sprite((game.camera.width / 2), 50, 'headerBase');
    headerBase.anchor.setTo(0.5);
    header = game.add.text((game.camera.width / 2), 50, '-- ABOUT --', titleStyle);
    header.anchor.setTo(0.5);
    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {game.sound.stopAll(); menuClick.play(); game.state.start("GameMenu")});
  }
}