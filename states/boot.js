Boot = function(game) {
  this.game = game;
}

Boot.prototype.create = function() {

  // this.game.input.maxPointers = 1;
  
  // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  // this.scale.pageAlignHorizontally = true;
  // this.scale.pageAlignVertically = true;
  // this.scale.setScreenSize(true);

  // this.game.physics.startSystem(Phaser.Physics.ARCADE);
  // this.game.physics.arcade.gravity.y = 300;

  this.game.state.start('load');
}
