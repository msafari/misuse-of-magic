var game = new Phaser.Game(1200, 750, Phaser.AUTO, 'game'), startUp = function () {};

startUp.prototype = {

  preload: function () {
    game.load.image('background', 'Benchmark3/assets/images/background1.png');
    game.load.image('coollogo', 'Benchmark3/assets/images/logo.png');
    game.load.image('loadingbar', "Benchmark3/assets/images/loadingbar2.png")
    game.load.script('splash',  'Benchmark3/js/local/screens/splash.js');
    
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