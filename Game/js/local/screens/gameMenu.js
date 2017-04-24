var gameMenu = function() {};
var menuTheme;

gameMenu.prototype = {
  preload: function () {
  },

  create: function () {
      if (menuTheme === undefined) {
        menuTheme = game.add.audio("menuTheme");
        menuTheme.onStop.add(function() {menuTheme.mute = true;});
        menuTheme.loop = true;
        menuTheme.volume -= .4;
        menuTheme.play();
      }
      
      //required to get the theme to play after a restart
      if (menuTheme.mute === true) {
        menuTheme.mute = false;
        menuTheme.loop = true;
        menuTheme.play();
      } 
      
      menuClick = game.add.audio("menuClick");
      
      game.add.sprite(0, 0, 'background');
      titleStyle = { 
        font: 'bold 25pt', 
        fill: '#673ab7', 
        align: 'center'
      };

      menuStyle = { 
        font: 'bold 40pt', 
        fill: '#FFFFFF'
      };

      headerBase = game.add.sprite(game.camera.width / 2, 50, 'headerBase');
      //buttonBase = game.add.sprite(game.world.centerX * 1.45, 280, 'buttonBase');
      headerBase.anchor.setTo(0.5);
      header = game.add.text(game.camera.width / 2, 50, '-- MISUSE OF MAGIC --', titleStyle);
      header.anchor.setTo(0.5);

      menuPlay = game.add.text((game.camera.width / 2) * 1.3, 400, 'Play', menuStyle);
      menuPlay.inputEnabled = true;
      menuPlay.events.onInputUp.add(function() {game.state.start("MomLevelSelect"); menuClick.play();
      });
      menuOptions = game.add.text((game.camera.width / 2) * 1.3, 500, 'Controls', menuStyle);
      menuOptions.inputEnabled = true;
      menuOptions.events.onInputUp.add(function() {game.state.start("Controls"); menuClick.play();
      });
      menuHelp = game.add.text((game.camera.width / 2) * 1.3, 600, 'Help', menuStyle);
      menuHelp.inputEnabled = true;
      menuHelp.events.onInputUp.add(function() {game.state.start("Help"); menuClick.play();
      });
    
      funkylogo = game.add.sprite((game.camera.width / 2) * 0.25, 200, 'coollogo');
      
  },

  changeState: function (state) {
    game.state.start(state);
  }
};