function Attack(attacker_name, uses) {
	//TODO: Uses should be unique to each attack.
	this.attacker_name = attacker_name;
	//this.type = type;
	this.uses = (attacker_name === "WIZARD") ? Infinity : uses;
	// we assume it's unsuccesful
	this.attackList = null;
	success = false;
} 

Attack.prototype = {
	AtkSprite: null,
	
	set_sprite: function(name) {
		if(!attackList.has(name))
			name = "Default";
		if(!attackList.get(name).sprite === null) {
			AtkSprite = attackList.get(name).sprite;
			game.time.events.add(2000, AtkSprite.kill, AtkSprite);
			this.type = attackList.get(name).type;
			return AtkSprite;
		}
		AtkSprite = game.world.create(0, 0, name, 0);
		AtkSprite.animations.add("launch");
		game.physics.arcade.enable(AtkSprite);
		AtkSprite.attacker_name = this.attacker_name;
		attackList.get(name).sprite = AtkSprite;
		game.time.events.add(2000, AtkSprite.kill, AtkSprite);
		return AtkSprite; //return the created sprite in case we need to do something with it later
	},

	launch: function(attacker) {
		if(this.uses <= 0)
			return;
		this.uses--;
		var direction = attacker.animations.currentAnim.name;
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
		if(direction.search('.*_L') > -1) {
			//A bit much... if the animation name contains the _L, we are probably facing left. Launch that way
			AtkSprite.position.x = attacker.position.x - 15;
			console.log("Attack Fired! (left)");
			atkTween = game.add.tween(AtkSprite).to({x: attacker.position.x - 250});
		}
		else {
			AtkSprite.position.x = attacker.position.x + 15;
			console.log("Attack Fired! (right)");
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
		console.log("AtkInit called.");
	 	attackList = new Map([["Electric Attack", Attack.Images.ElectricAttack], ["Electromagnetism", Attack.Images.Electromagnetism],
								["Firefloom", Attack.Images.Firefloom], ["Flare", Attack.Images.Flare],
								["Movement Spell", Attack.Images.MovementSpell], ["Reverse Direction", Attack.Images.ReverseDirection],
								["default", Attack.Images.Default]]);
	 	attackList.forEach(function(item, key) {
	 		console.log(key + " : " + item.image);
	 		game.load.spritesheet(key, item.image, 16, 16);
	 		game.load.image(key + "_icon", item.icon, 48, 48);
	 	}
	 	);
	},
};

//It's time to move this bit elsewhere. And the name 'images' no longer applies
Attack.Images = {
	//Sprites cannot be created during preload beacuse the world doesn't exist yet, we populate that field when needed
	ElectricAttack: {
		image: "Benchmark2/assets/Sprites/attacks/Electric Attack Prototype.png",
		icon: "Benchmark2/assets/Sprites/attacks/zoltIcon.png",
		sprite: null,
		type: "Electric"
	},
	Electromagnetism:{
		image: "Benchmark2/assets/Sprites/attacks/Electromagnetism.png",
		icon: "Benchmark2/assets/Sprites/attacks/electromagnetismIcon.png",
		sprite: null,
		type: "Electric"
	},
	Firefloom: {
		image: "Benchmark2/assets/Sprites/attacks/Firefloom.png",
		icon: "Benchmark2/assets/Sprites/attacks/firefloomIcon.png",
		sprite: null,
		type: "Fire"
	},
	Flare:{
		image: "Benchmark2/assets/Sprites/attacks/Flare.png",
		icon: "Benchmark2/assets/Sprites/attacks/flareIcon.png",
		sprite: null,
		type: "Fire"
	},
	MovementSpell: {
		image: "Benchmark2/assets/Sprites/attacks/Movement Spell.png",
		icon: "Benchmark2/assets/Sprites/attacks/movementIcon.png",
		sprite: null,
		type: "Gravity"
	},
	ReverseDirection: {
		image: "Benchmark2/assets/Sprites/attacks/Reverse Direction.png",
		icon: "Benchmark2/assets/Sprites/attacks/reverseTrajectoryIcon.png",
		sprite: null,
		type: "Gravity"
	},
	Default: {
		image: "Benchmark2/assets/Sprites/attacks/Debug attack.png",
		icon: "Benchmark2/assets/Sprites/attacks/flareIcon.png",
		sprite: null,
		type: "Err..."
	},
};
