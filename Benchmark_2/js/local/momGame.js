var momGame = function () {};
var cursors,
  oranges_count = 0;

momGame.prototype = {
  preload: function () {
    game.load.spritesheet("TZARHA", 'assets/Sprites/Tzarha/spritesheet.png', 64, 96);

    _.each(game.levels, function(level, i) {
        game.load.image(level.bg_image_name, level.bg_image_path);
        game.load.tilemap(level.name, level.tile_map, null, Phaser.Tilemap.TILED_JSON);
    });
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
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 10000;

    // set anchor point for player
    this.player.anchor.setTo(0.75, 0.25);
    this.loadTzarha(this.player);

    game.camera.follow(this.player);

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
    //playButton = game.add.sprite(850, 35, "playButton");
    //playButton.visible = false;
    
    controlsBase = game.add.sprite(100,75,"controlsBase");
    controlsBase.visible = false;
    controlsBase.fixedToCamera = true;
    controlsBase.cameraOffset.setTo(100, 75);

    helpBase = game.add.sprite(100,75,"helpBase");
    helpBase.visible = false;
    helpBase.fixedToCamera = true;
    helpBase.cameraOffset.setTo(100, 75);

    //add controls button functionality
    controlsButton = game.add.sprite(950, 35, "controlsButton");
    controlsButton.fixedToCamera = true;
    controlsButton.cameraOffset.setTo(950, 35);
    controlsButton.inputEnabled = true;
    controlsButton.events.onInputUp.add(function() {
      if (helpBase.visible === true)
        helpBase.visible = false;
      if (controlsBase.visible === true) {
        controlsBase.visible = false;
      }
      else
        controlsBase.visible = true;
    });

    //add help button functionality
    helpButton = game.add.sprite(1000, 35, "helpButton");
    helpButton.fixedToCamera = true;
    helpButton.cameraOffset.setTo(1000, 35);
    helpButton.inputEnabled = true;
    helpButton.events.onInputUp.add(function() {
      if (controlsBase.visible === true)
        controlsBase.visible = false;
      if (helpBase.visible === true) {
        helpBase.visible = false;
      }
      else
        helpBase.visible = true;
    });

    //backButton = game.add.sprite(50, 675, "backButton");
    //backButton.inputEnabled = true;
    //backButton.events.onInputUp.add(function() {
        //game.state.start("MomLevelSelect");
    //});
    winOverlay = game.add.sprite(375, 50, "winOverlay");
    winOverlay.visible = false;
    winOverlay.inputEnabled = false;
    winOverlay.fixedToCamera = true;
    winOverlay.cameraOffset.setTo(375, 50);
    //control
    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function () {
    game.physics.arcade.collide(this.player, this.blocked_layer);
    game.physics.arcade.overlap(this.player, this.oranges, this.collectOranges, null);
    game.physics.arcade.overlap(this.player, this.gates, this.winLevel, null);

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if(cursors.left.isDown && !cursors.up.isDown) {
      this.player.body.velocity.x = -1050;
      this.player.animations.play("WALK_L");
    }

    else if (cursors.right.isDown && !cursors.up.isDown) {
      this.player.body.velocity.x = 1050;
      this.player.animations.play("WALK_R");
    }

    else if (cursors.up.isDown && cursors.right.isDown) {
      this.player.body.velocity.y = -750;
      this.player.body.velocity.x = 150;
      this.player.animations.play("JUMP_R");
    }

    else if (cursors.up.isDown && cursors.left.isDown) {
      this.player.body.velocity.y = -350;
      this.player.body.velocity.x = -150;
      this.player.animations.play("JUMP_L");
    }

    else if (cursors.up.isDown) {
      this.player.body.velocity.y = -350;
    }
    else {
      this.player.animations.play("IDLE");
    }

  },

  collectOranges: function(player, orange) {
    orange.kill();
    oranges_count++;
    orangesCounter.setText(""+oranges_count);
  },

  winLevel: function(player, gate) {
    winOverlay.visible = true;
    winOverlay.inputEnabled = true;
    winOverlay.events.onInputUp.add(function() {resetGame();});
  },

  resetGame: function() {
    oranges_count = 0;
    game.state.start("Splash");
  },

  loadTzarha: function(player) {
    var states = ["IDLE", "SPELL_L", "SPELL_R", "DEATH", "DAMAGE_L", "DAMAGE_R", "JUMP_L", "JUMP_R", "WALK_L", "WALK_R"];
    _.each(states, function (state, i) {
        var frameIndexes = _.range(i*6, i*6 + 6);
        player.animations.add(state, frameIndexes, 10, true);
    });
  },

  loadLevelMap: function () {

    this.map = game.add.tilemap(game.current_level.name);

    this.map.addTilesetImage("grass-rock platforms2", "grassRock");
    this.map.addTilesetImage("space flora", "spaceFlora");
    this.map.addTilesetImage("space flora2", "spaceFlora2");
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
      this.objects.create(element.x, element.y, sprite);;
    }, this);
    return this.objects;
  },

};