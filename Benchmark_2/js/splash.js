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

    status = game.add.text(game.world.centerX, 350, 'Loading...', {fill: 'white'});
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
    //load in images for the main menu
    game.load.image('headerBase', "assets/images/headerBase.png")
    game.load.image("buttonBase", "assets/images/buttonBase.png")
    game.load.image("helpBase", "assets/images/helpBase.png");
    game.load.image("infoBase", "assets/images/infoBase.png");
    //load in images for the level selection
    game.load.image("level1Portal", "assets/images/portal1.png");
    game.load.image("level2Portal", "assets/images/portal2.png");
    game.load.image("level3Portal", "assets/images/portal3.png");
    game.load.image("level4Portal", "assets/images/portal4.png");
    //load in images related to gameplay
    game.load.image("gameUI", "assets/images/gameUI.png");
    game.load.image("xButton", "assets/images/xButton.png");
    game.load.image("pauseButton", "assets/images/pauseButton.png");
    game.load.image("playButton", "assets/images/playButton.png");
    game.load.image("controlsButton", "assets/images/controlsButton.png");
    game.load.image("helpButton", "assets/images/helpButton.png");
    game.load.image("treeButton", "assets/images/treeButton.png");
    game.load.spritesheet("heartbreak", "assets/images/heartbreak.png", 25, 25);

    game.load.image("level1Background", "assets/images/level1Background.png")
    game.load.image("backButton", "assets/images/backButton.png");
  },

  create: function() {
    this.addGameStates();
      setTimeout(function () {
      game.state.start("GameMenu");
    }, 2500);
  }
}