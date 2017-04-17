function Attack(attacker_name, uses) {
	//TODO: Uses should be unique to each attack.
	this.attacker_name = attacker_name;
	//this.type = type;
	this.uses = (attacker_name === "WIZARD") ? Infinity : uses;
	// we assume it's unsuccesful
	this.success = false;
} 

Attack.prototype = {
	AtkSprite: null,
	
	set_sprite: function(name) {
		if(!Attack.Types[name])
			name = "Default";
		if(Attack.Types[name].sprite) {
			AtkSprite = Attack.Types[name].sprite;
			game.time.events.add(2000, AtkSprite.kill, AtkSprite);
			this.type = Attack.Types[name].type;
			return AtkSprite;
		}
		AtkSprite = game.world.create(0, 0, name, 0);
		AtkSprite.animations.add("launch");
		game.physics.arcade.enable(AtkSprite);
		AtkSprite.attacker_name = this.attacker_name;
		Attack.Types[name].sprite = AtkSprite;
		game.time.events.add(2000, AtkSprite.kill, AtkSprite);
		return AtkSprite; //return the created sprite in case we need to do something with it later
	},

	launch: function(attacker, direction) {
		if(this.uses <= 0)
			return;
		this.uses--;
		AtkSprite.position.y = attacker.position.y;
		game.world.add(AtkSprite);
		//creates two different types of projectives: the player's and everyone else's
		if (attacker.key === 'TZARHA') {
			game.playerProjectiles.add(AtkSprite);
		}
		else {
			game.wizardProjectiles.add(AtkSprite);
		}
		var atkTween;
		if(direction === "left") {
			//A bit much... if the animation name contains the _L, we are probably facing left. Launch that way
			AtkSprite.position.x = attacker.position.x - 15;
			atkTween = game.add.tween(AtkSprite).to({x: attacker.position.x - 250});
		}
		else {
			AtkSprite.position.x = attacker.position.x + 15;
			atkTween = game.add.tween(AtkSprite).to({x: attacker.position.x + 250});
		}
		AtkSprite.visible = true;
		
		atkTween.onStart.addOnce(function() {
			AtkSprite.animations.play('launch', 16, true);
		})
		atkTween.start().onComplete.addOnce(function() {
			AtkSprite.kill();
		});
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
};

//It's time to move this bit elsewhere. And the name 'images' no longer applies
Attack.Types = {
	//Sprites cannot be created during preload beacuse the world doesn't exist yet, we populate that field when needed
	ElectricAttack: {
		image: "assets/Sprites/attacks/Electric Attack Prototype.png",
		icon: "assets/Sprites/attacks/zoltIcon.png",
		sprite: null,
		type: "ELECTRIC"
	},
	Electromagnetism:{
		image: "assets/Sprites/attacks/Electromagnetism.png",
		icon: "assets/Sprites/attacks/electromagnetismIcon.png",
		sprite: null,
		type: "GRAVITY"
	},
	Firefloom: {
		image: "assets/Sprites/attacks/Firefloom.png",
		icon: "assets/Sprites/attacks/firefloomIcon.png",
		sprite: null,
		type: "FIRE"
	},
	Flare:{
		image: "assets/Sprites/attacks/Flare.png",
		icon: "assets/Sprites/attacks/flareIcon.png",
		sprite: null,
		type: "FIRE"
	},
	MovementSpell: {
		image: "assets/Sprites/attacks/Movement Spell.png",
		icon: "assets/Sprites/attacks/movementIcon.png",
		sprite: null,
		type: "GRAVITY"
	},
	ReverseDirection: {
		image: "assets/Sprites/attacks/Reverse Direction.png",
		icon: "assets/Sprites/attacks/reverseTrajectoryIcon.png",
		sprite: null,
		type: "GRAVITY"
	},
	Default: {
		image: "assets/Sprites/attacks/Debug attack.png",
		icon: "assets/Sprites/attacks/flareIcon.png",
		sprite: null,
		type: "Err..."
	},
};
