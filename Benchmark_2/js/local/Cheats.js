var cheatFileLoaded = true;

function cheatMenu() {
	var baseXPosition = 105;
	var baseYPosition = 85;
	var yOffset = 10;
	_.forIn(Cheats.CheatList, function(item) {
		console.log(item.text);
		optionText = game.add.text(baseXPosition, baseYPosition + yOffset, item.text);
    	optionText.fixedToCamera = true;
   		optionText.cameraOffset.setTo(baseXPosition, baseYPosition + yOffset);
   		baseYPosition += yOffset; //should keep the text evenly spaced
   		optionText.inputEnabled = true;
    	optionText.events.onInputUp.add(item.action);
	});
	pauseGame(true);
}

function Cheats() {}

Cheats.CheatList = {
	invinciblity: {
		enabled: false,
		text: "Make Tzhara invincible: ", //(enabled? "enabled" : "disabled");,
		action: null //function goes here.
	},
	infiniteAttacks: {
		enabled: false,
		text: "Infinite spell uses: ",
		action: null //function goes here.
	},
	infiniteJump: {
		enabled: false,
		text: "Make Tzhara fly: ",
		action: null //function goes here.
	},
};