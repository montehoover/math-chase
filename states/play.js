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
  this.levels = {};
}



Play.prototype.create = function() {
  this.levels = {
    current: 1,
    goals: {
      1: 10,
      2: 22,
      3: 33,
      4: 48
    }
  };

  // Create background and static entities
  this.background.create()

  // Create main character entities
  this.player.create();
  this.enemy.create();

  // Create small game entities
  this.numbers.create();
  this.game.time.events.loop(Phaser.Timer.SECOND * 0.5, newNum, this);
  function newNum() {
    this.numbers.createNumber(this.enemy.sprite.x, this.levels.current);
  }

  var style = {fontSize: '32px', fill: '#000'};
  this.levelText = this.game.add.text(16, 16, 'Level: ' + this.levels.current, style);
  this.goalText = this.game.add.text(300, 16, 'Target Speed: ' + this.levels.goals[this.levels.current], style);
  this.speedText = this.game.add.text(16, 60, 'Current Speed:' + this.numbers.numCount, style);
  this.messageText = this.game.add.text(600, 16, 'Catch the robot!', style);
}



Play.prototype.update = function() {
  this.game.physics.arcade.collide(this.player.sprite, this.background.ground);
  this.game.physics.arcade.collide(this.enemy.sprite, this.background.ground);
  this.game.physics.arcade.overlap(this.player.sprite, this.enemy.sprite, winGame, null, this);
  this.game.physics.arcade.overlap(this.player.sprite, this.numbers.group, collectNumber, null, this);

  this.player.update()
  this.enemy.update()

  if (this.numbers.numCount = this.levels.goals[this.levels.current]) {
    this.player.sprite.body.velocity.x += 100;
  }

  if (this.enemy.sprite.position.x >= this.game.world.width - this.enemy.sprite.body.width) {
    console.log("lost");
    game.state.start('menu', true, false, 'lost');
  }
}

var winGame = function(player, enemy) {
  this.levels.current += 1;
  game.state.start('menu', true, false, 'won');
}

var collectNumber = function(player, number) {
  this.numbers.collectNumber(player, number);
  this.speedText.text = 'Current Speed:' + this.numbers.numCount;
  if (this.numbers.numCount = this.levels.goals[this.levels.current]) {
    this.player.sprite.body.velocity.x += 100;
  } else if (this.numbers.numCount > this.levels.goals[this.levels.current]) {
    this.player.sprite.body.velocity.x += 100;
    this.messageText.text = 'Ouch, you went too fast!';
  }
}