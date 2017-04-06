splash = function () {};

splash.prototype = {

  preload: function () {
    var myLogo, loadingBar, status;
    game.add.sprite(0, 0, 'background');

    myLogo = game.add.sprite(game.world.centerX, 100, 'coollogo');
    myLogo.anchor.setTo(0.5);
    myLogo.scale.setTo(0.5);

    status = game.add.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    status.anchor.setTo(0.5);

    loadingBar = game.add.sprite(game.world.centerX, 400, "loadingbar");
    loadingBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(loadingBar);
  },

   addGameStates: function () {
    game.state.add("GameMenu", gameMenu);
    game.state.add("MomGame", momGame);
    game.state.add("Controls", controls);
    game.state.add("Help", help);
  },

  create: function() {
    this.addGameStates();
      setTimeout(function () {
      game.state.start("GameMenu");
    }, 5000);
  }
}