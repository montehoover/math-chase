Player = function(game) {
  this.game = game;
  this.sprite = null;
  this.cursors = null;
}

var targetReached;

Player.prototype.create = function() {
  this.sprite = this.game.add.sprite(60, this.game.world.height - 250, 'fox');
  // this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.scale.setTo(0.2, 0.2);
  this.game.physics.arcade.enable(this.sprite);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.gravity.y = 900;
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.bounce.x = 0.2;
  this.sprite.body.setSize(290, 400);
  this.sprite.body.velocity.x = 25;
  targetReached = false;

  this.sprite.animations.add('run', 
  ['Run (1)', 'Run (2)', 'Run (3)', 'Run (4)', 'Run (5)', 'Run (6)', 'Run (7)', 'Run (8)'],
  15, true);
  
  this.cursors = this.game.input.keyboard.createCursorKeys();
}
Player.prototype.update = function() {
  
  if (!targetReached) {
    this.sprite.body.velocity.x = 25;
    
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
  }
  // if (this.sprite.body.velocity.y < 0) {
  //   this.sprite.frameName = 'fall';
  // }
  
  // if (this.sprite.body.velocity.y > 0) {
  //   this.sprite.frameName = 'jump';
  // }
}

// Grow in size and run fast to the enemy
Player.prototype.getEnemy = function() {
  this.sprite.body.velocity.y = -450;
  this.sprite.body.velocity.x = 125;
  this.sprite.scale.setTo(.4, .4);

}

Player.prototype.punish = function() {
  this.sprite.body.velocity.x = 0;
  this.sprite.body.velocity.y = 100;
  this.sprite.scale.setTo(.1, .1);
}
