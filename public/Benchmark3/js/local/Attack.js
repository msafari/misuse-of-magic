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
		this.animations.add("launch");
		game.physics.arcade.enable(this);
		this.enableBody = true;
		Attack.Types[name].sprite = this;
		game.time.events.add(2000, this.kill, this);
		return this; //return the created sprite in case we need to do something with it later
	},

	launch: function(attacker, direction) {
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
				atkTween = game.add.tween(this).to({x: game.player.position.x - 250 });
			}
			else {
				this.position.x = attacker.position.x + 15;
				atkTween = game.add.tween(this).to({x: game.player.position.x });
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

//It's time to move this bit elsewhere. And the name 'images' no longer applies
Attack.Types = {
	//Sprites cannot be created during preload beacuse the world doesn't exist yet, we populate that field when needed
	ElectricAttack: {
		image: "Benchmark3/assets/Sprites/attacks/Electric Attack Prototype.png",
		icon: "Benchmark3/assets/Sprites/attacks/zoltIcon.png",
		sprite: null,
		type: "ELECTRIC"
	},
	Electromagnetism:{
		image: "Benchmark3/assets/Sprites/attacks/Electromagnetism.png",
		icon: "Benchmark3/assets/Sprites/attacks/electromagnetismIcon.png",
		sprite: null,
		type: "GRAVITY"
	},
	Firefloom: {
		image: "Benchmark3/assets/Sprites/attacks/Firefloom.png",
		icon: "Benchmark3/assets/Sprites/attacks/firefloomIcon.png",
		sprite: null,
		type: "FIRE"
	},
	Flare:{
		image: "Benchmark3/assets/Sprites/attacks/Flare.png",
		icon: "Benchmark3/assets/Sprites/attacks/flareIcon.png",
		sprite: null,
		type: "FIRE"
	},
	MovementSpell: {
		image: "Benchmark3/assets/Sprites/attacks/Movement Spell.png",
		icon: "Benchmark3/assets/Sprites/attacks/movementIcon.png",
		sprite: null,
		type: "GRAVITY"
	},
	ReverseDirection: {
		image: "Benchmark3/assets/Sprites/attacks/Reverse Direction.png",
		icon: "Benchmark3/assets/Sprites/attacks/reverseTrajectoryIcon.png",
		sprite: null,
		type: "GRAVITY"
	},
	Default: {
		image: "Benchmark3/assets/Sprites/attacks/Debug attack.png",
		icon: "Benchmark3/assets/Sprites/attacks/flareIcon.png",
		sprite: null,
		type: "Err..."
	},
};
