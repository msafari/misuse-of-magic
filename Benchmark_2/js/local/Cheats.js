var cheatFileLoaded = true;
var cheats = [];
var cheatText = [];

function cheatMenu() {
	var baseXPosition = 105;
	var baseYPosition = 85;
	var yOffset = 40;
	pauseGame(true);
	if(cheats.length == 0){
		_.forIn(Cheats.CheatList, function(cheatObject) { 
			console.log(cheatObject.enabled);
			optionText = game.add.text(baseXPosition, baseYPosition + yOffset, cheatObject.text + cheatObject.enabled);
    		optionText.fixedToCamera = true;
   			optionText.cameraOffset.setTo(baseXPosition, baseYPosition + yOffset);
   			optionText.inputEnabled = true;
    		optionText.events.onInputUp.add(cheatObject.action, cheatObject);

    		baseYPosition += yOffset; //should keep the text evenly spaced
    		cheats.push(cheatObject);
    		cheatText.push(optionText);
		});
	}
	else {
		for (var i = 0; i < cheatText.length; i++) {
			cheatText[i].setText(cheats[i].text + cheats[i].enabled);
			cheatText[i].visible = true;
		}
	}
	Cheats.backAction.addOnce(function() {
		cheatText.forEach(function(textItem) {
			textItem.visible = false;
		})
	});
}

function Cheats() {}

Cheats.CheatList = {
	invinciblity: {
		enabled: false,
		text: "Make Tzhara invincible: ",
		action: function() { 
			//"this" is the cheat object so be careful!
			if(!this.enabled) {
				this.enabled = true;
				console.log("Tzhara is now immune to damage");
				game.player.tint = 0x83ccf9;
				invincible = true;
			}
			else {
				this.enabled = false;
				console.log("Invicibility disabled");
				game.player.tint = 0xffffff;
				invincible = false;
			}
		} 
	},
	infiniteAttacks: {
		enabled: false,
		text: "Infinite spell uses: ",
		action: function(){
			var prevUses = 10;
			if(!this.enabled) {
				this.enabled = true;
				console.log("Spells now have unlimited uses");
				if(!attack) {
           			attack = new Attack('Tzhara', Infinity);
				}
				else {
					prevUses = attack.uses;
					attack.uses = Infinity;
				}
			}
			else {
				this.enabled = false;
				console.log("Infinite uses disabled");
				attack.uses = prevUses;
			}
		} 
	},
	infiniteJump: {
		enabled: false,
		text: "Make Tzhara fly: ",
		action: function() {
			if(!this.enabled) {
				this.enabled = true;
				console.log("Tzhara can now fly.");
			}
			else {
				this.enabled = false;
				console.log("Infiinite jump disabled");
			}
			
		}  
	},
};