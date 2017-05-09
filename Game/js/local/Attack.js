function Attack(attacker_name, uses, type) {
	//TODO: Uses should be unique to each attack.
	this.attacker_name = attacker_name;
	this.attack_type = type;
	this.uses = (attacker_name.includes("WIZARD")) ? Infinity : uses;
	// we assume it's unsuccesful
	this.success = false;
} 

Attack.prototype = Object.create(Phaser.Sprite.prototype);
Attack.prototype.constructor = Attack;

_.extend(Attack.prototype , {
	update: function () {
		
	},

	set_sprite: function(name) {
		if(!Attack.Types[name])
			name = "Default";
		Phaser.Sprite.call(this, game, 0, 0, name);
		this.type = Attack.Types[name];
		this.animations.add("launch");
		game.physics.arcade.enable(this);
		this.enableBody = true;
		Attack.Types[name].sprite = this;
		game.time.events.add(2000, this.kill, this);
		return this; //return the created sprite in case we need to do something with it later
	},

	launch: function(attacker, direction) {
		this.attacker = attacker;
		if(this.uses <= 0)
			return;
		this.uses--;
		this.position.y = attacker.position.y;
		this.direction = direction;
		game.add.existing(this);
		var atkTween;

		//creates two different types of projectives: the player's and everyone else's
		if (this.attacker_name === 'TZHARA') {
			game.playerProjectiles.add(this);

			if(direction === "left") {
				this.position.x = attacker.position.x - 15;
				atkTween = game.add.tween(this).to({x: attacker.position.x - 300});
			}
			else {
				this.position.x = attacker.position.x + 15;
				atkTween = game.add.tween(this).to({x: attacker.position.x + 300});
			}
		}
		else {
			game.wizardProjectiles.add(this);

			if(direction === "left") {
				this.position.x = attacker.position.x - 15;
				atkTween = game.add.tween(this).to({x: attacker.position.x - 400});
			}
			else if (direction === "up") {
				this.position.x = attacker.position.x - 20;
				this.position.y = attacker.position.y - 10;
				atkTween = game.add.tween(this).to({y: attacker.position.y - 400});
			}
			else {
				this.position.x = attacker.position.x + 15;
				atkTween = game.add.tween(this).to({x: attacker.position.x + 400 });
			}
		}
		this.visible = true;

		this.animations.play('launch', 16, true);
		atkTween.start().onComplete.addOnce(function() {
			this.kill();
			if (this.attacker_name === "TZHARA" && attacker.attack === this) {
				attacker.attack = null;
			}
			else {
				attacker.attack_obj = null;
			}
		}, this);
	},

	was_successful: function() {
		return success;
	},

	attack_init: function(){
	 	_.each(Attack.Types, function(attack, key) {
	 		game.load.spritesheet(key, attack.image, 16, 16);
	 		game.load.image(key + "_icon", attack.icon, 48, 48);
	 	});
	},
});

