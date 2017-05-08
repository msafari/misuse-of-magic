var momGame = function () {};
var oranges_count = 0,
  oranges_usable = false,
  f_attackIcon1, f_attackIcon2, f_attackIcon3,
  gameWin, gameUI;

pauseGame = function(pause) {
    if(game.is_paused == pause)
      return; //Prevent useless iteration if something tries to set the same state twice 
    if(!pause) {
      game.is_paused = false;
      pauseButton.loadTexture("pauseButton");
      _.each(game.wizard_list, function (wizard) {
        if(!wizard.animations.currentAnim.isPlaying)
          wizard.animations.currentAnim.play();
      });
    }
    else {
      game.is_paused = true;
      pauseButton.loadTexture("playButton");
      _.each(game.wizard_list, function (wizard) {
        wizard.animations.stop();
      });
    }
  };

momGame.prototype = {
  preload: function () {
    _.each(game.levels, function(level, i) {
        game.load.image(level.bg_image_name, level.bg_image_path);
        game.load.tilemap(level.name, level.tile_map, null, Phaser.Tilemap.TILED_JSON);
    });
    Attack.prototype.attack_init();
  },

  create: function () { 
    console.warn("Game started");
    gameWin = false;
    game.is_restoring = false;
    game.is_paused = false;

    this.sounds = new Sounds();

    titleStyle = { 
        font: 'bold 25pt', 
        fill: '#673ab7', 
        align: 'center'
    };
    menuStyle = { 
        font: 'bold 20pt', 
        fill: '#FF0000'
    };

    this.loadLevelMap();

    // load player sprite animations
    var player_start = this.findObjectsBySprite("Player", "Player")[0];
    this.player = new Tzhara(player_start.x - 32, player_start.y + 32);

    this.load_wizards();  
    this.load_boss(); 

    mom_UI = game.add.group();
    gameUI = mom_UI.create(45, 20, "gameUI");
    gameUI.fixedToCamera = true;
    gameUI.cameraOffset.setTo(45, 20);
    game.physics.arcade.enable(gameUI);
    gameUI.enableBody = true;
    gameUI.immovable = true;
    gameUI.body.collideWorldBounds = true;
    gameUI.body.allowGravity = true;
    game.momUI = mom_UI;
    hearts = game.add.group();
    
    for (var i = 0; i < 6; i++) {
        var heart = hearts.create(180 + (i * 35), 35, 'heartbreak');
        heart.frame = 0;
        heart.fixedToCamera = true;
        heart.cameraOffset.setTo(180 + (i * 35), 35);
    }

    game.hearts = hearts;
    
    orangesCounter = game.add.text(720,48, "0");
    orangesCounter.fixedToCamera = true;
    orangesCounter.cameraOffset.setTo(720, 48);
    orangesCounter.setStyle({
      fill: "#ff2d2d"
    });
  
    orangeUnavailable = game.add.sprite(715, 24, "noOrange");
    orangeUnavailable.fixedToCamera = true;
    orangeUnavailable.cameraOffset.setTo(715, 24);

    xButton = game.add.sprite(870, 35, "xButton");
    xButton.fixedToCamera = true;
    xButton.cameraOffset.setTo(870, 35);
    xButton.inputEnabled = true;
    xButton.events.onInputUp.add(function() {
      game.sound.stopAll(); 
      game.sound_effects.menuClick.play(); 
      game.camera.reset(); 
      game.state.start("Splash");
    });

    pauseButton = game.add.sprite(920, 35, "pauseButton");
    pauseButton.fixedToCamera = true;
    pauseButton.cameraOffset.setTo(920, 35);
    pauseButton.inputEnabled = true;
    pauseButton.events.onInputUp.add(function() {
      game.sound_effects.menuClick.play();
      if (!game.is_paused) {
        game.sound_effects.inGameMusic.volume -= .45;
        game.sound_effects.inGameMusic.pause();
        pauseGame(true);
      }
      else {
        game.sound_effects.inGameMusic.volume += .45;
        game.sound_effects.inGameMusic.resume();
        pauseGame(false);
      }
     });
    
    controlsBase = game.add.sprite(100,75,"controlsBase");
    controlsBase.visible = false;
    controlsBase.fixedToCamera = true;
    controlsBase.cameraOffset.setTo(100, 75);

    helpBase = game.add.sprite(100,75,"helpBase");
    helpBase.visible = false;
    helpBase.fixedToCamera = true;
    helpBase.cameraOffset.setTo(100, 75);

    infoBase = game.add.sprite(100,75,"infoBase");
    infoBase.visible = false;
    infoBase.fixedToCamera = true;
    infoBase.cameraOffset.setTo(100, 75);

    backButton = game.add.sprite(920, 80, "backButton");
    backButton.visible = false;
    backButton.inputEnabled = true;
    backButton.fixedToCamera = true;
    backButton.cameraOffset.setTo(920, 80);
    backEvent = backButton.events.onInputUp.add(function() {
        backButton.visible = false;
        helpBase.visible = false;
        controlsBase.visible = false;
        spellRestorePopup.visible = false;
        infoBase.visible = false;
        pauseGame(false);
    });
    _.attempt(function() {
    //This is so the the cheats get removed from the screen without causing an issue if the file is not used
      Cheats.backAction = backEvent.getSignal();
    });

    //add controls button functionality
    controlsButton = game.add.sprite(970, 35, "controlsButton");
    controlsButton.fixedToCamera = true;
    controlsButton.cameraOffset.setTo(970, 35);
    controlsButton.inputEnabled = true;
    controlsButton.events.onInputUp.add(function() {
      game.sound_effects.menuClick.play();
      if (helpBase.visible) {
        backButton.visible = false;
        helpBase.visible = false;
      }
      if (controlsBase.visible) {
        controlsBase.visible = false;
      }
      else {
        backButton.visible = true;
        controlsBase.visible = true;
      }
    });

    //add help button functionality
    helpButton = game.add.sprite(1020, 35, "helpButton");
    helpButton.fixedToCamera = true;
    helpButton.cameraOffset.setTo(1020, 35);
    helpButton.inputEnabled = true;
    helpButton.events.onInputUp.add(function() {
      game.sound_effects.menuClick.play();
      if (controlsBase.visible === true)
        backButton.visible = false;
        controlsBase.visible = false;
      if (helpBase.visible === true) {
        helpBase.visible = false;
      }
      else
        backButton.visible = true;
        helpBase.visible = true;
    });

    spellRestorePopup = game.add.sprite(125, 75,"spellRestorePopup");
    spellRestorePopup.visible = false;
    spellRestorePopup.fixedToCamera = true;
    spellRestorePopup.cameraOffset.setTo(125, 75);

    mom_AttackIcon1 = game.add.sprite(465, 26, "attackIcons");
    mom_AttackIcon1.fixedToCamera = true;
    mom_AttackIcon1.cameraOffset.setTo(465, 26);
    mom_AttackIcon1.frame = f_attackIcon1;
    mom_AttackIcon2 = game.add.sprite(530, 26, "attackIcons"); //This one is a tad off center, so -5px to make up for that
    mom_AttackIcon2.fixedToCamera = true;
    mom_AttackIcon2.cameraOffset.setTo(530, 26);
    mom_AttackIcon2.frame = f_attackIcon2;
    mom_AttackIcon3 = game.add.sprite(595, 26, "attackIcons");
    mom_AttackIcon3.fixedToCamera = true;
    mom_AttackIcon3.cameraOffset.setTo(595, 26);
    mom_AttackIcon3.frame = f_attackIcon3;

    zAttackCounter = game.add.text(505, 48, game.player.spell_1_usage);
    zAttackCounter.fixedToCamera = true;
    zAttackCounter.cameraOffset.setTo(505, 48);
    xAttackCounter = game.add.text(570, 48, game.player.spell_2_usage);
    xAttackCounter.fixedToCamera = true;
    xAttackCounter.cameraOffset.setTo(570, 48);
    cAttackCounter = game.add.text(635, 48, game.player.spell_3_usage);
    cAttackCounter.fixedToCamera = true;
    cAttackCounter.cameraOffset.setTo(635, 48);

    zAttackUnavailable = game.add.sprite(500, 24, "noOrange"); //Stretching that filename a bit here
    zAttackUnavailable.fixedToCamera = true;
    zAttackUnavailable.cameraOffset.setTo(500, 24);
    zAttackUnavailable.visible = false;

    xAttackUnavailable = game.add.sprite(565, 24, "noOrange");
    xAttackUnavailable.fixedToCamera = true;
    xAttackUnavailable.cameraOffset.setTo(565, 24);
    xAttackUnavailable.visible = false;

    cAttackUnavailable = game.add.sprite(630, 24, "noOrange"); 
    cAttackUnavailable.fixedToCamera = true;
    cAttackUnavailable.cameraOffset.setTo(630, 24);
    cAttackUnavailable.visible = false;

    winOverlay = game.add.sprite(375, 50, "winOverlay");
    winOverlay.visible = false;
    winOverlay.inputEnabled = false;
    winOverlay.events.onInputUp.add(function() {
      game.sound.stopAll();
      oranges_count = 0;
      game.is_paused = false;
      game.world.removeAll()
      game.state.start("MomLevelSelect");
    });
    winOverlay.fixedToCamera = true;
    winOverlay.cameraOffset.setTo(375, 50);

    lossOverlay = game.add.sprite(375, 50, "lossOverlay");
    lossOverlay.visible = false;
    lossOverlay.inputEnabled = false;
    lossOverlay.events.onInputUp.add(function() {
      game.sound.stopAll();
      oranges_count = 0;
      game.is_paused = false;
      game.world.removeAll()
      game.state.start("MomLevelSelect");
    });
    lossOverlay.fixedToCamera = true;
    lossOverlay.cameraOffset.setTo(375, 50);
    
    //controls
    use_orange = game.input.keyboard.addKey(Phaser.Keyboard.O);
    cheat_menu = game.input.keyboard.addKey(Phaser.Keyboard.M);

    game.input.keyboard.addKeyCapture([Phaser.Keyboard.C, Phaser.Keyboard.Z, Phaser.Keyboard.X, Phaser.Keyboard.O, Phaser.Keyboard.M]);

    game.wizardProjectiles = game.add.group();
    game.playerProjectiles = game.add.group();

    cheat_menu.onDown.add(function() {
      _.attempt(showCheatMenu); //So much neater than try/catch, because we don't really need to handle the exception
    });

    game.inputs.attack_Z.onDown.add(function() { 
      if (game.is_restoring) {
        var prevUses = game.player.spell_1_usage;
        game.player.spell_1_usage++;
        console.log("Added an extra use to the Z attack (" + prevUses + " -> " + game.player.spell_1_usage + ")");
        game.is_restoring = false;
        pauseGame(false);
        spellRestorePopup.visible = false;
        oranges_count -= 10;
        zAttackUnavailable.visible = false;
        zAttackCounter.setStyle({ fill: "#000000" });
      }
      updateCounterText();
    }, this);

    game.inputs.attack_C.onDown.add(function() { 
      if(game.is_restoring) {
          var prevUses = game.player.spell_3_usage
          game.player.spell_3_usage++;
          console.log("Added an extra use to the C attack (" + prevUses + " -> " + game.player.spell_3_usage + ")");
          game.is_restoring = false;
          pauseGame(false);
          spellRestorePopup.visible = false;
          oranges_count -= 10;
          cAttackUnavailable.visible = false;
          cAttackCounter.setStyle({ fill: "#000000" });
      }
      updateCounterText();
    }, this);

    game.inputs.attack_X.onDown.add(function() { 
      if(game.is_restoring) {
          var prevUses = game.player.spell_2_usage;
          game.player.spell_2_usage++;
          console.log("Added an extra use to the X attack (" + prevUses + " -> " + game.player.spell_2_usage + ")");
          game.is_restoring = false;
          pauseGame(false);
          spellRestorePopup.visible = false;
          oranges_count -= 10;
          xAttackUnavailable.visible = false;
          xAttackCounter.setStyle({ fill: "#000000" });
      }
      updateCounterText();
    }, this);

    use_orange.onDown.add(function() {
      if(game.is_restoring) {
        console.log("Canceled spell restore");
        game.is_restoring = false;
        pauseGame(false);
        spellRestorePopup.visible = false;
        return;
      }
      oranges_usable = oranges_count >= 10;
      if(!oranges_usable) {
        console.log("Not enough oranges (count: " + oranges_count + ")");
        //TODO: Show a pop up of some sort
        return;
      }
        restoreSpell();
        updateCounterText();
    }, this);
  
  function updateCounterText() {
    if(oranges_count === Infinity) //the orange cheat is enabled then so show inifity symbol
      orangesCounter.setText(String.fromCharCode(0x221E));
    else {
      orangesCounter.setText(""+oranges_count);
      if(oranges_count < 10) {
        orangesCounter.setStyle({
          fill: "#ff2d2d"
        });
        orangeUnavailable.visible = true;
      }
    }
    if(game.player.spell_1_usage === Infinity) {
      zAttackCounter.setText(String.fromCharCode(0x221E));
      xAttackCounter.setText(String.fromCharCode(0x221E));
      cAttackCounter.setText(String.fromCharCode(0x221E));
      return;
    }
    zAttackCounter.setText(game.player.spell_1_usage);
    xAttackCounter.setText(game.player.spell_2_usage);
    cAttackCounter.setText(game.player.spell_3_usage);
    if(game.player.spell_1_usage <= 0) {
      zAttackUnavailable.visible = true;
      zAttackCounter.setStyle({ fill: "#ff2d2d" });
    }
    if(game.player.spell_2_usage <= 0) {
      xAttackUnavailable.visible = true;
      xAttackCounter.setStyle({ fill: "#ff2d2d" });
    }
    if(game.player.spell_3_usage <= 0) {
      cAttackUnavailable.visible = true;
      cAttackCounter.setStyle({ fill: "#ff2d2d" });
    }
  }
  
  function restoreSpell() {
    this.pauseGame(true);
    spellRestorePopup.visible = true;
    game.is_restoring = true;
  }

  function showCheatMenu() {
    if(cheatFileLoaded) {
      infoBase.visible = true;
      backButton.visible = true;
      cheatMenu();
    }
  }
  
  this.sounds.inGameMusic.play();
  },

  update: function () {
    game.physics.arcade.collide(this.player, this.blocked_layer);
    game.physics.arcade.collide(game.wizards, this.blocked_layer);
    game.physics.arcade.collide(game.bosses, this.blocked_layer);
    game.physics.arcade.collide(game.wizardProjectiles, this.blocked_layer);
    
    game.physics.arcade.overlap(this.player, this.oranges, this.collectOranges, null);
    game.physics.arcade.overlap(this.player, this.healthHearts, this.collectHearts, null);
    game.physics.arcade.overlap(this.player, this.gates, this.winLevel, null);

    game.physics.arcade.collide(game.player, game.wizardProjectiles, game.player.damage, null);
    game.physics.arcade.collide(game.player, game.momUI, function() {}, null);
    
    if (!game.is_paused) {
      if (this.player.health == 0) {
			this.loseLevel();
      }

    }
  },

  collectOranges: function(player, orange) {
    game.sound_effects.orangeSound.play();
    orange.kill();
    oranges_count++;
    orangesCounter.setText(""+oranges_count);
    oranges_usable = oranges_count >= 10;
    if(oranges_usable) {
      orangesCounter.setStyle({
      fill: "#000000"
     });
    if(oranges_count === Infinity)
        orangesCounter.setText(String.fromCharCode(0x221E)); //infinity symbol... again
    orangeUnavailable.visible = false;
   }
  },

  collectHearts: function(player, healthHeart) {
    console.log("yes yes yes yes!");
    healthHeart.kill();
    game.player.heal();   
  },

  winLevel: function(player, gate) {
    
    if (gameWin === false) {
      game.sound.stopAll();
      game.sound_effects.winTheme.play();
      gameWin = true;
    }
    game.player.animations.stop();
    winOverlay.visible = true;
    winOverlay.inputEnabled = true;
    helpButton.inputEnabled = false;
    controlsButton.inputEnabled = false;
    game.is_paused = true;
    var next_level = "level" + (game.current_level.number+1);
    next_level = _.find(game.levels, function(l) {
      if(l.name=== next_level)
        return l;
    });
    if (game.current_level.number < 3)
      next_level.set_playable();
  },

  loseLevel: function() {
    game.sound_effects.lossTheme.play();
    game.time.events.repeat(Phaser.Timer.SECOND * 3, 1, _disable, this);
    
    function _disable () {
      game.is_paused = true;
      lossOverlay.visible = true;
      lossOverlay.inputEnabled = true;
      helpButton.inputEnabled = false;
      controlsButton.inputEnabled = false;
    }
  },

  loadLevelMap: function () {
    this.background = game.add.sprite(0, 0, game.current_level.bg_image_name);
    this.background.fixedToCamera = true;

    this.map = game.add.tilemap(game.current_level.name);
    game.map = this.map;
    _.each(game.current_level.tileset_info, function (value, key) {
      game.map.addTilesetImage(key, value);
    });
    this.map = game.map;
    
    this.grass_layer = this.map.createLayer('grass');
    this.bg_layer = this.map.createLayer('bg');
    this.blocked_layer = this.map.createLayer('blocked-layer');

    this.map.setCollisionBetween(1, 500, true, 'blocked-layer');

    this.blocked_layer.resizeWorld();


    this.healthHearts = this.createObjects("Health", "object-layer");
    this.healthHearts.enableBody = true;

    this.oranges = this.createObjects("Orange", "object-layer");
    this.oranges.enableBody = true;

    
    this.gates = this.createObjects("Gate", "object-layer");
    this.gates.enableBody = true;
  },

  /**
   * load_wizards will load up the elemental wizards
   * it will create wizard objects and add that to the list of wizards
   *  it will retrieve the initial position of wizards from the tilemap
   */
  load_wizards: function () {
    game.wizard_list = [];
    game.wizards = game.add.group();
    game.wizards.enableBody = true;
    this.level_wizards = this.findObjectsBySprite("Wizard", "Wizards");
    _.each(this.level_wizards, function (wiz) {
      var wix = new Wizard(wiz.properties.Type, wiz.x, wiz.y);
    });
  },

  load_boss: function() {
    game.boss_list = [];
    game.bosses = game.add.group();
    game.bosses.enableBody = true;
    this.level_bosses = this.findObjectsBySprite("Boss", "Wizards");
    _.each(this.level_bosses, function (theBoss) {
      var theBoss = new Boss(theBoss.x, theBoss.y);
    });
  },

  findObjectsBySprite: function(sprite, layer) {
    var result = [];
    this.map.objects[layer].forEach(function(element) {
        if(element.visible && element.properties.Sprite === sprite) {
            element.y -= this.map.tileHeight;
            result.push(element);
        }
    }, this);
    return result;
  },

  createObjects: function(sprite, layer) {
    //create items
    this.objects = game.add.group();
    this.objects.enableBody = true;
    var obj;    
    result = this.findObjectsBySprite(sprite, layer);
    result.forEach(function(element) {
      this.objects.create(element.x, element.y, sprite);
    }, this);
    return this.objects;
  },

};