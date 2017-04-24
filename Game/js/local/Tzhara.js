function Tzhara (x, y) {
  Phaser.Sprite.call(this, game, x, y, "TZHARA");

  //set physics properties
  game.physics.arcade.enable(this);
  this.enableBody = true;
  this.body.collideWorldBounds = true;
  this.body.allowGravity = true;
  this.body.bounce.y = 0.4;
  this.body.gravity.y = 15000;

  this.attack = null;
  this.health = 5;
  this.DAMAGED_L = false,
  this.DAMAGED_R = false,
  this.invincible = false;

  // set anchor point for player
  this.anchor.setTo(0.5, 0.5);

  this.load_animations();
  this.set_input_controls();

  game.player = this;
  game.add.existing(this);
  game.camera.follow(this); 
}

Tzhara.prototype = Object.create(Phaser.Sprite.prototype);
Tzhara.prototype.constructor = Tzhara;

_.extend(Tzhara.prototype, {
  update: function() {

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (game.is_paused == false) {
      //this contact needs to be here in case the game is paused, otherwise the user could still lose health!
      game.physics.arcade.overlap(this, game.wizards, this.damage, null, this);

      if (this.DAMAGED_R) {
        this.animations.play("DAMAGE_R",15, false, false);
      }
      else if (this.DAMAGED_L) {
        this.animations.play("DAMAGE_L", 15, false, false);
      }
      else if (this.health == 0) {
        this.animations.play("DEATH", 10, false, true);
      }
      else if(game.inputs.cursors.left.isDown && !game.inputs.cursors.up.isDown) {
        this.body.velocity.x = -200; 
        this.animations.play("WALK_L");
      }

      else if (game.inputs.cursors.right.isDown && !game.inputs.cursors.up.isDown) {
        this.body.velocity.x = 200;
        this.animations.play("WALK_R");
      }

      else if (game.inputs.cursors.up.isDown && game.inputs.cursors.right.isDown) {
        this.body.velocity.y = -550
        this.body.velocity.x = 200;
        this.animations.play("JUMP_R");
      }

      else if (game.inputs.cursors.up.isDown && game.inputs.cursors.left.isDown) {
        this.body.velocity.y = -550;
        this.body.velocity.x = -200;
        this.animations.play("JUMP_L");
      }

      else if (game.inputs.cursors.up.isDown) {
        this.body.velocity.y = -550;
      }

      else {
        this.animations.play("IDLE");
      }

    }
    else {
      this.animations.stop();
    }
  },


  load_animations: function() {
    var states = ["IDLE", "SPELL_L", "SPELL_R", "DEATH", "DAMAGE_L", "DAMAGE_R", "JUMP_L", "JUMP_R", "WALK_L", "WALK_R"],
        player = this;
    _.each(states, function (state, i) {
        var frameIndexes = _.range(i*6, i*6 + 6);
        player.animations.add(state, frameIndexes, 10, true);
    });
    _.extend(this, player);
  },

  set_input_controls: function () {
    var player_controls = {
      cursors: game.input.keyboard.createCursorKeys(),
      attack_Z : game.input.keyboard.addKey(Phaser.Keyboard.Z),
      attack_C : game.input.keyboard.addKey(Phaser.Keyboard.C),
      attack_X : game.input.keyboard.addKey(Phaser.Keyboard.X)
    };

    player_controls.cursors.up.onDown.add(function() {
      game.sound_effects.jumpSound.play();
    });


    player_controls.attack_Z.onDown.add(function() { 
      if(!this.attack)
        this.attack = new Attack('Tzhara', Infinity, "FIRE");
      if(!game.is_restoring) {
        if (player_controls.cursors.left.isDown) {
            this.animations.play('SPELL_L'); 
            this.fireAttack("left");
        }
        else if (player_controls.cursors.right.isDown) {
            this.animations.play('SPELL_R');
            this.fireAttack("right");
        }
      }
    }, this);
    
    player_controls.attack_X.onDown.add(function() { 
      if(!this.attack)
        this.attack = new Attack('Tzhara', Infinity, "GRAVITY");
      if(!game.is_restoring) {
        if (player_controls.cursors.left.isDown) {
            this.animations.play('SPELL_L'); 
            this.fireAttack("left");
        }
        else if (player_controls.cursors.right.isDown) {
            this.animations.play('SPELL_R');
            this.fireAttack("right");
        }
      }
    }, this);

    player_controls.attack_C.onDown.add(function() { 
      if(!this.attack)
        this.attack = new Attack('Tzhara', Infinity, "ELECTRIC");

      if(!game.is_restoring) {
        if (player_controls.cursors.left.isDown) {
            this.animations.play('SPELL_L'); 
            this.fireAttack("left");
        }
        else if (player_controls.cursors.right.isDown) {
            this.animations.play('SPELL_R');
            this.fireAttack("right");
        }
      }
    }, this);

    game.inputs = _.extend(game.inputs, player_controls);
  },


  fireAttack: function(direction) {
    var attackSet = ["Default", "Flare", "Firefloom", "ElectricAttack", "Electromagnetism", "MovementSpell", "ReverseDirection"];
    attackSounds = game.sound_effects.attack_sounds;

    if(game.time.elapsedSince(game.inputs.attack_Z.timeDown) <= 200 || game.inputs.attack_Z.isDown) { // Last 200ms (is this enough? too much?)
      this.attack.set_sprite(attackSet[f_attackIcon1]);
      attackSounds[f_attackIcon1].play();
    }
    else if(game.time.elapsedSince(game.inputs.attack_X.timeDown) <= 200 || game.inputs.attack_X.isDown) {
      this.attack.set_sprite(attackSet[f_attackIcon2]);
      attackSounds[f_attackIcon2].play();
    }
    else if(game.time.elapsedSince(game.inputs.attack_C.timeDown) <= 200 || game.inputs.attack_C.isDown) {
      this.attack.set_sprite(attackSet[f_attackIcon3]);
      attackSounds[f_attackIcon3].play();
    }
    else {
      this.attack.set_sprite("default");
    }
    this.attack.launch(this, direction); 
  },

  damage: function(player, attackObject) {

    if (this.invincible != true && this.health >= 1 && attackObject.attacker_name !== "TZHARA") {
      this.animations.stop();
      if (this.health > 1)
        game.sound_effects.damagedSound.play();
      else {
        game.sound.stopAll();
        game.sound_effects.damagedSound.play();
      }
      if (this.body.touching.left) {
        this.DAMAGED_L = true;
      }
      else if (this.body.touching.right) {
        this.DAMAGED_R = true;
      } else {
        this.DAMAGED_R = true;
      }
      this.tint = 0x0078ff;
      this.invincible = true;
      this.health--;
      game.hearts.children[this.health].frame = 1;
      game.time.events.repeat(Phaser.Timer.SECOND * 2, 1, _invinFrameOver, this);
      game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 1, _stopDamage, this);
      if (this.health != 0) {
        game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 20, _changeTint, this);
      }
    }

    function _invinFrameOver() {
        this.invincible = false;
        this.tint = 0xffffff;
    }

    function _stopDamage() {
      this.DAMAGED_L = false;
      this.DAMAGED_R = false;
    }

    function _changeTint() {
      if (this.tint === 16777215)
        this.tint = 0x83ccf9;
      else
        this.tint = 0xffffff;
    }
  },
});

