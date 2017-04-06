var momGame = function () {};

momGame.prototype = {
  preload: function () {
  },

  create: function () { 
      console.log("hello");
      game.add.sprite(0, 0, 'background');
      placeholder = game.add.text(game.world.centerX, game.world.centerY, 'a cool game will go here');
  }
}

