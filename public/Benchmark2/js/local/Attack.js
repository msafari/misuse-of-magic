var AtkSprites = [];
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
	this.icon = "Benchmark2/assets/Sprites/attacks/flareIcon.png";  //Right now, just to see something
	// we assume it's unsuccesful
	success = false;
}

Attack.prototype = {
	AtkSprite: null,
	
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
			AtkSprite.kill(); //TODO: Actually kill the sprite
		});
	},

	was_successful: function() {
		return success;
	},

	attack_init: function(){
		console.log("AtkInit called.");
		var AtkImages = ["Benchmark2/assets/Sprites/attacks/Electric Attack Prototype.png", "Benchmark2/assets/Sprites/attacks/Electromagnetism.png", 
					"Benchmark2/assets/Sprites/attacks/Firefloom.png", "Benchmark2/assets/Sprites/attacks/Flare.png",  "Benchmark2/assets/Sprites/attacks/Movement Spell.png",
					"Benchmark2/assets/Sprites/attacks/Reverse Direction.png"];
		for(var i = 0; i < AtkImages.length; i++) {
	 		console.log(AtkImages[i]);
	 		var num = i+1;
	 		console.log("atk"+num);
	 		game.load.spritesheet("atk"+num, AtkImages[i], 16, 16).onLoadComplete.addOnce(function() {
	 			this.AtkSprites.push(game.world.create(0, 0, "atk"+num));
	 		}
	 	);
	}
},
};

