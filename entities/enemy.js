Enemy = function(game) {
  this.game = game;
  this.sprite = null;
}


Enemy.prototype.create = function() {
  this.sprite = this.game.add.sprite(650, this.game.world.height - 210, 'robot');
  this.game.physics.arcade.enable(this.sprite);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.immovable = true;
  this.sprite.body.setSize(82, 124);
  
  this.sprite.animations.add('walk', 
    ['r-run0', 'r-run1', 'r-run2', 'r-run3', 'r-run4', 'r-run5', 'r-run6', 'r-run7'],
    15, true);
  this.sprite.body.velocity.x = 25;
}


Enemy.prototype.update = function() {
  this.sprite.animations.play('walk');
}
