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
    game.load.image('headerBase', "assets/images/headerBase.png")
    game.load.image("buttonBase", "assets/images/buttonBase.png")
    game.load.image("helpBase", "assets/images/helpBase.png");
    game.load.image("controlsBase", "assets/images/controlsBase.png");
    game.load.image("infoBase", "assets/images/infobase.png");

    //load in images related to gameplay
    game.load.image("gameUI", "assets/images/gameUI.png");
    game.load.image("xButton", "assets/images/xButton.png");
    game.load.image("pauseButton", "assets/images/pauseButton.png");
    game.load.image("playButton", "assets/images/playButton.png");
    game.load.image("controlsButton", "assets/images/controlsButton.png");
    game.load.image("helpButton", "assets/images/helpButton.png");
    game.load.image("helpBar", "assets/images/HelpBar.png");
    game.load.image("selectBar", "assets/images/selectBar.png");
    game.load.image("controlsBar", "assets/images/controlsBar.png");
    game.load.spritesheet("heartbreak", "assets/images/heartbreak.png", 25, 25);
    game.load.image("menuPlay", "assets/images/menuPlay.png");
    game.load.image("menuControls", "assets/images/menuControls.png");
    game.load.image("menuHelp", "assets/images/menuHelp.png");
    game.load.image("winOverlay", "assets/images/winOverlay.png");
    game.load.image("lossOverlay", "assets/images/lossOverlay.png");
    game.load.image("backButton", "assets/images/backButton.png");
    game.load.image("noOrange", "assets/images/noOrange.png");
    game.load.image("spellRestorePopup", "assets/images/spellRestorePopup.png");

    //load in attacks and attack sprites
    game.load.image("flareIcon", "assets/Sprites/attacks/flareIcon.png");
    game.load.image("firefloomIcon", "assets/Sprites/attacks/firefloomIcon.png");
    game.load.image("zoltIcon", "assets/Sprites/attacks/zoltIcon.png");
    game.load.image("electromagnetismIcon", "assets/Sprites/attacks/electromagnetismIcon.png");
    game.load.image("vectorIcon","assets/Sprites/attacks/movementIcon.png");
    game.load.image("reverseTrajectoryIcon", "assets/Sprites/attacks/reverseTrajectoryIcon.png");
    game.load.spritesheet("flare", "assets/Sprites/attacks/Flare.png", 16, 16);
    game.load.spritesheet("firefloom", "assets/Sprites/attacks/Firefloom.png", 16, 16);
    game.load.spritesheet("zolt", "assets/Sprites/attacks/Electric Attack Prototype.png", 8, 8);
    game.load.spritesheet("electromagnetism", "assets/Sprites/attacks/Electromagnetism.png", 16, 16);
    game.load.spritesheet("vector", "assets/Sprites/attacks/Movement Spell.png", 17, 17);
    game.load.spritesheet("reverseDirection", "assets/Sprites/attacks/Reverse Direction.png", 16,16);
    game.load.spritesheet("attackIcons", "assets/Sprites/attacks/attackIconList.png", 48, 48);
    game.load.image("attackUp", "assets/images/attackChangeUp.png");
    game.load.image("attackDown", "assets/images/attackChangeDown.png");
    game.load.image("flareInfo", "assets/images/flareInfo.png");
    game.load.image("firefloomInfo", "assets/images/firefloomInfo.png");
    game.load.image("zoltInfo", "assets/images/zoltInfo.png");
    game.load.image("electromagnetismInfo", "assets/images/electromagnetismInfo.png");
    game.load.image("vectorInfo", "assets/images/vectorInfo.png");
    game.load.image("reverseTrajectoryInfo", "assets/images/reverseTrajectoryInfo.png");


    //level icons
    game.load.image("level1_bg", "assets/Levels/level1/level1.png");
    game.load.image("level2_bg", "assets/Levels/level2/level2.png");
    game.load.image("level3_bg", "assets/Levels/level3/level3.png");
    game.load.image("level4_bg", "assets/Levels/level4/level4.png");
    game.load.image("level5_bg", "assets/Levels/level5/level5.png");
    game.load.image("level6_bg", "assets/Levels/level6/level6.png"); 
    game.load.image("level7_bg", "assets/Levels/level7/level7.png");   
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

    game.load.text("level1_tile_info", "assets/Levels/level1/level1-tiles.json");
    game.load.text("level2_tile_info", "assets/Levels/level2/level2-tiles.json");
    game.load.text("level3_tile_info", "assets/Levels/level3/level3-tiles.json");

    //load tilemap 
    game.load.image("grassRock", "assets/Levels/Tiles/grass-rock platforms2.png");
    game.load.image("spaceFlora", "assets/Levels/Tiles/space flora.png");
    game.load.image("spaceFlora2", "assets/Levels/Tiles/space flora2.png");
    game.load.image("Gate", "assets/Levels/Tiles/gate.png");
    game.load.image("desertGround", "assets/Levels/Tiles/desert ground and platforms.png");
    game.load.image("desertFlora", "assets/Levels/Tiles/desert flora.png");
    game.load.image("gate2", "assets/Levels/Tiles/gate2.png");
    game.load.image("snowFloor", "assets/Levels/Tiles/snow ice rock tiles.png");
    game.load.image("snowFlora", "assets/Levels/Tiles/trees snow objects.png");
    game.load.image("gate3", "assets/Levels/Tiles/gate3.png");
    game.load.image("Orange", "assets/images/orange.png");

    //load sprites
    game.load.spritesheet("TZHARA", 'assets/Sprites/Tzarha/spritesheet.png', 64, 96);
    game.load.spritesheet("ELECTRIC_WIZARD", "assets/Sprites/Wizards/Lightning/spritesheet.png", 42, 73);
    game.load.spritesheet("FIRE_WIZARD", "assets/Sprites/Wizards/Fire/spritesheet.png", 42, 73);
    game.load.spritesheet("GRAVITY_WIZARD", "assets/Sprites/Wizards/Ice/spritesheet.png", 42, 73);

    //load audio
    game.load.audio("menuClick", "assets/audio/menuClick.mp3");
    game.load.audio("menuTheme", "assets/audio/menuTheme.mp3");
    game.load.audio("a_flare", 'assets/audio/flare.mp3');
    game.load.audio("a_firefloom", 'assets/audio/firefloom.mp3');
    game.load.audio("a_zolt", 'assets/audio/zolt.mp3');
    game.load.audio("a_electromagnetism", 'assets/audio/electromagnetism.mp3');
    game.load.audio("a_vector", 'assets/audio/vector.mp3');
    game.load.audio("a_reverseTrajectory", "assets/audio/reverseTrajectory.mp3");
    game.load.audio("a_iceAttack", "assets/audio/iceAttack.mp3");
    game.load.audio("hitSound", "assets/audio/hitSound.mp3");
    game.load.audio("damagedSound", "assets/audio/hitSound2.mp3");
    game.load.audio("jump", "assets/audio/jump.mp3");
    game.load.audio("orangeCollect", "assets/audio/orangeCollect3.mp3");
    game.load.audio("lossTheme", "assets/audio/lossTheme.mp3");
    game.load.audio("winTheme", "assets/audio/winTheme.mp3");
    game.load.audio("inGameMusic1", "assets/audio/inGameMusic1.mp3");
    game.load.audio("inGameMusic2", "assets/audio/inGameMusic2.mp3");
    game.load.audio("inGameMusic3", "assets/audio/inGameMusic3.mp3");

  },

  create: function() {
    this.addGameStates();
      setTimeout(function () {
      game.state.start("GameMenu");
    }, 2000);
  }
}