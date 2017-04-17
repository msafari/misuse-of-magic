var game = new Phaser.Game(1200, 750, Phaser.AUTO, 'game'), startUp = function () {};

startUp.prototype = {

  preload: function () {
    game.load.image('background', 'assets/images/background1.png');
    game.load.image('coollogo', 'assets/images/logo.png');
    game.load.image('loadingbar', "assets/images/loadingbar2.png")
    game.load.script('splash',  'js/local/screens/splash.js');
    
  },

  create: function () {
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    //game is still too tall though. :(
    game.state.add('Splash', splash);
    game.state.start('Splash');
  }

};

game.state.add('StartUp', startUp);
game.state.start('StartUp');