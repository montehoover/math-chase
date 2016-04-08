// Play object class, which inherits from Phaser.State class

// As an instance of Phaser.State, the Phaser.Game.StateManager
// cleanly handles running the following state methods:
// 1. .init()
// 2. .preload()
// 3. .create()
// 4. .update()

Play = function(game) {
  this.game = game;

  this.background = new Background(game);
  this.enemy = new Enemy(game);
  this.player = new Player(game);
  this.numbers = new Numbers(game);
  this.levelText = null;
  this.goalText = null;
  this.speedText = null;
  this.messageText = null;
}

var targetReached;
var levels = {
    current: 1,
    goals: {
      1: 22,
      2: 33,
      3: 10,
      4: 50
    }
  };

Play.prototype.create = function() {
  targetReached = false;
  

  // Create background and static entities
  this.background.create()

  // Create main character entities
  this.player.create();
  this.enemy.create();

  // Create small game entities
  this.numbers.create();
  this.game.time.events.loop(Phaser.Timer.SECOND, newNum, this);
  function newNum() {
    this.numbers.createNumber(this.enemy.sprite.x, levels.current);
  }

  var style = {fontSize: '32px', fill: '#000'};
  this.levelText = this.game.add.text(16, 16, 'Level: ' + levels.current, style);
  this.goalText = this.game.add.text(16, 60, 'Target: ' + levels.goals[levels.current], style);
  this.speedText = this.game.add.text(16, 104, 'Current Count:' + this.numbers.numCount, style);
  this.messageText = this.game.add.text(300, 16, 'Catch the robot!', style);
}



Play.prototype.update = function() {
  this.game.physics.arcade.collide(this.player.sprite, this.background.ground);
  this.game.physics.arcade.collide(this.enemy.sprite, this.background.ground);
  this.game.physics.arcade.collide(this.player.sprite, this.enemy.sprite, checkWin, null, this);
  if (!targetReached) {
    this.game.physics.arcade.overlap(this.player.sprite, this.numbers.group, collectNumber, null, this);
  }

  this.player.update()
  this.enemy.update()

  if (this.enemy.sprite.position.x >= this.game.world.width - this.enemy.sprite.body.width) {
    console.log("lost");
    game.state.start('menu', true, false, 'lost');
  }
}

var checkWin = function(player, enemy) {
  if (targetReached) {
    levels.current += 1;
    game.state.start('menu', true, false, 'won');
  } else {
    this.messageText.text = 'The robot is too big! Get more numbers.'
  }
}

var collectNumber = function(player, number) {
  this.numbers.collectNumber(player, number);
  this.speedText.text = 'Current Speed:' + this.numbers.numCount;
  if (this.numbers.numCount === levels.goals[levels.current]) {
    targetReached = true; 
    this.player.getEnemy()
    this.player.sprite.body.velocity.x += 400;
  } else if (this.numbers.numCount > levels.goals[levels.current]) {
    this.player.punish();
    this.messageText.text = 'Ouch, you went over the target!';
  }
}