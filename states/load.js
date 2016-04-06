Load = function(game) {
  this.game = game;
}

Load.prototype.preload = function() {
  game.load.image('bg', 'assets/fence-background.png')
  game.load.image('ground', 'assets/ground.png');
  game.load.image('star', 'assets/star.png');
  game.load.image('diamond', 'assets/diamond.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.atlasJSONHash('robot', 'assets/robot-spritesheet-copy.png', 
  'assets/robot-sprite-copy.json');
}

Load.prototype.create = function() {
  // this.game.stage.backgroundColor = '000000';
  this.game.state.start('menu');
}
