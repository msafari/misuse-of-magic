splash = function () {};

splash.prototype = {

  loadScripts: function() { 
    game.load.script('gameMenu', 'Benchmark2/js/local/screens/gameMenu.js');
    game.load.script('momGame', 'Benchmark2/js/local/momGame.js');
    game.load.script('controls', 'Benchmark2/js/local/screens/controls.js');
    game.load.script('momLevelSelect', 'Benchmark2/js/local/screens/momLevelSelect.js');
    game.load.script('help', 'Benchmark2/js/local/screens/help.js');
  },

  preload: function () {
    this.loadScripts();
    this.addImages();
    var myLogo, loadingBar, status;
    game.add.sprite(0, 0, 'background');

    myLogo = game.add.sprite((game.camera.width / 2), 100, 'coollogo');
    myLogo.anchor.setTo(0.5);
    myLogo.scale.setTo(0.5);

    status = game.add.text((game.camera.width / 2), 350, 'Loading...', {fill: 'white'});
    status.anchor.setTo(0.5);

    loadingBar = game.add.sprite((game.camera.width / 2), 400, "loadingbar");
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
    game.load.image('headerBase', "Benchmark2/assets/images/headerBase.png")
    game.load.image("buttonBase", "Benchmark2/assets/images/buttonBase.png")
    game.load.image("helpBase", "Benchmark2/assets/images/helpBase.png");
    game.load.image("controlsBase", "Benchmark2/assets/images/controlsBase.png");

    //load in images related to gameplay
    game.load.image("gameUI", "Benchmark2/assets/images/gameUI.png");
    game.load.image("xButton", "Benchmark2/assets/images/xButton.png");
    game.load.image("pauseButton", "Benchmark2/assets/images/pauseButton.png");
    game.load.image("playButton", "Benchmark2/assets/images/playButton.png");
    game.load.image("controlsButton", "Benchmark2/assets/images/controlsButton.png");
    game.load.image("helpButton", "Benchmark2/assets/images/helpButton.png");
    game.load.spritesheet("heartbreak", "Benchmark2/assets/images/heartbreak.png", 25, 25);
    game.load.image("winOverlay", "Benchmark2/assets/images/winOverlay.png");
    game.load.image("lossOverlay", "Benchmark2/assets/images/lossOverlay.png");
    game.load.image("backButton", "Benchmark2/assets/images/backButton.png");

    //load in attacks and attack sprites
    game.load.image("flareIcon", "Benchmark2/assets/Sprites/attacks/flareIcon.png");
    game.load.image("firefloomIcon", "Benchmark2/assets/Sprites/attacks/firefloomIcon.png");
    game.load.image("zoltIcon", "Benchmark2/assets/Sprites/attacks/zoltIcon.png");
    game.load.image("electromagnetismIcon", "Benchmark2/assets/Sprites/attacks/electromagnetismIcon.png");
    game.load.image("vectorIcon","Benchmark2/assets/Sprites/attacks/movementIcon.png");
    game.load.image("reverseTrajectoryIcon", "Benchmark2/assets/Sprites/attacks/reverseTrajectoryIcon.png");
    game.load.spritesheet("flare", "Benchmark2/assets/Sprites/attacks/Flare.png", 16, 16);
    game.load.spritesheet("firefloom", "Benchmark2/assets/Sprites/attacks/Firefloom.png", 16, 16);
    game.load.spritesheet("zolt", "Benchmark2/assets/Sprites/attacks/Electric Attack Prototype.png", 8, 8);
    game.load.spritesheet("electromagnetism", "Benchmark2/assets/Sprites/attacks/Electromagnetism.png", 16, 16);
    game.load.spritesheet("vector", "Benchmark2/assets/Sprites/attacks/Movement Spell.png", 17, 17);
    game.load.spritesheet("reverseDirection", "Benchmark2/assets/Sprites/attacks/Reverse Direction.png", 16,16);
    game.load.spritesheet("attackIcons", "Benchmark2/assets/Sprites/attacks/attackIconList.png");
    //level icons
    game.load.image("level1_portal_ul", "Benchmark2/assets/Levels/level1/unlocked.png");
    game.load.image("level2_portal_l", "Benchmark2/assets/Levels/level2/locked.png");
    game.load.image("level2_portal_ul", "Benchmark2/assets/Levels/level2/unlocked.png");
    game.load.image("level3_portal_l", "Benchmark2/assets/Levels/level3/locked.png");
    game.load.image("level3_portal_ul", "Benchmark2/assets/Levels/level3/unlocked.png");
    game.load.image("level4_portal_l", "Benchmark2/assets/Levels/level4/locked.png");
    game.load.image("level4_portal_ul", "Benchmark2/assets/Levels/level4/unlocked.png");
    game.load.image("level5_portal_l", "Benchmark2/assets/Levels/level5/locked.png");
    game.load.image("level5_portal_ul", "Benchmark2/assets/Levels/level5/unlocked.png");
    game.load.image("level6_portal_l", "Benchmark2/assets/Levels/level6/locked.png");
    game.load.image("level6_portal_ul", "Benchmark2/assets/Levels/level6/unlocked.png");
    game.load.image("level7_portal_l", "Benchmark2/assets/Levels/level7/locked.png");
    game.load.image("level7_portal_ul", "Benchmark2/assets/Levels/level7/unlocked.png");

    //load tilemap 
    game.load.image("grassRock", "Benchmark2/assets/Levels/Tiles/grass-rock platforms2.png");
    game.load.image("spaceFlora", "Benchmark2/assets/Levels/Tiles/space flora.png");
    game.load.image("spaceFlora2", "Benchmark2/assets/Levels/Tiles/space flora2.png");
    game.load.image("Gate", "Benchmark2/assets/Levels/Tiles/gate.png");
    game.load.image("Orange", "Benchmark2/assets/images/orange.png");

    //load sprites
    game.load.spritesheet("TZARHA", 'Benchmark2/assets/Sprites/Tzarha/spritesheet.png', 64, 96);
    game.load.spritesheet("LIGHTNING_WIZARD", "Benchmark2/assets/Sprites/Wizards/Lightning/spritesheet.png", 64, 96);
    game.load.spritesheet("FIRE_WIZARD", "Benchmark2/assets/Sprites/Wizards/Fire/spritesheet.png", 64, 96);
    game.load.spritesheet("ICE_WIZARD", "Benchmark2/assets/Sprites/Wizards/Ice/spritesheet.png", 64, 96);
  },

  create: function() {
    this.addGameStates();
      setTimeout(function () {
      game.state.start("GameMenu");
    }, 2000);
  }
}