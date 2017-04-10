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


Attack.prototype = {
	attack_init: function() {},

	launch: function(attacker) {
		if(uses <= 0)
			return;
		uses--;
		var direction = attacker.animations.currentAnim.name;
		atkSprite.position.y = attacker.position.y + 15;
		if(direction.search('.*_L') > -1) {
			//A bit much... if the animation name contains the _L, we are probably facing left. Launch that way
			atkSprite.position.x = attacker.position.x - 15;
			atkSprite.animations.play('launch');
			game.add.tween(atkSprite).to({x: attacker.position.x - 100});
		}
		else {
			atkSprite.animations.play('launch');
			atkSprite.position.x = attacker.position.x + 15;
			game.add.tween(atkSprite).to({x: attacker.position.x + 100});
		}
	},

	was_successful: function() {
		return success;
	},
};



