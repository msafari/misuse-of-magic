splash = function () {};

splash.prototype = {

  loadScripts: function() { 
    game.load.script('gameMenu', 'js/gameMenu.js');
    game.load.script('momGame', 'js/momGame.js');
    game.load.script('momLevelSelect', 'js/momLevelSelect.js');
    game.load.script('controls', 'js/controls.js');
    game.load.script('help', 'js/help.js');
  },

  preload: function () {
    this.loadScripts();
    this.addImages();
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
    game.state.add("MomLevelSelect", momLevelSelect);
    game.state.add("MomGame", momGame);
    game.state.add("Controls", controls);
    game.state.add("Help", help);
  },

  addImages: function() {
    game.load.image('headerBase', "assets/images/headerBase.png")
    game.load.image("buttonBase", "assets/images/buttonBase.png")
    game.load.image("levelOnePortal", "assets/images/portal placeholder.png");
    game.load.image("backButton", "assets/images/backButton.png");
  },

  create: function() {
    this.addGameStates();
      setTimeout(function () {
      game.state.start("GameMenu");
    }, 3000);
  }
}