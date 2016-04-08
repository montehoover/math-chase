Enemy = function(game) {
  this.game = game;
  this.sprite = null;
}


Enemy.prototype.create = function() {
  this.sprite = this.game.add.sprite(300, this.game.world.height - 250, 'robot');
  this.game.physics.arcade.enable(this.sprite);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.bounce.x = 0.2;
  this.sprite.body.setSize(82, 124);
  
  this.sprite.animations.add('walk', 
    ['r-run0', 'r-run1', 'r-run2', 'r-run3', 'r-run4', 'r-run5', 'r-run6', 'r-run7'],
    15, true);
  this.sprite.body.velocity.x = 10;
}


Enemy.prototype.update = function() {
  this.sprite.animations.play('walk');
}