Attack.Types = {
	//Sprites cannot be created during preload beacuse the world doesn't exist yet, we populate that field when needed
	ElectricAttack: {
		image: "assets/Sprites/attacks/Electric Attack Prototype.png",
		icon: "assets/Sprites/attacks/zoltIcon.png",
		sprite: null,
		doesDamage: true,
		effect: null,
		type: "ELECTRIC"
	},
	Electromagnetism:{
		image: "assets/Sprites/attacks/Electromagnetism.png",
		icon: "assets/Sprites/attacks/electromagnetismIcon.png",
		/*Damage enemy and for 8 seconds, attacks within (x)px of target are directed to the target*/
		sprite: null,
		doesDamage: true,
		effect: function(target, attackObject) {
			if(target.name === "BOSS")
				return;
			var isWizard = attackObject.attacker_name.includes("WIZARD");
			var redirAttack;
			var targetX;
			var targetY;
			target.tint = 0x00ccff;
			if(!isWizard) { //We are hitting a wizard
				redirAttack = game.time.events.loop(20, redirectAttack, this); //check every 20msec for nearby projectiles
			}
			function redirectAttack() {
				if(target.isDead)
					return;
				game.wizardProjectiles.forEachAlive(function(attack) {
					if(Phaser.Point.distance(attack, target, true) <= 280 && game.tweens.isTweening(attack)) {
						if(attack.attacker != target) {
							var tweenIndex = _.findIndex(game.tweens.getAll(), ((t) => t.target == attack) );
							//console.log("redirecting attack");
							targetX = target.position.x;
							targetY = target.position.y;
							game.tweens.getAll()[tweenIndex] = game.add.tween(attack).to({x: targetX, y: targetY}, 400);
							game.tweens.getAll()[tweenIndex].start().onComplete.addOnce(function() {
							 	target.hitPoints--;
							 }, this, 1);
						}
					}
				}, this);
			}
			game.time.events.add(8000, function() {
				target.tint = 0xffffff;
				game.time.events.remove(redirAttack);
				//console.log("magentism effect over.")
			}, this);
		},
		type: "ELECTRIC"
	},
	Firefloom: {
		image: "assets/Sprites/attacks/Firefloom.png",
		icon: "assets/Sprites/attacks/firefloomIcon.png",
		sprite: null,
		doesDamage: false,
		effect: function(target) {
			target.canAttack = false;
			target.tint = 0x4f4e58;
			game.time.events.add(2500, function() {
				target.canAttack = true;
				target.tint = 0xffffff;
			}, this);
		},
		type: "FIRE"
	},
	Flare:{
		image: "assets/Sprites/attacks/Flare.png",
		icon: "assets/Sprites/attacks/flareIcon.png",
		sprite: null,
		doesDamage: true,
		effect: null,
		type: "FIRE"
	},
	MovementSpell: {
		image: "assets/Sprites/attacks/Movement Spell.png",
		icon: "assets/Sprites/attacks/movementIcon.png",
		sprite: null,
		doesDamage: false,
		effect: function(target, attackObject) {
			var tempCollision;
			var vector = [(Math.random() * 200) + 10, Math.random() <= 0.90 ? "RIGHT_WAY" : "WRONG"];
			//The second param no longer determines direction!
			if(target.key === "TZHARA") {
				target.movementSpell = true;
			}
			moveTarget(vector);
			
			function moveTarget(v) {
				//For a bonus, let this wizard take damage if it is flung into another one
				target.body.onCollide = new Phaser.Signal();
		
				var multiplier = (attackObject.direction === "left"?  -1 : 1);
				var accel = (attackObject.attacker_name.includes("WIZARD")? 90 : 60);

 				if(v[1] === "RIGHT_WAY" || attackObject.attacker_name.includes("WIZARD")) {
					target.body.velocity.x = multiplier * v[0];
					target.body.acceleration.x = multiplier * accel;
				}
				else {
					target.body.velocity.x = (multiplier * v[0]) - (v[0] * .1) ;
					target.body.acceleration.x =  multiplier * accel;
				}
				tempCollision = target.body.onCollide.add(function(sprite1, sprite2) {
					if(sprite2.key.includes("WIZARD"))
						injure(sprite1, sprite2);
				}, this);
				game.time.events.add(1600, endCollision, this);
			}
			function injure(t1, t2) {
				endCollision();
				t1.hitPoints--;
				t2.hitPoints--;
				hitSound.play();
			}
			function endCollision() {
				target.movementSpell = false;
				target.body.velocity.x = 0;
				target.body.acceleration.x = 0;
				if(target.body.onCollide) {
					 //This is null sometimes if the attack has been launched multiple times so we must double-check
					target.body.onCollide.remove(tempCollision.getListener(), this);
					target.body.onCollide = null;
					//onCollide triggers on any collision, ground included so for performance reasons set this back to null at the end
				}
				console.log("Gravity effect done");
			}
		},
		type: "GRAVITY"
	},
	ReverseDirection: {
		image: "assets/Sprites/attacks/Reverse Direction.png",
		icon: "assets/Sprites/attacks/reverseTrajectoryIcon.png",
		sprite: null,
		doesDamage: false,
		effect: function(target) {
			target.backwards = true;
			target.tint = 0xff0000;
			target.hitPoints++; 
			game.time.events.add(5000, function() {
				target.backwards = false;
				target.tint = 0xffffff;
			}, this);
		},
		type: "GRAVITY"
	},
	Default: {
		image: "assets/Sprites/attacks/Debug attack.png",
		icon: "assets/Sprites/attacks/flareIcon.png",
		sprite: null,
		doesDamage: true,
		effect: function (target, attackObject) {},
		type: "Err..."
	},
};
