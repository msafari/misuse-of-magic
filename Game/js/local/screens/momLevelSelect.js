var momLevelSelect = function () {};
var attackIcon1, attackIcon2, attackIcon3;

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

    attackSelectText = game.add.text(600, 110, "Select your skills!");
    attackSelectText.fixedToCamera = true;
    attackSelectText.cameraOffset.setTo(600,110);
    attackSelectText.anchor.setTo(0.5);
    cheatSelectText = game.add.text(600, 630, "Note: Press '2' or '3' to unlock later levels!");
    cheatSelectText.fixedToCamera = true;
    cheatSelectText.cameraOffset.setTo(600,630);
    cheatSelectText.anchor.setTo(0.5);
    game.sameAttackText = game.add.text(0,0,"");
    
    flareInfo = game.add.sprite(352, 225, "flareInfo");
    flareInfo.fixedToCamera = true;
    flareInfo.cameraOffset.setTo(352,225);
    flareInfo.visible = false;
    firefloomInfo = game.add.sprite(352, 225, "firefloomInfo");
    firefloomInfo.fixedToCamera = true;
    firefloomInfo.cameraOffset.setTo(352,225);
    firefloomInfo.visible = false;
    zoltInfo = game.add.sprite(352, 225, "zoltInfo");
    zoltInfo.fixedToCamera = true;
    zoltInfo.cameraOffset.setTo(352,225);
    zoltInfo.visible = false;
    electromagnetismInfo = game.add.sprite(352, 225, "electromagnetismInfo");
    electromagnetismInfo.fixedToCamera = true;
    electromagnetismInfo.cameraOffset.setTo(352,225);
    electromagnetismInfo.visible = false;
    vectorInfo = game.add.sprite(352, 225, "vectorInfo");
    vectorInfo.fixedToCamera = true;
    vectorInfo.cameraOffset.setTo(352,225);
    vectorInfo.visible = false;
    reverseTrajectoryInfo = game.add.sprite(352, 225, "reverseTrajectoryInfo");
    reverseTrajectoryInfo.fixedToCamera = true;
    reverseTrajectoryInfo.cameraOffset.setTo(352,225);
    reverseTrajectoryInfo.visible = false;

    attackInfoBoxes = ["default", flareInfo, firefloomInfo, zoltInfo, electromagnetismInfo, vectorInfo, reverseTrajectoryInfo];

    attackUp1 = game.add.sprite(540, 140, "attackUp");
    attackUp2 = game.add.sprite(600, 140, "attackUp");
    attackUp3 = game.add.sprite(660, 140, "attackUp");
    attackUp1.fixedToCamera = true;
    attackUp1.cameraOffset.setTo(540,140);
    attackUp1.anchor.setTo(0.5);
    attackUp2.fixedToCamera = true;
    attackUp2.cameraOffset.setTo(600,140);
    attackUp2.anchor.setTo(0.5);
    attackUp3.fixedToCamera = true;
    attackUp3.cameraOffset.setTo(660,140);
    attackUp3.anchor.setTo(0.5);

    attackDown1 = game.add.sprite(540, 210, "attackDown");
    attackDown2 = game.add.sprite(600, 210, "attackDown");
    attackDown3 = game.add.sprite(660, 210, "attackDown");
    attackDown1.fixedToCamera = true;
    attackDown1.cameraOffset.setTo(540,210);
    attackDown1.anchor.setTo(0.5);
    attackDown2.fixedToCamera = true;
    attackDown2.cameraOffset.setTo(600,210);
    attackDown2.anchor.setTo(0.5);
    attackDown3.fixedToCamera = true;
    attackDown3.cameraOffset.setTo(660,210);
    attackDown3.anchor.setTo(0.5);

    attackIcon1 = game.add.sprite(540, 175, "attackIcons");
    attackIcon1.cameraOffset.setTo(600,175);
    attackIcon1.anchor.setTo(0.5);
    attackIcon2 = game.add.sprite(600, 175, "attackIcons");
    attackIcon2.cameraOffset.setTo(600,175);
    attackIcon2.anchor.setTo(0.5);
    attackIcon3 = game.add.sprite(660, 175, "attackIcons");
    attackIcon3.cameraOffset.setTo(600,175);
    attackIcon1.frame = 1; //set the default attacks
    attackIcon2.frame = 3;
    attackIcon3.frame = 5;
    attackIcon1.anchor.setTo(0.5);
    attackIcon2.anchor.setTo(0.5);
    attackIcon3.anchor.setTo(0.5);

    attackIcon1.inputEnabled = true;
    attackIcon1.events.onInputOver.add(function() {
        attackInfoBoxes[attackIcon1.frame].visible = true;
    }, this);
    attackIcon1.events.onInputOut.add(function() {
        attackInfoBoxes[attackIcon1.frame].visible = false;
    }, this);

    attackIcon2.inputEnabled = true;
    attackIcon2.events.onInputOver.add(function() {
        attackInfoBoxes[attackIcon2.frame].visible = true;
    }, this);
    attackIcon2.events.onInputOut.add(function() {
        attackInfoBoxes[attackIcon2.frame].visible = false;
    }, this);

    attackIcon3.inputEnabled = true;
    attackIcon3.events.onInputOver.add(function() {
        attackInfoBoxes[attackIcon3.frame].visible = true;
    }, this);
    attackIcon3.events.onInputOut.add(function() {
        attackInfoBoxes[attackIcon3.frame].visible = false;
    }, this);




    attackUp1.inputEnabled = true;
    attackUp1.events.onInputUp.add(function() {
      if (attackIcon1.frame === 6) {
        attackIcon1.frame = 1;
      }
      else
        attackIcon1.frame = attackIcon1.frame + 1;
    });
    attackUp2.inputEnabled = true;
    attackUp2.events.onInputUp.add(function() {
      if (attackIcon2.frame === 6) {
        attackIcon2.frame = 1;
      }
      else
        attackIcon2.frame = attackIcon2.frame + 1;
    });
    attackUp3.inputEnabled = true;
    attackUp3.events.onInputUp.add(function() {
      if (attackIcon3.frame === 6) {
        attackIcon3.frame = 1;
      }
      else
        attackIcon3.frame = attackIcon3.frame + 1;
    });

    attackDown1.inputEnabled = true;
    attackDown1.events.onInputUp.add(function() {
      if (attackIcon1.frame === 1) {
        attackIcon1.frame = 6;
      }
      else
        attackIcon1.frame = attackIcon1.frame - 1;
    });
    attackDown2.inputEnabled = true;
    attackDown2.events.onInputUp.add(function() {
      if (attackIcon2.frame === 1) {
        attackIcon2.frame = 6;
      }
      else
        attackIcon2.frame = attackIcon2.frame - 1;
    });
    attackDown3.inputEnabled = true;
    attackDown3.events.onInputUp.add(function() {
      if (attackIcon1.frame === 1) {
        attackIcon3.frame = 6;
      }
      else
        attackIcon3.frame = attackIcon3.frame - 1;
    });

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
        _.each(Array(7), function (a, index) {
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

