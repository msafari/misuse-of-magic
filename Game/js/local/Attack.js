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
				atkTween = game.add.tween(this).to({x: attacker.position.x - 250});
			}
			else {
				this.position.x = attacker.position.x + 15;
				atkTween = game.add.tween(this).to({x: attacker.position.x + 250});
			}
		}
		else {
			game.wizardProjectiles.add(this);

			if(direction === "left") {
				this.position.x = attacker.position.x - 15;
				atkTween = game.add.tween(this).to({x: attacker.position.x - 450});
			}
			else {
				this.position.x = attacker.position.x + 15;
				atkTween = game.add.tween(this).to({x: attacker.position.x + 450 });
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
		effect: null,
		type: "ELECTRIC"
	},
	Electromagnetism:{
		image: "assets/Sprites/attacks/Electromagnetism.png",
		icon: "assets/Sprites/attacks/electromagnetismIcon.png",
		sprite: null,
		effect: null,
		type: "ELECTRIC"
	},
	Firefloom: {
		image: "assets/Sprites/attacks/Firefloom.png",
		icon: "assets/Sprites/attacks/firefloomIcon.png",
		sprite: null,
		effect: function(target) {
			//console.warn("We used firefloom!");
			target.canAttack = false;
			target.tint = 0x4f4e58;
			target.hitPoints++; //firefloom should not cause damage so undo the decrease from spell collision
			game.time.events.add(2500, function() {
				//console.log("Firefloom effect ended.");
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
		effect: null,
		type: "FIRE"
	},
	MovementSpell: {
		image: "assets/Sprites/attacks/Movement Spell.png",
		icon: "assets/Sprites/attacks/movementIcon.png",
		sprite: null,
		effect: function(target, attackObject) {
			target.hitPoints++;
			var vector = [(Math.random() * 200) + 10, Math.random() <= 0.85 ? "RIGHT_WAY" : "WRONG"];
			moveTarget(vector);
			
			function moveTarget(v) {
				//For a bonus, let this wizard take damage if it is flung into another one
				target.body.onCollide = new Phaser.Signal();
				var tempCollision = target.body.onCollide.add(function(sprite1, sprite2) {
					if(sprite2.key.includes("WIZARD"))
						injure(sprite1, sprite2);
				}, this);
				
				console.log(attackObject.direction);

				var multiplier = (attackObject.direction === "left"?  -1 : 1); 
				if(v[1] === "RIGHT_WAY" || attackObject.attacker_name.includes("WIZARD")) {
					console.log("Pushing the right way (hopefully) " + multiplier + ", " + v[0]);
					target.body.velocity.x = multiplier * v[0]; //Should be opposite to player
					target.body.acceleration.x = -40;
				}
				else {
					console.log("Going the other way " + multiplier + ", " + v[0]);
					target.body.velocity.x = -1 * multiplier * v[0];
					target.body.acceleration.x = 40;
				}
				game.time.events.add(1800, function() {
					target.body.velocity.x = 0;
					target.body.acceleration.x = 0;
					target.body.onCollide.remove(tempCollision.getListener(), this);
					target.body.onCollide = null;
					//onCollide triggers on every collision, ground included so for performance reasons set this back to null at the end
					console.log("Gravity effect done");
				}, this);
			}
			function injure(t1, t2) {
				t1.hitPoints--;
				t2.hitPoints--;
				hitSound.play();
				console.log("We hit another wizard!");
			}
		},
		type: "GRAVITY"
	},
	ReverseDirection: {
		image: "assets/Sprites/attacks/Reverse Direction.png",
		icon: "assets/Sprites/attacks/reverseTrajectoryIcon.png",
		sprite: null,
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
		effect: null,
		type: "Err..."
	},
};
