Background = function(game) {
  this.game = game;
  this.bg = null;
  this.ground = null;

}


Background.prototype.create = function() {
  this.bg = this.game.add.tileSprite(0, 0, 1024, 452, 'bg');
  this.ground = this.game.add.tileSprite(0, this.game.world.height - 60, 1024, 60, 'ground');
  this.game.physics.enable(this.ground);
  this.ground.body.immovable = true;
  this.ground.body.allowGravity = false;
  // Raise physics body of ground by 20px so the players appear higher off it.
  this.ground.body.setSize(this.ground.width, this.ground.height + 25, 0, -25);
}


Background.prototype.update = function() {
  this.bg.tilePosition.x -= 2;
  this.ground.tilePosition.x -=2;
}