var cheatFileLoaded = true;
var cheats = [];
var cheatText = [];

function cheatMenu() {
	var baseXPosition = 105;
	var baseYPosition = 85;
	var yOffset = 40;
	pauseGame(true);
	_.forIn(Cheats.CheatList, function(item) { 
		console.log(item.enabled);
		optionText = game.add.text(baseXPosition, baseYPosition + yOffset, item.text + item.enabled);
    	optionText.fixedToCamera = true;
   		optionText.cameraOffset.setTo(baseXPosition, baseYPosition + yOffset);
   		baseYPosition += yOffset; //should keep the text evenly spaced
   		optionText.inputEnabled = true;
    	optionText.events.onInputUp.add(item.action);
    	cheats.push(item);
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
			this.enabled = true;
			console.log("Tzhara is now immune to damage");
			console.log(this.enabled);
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