function Enemy (type, x, y) {
  this.type = type;
  this.name = type + "_wizard";
  this.x = x;
  this.y = y;
  this.isDead = false;
  this.sprite = this.init_sprite();
  game.wizards.push(this);
}

Enemy.prototype = {
  destroy : function () {
    this.isDead = true;
    this.sprite.kill();
    _.remove(game.wizards, function(wizard) {
      if (wizard.sprite == this.sprite) {
        return true;
      }
    }, this);
  },

  init_sprite: function () {
    var sprite = game.add.sprite(this.x, this.y, this.name);

    // set physics properties
    game.physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;
    sprite.body.allowGravity = true;
    sprite.body.bounce.y = 0.4;
    sprite.body.gravity.y = 10000;

    var states = ["WALK_L", "WALK_R", "DEAD_L","DEAD_R", "DAMAGED_L", "DAMAGED_R", "ATTACK_L", "ATTACK_R"];
    _.each(states, function(state, index) {
      var frameIndexes = _.range(index * 9, index * 9 + 9);
      player.animations.add(state, frameIndexes, 15, true);
    });
    return sprite;
  },

  attack_player: function () {
    //attack randomly in left or right direction
    var is_left = Math.random() < 0.5 ? true : false;
    this.sprite.velocity.x = 0;

    if (is_left) {
      this.sprite.animations.play(ATTACK_L);
    } else {
      this.sprite.animations.play(ATTACK_R);
    }
  },

  random_move_x: function () {
    var rand = (Math.random() * 100) + 1;
    var is_left = Math.random() < 0.5 ? true : false;

    if (is_left) {
      this.sprite.body.velocity.x = rand * -1;
      this.sprite.animations.play("WALK_L");
    } else {
      this.sprite.body.velocity.x = rand;
      this.sprite.animations.play("WALK_R");
    }
  }

};