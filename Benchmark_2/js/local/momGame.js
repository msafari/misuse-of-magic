var momGame = function () {};

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
    this.player = game.add.sprite(0, 0, 'TZARHA');
    this.loadTzarha(this.player);

    game.camera.follow(this.player);

    placeholder = game.add.text(game.world.centerX, game.world.centerY, 'a cool game will go here');
    gameUI = game.add.sprite(50, 25, "gameUI");
    hearts = game.add.group();
    
    for (var i = 0; i < 5; i++) {
        var heart = hearts.create(150 + (i * 35), 35, 'heartbreak');
        heart.frame = 0;
    }
    xButton = game.add.sprite(850, 35, "xButton");
    pauseButton = game.add.sprite(900, 35, "pauseButton");
    //playButton = game.add.sprite(850, 35, "playButton");
    //playButton.visible = false;
    controlsButton = game.add.sprite(950, 35, "controlsButton");
    helpButton = game.add.sprite(1000, 35, "helpButton");
    treeButton = game.add.sprite(1050, 35, "treeButton");

    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {
        game.state.start("MomLevelSelect");
    });
  },

  update: function () {

  },

  loadTzarha: function(player) {
    var states = ["IDLE", "SPELL_R", "SPELL_L", "DEATH", "DAMAGE_L", "DAMAGE_R", "JUMP_L", "JUMP_R", "WALK_L", "WALK_R"];
    _.each(states, function (state, i) {
        var frameIndexes = _.range(i*6, i*6 + 6);
        player.animations.add(state, frameIndexes, 10, true);
    });
  },

  loadLevelMap: function () {
    game.add.sprite(0, 0, game.current_level.bg_image_name);

    this.map = game.add.tilemap(game.current_level.name);

    this.map.addTilesetImage("grass-rock platforms2", "grassRock");
    this.map.addTilesetImage("space flora", "spaceFlora");
    this.map.addTilesetImage("space flora2", "spaceFlora2");


    this.blocked_layer = this.map.createLayer('blocked-layer');

    this.map.setCollisionBetween(1, 500, true, 'blocked-layer');

    this.blockedLayer.resizeWorld();

  },


  findObjectBySprite: function() {
    
  }

};