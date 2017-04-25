splash = function () {};

splash.prototype = {

  loadScripts: function() { 
    game.load.script('gameMenu', 'Benchmark3/js/local/screens/gameMenu.js');
    game.load.script('momGame', 'Benchmark3/js/local/momGame.js');
    game.load.script('controls', 'Benchmark3/js/local/screens/controls.js');
    game.load.script('momLevelSelect', 'Benchmark3/js/local/screens/momLevelSelect.js');
    game.load.script('help', 'Benchmark3/js/local/screens/help.js');
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
    game.load.image('headerBase', "Benchmark3/assets/images/headerBase.png")
    game.load.image("buttonBase", "Benchmark3/assets/images/buttonBase.png")
    game.load.image("helpBase", "Benchmark3/assets/images/helpBase.png");
    game.load.image("controlsBase", "Benchmark3/assets/images/controlsBase.png");
    game.load.image("infoBase", "Benchmark3/assets/images/infobase.png");

    //load in images related to gameplay
    game.load.image("gameUI", "Benchmark3/assets/images/gameUI.png");
    game.load.image("xButton", "Benchmark3/assets/images/xButton.png");
    game.load.image("pauseButton", "Benchmark3/assets/images/pauseButton.png");
    game.load.image("playButton", "Benchmark3/assets/images/playButton.png");
    game.load.image("controlsButton", "Benchmark3/assets/images/controlsButton.png");
    game.load.image("helpButton", "Benchmark3/assets/images/helpButton.png");
    game.load.spritesheet("heartbreak", "Benchmark3/assets/images/heartbreak.png", 25, 25);
    game.load.image("winOverlay", "Benchmark3/assets/images/winOverlay.png");
    game.load.image("lossOverlay", "Benchmark3/assets/images/lossOverlay.png");
    game.load.image("backButton", "Benchmark3/assets/images/backButton.png");
    game.load.image("noOrange", "Benchmark3/assets/images/noOrange.png");
    game.load.image("spellRestorePopup", "Benchmark3/assets/images/spellRestorePopup.png");

    //load in attacks and attack sprites
    game.load.image("flareIcon", "Benchmark3/assets/Sprites/attacks/flareIcon.png");
    game.load.image("firefloomIcon", "Benchmark3/assets/Sprites/attacks/firefloomIcon.png");
    game.load.image("zoltIcon", "Benchmark3/assets/Sprites/attacks/zoltIcon.png");
    game.load.image("electromagnetismIcon", "Benchmark3/assets/Sprites/attacks/electromagnetismIcon.png");
    game.load.image("vectorIcon","Benchmark3/assets/Sprites/attacks/movementIcon.png");
    game.load.image("reverseTrajectoryIcon", "Benchmark3/assets/Sprites/attacks/reverseTrajectoryIcon.png");
    game.load.spritesheet("flare", "Benchmark3/assets/Sprites/attacks/Flare.png", 16, 16);
    game.load.spritesheet("firefloom", "Benchmark3/assets/Sprites/attacks/Firefloom.png", 16, 16);
    game.load.spritesheet("zolt", "Benchmark3/assets/Sprites/attacks/Electric Attack Prototype.png", 8, 8);
    game.load.spritesheet("electromagnetism", "Benchmark3/assets/Sprites/attacks/Electromagnetism.png", 16, 16);
    game.load.spritesheet("vector", "Benchmark3/assets/Sprites/attacks/Movement Spell.png", 17, 17);
    game.load.spritesheet("reverseDirection", "Benchmark3/assets/Sprites/attacks/Reverse Direction.png", 16,16);
    game.load.spritesheet("attackIcons", "Benchmark3/assets/Sprites/attacks/attackIconList.png", 48, 48);
    game.load.image("attackUp", "Benchmark3/assets/images/attackChangeUp.png");
    game.load.image("attackDown", "Benchmark3/assets/images/attackChangeDown.png");

    //level icons
    game.load.image("level1_bg", "Benchmark3/assets/Levels/level1/level1.png");
    game.load.image("level2_bg", "Benchmark3/assets/Levels/level2/level2.png");
    game.load.image("level3_bg", "Benchmark3/assets/Levels/level3/level3.png");
    game.load.image("level4_bg", "Benchmark3/assets/Levels/level4/level4.png");
    game.load.image("level5_bg", "Benchmark3/assets/Levels/level5/level5.png");
    game.load.image("level6_bg", "Benchmark3/assets/Levels/level6/level6.png"); 
    game.load.image("level7_bg", "Benchmark3/assets/Levels/level7/level7.png");   
    game.load.image("level1_portal_ul", "Benchmark3/assets/Levels/level1/unlocked.png");
    game.load.image("level2_portal_l", "Benchmark3/assets/Levels/level2/locked.png");
    game.load.image("level2_portal_ul", "Benchmark3/assets/Levels/level2/unlocked.png");
    game.load.image("level3_portal_l", "Benchmark3/assets/Levels/level3/locked.png");
    game.load.image("level3_portal_ul", "Benchmark3/assets/Levels/level3/unlocked.png");
    game.load.image("level4_portal_l", "Benchmark3/assets/Levels/level4/locked.png");
    game.load.image("level4_portal_ul", "Benchmark3/assets/Levels/level4/unlocked.png");
    game.load.image("level5_portal_l", "Benchmark3/assets/Levels/level5/locked.png");
    game.load.image("level5_portal_ul", "Benchmark3/assets/Levels/level5/unlocked.png");
    game.load.image("level6_portal_l", "Benchmark3/assets/Levels/level6/locked.png");
    game.load.image("level6_portal_ul", "Benchmark3/assets/Levels/level6/unlocked.png");
    game.load.image("level7_portal_l", "Benchmark3/assets/Levels/level7/locked.png");
    game.load.image("level7_portal_ul", "Benchmark3/assets/Levels/level7/unlocked.png");

    game.load.text("level1_tile_info", "Benchmark3/assets/Levels/level1/level1-tiles.json");
    game.load.text("level2_tile_info", "Benchmark3/assets/Levels/level2/level2-tiles.json");
    game.load.text("level3_tile_info", "Benchmark3/assets/Levels/level3/level3-tiles.json");

    //load tilemap 
    game.load.image("grassRock", "Benchmark3/assets/Levels/Tiles/grass-rock platforms2.png");
    game.load.image("spaceFlora", "Benchmark3/assets/Levels/Tiles/space flora.png");
    game.load.image("spaceFlora2", "Benchmark3/assets/Levels/Tiles/space flora2.png");
    game.load.image("Gate", "Benchmark3/assets/Levels/Tiles/gate.png");
    game.load.image("desertGround", "Benchmark3/assets/Levels/Tiles/desert ground and platforms.png");
    game.load.image("desertFlora", "Benchmark3/assets/Levels/Tiles/desert flora.png");
    game.load.image("gate2", "Benchmark3/assets/Levels/Tiles/gate2.png");
    game.load.image("snowFloor", "Benchmark3/assets/Levels/Tiles/snow ice rock tiles.png");
    game.load.image("snowFlora", "Benchmark3/assets/Levels/Tiles/trees snow objects.png");
    game.load.image("gate3", "Benchmark3/assets/Levels/Tiles/gate3.png");
    game.load.image("Orange", "Benchmark3/assets/images/orange.png");

    //load sprites
    game.load.spritesheet("TZHARA", 'Benchmark3/assets/Sprites/Tzarha/spritesheet.png', 64, 96);
    game.load.spritesheet("ELECTRIC_WIZARD", "Benchmark3/assets/Sprites/Wizards/Lightning/spritesheet.png", 64, 96);
    game.load.spritesheet("FIRE_WIZARD", "Benchmark3/assets/Sprites/Wizards/Fire/spritesheet.png", 64, 96);
    game.load.spritesheet("GRAVITY_WIZARD", "Benchmark3/assets/Sprites/Wizards/Ice/spritesheet.png", 64, 96);

    //load audio
    game.load.audio("menuClick", "Benchmark3/assets/audio/menuClick.mp3");
    game.load.audio("menuTheme", "Benchmark3/assets/audio/menuTheme.mp3");
    game.load.audio("a_flare", 'Benchmark3/assets/audio/flare.mp3');
    game.load.audio("a_firefloom", 'Benchmark3/assets/audio/firefloom.mp3');
    game.load.audio("a_zolt", 'Benchmark3/assets/audio/zolt.mp3');
    game.load.audio("a_electromagnetism", 'Benchmark3/assets/audio/electromagnetism.mp3');
    game.load.audio("a_vector", 'Benchmark3/assets/audio/vector.mp3');
    game.load.audio("a_reverseTrajectory", "Benchmark3/assets/audio/reverseTrajectory.mp3");
    game.load.audio("a_iceAttack", "Benchmark3/assets/audio/iceAttack.mp3");
    game.load.audio("hitSound", "Benchmark3/assets/audio/hitSound.mp3");
    game.load.audio("damagedSound", "Benchmark3/assets/audio/hitSound2.mp3");
    game.load.audio("jump", "Benchmark3/assets/audio/jump.mp3");
    game.load.audio("orangeCollect", "Benchmark3/assets/audio/orangeCollect3.mp3");
    game.load.audio("lossTheme", "Benchmark3/assets/audio/lossTheme.mp3");
    game.load.audio("winTheme", "Benchmark3/assets/audio/winTheme.mp3");
    game.load.audio("inGameMusic1", "Benchmark3/assets/audio/inGameMusic1.mp3");
    game.load.audio("inGameMusic2", "Benchmark3/assets/audio/inGameMusic2.mp3");
    game.load.audio("inGameMusic3", "Benchmark3/assets/audio/inGameMusic3.mp3");

  },

  create: function() {
    this.addGameStates();
      setTimeout(function () {
      game.state.start("GameMenu");
    }, 2000);
  }
}