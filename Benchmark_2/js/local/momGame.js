var momGame = function () {};
var cursors,
  oranges_count = 0,
  health = 5,
  invincible = false,
  attack_pyro,
  attack_lightning,
  attack_gravity,
  paused = false,
  DAMAGED_L = false,
  DAMAGED_R = false,
  attack,
  f_attackIcon1, f_attackIcon2, f_attackIcon3;

momGame.prototype = {
  preload: function () {
    _.each(game.levels, function(level, i) {
        game.load.image(level.bg_image_name, level.bg_image_path);
        game.load.tilemap(level.name, level.tile_map, null, Phaser.Tilemap.TILED_JSON);
    });
    Attack.prototype.attack_init();
  },

  create: function () { 
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
    this.player = game.add.sprite(player_start.x, player_start.y, 'TZARHA');

    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.allowGravity = true;
    this.player.body.bounce.y = 0.4;
    this.player.body.gravity.y = 15000;

    // set anchor point for player
    this.player.anchor.setTo(0.5, 0.5);
    this.loadTzarha(this.player);
    game.player = this.player;

    this.load_wizards();

    game.camera.follow(this.player);


    this.timer = this.game.time.create(this.game);    
    this.timer.add(50, this.all_wizards_random_act, this.all_wizards_random_act);    
    this.timer.start();   

    gameUI = game.add.sprite(50, 25, "gameUI");
    gameUI.fixedToCamera = true;
    gameUI.cameraOffset.setTo(50, 25);
    healthText = game.add.text(55, 31, "Health:");
    healthText.fixedToCamera = true;
    healthText.cameraOffset.setTo(55, 31);
    hearts = game.add.group();
    
    for (var i = 0; i < 5; i++) {
        var heart = hearts.create(150 + (i * 35), 35, 'heartbreak');
        heart.frame = 0;
        heart.fixedToCamera = true;
        heart.cameraOffset.setTo(150 + (i * 35), 35);
    }
    
    orangesCounter = game.add.text(800, 48, "0");
    orangesCounter.fixedToCamera = true;
    orangesCounter.cameraOffset.setTo(800, 48);
    xButton = game.add.sprite(850, 35, "xButton");
    xButton.fixedToCamera = true;
    xButton.cameraOffset.setTo(850, 35);
    xButton.inputEnabled = true;
    xButton.events.onInputUp.add(function() {game.camera.reset(); game.state.start("Splash");});

    pauseButton = game.add.sprite(900, 35, "pauseButton");
    pauseButton.fixedToCamera = true;
    pauseButton.cameraOffset.setTo(900, 35);
    pauseButton.inputEnabled = true;
    pauseButton.events.onInputUp.add(function() {if (paused === false) {
        paused = true;  
        pauseButton.loadTexture("playButton");
      } 
      else {
        paused = false;  
        pauseButton.loadTexture("pauseButton");
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

    backButton = game.add.sprite(900, 80, "backButton");
    backButton.visible = false;
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {
        backButton.visible = false;
        helpBase.visible = false;
        controlsBase.visible = false;
    });

    //add controls button functionality
    controlsButton = game.add.sprite(950, 35, "controlsButton");
    controlsButton.fixedToCamera = true;
    controlsButton.cameraOffset.setTo(950, 35);
    controlsButton.inputEnabled = true;
    controlsButton.events.onInputUp.add(function() {
      if (helpBase.visible === true)
        backButton.visible = false;
        helpBase.visible = false;
      if (controlsBase.visible === true) {
        controlsBase.visible = false;
      }
      else
        backButton.visible = true;
        controlsBase.visible = true;
    });

    //add help button functionality
    helpButton = game.add.sprite(1000, 35, "helpButton");
    helpButton.fixedToCamera = true;
    helpButton.cameraOffset.setTo(1000, 35);
    helpButton.inputEnabled = true;
    helpButton.events.onInputUp.add(function() {
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

    mom_AttackIcon1 = game.add.sprite(550, 27, "attackIcons");
    mom_AttackIcon1.fixedToCamera = true;
    mom_AttackIcon1.cameraOffset.setTo(550, 27);
    mom_AttackIcon1.frame = f_attackIcon1;
    mom_AttackIcon2 = game.add.sprite(610, 27, "attackIcons");
    mom_AttackIcon2.fixedToCamera = true;
    mom_AttackIcon2.cameraOffset.setTo(610, 27);
    mom_AttackIcon2.frame = f_attackIcon2;
    mom_AttackIcon3 = game.add.sprite(670, 27, "attackIcons");
    mom_AttackIcon3.fixedToCamera = true;
    mom_AttackIcon3.cameraOffset.setTo(670, 27);
    mom_AttackIcon3.frame = f_attackIcon3;

    winOverlay = game.add.sprite(375, 50, "winOverlay");
    winOverlay.visible = false;
    winOverlay.inputEnabled = false;
    winOverlay.events.onInputUp.add(function() {
      oranges_count = 0;
      paused = false;
      game.state.start("Splash");
    });
    winOverlay.fixedToCamera = true;
    winOverlay.cameraOffset.setTo(375, 50);

    lossOverlay = game.add.sprite(375, 50, "lossOverlay");
    lossOverlay.visible = false;
    lossOverlay.inputEnabled = false;
    lossOverlay.events.onInputUp.add(function() {
      oranges_count = 0;
      paused = false;
      game.state.start("Splash");
    });
    lossOverlay.fixedToCamera = true;
    lossOverlay.cameraOffset.setTo(375, 50);
    
    //control
    cursors = game.input.keyboard.createCursorKeys();
    attack_pyro = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    attack_lightning = game.input.keyboard.addKey(Phaser.Keyboard.C);
    attack_gravity = game.input.keyboard.addKey(Phaser.Keyboard.X);

    game.input.keyboard.addKeyCapture([Phaser.Keyboard.C, Phaser.Keyboard.Z, Phaser.Keyboard.X]);

    game.wizardProjectiles = game.add.group();
    game.playerProjectiles = game.add.group();

    attack_pyro.onDown.add(function() { 
      if(!attack)
           attack = new Attack('Tzhara', /*'fire',*/ Infinity);
      if (cursors.left.isDown) {
         this.player.animations.play('SPELL_L'); 
         this.fireAttack();
      }
      else if (cursors.right.isDown) {
        this.player.animations.play('SPELL_R');
        this.fireAttack();
      }
    }, this);
    
    attack_gravity.onDown.add(function() { 
      if(!attack)
           attack = new Attack('Tzhara', /*'fire',*/ Infinity);
      if (cursors.left.isDown) {
         this.player.animations.play('SPELL_L'); 
         this.fireAttack();
      }
      else if (cursors.right.isDown) {
        this.player.animations.play('SPELL_R');
        this.fireAttack();
      }
    }, this);

    attack_lightning.onDown.add(function() { 
      if(!attack)
           attack = new Attack('Tzhara', /*'fire',*/ Infinity);
      if (cursors.left.isDown) {
         this.player.animations.play('SPELL_L'); 
         this.fireAttack();
      }
      else if (cursors.right.isDown) {
        this.player.animations.play('SPELL_R');
        this.fireAttack();
      }
    }, this);

  },


  update: function () {
  
    game.physics.arcade.collide(this.player, this.blocked_layer);
    game.physics.arcade.collide(game.wizards, this.blocked_layer);
    
    game.physics.arcade.overlap(this.player, this.oranges, this.collectOranges, null);
    game.physics.arcade.overlap(this.player, this.gates, this.winLevel, null);

    game.physics.arcade.collide(game.wizards, game.playerProjectiles, this.wizardDamage, null);
    game.physics.arcade.collide(this.player, game.wizardProjectiles, this.playerDamage, null);

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    
    if (paused === false) {
      //this contact needs to be here in case the game is paused, otherwise the user could still lose health!
      game.physics.arcade.overlap(this.player, game.wizards, this.wizardContact, null);
      if (health === 0) {
        this.loseLevel();
      }

      if (DAMAGED_R) {
        this.player.animations.play("DAMAGE_R",15, false, false);
      }
      else if (DAMAGED_L) {
        this.player.animations.play("DAMAGE_L", 15, false, false);
      }
      else if (health == 0) {
        this.player.animations.play("DEATH", 10, false, true);
      }
      else if(cursors.left.isDown && !cursors.up.isDown) {
        this.player.body.velocity.x = -200; 
        this.player.animations.play("WALK_L");
      }

      else if (cursors.right.isDown && !cursors.up.isDown) {
        this.player.body.velocity.x = 200;
        this.player.animations.play("WALK_R");
      }

      else if (cursors.up.isDown && cursors.right.isDown) {
        this.player.body.velocity.y = -550
        this.player.body.velocity.x = 200;
        this.player.animations.play("JUMP_R");
      }

      else if (cursors.up.isDown && cursors.left.isDown) {
        this.player.body.velocity.y = -550;
        this.player.body.velocity.x = -200;
        this.player.animations.play("JUMP_L");
      }

      else if (cursors.up.isDown) {
        this.player.body.velocity.y = -550;
      }

      else {
        this.player.animations.play("IDLE");
      }
    }
    else {
      this.player.animations.stop();
      _.each(game.wizard_list, function (wizard) {
        wizard.sprite.animations.stop();
      });
    }
  },

  wizardContact: function() {

    if (invincible != true && health >= 1) {
        //TODO: this doesnt work yet. oops.
        if (game.player.body.touching.left) {
          DAMAGED_L = true;
        }
        else if (game.player.body.touching.right) {
          DAMAGED_R = true;
        } else {
          DAMAGED_R = true;
        }
        game.player.tint = 0x0078ff;
        invincible = true;
        health--;
        hearts.children[health].frame = 1;
        game.time.events.repeat(Phaser.Timer.SECOND * 2, 1, invinFrameOver, this);
        game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 1, stopDamage, this);
        if (health != 0) {
          game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 20, changeTint, this);
        }
    }

    function invinFrameOver() {
        invincible = false;
        game.player.tint = 0xffffff;
    }

    function stopDamage() {
      DAMAGED_L = false;
      DAMAGED_R = false;
    }

    function changeTint() {
      console.log(game.player.tint);
      if (game.player.tint === 16777215)
        game.player.tint = 0x83ccf9;
      else
        game.player.tint = 0xffffff;
    }
  },

  wizardDamage: function(wizard, attackObject) {
    //TODO: Make the wizard take damage
    attackObject.kill();
    if(attackObject.attacker_name === "Tzhara") {
      wizard.hitPoints--;
      console.log("Wizard hit! Wizard health: " + wizard.hitPoints);
    }
    if (wizard.hitPoints === 0) {
      direction = wizard.animations.currentAnim.name;
      console.log(direction);
      if(direction.search('.*_L') > -1) {
        
        wizard.animations.stop();
        wizard.animations.play("DEAD_L", 8);
        wizard.animations.currentAnim.onLoop.add(function() { 
          _.each(game.wizard_list, function (wiz) {
            if (wiz.sprite === wizard) {
              wiz.destroy();
            }
          });
        }, this);
      }
      else {
        
        wizard.animations.stop();
        wizard.animations.play("DEAD_R", 8);
        wizard.animations.currentAnim.onLoop.add(function() { 
          _.each(game.wizard_list, function (wiz) {
            if (wiz.sprite === wizard) {
              wiz.destroy();
            }
          });
        }, this);
      }
      
    }
  },

  playerDamage: function(player, attackObject) {
    //Make sure Tzhara does cannot take damage from her own attacks. This only looks at the first sprite that collided which 
    //may be a problem later if many attacks are going back and forth.
    if(attackObject.attacker_name === "Tzhara") {
      console.log("Stop hitting yourself! (remove attack sprite from projectile group)");
      //game.time.events.add(2000, restoreAttackCollision, attackObject); //wait 2 seconds
      return;
    }
    console.log("Tzhara was attacked");
    //This crashes the script because the attack sprite is undefined after the timer is up. Not sure why...
    // function restoreAttackCollision(attackObject) {
    //   console.log("Added previous attack sprite back to group");
    //   game.projectiles.add(attackObject);
    // }
  },
  
  fireAttack: function() {
	  //TODO: Attack produces multiple projectiles; only launch one. Do not allow held attacks (It's allowed now to prevent the defaultAttack) 
	  if(game.time.elapsedSince(attack_pyro.timeDown) <= 200 || attack_pyro.isDown) { // Last 200ms (is this enough? too much?)
		  attack.set_sprite("Flare");
	  }
	  else if(game.time.elapsedSince(attack_lightning.timeDown) <= 200 || attack_lightning.isDown) {
		  attack.set_sprite("Electric Attack");
	  }
	  else if(game.time.elapsedSince(attack_gravity.timeDown) <= 200 || attack_gravity.isDown) {
		  attack.set_sprite("Movement Spell");
	  }
	  else {
		  console.log("Unknown attack key, using the default sprite");
		  attack.set_sprite("default");
	  }
	  attack.launch(this.player);
  },

  collectOranges: function(player, orange) {
    orange.kill();
    oranges_count++;
    orangesCounter.setText(""+oranges_count);
  },

  winLevel: function(player, gate) {
    player.animations.stop();
    winOverlay.visible = true;
    winOverlay.inputEnabled = true;
    helpButton.inputEnabled = false;
    controlsButton.inputEnabled = false;
    paused = true;
    var next_level = "level" + (game.current_level.number+1);
    next_level = _.find(game.levels, function(l) {
      if(l.name=== next_level)
        return l;
    })
    next_level.set_playable();
  },

  loseLevel: function() {
    game.time.events.repeat(Phaser.Timer.SECOND * 3, 1, _disable, this);
    
    function _disable () {
      paused = true;
      lossOverlay.visible = true;
      lossOverlay.inputEnabled = true;
      helpButton.inputEnabled = false;
      controlsButton.inputEnabled = false;      
    }

  },

  loadTzarha: function(player) {
    var states = ["IDLE", "SPELL_L", "SPELL_R", "DEATH", "DAMAGE_L", "DAMAGE_R", "JUMP_L", "JUMP_R", "WALK_L", "WALK_R"];
    _.each(states, function (state, i) {
        var frameIndexes = _.range(i*6, i*6 + 6);
        player.animations.add(state, frameIndexes, 10, true);
    });
  },

  loadLevelMap: function () {
    this.background = game.add.sprite(0, 0, game.current_level.bg_image_name);
    this.background.fixedToCamera = true;

    this.map = game.add.tilemap(game.current_level.name);

    this.map.addTilesetImage("grass-rock platforms2", "grassRock");
    this.map.addTilesetImage("space flora", "spaceFlora");
    this.map.addTilesetImage("space flora2", "spaceFlora2");
    this.map.addTilesetImage("gate", "gate");
    this.map.addTilesetImage(game.current_level.name, game.current_level.bg_image_name);
    
    this.bg_layer = this.map.createLayer('bg');
    this.grass_layer = this.map.createLayer('grass');
    this.blocked_layer = this.map.createLayer('blocked-layer');

    this.map.setCollisionBetween(1, 500, true, 'blocked-layer');

    this.blocked_layer.resizeWorld();

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
      var wix = new Wizard(wiz.properties.Type, wiz.x, wiz.y, game.wizards);
    });
    console.log(game.wizards);
  },

  all_wizards_random_act: function () {
    _.each(game.wizard_list, function(wiz) {
      wiz.pick_random_act();
    });
  },

  findObjectsBySprite: function(sprite, layer) {
    var result = [];
    console.log(this.map);
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
    result.forEach(function(element){
      this.objects.create(element.x, element.y, sprite);
    }, this);
    return this.objects;
  },

};