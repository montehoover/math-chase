// Load object class, which inherits from Phaser.State class

// As an instance of Phaser.State, the Phaser.Game.StateManager
// cleanly handles running the following state methods:
// 1. .init()
// 2. .preload()
// 3. .create()
// 4. .update()

Load = function(game) {
  Phaser.State.call(this);
  this.game = game;
}
Load.prototype = Object.create(Phaser.State.prototype);
Load.prototype.constructor = Load;


Load.prototype.preload = function() {
  game.load.image('bg', 'assets/fence-background.png')
  game.load.image('ground', 'assets/ground.png');
  game.load.image('star', 'assets/star.png');
  game.load.image('diamond', 'assets/diamond.png');
  game.load.atlasJSONHash('fox', 'assets/dog-spritesheet.png',
    'assets/dog-sprite.json');
  game.load.atlasJSONHash('robot', 'assets/robot-spritesheet.png', 
    'assets/robot-sprite.json');
  game.load.atlasJSONHash('numbers', 'assets/number-spritesheet.png', 
    'assets/number-sprites.json');
  
}

Load.prototype.create = function() {
  // this.game.stage.backgroundColor = '000000';
  this.game.state.start('menu');
}
