function Wizard (type, x, y) {
  this.type = type;
  this.name = type + "_WIZARD";
  this.x = x;
  this.y = y;
  this.isDead = false;
  this.sprite = this.init_sprite();
  this.sprite.hitPoints = 2;
  game.wizards.add(this.sprite);
  game.wizard_list.push(this);
}

Wizard.prototype = {
  destroy : function () {
    this.isDead = true;
    _.remove(game.wizards_list, function(wizard) {
      if (wizard.sprite === this.sprite) {
        return true;
      }
    }, this);
    this.sprite.kill();
  },

  init_sprite: function () {
    var sprite = game.add.sprite(this.x, this.y, this.name);

    // set physics properties
    game.physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;
    sprite.body.allowGravity = true;
    sprite.body.bounce.y = 0.2;
    sprite.body.gravity.y = 500;
    sprite.anchor.setTo(0.5, 0.5);

    var states = ["ATTACK_L", "ATTACK_R", "DAMAGE_L","DAMAGE_R", "DEAD_L", "DEAD_R", "WALK_L", "WALK_R"];
    _.each(states, function(state, index) {
      var frameIndexes = _.range(index * 9, index * 9 + 9);
      sprite.animations.add(state, frameIndexes, 15, true);
    });
    return sprite;
  },

  attack_player: function () {
    //attack randomly in left or right direction
    this.sprite.body.velocity.x = 0;
    var attack_left = (game.player.x - this.x < 0) ? true : false;
    if (attack_left) {
      this.sprite.animations.play("ATTACK_L");
    } else {
      this.sprite.animations.play("ATTACK_R");
    }

    if (this.type === "FIRE") {

    } else if (this.type === "ELECTRIC") {

    } else if (this.type === "GRAVITY") {

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
  },

  pick_random_act: function () {
    var is_moving = Math.random() < 0.5 ? true : false;
    // if (is_moving)
    //   this.random_move_x();
    // else
      this.attack_player();
  }
};