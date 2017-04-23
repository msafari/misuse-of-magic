function Tzhara (x, y) {
  Phaser.Sprite.call(this, game, x, y, "TZHARA");
  this.game.physics.arcade.enable(this.player);
  this.body.collideWorldBounds = true;
  this.body.allowGravity = true;
  this.body.bounce.y = 0.4;
  this.body.gravity.y = 15000;

  // set anchor point for player
  this.anchor.setTo(0.5, 0.5);
  this.loadTzhara(this.player);
  game.player = this;
  game.camera.follow(this); 
}

Tzhara.prototype = Object.create(Phaser.Sprite.prototype);
Tzhara.prototype.constructor = Tzhara;

_.extend(Tzhara.prototype, {
  update: function() {
        game.physics.arcade.collide(this.player, game.wizardProjectiles, this.damage, null);
  },

  loadTzhara: function(player) {
    var states = ["IDLE", "SPELL_L", "SPELL_R", "DEATH", "DAMAGE_L", "DAMAGE_R", "JUMP_L", "JUMP_R", "WALK_L", "WALK_R"];
    _.each(states, function (state, i) {
        var frameIndexes = _.range(i*6, i*6 + 6);
        this.animations.add(state, frameIndexes, 10, true);
    });
  },

  damage: function(player, attackObject) {
    //Make sure Tzhara does cannot take damage from her own attacks. This only looks at the first sprite that collided which 
    //may be a problem later if many attacks are going back and forth.
    if(attackObject.attacker_name === "Tzhara") {
      console.log("Stop hitting yourself! (remove attack sprite from projectile group)");
      //game.time.events.add(2000, restoreAttackCollision, attackObject); //wait 2 seconds
      return;
    }
    else {
      console.log("Tzhara was attacked");
      damagedSound.play();
    }
  },
});

