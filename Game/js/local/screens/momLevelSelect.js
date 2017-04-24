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
    headerBase = game.add.sprite(game.world.centerX, 50, 'headerBase');
    headerBase.fixedToCamera = true;
    headerBase.anchor.setTo(0.5);
    headerBase.cameraOffset.setTo(600, 50);
    header = game.add.text(game.world.centerX, 50, '-- LEVEL SELECT --', titleStyle);
    header.fixedToCamera = true;
    header.cameraOffset.setTo(600, 50);
    header.anchor.setTo(0.5);

    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {menuClick.play(); game.state.start("GameMenu");});

    attackSelectText = game.add.text(600, 525, "Select your skills!");
    attackSelectText.fixedToCamera = true;
    attackSelectText.cameraOffset.setTo(600,525);
    attackSelectText.anchor.setTo(0.5);
    game.sameAttackText = game.add.text(0,0,"");
    attackUp1 = game.add.sprite(540, 555, "attackUp");
    attackUp2 = game.add.sprite(600, 555, "attackUp");
    attackUp3 = game.add.sprite(660, 555, "attackUp");
    attackUp1.fixedToCamera = true;
    attackUp1.cameraOffset.setTo(540,555);
    attackUp1.anchor.setTo(0.5);
    attackUp2.fixedToCamera = true;
    attackUp2.cameraOffset.setTo(600,555);
    attackUp2.anchor.setTo(0.5);
    attackUp3.fixedToCamera = true;
    attackUp3.cameraOffset.setTo(660,555);
    attackUp3.anchor.setTo(0.5);

    attackDown1 = game.add.sprite(540, 625, "attackDown");
    attackDown2 = game.add.sprite(600, 625, "attackDown");
    attackDown3 = game.add.sprite(660, 625, "attackDown");
    attackDown1.fixedToCamera = true;
    attackDown1.cameraOffset.setTo(540,625);
    attackDown1.anchor.setTo(0.5);
    attackDown2.fixedToCamera = true;
    attackDown2.cameraOffset.setTo(600,625);
    attackDown2.anchor.setTo(0.5);
    attackDown3.fixedToCamera = true;
    attackDown3.cameraOffset.setTo(660,625);
    attackDown3.anchor.setTo(0.5);

    attackIcon1 = game.add.sprite(540, 590, "attackIcons");
    attackIcon1.cameraOffset.setTo(600,630);
    attackIcon1.anchor.setTo(0.5);
    attackIcon2 = game.add.sprite(600, 590, "attackIcons");
    attackIcon2.cameraOffset.setTo(600,630);
    attackIcon2.anchor.setTo(0.5);
    attackIcon3 = game.add.sprite(660, 590, "attackIcons");
    attackIcon3.cameraOffset.setTo(600,630);
    attackIcon3.anchor.setTo(0.5);
    attackIcon1.frame = 1; //set the default attacks
    attackIcon2.frame = 3;
    attackIcon3.frame = 5;
    attackIcon1.anchor.setTo(0.5);
    attackIcon2.anchor.setTo(0.5);
    attackIcon3.anchor.setTo(0.5);

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

    this.loadLevels();

  },

  loadLevels: function() {
    if (!game.levels) {
        game.levels =  [];
        _.each(Array(7), function (a, index) {
            var level = new Level(index + 1);

            var x = 90 + ((index%4) * 300);
            var y = 200 + (Math.floor(index/4) * 150);

            var level_sprite = game.add.sprite(x, y, level.portal_name());
            level.set_icon_sprite(level_sprite, game);

            game.levels.push(level);
        });
    } else {
        _.each(game.levels, function (level, index) {

            var x = 90 + ((index%4) * 300);
            var y = 200 + (Math.floor(index/4) * 150);

            var level_sprite = game.add.sprite(x, y, level.portal_name());
            level.set_icon_sprite(level_sprite, game);
        });
    }
  }
}

