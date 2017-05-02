function Wizard (type, x, y) {
  this.attack_type = type;
  this.name = type + "_WIZARD";
  Phaser.Sprite.call(this, game, x, y, this.name);
  this.x = x;
  this.y = y;
  this.wizard_timer = 0;
  this.isDead = false;
  this.canAttack = true;
  this.backwards = false;
  this.init_sprite();
  this.hitPoints = 2;
  this.attack_obj = null;
  game.wizards.add(this);
  game.wizard_list.push(this);
}

Wizard.prototype = Object.create(Phaser.Sprite.prototype);
Wizard.prototype.constructor = Wizard;

_.extend(Wizard.prototype, {
  update : function () {

    if (game.is_paused == false) {
      game.physics.arcade.collide(this, game.playerProjectiles, this.damage, null, this);
      game.physics.arcade.collide(game.wizards, this);

      if(this.hitPoints <= 0)
        this.killed.dispatch(); 

      if (this.wizard_timer <= 125) {
        this.wizard_timer++;
      }
      else {
        this.pick_random_act();
        this.wizard_timer = 0;
      }
    }

  },

  destroy_wizard : function () {
    this.isDead = true;
    _.remove(game.wizards_list, function(wizard) {
      if (wizard === this) {
        return true;
      }
    }, this);
    this.kill();
  },

  init_sprite: function () {
    var sprite = this;

    // set physics properties
    game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.collideWorldBounds = true;
    this.body.allowGravity = true;
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 500;
    this.anchor.setTo(0.5, 0.5);

    var states = ["ATTACK_L", "ATTACK_R", "DAMAGE_L","DAMAGE_R", "DEAD_L", "DEAD_R", "WALK_L", "WALK_R", "ATTACK_UPL", "ATTACK_UPR"];
    _.each(states, function(state, index) {
      var frameIndexes = _.range(index * 9, index * 9 + 9);
      sprite.animations.add(state, frameIndexes, 15, true);
    });
	
    this.killed = new Phaser.Signal();
    this.killed.add(function (wizard) {
      anim = (this.animations.currentAnim.name.includes("_L")? 'DEAD_L' : 'DEAD_R');
      this.animations.play(anim, 8);

      this.animations.currentAnim.onLoop.add(function() { 
        //console.log(wizard);
        if (!wizard)
            wizard = this;
        if (wizard.length) { //Check if this is an array (If we ever need to kill multiple wizards)
          var wizards = _.intersection(game.wizard_list, wizard);
		      _.each(wizards, function(wiz) {
			     wiz.destroy_wizard();
		      });	
        }
        else {
          wizards = game.wizard_list;
          _.each(wizards, function (wiz) {
			       if (wiz === wizard) {
				      wiz.destroy_wizard();
			       }
		      });
		    }
      }, this); 
    }, this);

    //this.isHighLevel = game.current_level.number > 1; //TODO: Figure out what to do with "stronger" wizards

    _.extend(this, sprite);
    game.add.existing(this);
  },

  attack_player: function () {
    //attack randomly in left or right direction
    if(!this.canAttack)
      return;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    var attack_left = (game.player.position.x - this.x < 0) ? true : false;
    var attack_up = (Math.abs(game.player.position.x - this.x) < 200 && this.y - game.player.position.y > 150 && this.y - game.player.position.y < 400) ? true : false
    if (attack_left) {
      if (attack_up) {
        this.animations.play("ATTACK_UPL")
      }
      else {
        this.animations.play("ATTACK_L");
      }
    } else {
      if (attack_up) {
        this.animations.play("ATTACK_UPR")
      }
      else {
        this.animations.play("ATTACK_R");
      }
    }

    //launch attack sprite
    this.attack_obj = new Attack(this.name, Infinity, this.attack_type);
    this.attack_obj.set_sprite(this.get_attack_ID());

    var attack_dir = attack_left ? "left" : "right";
    if (attack_up) {
      attack_dir = "up";
    }
    if (this.backwards) {
      var attack_dir = attack_left ? "right" : "left";
    }
    //var result = this.attack_obj.launch(this, attack_dir).then(this.doBonus);
    //console.log(result); 
    this.attack_obj.launch(this, attack_dir);
  },

  random_move_x: function () {
    var rand = (this.hitPoints >= 2)? (Math.random() * 100) + 1 : (Math.random() * 60) + 1;
    var is_left = Math.random() < 0.5 ? true : false;

    if (is_left) {
      this.body.velocity.x = rand * -1;
      this.animations.play("WALK_L");
    } else {
      this.body.velocity.x = rand;
      this.animations.play("WALK_R");
    }
  },

  pick_random_act: function () {
    if (this.hitPoints >= 2) {
      var is_moving = Math.random() < 0.5 ? true : false;
      if (is_moving)
        this.random_move_x();
      else
        this.attack_player();

    }
    else if (this.hitPoints == 1) {
      this.random_move_x();
    }
  },

  get_attack_ID: function() {
    if (this.attack_type === "FIRE") 
      return "Flare";
    else if (this.attack_type === "ELECTRIC")
      return "ElectricAttack";
    else if (this.attack_type === "GRAVITY")
      return "MovementSpell";
  },

  damage: function(wizard, attackObject) {
    var impact = attackObject.type.effect;
    attackObject.kill();
    wizard.animations.stop();
    if(attackObject.attacker_name === "TZHARA") {
      hitSound.play();
      var prev = wizard.hitPoints;
      if(attackObject.type.doesDamage)
        wizard.hitPoints--;
      w_damage_anim = (attackObject.direction === "left") ? "DAMAGE_R" : "DAMAGE_L";
      wizard.animations.play(w_damage_anim, 8);
      console.log("losing wizard health (prev: " + prev + " -> " + wizard.hitPoints + ")");
      if(impact != null) {
        impact(wizard, attackObject);
      }
    }
    if (wizard.hitPoints <= 0) {
      this.killed.dispatch(wizard);
      //damageLoop.timer.stop(true);//Yeeaah... that gives a reference to the main game timer. Stopping that stops everything. Don't do that.
    }
  },

  doBonus: function(wiz) {
    //var shouldAttack = Math.random() < 0.5 ? true : false;
    var shouldAttack = true;
    if(wiz.isHighLevel && !wiz.hasAttacked && shouldAttack) {
      game.time.events.add(200, function() {
        wiz.attack_player();
        wiz.hasAttacked = true;
      }, wiz);
      game.time.events.add(8000, function() {
        wiz.hasAttacked = false;
      }, wiz);
    }
  },

});