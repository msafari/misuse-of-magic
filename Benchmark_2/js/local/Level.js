function Level (number) {
  this.name = "level" + number;
  this.portal_name = this.name + "_portal";
  this.tileMap = this.getMap();
  this.gen_path = "assets/Levels/level";
  this.findMap();
  this.set_background();
}

Level.prototype = {
  findMap: function () {
    this.map_file = this.path + this.number + "/level" + this.number + ".json";
  },

  isPlayable: function () {
    if (this.number == 1){
      this.isPlayable = true;
    }
    return this.isPlayable;
  },

  tile_map: function () {
    return this.map_file;
  },

  set_playable: function () {
    this.isPlayable = true;
  },

  level_icon_path: function () {
    var icon_path;
    if (this.isPlayable) {
      icon_path = this.gen_path + this.number + "/unlocked.png";
    } else {
      icon_path = this.gen_path + this.number + "/locked.png";
    }
    return icon_path;
  },

  set_icon_sprite: function(sprite, game) {
    this.icon_sprite = sprite;

    //enable input if level is available
    if (this.isPlayable) {
      this.icon_sprite.inputEnabled = true;
      this.icon_sprite.onInputUp.add(function() { 
        game.current_level = this;
        game.state.start("MomGame");
      });
    }
  },

  set_background: function () {
    this.bg_image = this.path + this.number + "/level" + this.number + ".png";
  },

};