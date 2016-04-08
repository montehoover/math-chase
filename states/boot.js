// Boot object class, which inherits from Phaser.State class

// As an instance of Phaser.State, the Phaser.Game.StateManager
// cleanly handles running the following state methods:
// 1. .init()
// 2. .preload()
// 3. .create()
// 4. .update()

Boot = function(game) {
  Phaser.State.call(this);
  this.game = game;
}
Boot.prototype = Object.create(Phaser.State.prototype);
Boot.prototype.constructor = Boot;


Boot.prototype.create = function() {
  // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  // this.scale.pageAlignHorizontally = true;
  // this.scale.pageAlignVertically = true;
  // this.scale.setScreenSize(true);

  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  // this.game.physics.arcade.gravity.y = 300;
  this.game.input.maxPointers = 1;

  this.game.state.start('load');
}
