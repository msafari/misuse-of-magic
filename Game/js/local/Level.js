function Level (number) {
  this.number = number;
  this.name = "level" + number;
  this.available = (this.number == 1) ? true : false;
  this.gen_path = "assets/Levels/level";
  this.tile_map = this.get_map();
  this.tile_info_name = this.name + "_tile_info";
  this.set_background();
  this.level_music = "inGameMusic" + this.number;
  this.tileset_info = this.load_tileset_info();
}

Level.prototype = {

  portal_name: function () {
    var extension = (this.available) ? "_portal_ul" : "_portal_l";
    return "level" + this.number + extension;
  },

  get_map: function () {
    return this.gen_path + this.number + "/level" + this.number + ".json";
  },

  set_playable: function () {
    this.available = true;
  },

  level_icon_path: function () {
    var icon_path;
    if (this.available) {
      icon_path = this.gen_path + this.number + "/unlocked.png";
    } else {
      icon_path = this.gen_path + this.number + "/locked.png";
    }
    return icon_path;
  },

  set_icon_sprite: function(sprite, game) {
    this.icon_sprite = sprite;

    //enable input if level is available
    if (this.available) {
      this.icon_sprite.inputEnabled = true;
      this.icon_sprite.events.onInputUp.add(function() { 
        game.sameAttackText.destroy();
        if (attackIcon1.frame === attackIcon2.frame && attackIcon2.frame === attackIcon3.frame)
          game.sameAttackText = game.add.text(game.camera.width/2, 665, "You cannot have the same skill in slots 1, 2, and 3. Try again!");
        else if (attackIcon1.frame === attackIcon2.frame) 
          game.sameAttackText = game.add.text(game.camera.width/2, 665, "You cannot have the same skill in slots 1 and 2. Try again!");
        else if (attackIcon1.frame === attackIcon3.frame)
          game.sameAttackText = game.add.text(game.camera.width/2, 665, "You cannot have the same skill in slots 1 and 3. Try again!");
        else if (attackIcon2.frame === attackIcon3.frame)
          game.sameAttackText = game.add.text(game.camera.width/2, 665, "You cannot have the same skill in slots 2 and 3. Try again!");
        else {
          menuClick = game.add.audio("menuClick");
          menuClick.play();
          game.current_level = this;
          game.sameAttackText.destroy(); //save resources by removing the text when we load the level
          f_attackIcon1 = attackIcon1.frame; f_attackIcon2 = attackIcon2.frame; f_attackIcon3 = attackIcon3.frame;
          game.sound.stopAll();
          menuClick.play();
          menuTheme.mute = true;
          game.state.start("MomGame");
        }
        game.sameAttackText.fixedToCamera = true;
        game.sameAttackText.cameraOffset.setTo(600,665);
        game.sameAttackText.anchor.setTo(0.5);
      }, this);
    }
  },

  set_background: function () {
    this.bg_image_path = this.gen_path + this.number + "/level" + this.number + ".png";
    this.bg_image_name = this.name + "_bg";
  },

  load_tileset_info: function () {
    tileData = JSON.parse(game.cache.getText(this.tile_info_name));
    return tileData;
  } 
};