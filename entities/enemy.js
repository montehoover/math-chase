Enemy = function(game) {
  this.game = game;
  this.sprite = null;
  this.cursors = null;
}

Enemy.prototype.create = function() {
  this.sprite = this.game.add.sprite(300, this.game.world.height - 250, 'robot');
  // this.sprite.anchor.setTo(0.5, 0.5);
  // this.sprite.scale.setTo(0.25, 0.25);
  this.game.physics.arcade.enable(this.sprite);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.bounce.x = 0.2;
  this.sprite.body.setSize(82, 124);
  
  this.sprite.animations.add('walk', 
    ['r-run0', 'r-run1', 'r-run2', 'r-run3', 'r-run4', 'r-run5', 'r-run6', 'r-run7'],
    15, true);
  this.sprite.body.velocity.x = 10;


  // this.cursors = this.game.input.keyboard.createCursorKeys();
}
Enemy.prototype.update = function() {
  this.sprite.animations.play('walk');
}
