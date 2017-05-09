function Boss (x, y) {
  this.name = "BOSS";
  Phaser.Sprite.call(this, game, x, y, "TZHARA");
  this.x = x;
  this.y = y;
  this.boss_timer = 0;
  this.isDead = false;
  this.canAttack = true;
  this.backwards = false;
  this.init_sprite();
  this.hitPoints = 6;
  this.attack_obj = null;
  game.bosses.add(this);
  game.boss_list.push(this);
}

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

_.extend(Boss.prototype, {
  update : function () {

    if (game.is_paused == false) {
      game.physics.arcade.collide(this, game.playerProjectiles, this.damage, null, this);
      game.physics.arcade.collide(game.bosses, this);

      if(this.hitPoints <= 0)
        this.killed.dispatch(); 

      if (this.boss_timer <= 90) {
        this.boss_timer++;
      }
      else {
        this.pick_random_act();
        this.boss_timer = 0;
      }
    }

  },

  destroy_boss: function () {
    this.isDead = true;
    _.remove(game.boss_list, function(boss) {
      if (boss === this) {
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

    var states = ["IDLE", "SPELL_L", "SPELL_R", "DEATH", "DAMAGE_L", "DAMAGE_R", 
                  "JUMP_L", "JUMP_R", "WALK_L", "WALK_R", "IDLE_L", "IDLE_R"];
    _.each(states, function (state, i) {
        var frameIndexes = _.range(i*6, i*6 + 6);
        sprite.animations.add(state, frameIndexes, 10, true);
    });
	this.tint = 0x0000ff;
    this.killed = new Phaser.Signal();
    this.killed.add(function (boss) {
      this.animations.play("DEATH", 8);

      this.animations.currentAnim.onLoop.add(function() { 
        if (!boss)
            boss = this;
        if (boss.length) { //Check if this is an array (If we ever need to kill multiple wizards)
          var bosses = _.intersection(game.boss_list, boss);
		      _.each(bosses, function(theBoss) {
			     theBoss.destroy_boss();
		      });	
        }
        else {
          bosses = game.boss_list;
          _.each(bosses, function (theBoss) {
			       if (theBoss === boss) {
				      theBoss.destroy_boss();
			       }
		      });
		    }
      }, this); 
    }, this);

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
        this.animations.play("SPELL_L")
      }
      else {
        this.animations.play("SPELL_L");
      }
    } else {
      if (attack_up) {
        this.animations.play("SPELL_R")
      }
      else {
        this.animations.play("SPELL_R");
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

  damage: function(boss, attackObject) {
    var impact = attackObject.type.effect;
    attackObject.kill();
    boss.animations.stop();
    if(attackObject.attacker_name === "TZHARA") {
      hitSound.play();
      var prev = boss.hitPoints;
      if(attackObject.type.doesDamage)
        boss.hitPoints--;
      w_damage_anim = (attackObject.direction === "left") ? "DAMAGE_R" : "DAMAGE_L";
      boss.animations.play(w_damage_anim, 8);
      console.log("losing BOSS health (prev: " + prev + " -> " + boss.hitPoints + ")");
      if(impact != null) {
        impact(boss, attackObject);
      }
    }
    if (boss.hitPoints <= 0) {
      this.killed.dispatch(boss);
      //damageLoop.timer.stop(true);//Yeeaah... that gives a reference to the main game timer. Stopping that stops everything. Don't do that.
    }
  },

  doBonus: function(theBoss) {
    //var shouldAttack = Math.random() < 0.5 ? true : false;
    var shouldAttack = true;
    if(theBoss.isHighLevel && !theBoss.hasAttacked && shouldAttack) {
      game.time.events.add(200, function() {
        theBoss.attack_player();
        theBoss.hasAttacked = true;
      }, theBoss);
      game.time.events.add(8000, function() {
        theBoss.hasAttacked = false;
      }, theBoss);
    }
  },

});