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
        menuClick = game.add.audio("menuClick");
        menuClick.play();
        game.current_level = this;
        game.state.start("SkillSelect");
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