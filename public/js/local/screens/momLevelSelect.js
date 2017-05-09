var momLevelSelect = function () {};

momLevelSelect.prototype = {
  preload: function () {
  },

  create: function () { 
    menuClick = game.add.audio("menuClick");
    game.add.sprite(0, 0, 'background');
    titleStyle = { 
        font: 'bold 25pt', 
        fill: '#673ab7', 
        align: 'center'
    };
    menuStyle = { 
        font: 'bold 20pt', 
        fill: '#FF0000'
    };
    header = game.add.image(game.world.centerX, 50, "selectBar");
    header.fixedToCamera = true;
    header.cameraOffset.setTo(600, 50);
    header.anchor.setTo(0.5);

    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {menuClick.play(); game.state.start("GameMenu");});

    cheatSelectText = game.add.text(600, 200, "Note: Press '2' or '3' to unlock later levels!");
    cheatSelectText.fixedToCamera = true;
    cheatSelectText.cameraOffset.setTo(600,200);
    cheatSelectText.anchor.setTo(0.5);
   
    var skip_level_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE),
        skip_level_2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO),
        skip_level_3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);

    skip_level_1.onDown.add(function() {
        levelIndex = _.findIndex(game.levels, function(level) {
            return level.number == 1;
        });
        game.levels[levelIndex].icon_sprite.kill();
        game.levels[levelIndex].set_playable();
        this.loadLevels();
    }, this);

    skip_level_2.onDown.add(function() {
        levelIndex = _.findIndex(game.levels, function(level) {
            return level.number == 2;
        });

        game.levels[levelIndex].icon_sprite.kill();
        game.levels[levelIndex].set_playable();
        this.loadLevels();
    }, this);

    skip_level_3.onDown.add(function() {
        levelIndex = _.findIndex(game.levels, function(level) {
            return level.number == 3;
        });

        game.levels[levelIndex].icon_sprite.kill();
        game.levels[levelIndex].set_playable();
        this.loadLevels();
    }, this);

    this.loadLevels();

  },

  loadLevels: function() {
    if (!game.levels) {
        game.levels =  [];
        _.each(Array(3), function (a, index) {
            var level = new Level(index + 1);

            var x = 90 + ((index%4) * 300);
            var y = 340 + (Math.floor(index/4) * 150);

            var level_sprite = game.add.sprite(x, y, level.portal_name());
            level.set_icon_sprite(level_sprite, game);

            game.levels.push(level);
        });
    } else {
        _.each(game.levels, function (level, index) {

            var x = 90 + ((index%4) * 300);
            var y = 340 + (Math.floor(index/4) * 150);

            var level_sprite = game.add.sprite(x, y, level.portal_name());
            level.set_icon_sprite(level_sprite, game);
        });
    }
  }
}

