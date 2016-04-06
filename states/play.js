Play = function(game) {
  this.game = game;
  // this.boy = new Player(game);
  // this.girl = new Girl(game);
  // this.bg = null;
  // this.ground = null;

  this.platforms = null;
  this.robot = null;
  this.cursors = null;
  this.score = 0;
  this.scoreText = null;
  this.stars = null;
  this.bg = null;
  this.ground = null;
  this.diamond = null;
}

Play.prototype = {
  create: function() {
    
    // this.bg = this.game.add.tileSprite(0, 0, 438, 136, 'background');
    // this.ground = this.game.add.tileSprite(0, 125, 438, 44, 'ground');
    // this.game.physics.arcade.enable(this.ground);
    // this.ground.body.allowGravity = false;
    // this.ground.body.immovable = true;
    // this.ground.body.setSize(this.ground.width, this.ground.height - 10, 0, 10);
    
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.input.maxPointers = 1;
  this.bg = this.game.add.tileSprite(0, 0, 1024, 512, 'bg');
  this.ground = this.game.add.tileSprite(0, this.game.world.height - 60, 1024, 60, 'ground');
  this.game.physics.enable(this.ground);
  this.ground.body.immovable = true;
  this.diamond = this.game.add.sprite(1000, this.game.world.height - 150, 'diamond');
  this.game.physics.enable(this.diamond);
  this.diamond.body.immovable = true;
  this.diamond.body.velocity.x = -120;

  // this.platforms = game.add.group(); //creating a grouping of similar physics objects
  // this.platforms.enableBody = true; //enable physics on all members of the group
  //var ground = this.platforms.create(0, game.world.height - 64, 'ground');

  this.robot = this.game.add.sprite(300, game.world.height - 150, 'robot');
  this.game.physics.enable(this.robot);
  this.robot.body.bounce.y = 0.2;
  this.robot.body.gravity.y = 900;
  this.robot.body.collideWorldBounds = true;
  this.robot.anchor.setTo(0.5, 0.5);
  this.robot.body.setSize(82, 124);
  this.robot.animations.add('walking', 
    ['r-run0', 'r-run1', 'r-run2', 'r-run3', 'r-run4', 'r-run5', 'r-run6', 'r-run7'],
    10, true);
  // this.robot.animations.add('running', 
  //   ['r-run0', 'r-run1', 'r-run2', 'r-run3', 'r-run4', 'r-run5', 'r-run6', 'r-run7'],
  //   this., true);


  this.stars = this.game.add.group();
  this.stars.enableBody = true;
  for (var i = 0; i < 12; i++){
    var star = this.stars.create(i*70, 0, 'star');
    star.body.gravity.y = 6;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  
  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.scoreText = this.game.add.text(16, 16, 'score: 0', {fontSize: '32px', 
    fill: '#000'});
  },

  update: function() {
    this.bg.tilePosition.x -= 2;
    this.ground.tilePosition.x -=2;
    this.game.physics.arcade.collide(this.robot, this.ground);
    this.game.physics.arcade.collide(this.stars, this.ground);
    this.game.physics.arcade.collide(this.diamond, this.robot);
    this.game.physics.arcade.overlap(this.robot, this.stars, this.collectStar, null, this);

    this.robot.body.velocity.x = 0;
    this.robot.animations.play('walking');

    
    if (this.cursors.left.isDown) {
      this.robot.scale.x = -1;
      //this.robot.animations.play('walking');
      this.robot.body.velocity.x = -250;
    } else if (this.cursors.right.isDown) {
      this.robot.body.velocity.x = 250;
      this.robot.scale.x = 1;
      //this.robot.animations.play('walking');
    } else {
      //this.robot.animations.play('walking');
      // robot.animations.stop();
      // robot.frameName = 'r-idle0';
    }
    if (this.cursors.up.isDown && this.robot.body.touching.down) {
      this.robot.body.velocity.y = -550;
    }

    if (this.robot.position.x >= this.game.world.width - this.robot.body.width / 2) {
      console.log("won");
      game.state.start('menu', true, false, 'won');
    }
    if (this.robot.position.x <= 0 + this.robot.body.width / 2) {
      console.log("lost");
      game.state.start('menu', true, false, 'lost');
    }

  },

  collectStar: function(player, star) {
      star.kill() // Remove sprite from game
      this.score += 10;
      this.scoreText.text = 'Score: ' + this.score;
  }
}