Player = function(game) {
  this.game = game;
  this.sprite = null;
  this.cursors = null;
}

Player.prototype.create = function() {
  this.sprite = this.game.add.sprite(100, this.game.world.height - 250, 'fox');
  // this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.scale.setTo(0.25, 0.25);
  this.game.physics.arcade.enable(this.sprite);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.gravity.y = 900;
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.bounce.x = 0.2;
  this.sprite.body.setSize(290, 400);


  this.sprite.animations.add('run', 
  ['Run (1)', 'Run (2)', 'Run (3)', 'Run (4)', 'Run (5)', 'Run (6)', 'Run (7)', 'Run (8)'],
  15, true);
  
  this.cursors = this.game.input.keyboard.createCursorKeys();
}
Player.prototype.update = function() {
  
  this.sprite.body.velocity.x = 10;
  
  if (this.cursors.left.isDown) {
    this.sprite.body.velocity.x = -300;
  } else if (this.cursors.right.isDown) {
    this.sprite.body.velocity.x = 300;
  }
  
  // if (this.cursors.up.isDown && this.sprite.body.touching.down) {
  if (this.cursors.up.isDown) {  
    this.sprite.body.velocity.y = -350;
  } else {
    this.sprite.animations.play('run');
  }
  
  // if (this.sprite.body.velocity.y < 0) {
  //   this.sprite.frameName = 'fall';
  // }
  
  // if (this.sprite.body.velocity.y > 0) {
  //   this.sprite.frameName = 'jump';
  // }
}
