var cheatFileLoaded = true;
var cheats = [];
var cheatText = [];

function cheatMenu() {
	var baseXPosition = 105;
	var baseYPosition = 85;
	var yOffset = 40;
	pauseGame(true);
	_.forIn(Cheats.CheatList, function(cheatObject) { 
		console.log(cheatObject.enabled);
		optionText = game.add.text(baseXPosition, baseYPosition + yOffset, cheatObject.text + cheatObject.enabled);
    	optionText.fixedToCamera = true;
   		optionText.cameraOffset.setTo(baseXPosition, baseYPosition + yOffset);
   		baseYPosition += yOffset; //should keep the text evenly spaced
   		optionText.inputEnabled = true;
    	optionText.events.onInputUp.add(cheatObject.action, cheatObject);
    	cheats.push(cheatObject);
    	cheatText.push(optionText);
	});
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
			if(!this.enabled) {
				this.enabled = true;
				console.log("Tzhara is now immune to damage");
			}
			else {
				this.enabled = false;
				console.log("Invicibility disabled");
			}
		} 
	},
	infiniteAttacks: {
		enabled: false,
		text: "Infinite spell uses: ",
		action: function(){} 
	},
	infiniteJump: {
		enabled: false,
		text: "Make Tzhara fly: ",
		action: function(){} 
	},
};