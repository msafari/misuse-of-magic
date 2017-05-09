var skillSelect = function () {};

skillSelect.prototype = {
  preload: function () {

  },

  create: function () {
    gameCenterX = game.width / 2;
    gameCenterY = game.height / 2;
    menuClick = game.add.audio("menuClick");
    game.add.sprite(0, 0, 'background');
    header = game.add.image(gameCenterX, 50, "selectBar");
    header.fixedToCamera = true;
    header.cameraOffset.setTo(600, 50);
    header.anchor.setTo(0.5);

    this.make_selection_menu();

    backButton = game.add.sprite(50, 675, "backButton");
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function() {
      menuClick.play(); 
      game.state.start("MomLevelSelect");
    });

    startButton = game.add.sprite(gameCenterX - 50, gameCenterY + 100, "startButton");
    startButton.inputEnabled = true;
    startButton.cameraOffset.setTo(gameCenterX - 50, gameCenterY + 100);
    startButton.events.onInputUp.add(function () {
      game.sameAttackText.destroy();
      if (game.attackIcon1.frame === game.attackIcon2.frame && game.attackIcon2.frame === game.attackIcon3.frame)
        game.sameAttackText = game.add.text(game.camera.width/2, 190, "You cannot have the same skill in slots 1, 2, and 3. Try again!");
      else if (game.attackIcon1.frame === game.attackIcon2.frame) 
        game.sameAttackText = game.add.text(game.camera.width/2, 190, "You cannot have the same skill in slots 1 and 2. Try again!");
      else if (game.attackIcon1.frame === game.attackIcon3.frame)
        game.sameAttackText = game.add.text(game.camera.width/2, 190, "You cannot have the same skill in slots 1 and 3. Try again!");
      else if (game.attackIcon2.frame === game.attackIcon3.frame)
        game.sameAttackText = game.add.text(game.camera.width/2, 190, "You cannot have the same skill in slots 2 and 3. Try again!");
      else {
        menuClick = game.add.audio("menuClick");
        menuClick.play();
        game.sameAttackText.destroy(); //save resources by removing the text when we load the level
        f_attackIcon1 = game.attackIcon1.frame; 
        f_attackIcon2 = game.attackIcon2.frame; 
        f_attackIcon3 = game.attackIcon3.frame;
        game.sound.stopAll();
        menuClick.play();
        game.state.start("MomGame");
      }
      game.sameAttackText.fixedToCamera = true;
      game.sameAttackText.cameraOffset.setTo(600,665);
      game.sameAttackText.anchor.setTo(0.5);
    }, this);
  },

  make_selection_menu: function () {
    attackSelectText = game.add.text(gameCenterX, gameCenterY - 200, "Select your skills!");
    attackSelectText.fixedToCamera = true;
    attackSelectText.cameraOffset.setTo(gameCenterX, gameCenterY - 200);
    attackSelectText.anchor.setTo(0.5);

    attackCountInfo = game.add.text(gameCenterX, gameCenterY - 150, "You will get 5 uses per spell! Hover over icons to learn more.");
    attackCountInfo.fixedToCamera = true;
    attackCountInfo.cameraOffset.setTo(gameCenterX, gameCenterY - 150);
    attackCountInfo.anchor.setTo(0.5);

    orangesInfo = game.add.text(gameCenterX, gameCenterY - 100, "Remember you can restore 1 spell for every 10 oranges you collect.");
    orangesInfo.fixedToCamera = true;
    orangesInfo.cameraOffset.setTo(gameCenterX, gameCenterY - 100);
    orangesInfo.anchor.setTo(0.5);    
    game.sameAttackText = game.add.text(0,0,"");
    
    flareInfo = game.add.sprite(gameCenterX, gameCenterY + 50, "flareInfo");
    flareInfo.fixedToCamera = true;
    flareInfo.cameraOffset.setTo(gameCenterX, gameCenterY + 50);
    flareInfo.visible = false;
    firefloomInfo = game.add.sprite(gameCenterX, gameCenterY + 50, "firefloomInfo");
    firefloomInfo.fixedToCamera = true;
    firefloomInfo.cameraOffset.setTo(gameCenterX, gameCenterY + 50);
    firefloomInfo.visible = false;
    zoltInfo = game.add.sprite(gameCenterX, gameCenterY + 50, "zoltInfo");
    zoltInfo.fixedToCamera = true;
    zoltInfo.cameraOffset.setTo(gameCenterX, gameCenterY + 50);
    zoltInfo.visible = false;
    electromagnetismInfo = game.add.sprite(gameCenterX, gameCenterY + 50, "electromagnetismInfo");
    electromagnetismInfo.fixedToCamera = true;
    electromagnetismInfo.cameraOffset.setTo(gameCenterX, gameCenterY + 50);
    electromagnetismInfo.visible = false;
    vectorInfo = game.add.sprite(gameCenterX, gameCenterY + 50, "vectorInfo");
    vectorInfo.fixedToCamera = true;
    vectorInfo.cameraOffset.setTo(gameCenterX, gameCenterY + 50);
    vectorInfo.visible = false;
    reverseTrajectoryInfo = game.add.sprite(gameCenterX, gameCenterY + 50, "reverseTrajectoryInfo");
    reverseTrajectoryInfo.fixedToCamera = true;
    reverseTrajectoryInfo.cameraOffset.setTo(gameCenterX, gameCenterY + 50);
    reverseTrajectoryInfo.visible = false;

    attackInfoBoxes = ["default", flareInfo, firefloomInfo, zoltInfo, electromagnetismInfo, vectorInfo, reverseTrajectoryInfo];

    attackUp1 = game.add.sprite(gameCenterX - 60, gameCenterY - 50, "attackUp");
    attackUp2 = game.add.sprite(gameCenterX, gameCenterY - 50, "attackUp");
    attackUp3 = game.add.sprite(gameCenterX + 60, gameCenterY - 50, "attackUp");
    attackUp1.fixedToCamera = true;
    attackUp1.cameraOffset.setTo(gameCenterX - 60, gameCenterY - 50);
    attackUp1.anchor.setTo(0.5);
    attackUp2.fixedToCamera = true;
    attackUp2.cameraOffset.setTo(gameCenterX, gameCenterY - 50);
    attackUp2.anchor.setTo(0.5);
    attackUp3.fixedToCamera = true;
    attackUp3.cameraOffset.setTo(gameCenterX + 60, gameCenterY - 50);
    attackUp3.anchor.setTo(0.5);

    attackDown1 = game.add.sprite(gameCenterX - 60, gameCenterY + 50, "attackDown");
    attackDown2 = game.add.sprite(gameCenterX, gameCenterY + 50, "attackDown");
    attackDown3 = game.add.sprite(gameCenterX + 60, gameCenterY + 50, "attackDown");
    attackDown1.fixedToCamera = true;
    attackDown1.cameraOffset.setTo(gameCenterX - 60, gameCenterY + 50);
    attackDown1.anchor.setTo(0.5);
    attackDown2.fixedToCamera = true;
    attackDown2.cameraOffset.setTo(gameCenterX, gameCenterY + 50);
    attackDown2.anchor.setTo(0.5);
    attackDown3.fixedToCamera = true;
    attackDown3.cameraOffset.setTo(gameCenterX + 60, gameCenterY + 50);
    attackDown3.anchor.setTo(0.5);

    game.attackIcon1 = game.add.sprite(gameCenterX - 60, gameCenterY, "attackIcons");
    game.attackIcon1.cameraOffset.setTo(gameCenterX - 60, gameCenterY);
    game.attackIcon1.anchor.setTo(0.5);
    game.attackIcon2 = game.add.sprite(gameCenterX, gameCenterY, "attackIcons");
    game.attackIcon2.cameraOffset.setTo(gameCenterX, gameCenterY);
    game.attackIcon2.anchor.setTo(0.5);
    game.attackIcon3 = game.add.sprite(gameCenterX + 60, gameCenterY, "attackIcons");
    game.attackIcon3.cameraOffset.setTo(gameCenterX + 60, gameCenterY);
    game.attackIcon1.frame = 1; //set the default attacks
    game.attackIcon2.frame = 3;
    game.attackIcon3.frame = 5;
    game.attackIcon1.anchor.setTo(0.5);
    game.attackIcon2.anchor.setTo(0.5);
    game.attackIcon3.anchor.setTo(0.5);

    game.attackIcon1.inputEnabled = true;
    game.attackIcon1.events.onInputOver.add(function() {
        attackInfoBoxes[game.attackIcon1.frame].visible = true;
    }, this);
    game.attackIcon1.events.onInputOut.add(function() {
        attackInfoBoxes[game.attackIcon1.frame].visible = false;
    }, this);

    game.attackIcon2.inputEnabled = true;
    game.attackIcon2.events.onInputOver.add(function() {
        attackInfoBoxes[game.attackIcon2.frame].visible = true;
    }, this);
    game.attackIcon2.events.onInputOut.add(function() {
        attackInfoBoxes[game.attackIcon2.frame].visible = false;
    }, this);

    game.attackIcon3.inputEnabled = true;
    game.attackIcon3.events.onInputOver.add(function() {
        attackInfoBoxes[game.attackIcon3.frame].visible = true;
    }, this);
    game.attackIcon3.events.onInputOut.add(function() {
        attackInfoBoxes[game.attackIcon3.frame].visible = false;
    }, this);




    attackUp1.inputEnabled = true;
    attackUp1.events.onInputUp.add(function() {
      if (game.attackIcon1.frame === 6) {
        game.attackIcon1.frame = 1;
      }
      else
        game.attackIcon1.frame = game.attackIcon1.frame + 1;
    });
    attackUp2.inputEnabled = true;
    attackUp2.events.onInputUp.add(function() {
      if (game.attackIcon2.frame === 6) {
        game.attackIcon2.frame = 1;
      }
      else
        game.attackIcon2.frame = game.attackIcon2.frame + 1;
    });
    attackUp3.inputEnabled = true;
    attackUp3.events.onInputUp.add(function() {
      if (game.attackIcon3.frame === 6) {
        game.attackIcon3.frame = 1;
      }
      else
        game.attackIcon3.frame = game.attackIcon3.frame + 1;
    });

    attackDown1.inputEnabled = true;
    attackDown1.events.onInputUp.add(function() {
      if (game.attackIcon1.frame === 1) {
        game.attackIcon1.frame = 6;
      }
      else
        game.attackIcon1.frame = game.attackIcon1.frame - 1;
    });
    attackDown2.inputEnabled = true;
    attackDown2.events.onInputUp.add(function() {
      if (game.attackIcon2.frame === 1) {
        game.attackIcon2.frame = 6;
      }
      else
        game.attackIcon2.frame = game.attackIcon2.frame - 1;
    });
    attackDown3.inputEnabled = true;
    attackDown3.events.onInputUp.add(function() {
      if (game.attackIcon1.frame === 1) {
        game.attackIcon3.frame = 6;
      }
      else
        game.attackIcon3.frame = game.attackIcon3.frame - 1;
    });

  }

};