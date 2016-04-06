Load = function(game) {
  this.game = game;
}

Load.prototype.preload = function() {
  game.load.image('bg', 'assets/fence-background.png')
  game.load.image('ground', 'assets/ground.png');
  game.load.image('star', 'assets/star.png');
  game.load.image('diamond', 'assets/diamond.png');
  game.load.atlasJSONHash('enemy', 'assets/robot-spritesheet.png', 
    'assets/robot-sprite.json');
  game.load.atlasJSONHash('player', 'assets/dog-spritesheet.png',
    'assets/dog-sprite.json');
}

Load.prototype.create = function() {
  // this.game.stage.backgroundColor = '000000';
  this.game.state.start('menu');
}
