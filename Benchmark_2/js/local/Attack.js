function Attack(attacker_name, name, type, spritesheet, uses) {
	this.name = name;
	this.type = type;
	this.uses = (attacker_name === "WIZARD") ? Infinity : uses;
	this.spritesheet = spritesheet; //For animations
	
	game.load.spritesheet(name, spritesheet, 16, 16).onFileComplete.addOnce(function(){
		this.atkSprite = game.world.create(0, 0, name, 0);
		atkSprite.visible = false;
		atkSprite.animations.add("launch");
	});
	this.icon = "assets/Sprites/attacks/flareIcon.png";  //Right now, just to see something
	// we assume it's unsuccesful
	success = false;
}

function attack_init() {
	console.log("AtkInit run!");
	var AtkImages = ["assets/Sprites/attacks/Electric Attack Prototype.png", "assets/Sprites/attacks/electromagnetism.png", "assets/Sprites/attacks/firefloom.png", "assets/Sprites/attacks/flare.png",  "assets/Sprites/attacks/Movement Spell.png",
					"assets/Sprites/attacks/Reverse Direction.png"];
	for(var i = 0; i < AtkImages.length; i++) {
	 	console.log(AtkImages[i]);
	 	var num = i+1;
	 	console.log("atk"+num);
	 	game.load.spritesheet("atk"+num, AtkImages[i], 16, 16).onLoadComplete.addOnce(function() {
	 		Attack.prototype.AtkSprites.push(game.world.create(0, 0, "atk"+num));
	 	}
	 	);
	}
}

Attack.prototype = {
	AtkSprite: null,
	AtkSprites: [],
	
	set_sprite: function(sprite) {
		AtkSprite = sprite;
		AtkSprite.animations.add("launch");
	},

	launch: function(attacker) {
		if(this.uses <= 0)
			return;
		this.uses--;
		var direction = attacker.animations.currentAnim.name;
		AtkSprite.position.y = attacker.position.y;
		game.world.add(AtkSprite);
		var atkTween;
		if(direction.search('.*_L') > -1) {
			//A bit much... if the animation name contains the _L, we are probably facing left. Launch that way
			AtkSprite.position.x = attacker.position.x - 15;
			console.log("CANNONS FIRED! (left)");
			atkTween = game.add.tween(AtkSprite).to({x: attacker.position.x - 100});
		}
		else {
			AtkSprite.position.x = attacker.position.x + 15;
			console.log("CANNONS FIRED! (right)");
			atkTween = game.add.tween(AtkSprite).to({x: attacker.position.x + 100});
		}
		AtkSprite.visible = true;
		
		atkTween.onStart.addOnce(function() {
			AtkSprite.animations.play('launch', 16, true);
		})
		atkTween.start().onComplete.addOnce(function() {
			console.log("Tween completed");
			AtkSprite.kill();
		});
	},

	was_successful: function() {
		return success;
	},
};

