var gameMenu = function() {};

gameMenu.prototype = {
  preload: function () {
  },

  create: function () {
      game.add.sprite(0, 0, 'background');
      titleStyle = { font: 'bold 25pt', fill: '#673ab7', align: 'center'};
      menuStyle = { font: 'bold 20pt', fill: '#FF0000'};
      header = game.add.text(game.world.centerX, 50, '-- MISUSE OF MAGIC --', titleStyle);
      header.anchor.setTo(0.5);
      menuPlay = game.add.text(game.world.centerX * 1.5, 300, 'Play', menuStyle);
      menuPlay.inputEnabled = true;
      menuPlay.events.onInputUp.add(function() {game.state.start("MomGame");
      });
      menuOptions = game.add.text(game.world.centerX * 1.5, 350, 'Controls', menuStyle);
      menuOptions.inputEnabled = true;
      menuOptions.events.onInputUp.add(function() {game.state.start("Controls");
      });
      menuHelp = game.add.text(game.world.centerX * 1.5, 400, 'Help', menuStyle);
      menuHelp.inputEnabled = true;
      menuHelp.events.onInputUp.add(function() {game.state.start("Help");
      });
    
      funkylogo = game.add.sprite(game.world.centerX * 0.5, 300, 'coollogo');
      
  },

  changeState: function (state) {
      game.state.start(state);
  }
};