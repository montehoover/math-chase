// Play object class, which inherits from Phaser.State class

// As an instance of Phaser.State, the Phaser.Game.StateManager
// cleanly handles running the following state methods:
// 1. .init()
// 2. .preload()
// 3. .create()
// 4. .update()

Play = function(game) {
  this.game = game;

  this.platforms = null;
  this.enemy = new Enemy(game);
  this.player = new Player(game);
  this.cursors = null;
  this.score = 0;
  this.scoreText = null;
  this.stars = null;
  this.bg = null;
  this.ground = null;
  this.diamond = null;
  this.numbers = new Numbers(game);
}



Play.prototype.create = function() {
  // Create background and static entities
  this.bg = this.game.add.tileSprite(0, 0, 1024, 452, 'bg');
  this.ground = this.game.add.tileSprite(0, this.game.world.height - 60, 1024, 60, 'ground');
  this.game.physics.enable(this.ground);
  this.ground.body.immovable = true;
  this.ground.body.allowGravity = false;
  // Raise physics body of ground by 20px so the players appear higher off it.
  this.ground.body.setSize(this.ground.width, this.ground.height + 20, 0, -20);


  // Create main character entities
  this.player.create();
  this.enemy.create();


  // Create small game entities
  this.numbers.create()
  var n = this.numbers.group.create(this.enemy.sprite.position.x, this.enemy.sprite.position.y, 'numbers', 'one');
  n.body.allowGravity = false;
  n.scale.setTo(0.25, 0.25);
  n.checkWorldBounds = true;
  n.events.onOutOfBounds.add(this.numberRecycle, this);
  n.value = this.numbers.frameDict['one'];
  n.body.velocity.x = this.game.rnd.integerInRange(-300, -100);


  this.stars = this.game.add.group();
  this.stars.enableBody = true;
  for (var i = 0; i < 12; i++){
    var star = this.stars.create(i*70, 0, 'star');
    star.body.gravity.y = 6;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  this.scoreText = this.game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
}



Play.prototype.update = function() {
  this.bg.tilePosition.x -= 2;
  this.ground.tilePosition.x -=2;
  this.game.physics.arcade.collide(this.player.sprite, this.ground);
  this.game.physics.arcade.collide(this.enemy.sprite, this.ground);
  this.game.physics.arcade.collide(this.stars, this.ground);
  this.game.physics.arcade.collide(this.diamond, this.enemy.sprite);
  this.game.physics.arcade.overlap(this.enemy.sprite, this.stars, this.collectStar, null, this);
  this.game.physics.arcade.overlap(this.player.sprite, this.enemy.sprite, this.winGame, null, this);
  this.game.physics.arcade.overlap(this.player.sprite, this.numbers.group, this.collectNumber, null, this);


  if (this.enemy.sprite.position.x >= this.game.world.width - this.enemy.sprite.body.width) {
    console.log("lost");
    game.state.start('menu', true, false, 'lost');
  }

  this.player.update()
  this.enemy.update()
}



Play.prototype.numberRecycle = function(n) {
  n.frame = 'ten'      
  n.reset(this.enemy.sprite.position.x, this.enemy.sprite.position.y);
  n.body.velocity.x = this.game.rnd.integerInRange(-300, -100); 
}


Play.prototype.winGame = function(player, enemy) {
  game.state.start('menu', true, false, 'won');
}

Play.prototype.collectNumber = function(player, n) {
  // this.hurtSound.play();
  n.kill();
  this.numberRecycle(n);
  // this.wrongLetters.push(this.alph.splice(alphElement, 1));
  // this.deathCounter++;
  // this.counterMessage.setText('Wrong Letters: ' + this.deathCounter);
}

Play.prototype.collectStar = function(player, star) {
    star.kill() // Remove sprite from game
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
}