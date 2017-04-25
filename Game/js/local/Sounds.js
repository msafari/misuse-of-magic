function Sounds() {
  game.sound_effects = {
    inGameMusic : this.set_in_game_music(),
    menuClick : this.set_menu_click(),
    winTheme: this.set_win_theme(),
    lossTheme: this.set_loss_theme(),
    attack_sounds: this.set_attack_sounds(),
    jumpSound: this.set_jump_sound(),
    hitSound: this.set_hit_sound(),
    damagedSound: this.set_damaged_sound(),
    orangeSound: this.set_orange_sound()
  };

  return game.sound_effects;
}

Sounds.prototype = {
  set_in_game_music : function() {
    inGameMusic = game.add.audio(game.current_level.level_music);
    inGameMusic.loop = true; 
    inGameMusic.volume -= .4;
    return inGameMusic;
  },

  set_menu_click: function() {
    return game.add.audio("menuClick");
  },

  set_loss_theme: function() {
    lossTheme = game.add.audio("lossTheme");
    lossTheme.loop = true;
    lossTheme.volume -=.5;
    return lossTheme;
  },

  set_win_theme: function() {
    return game.add.audio("winTheme");
  },

  set_attack_sounds: function() {
    attack_sounds = {
      //flareSound
      1: game.add.audio("a_flare"),
      //firefloomSound 
      2 : game.add.audio("a_firefloom"),
      //zoltSound 
      3 : game.add.audio("a_zolt"),
      //electromagnetismSound 
      4 : game.add.audio("a_electromagnetism"),
      //vectorSound 
      5 : game.add.audio("a_vector"),
      //reverseTrajectorySound 
      6 : game.add.audio("a_reverseTrajectory")
    };

    _.each(attack_sounds, function(atk_sound, index) {
        if (index >= 2) 
          atk_sound.volume -= .8;
    });

    return attack_sounds;
  },

  set_jump_sound: function() {
    jumpSound = game.add.audio("jump");
    jumpSound.volume -= .7;
    return jumpSound;
  },

  set_hit_sound: function () {
    hitSound = game.add.audio("hitSound");
    hitSound.volume -= .5;
    return hitSound;
  },

  set_damaged_sound: function () {
    damagedSound = game.add.audio("damagedSound");
    damagedSound.volume -= .6;
    return damagedSound;
  },

  set_orange_sound: function() {
    orangeSound = game.add.audio("orangeCollect");
    orangeSound.volume -= .9;
    return orangeSound;
  }

};