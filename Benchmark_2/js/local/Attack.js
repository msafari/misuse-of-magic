
function Attack(attacker_name, type, uses) {
	this.attacker_name = attacker_name;
	this.type = type;
	this.uses = (attacker_name === "WIZARD") ? Infinity : uses;
	// we assume it's unsuccesful
	success = false;
} 

Attack.prototype = {
	AtkSprite: null,
	
	set_sprite: function(name) {
		//TODO: make the map a global (or equivalent) variable and check if the map actually contains the requested sprite first.
		AtkSprite = game.world.create(0, 0, name, 0);
		AtkSprite.animations.add("launch");
		game.physics.arcade.enable(AtkSprite);
		AtkSprite.attacker_name = this.attacker_name; //Taking advantage of the "add fields at runtime" thing
		return AtkSprite; //return the created sprite in case we need to do something with it later
	},

	launch: function(attacker) {
		if(this.uses <= 0)
			return;
		this.uses--;
		var direction = attacker.animations.currentAnim.name;
		AtkSprite.position.y = attacker.position.y;
		game.world.add(AtkSprite);
		game.projectiles.add(AtkSprite);
		var atkTween;
		if(direction.search('.*_L') > -1) {
			//A bit much... if the animation name contains the _L, we are probably facing left. Launch that way
			AtkSprite.position.x = attacker.position.x - 15;
			console.log("Attack Fired! (left)");
			atkTween = game.add.tween(AtkSprite).to({x: attacker.position.x - 100});
		}
		else {
			AtkSprite.position.x = attacker.position.x + 15;
			console.log("Attack Fired! (right)");
			atkTween = game.add.tween(AtkSprite).to({x: attacker.position.x + 100});
		}
		AtkSprite.visible = true;
		
		atkTween.onStart.addOnce(function() {
			AtkSprite.animations.play('launch', 16, true);
		})
		atkTween.start().onComplete.addOnce(function() {
			console.log("Tween completed");
			//AtkSprite.kill(); //TODO: Actually kill the sprite
			AtkSprite.visible = false;

		}
		)
	},

	was_successful: function() {
		return success;
	},

	attack_init: function(){
		console.log("AtkInit called.");
	 	var attackList = new Map([["Electric Attack", Attack.Images.ElectricAttack], ["Electromagnetism", Attack.Images.Electromagnetism],
								["Firefloom", Attack.Images.Firefloom], ["Flare", Attack.Images.Flare],
								["Movement Spell", Attack.Images.MovementSpell], ["Reverse Direction", Attack.Images.ReverseDirection],
								["default", Attack.Images.default]]);
	 	attackList.forEach(function(item, key) {
	 		console.log(key + " : " + item.image);
	 		game.load.spritesheet(key, item.image, 16, 16);
	 		game.load.image(key + "_icon", item.icon, 48, 48);
	 	}
	 	);
	},

	spriteRemoval: function() {
		game.projectiles.forEach(function(sprite) {
			if(!game.tweens.isTweening(sprite)) {
				sprite.kill();
			}
		});
	},
};

Attack.Images = {
	ElectricAttack: {
		image: "assets/Sprites/attacks/Electric Attack Prototype.png",
		icon: "assets/Sprites/attacks/zoltIcon.png"
	},
	Electromagnetism:{
		image: "assets/Sprites/attacks/Electromagnetism.png",
		icon: "assets/Sprites/attacks/electromagnetismIcon.png"
	},
	Firefloom: {
		image: "assets/Sprites/attacks/Firefloom.png",
		icon: "assets/Sprites/attacks/firefloomIcon.png"
	},
	Flare:{
		image: "assets/Sprites/attacks/Flare.png",
		icon: "assets/Sprites/attacks/flareIcon.png"
	},
	MovementSpell: {
		image: "assets/Sprites/attacks/Movement Spell.png",
		icon: "assets/Sprites/attacks/movementIcon.png"
	},
	ReverseDirection: {
		image: "assets/Sprites/attacks/Reverse Direction.png",
		icon: "assets/Sprites/attacks/reverseTrajectoryIcon.png"
	},
	default: {
		image: "assets/Sprites/attacks/Flare.png",
		icon: "assets/Sprites/attacks/flareIcon.png"
	},
};
