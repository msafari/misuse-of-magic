var momLevelSelect = function () {};

momLevelSelect.prototype = {
  preload: function () {
  },

  create: function () { 
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
    headerBase.anchor.setTo(0.5);
    header = game.add.text(game.world.centerX, 50, '-- LEVEL SELECT --', titleStyle);
    header.anchor.setTo(0.5);

    this.loadLevels();

    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {game.state.start("GameMenu")});
  },

  loadLevels: function() {
    _.each(Array(7), function (a, index) {
        var level = new Level(index + 1);

        var x = 90 + ((index%4) * 300);
        var y = 200 + (Math.floor(index/4) * 150);

        var level_sprite = game.add.sprite(x, y, level.portal_name());
        level.set_icon_sprite(level_sprite, game);
    });
  }
}

