splash = function () {};

splash.prototype = {

  loadScripts: function() { 
    game.load.script('gameMenu', 'js/local/screens/gameMenu.js');
    game.load.script('momGame', 'js/local/momGame.js');
    game.load.script('controls', 'js/local/screens/controls.js');
    game.load.script('momLevelSelect', 'js/local/screens/momLevelSelect.js');
    game.load.script('help', 'js/local/screens/help.js');
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
    game.load.image("infoBase", "assets/images/infobase.png");

    //load in images related to gameplay
    game.load.image("gameUI", "assets/images/gameUI.png");
    game.load.image("xButton", "assets/images/xButton.png");
    game.load.image("pauseButton", "assets/images/pauseButton.png");
    game.load.image("playButton", "assets/images/playButton.png");
    game.load.image("controlsButton", "assets/images/controlsButton.png");
    game.load.image("helpButton", "assets/images/helpButton.png");
    game.load.image("treeButton", "assets/images/treeButton.png");
    game.load.spritesheet("heartbreak", "assets/images/heartbreak.png", 25, 25);

    game.load.image("backButton", "assets/images/backButton.png");

    //level icons
    game.load.image("level1_portal_ul", "assets/Levels/level1/unlocked.png");
    game.load.image("level2_portal_l", "assets/Levels/level2/locked.png");
    game.load.image("level2_portal_ul", "assets/Levels/level2/unlocked.png");
    game.load.image("level3_portal_l", "assets/Levels/level3/locked.png");
    game.load.image("level3_portal_ul", "assets/Levels/level3/unlocked.png");
    game.load.image("level4_portal_l", "assets/Levels/level4/locked.png");
    game.load.image("level4_portal_ul", "assets/Levels/level4/unlocked.png");
    game.load.image("level5_portal_l", "assets/Levels/level5/locked.png");
    game.load.image("level5_portal_ul", "assets/Levels/level5/unlocked.png");
    game.load.image("level6_portal_l", "assets/Levels/level6/locked.png");
    game.load.image("level6_portal_ul", "assets/Levels/level6/unlocked.png");
    game.load.image("level7_portal_l", "assets/Levels/level7/locked.png");
    game.load.image("level7_portal_ul", "assets/Levels/level7/unlocked.png");

    //load tilemap 
    game.load.image("grassRock", "assets/Levels/Tiles/grass-rock platforms2.png");
    game.load.image("spaceFlora", "assets/Levels/Tiles/space flora.png");
    game.load.image("spaceFlora2", "assets/Levels/Tiles/space flora2.png");
  },

  create: function() {
    this.addGameStates();
      setTimeout(function () {
      game.state.start("GameMenu");
    }, 2500);
  }
}