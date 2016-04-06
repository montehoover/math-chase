var game = new Phaser.Game(1024, 512, Phaser.AUTO, 'div2', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursors;
var score = 0;
var scoreText;
var stars;
var bg;
var diamond;

function preload() {
  game.load.image('bg', 'assets/fence-background.png')
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.image('diamond', 'assets/diamond.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.atlasJSONHash('robot', 'assets/robot-spritesheet-copy.png', 
    'assets/robot-sprite-copy.json');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  bg = game.add.tileSprite(0, 0, 1024, 512, 'bg');
  diamond = game.add.sprite(1000, game.world.height - 150, 'diamond');
  game.physics.enable(diamond);
  diamond.body.immovable = true;
  diamond.body.velocity.x = -100;


  platforms = game.add.group(); //creating a grouping of similar physics objects
  platforms.enableBody = true; //enable physics on all members of the group
  
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2); //doubles the h/w of the image
  ground.body.immovable = true; //so it doesn't get moved when other
  
  // var ledge = platforms.create(400, 400, 'ground'); //another platform
  // ledge.body.immovable = true;
  // ledge = platforms.create(-150, 250, 'ground'); //a third, starting off-screen
  // ledge.body.immovable = true;

  robot = game.add.sprite(300, game.world.height - 150, 'robot');
  game.physics.enable(robot);
  robot.body.bounce.y = 0.2;
  robot.body.gravity.y = 900;
  robot.body.collideWorldBounds = true;
  robot.anchor.setTo(0.5, 0.5);
  robot.animations.add('walking', 
    ['r-run0', 'r-run1', 'r-run2', 'r-run3', 'r-run4', 'r-run5', 'r-run6', 'r-run7'],
    10, true);
  robot.animations.add('running', 
    ['r-run0', 'r-run1', 'r-run2', 'r-run3', 'r-run4', 'r-run5', 'r-run6', 'r-run7'],
    10, true);


  stars = game.add.group();
  stars.enableBody = true;
  for (var i = 0; i < 12; i++){
    var star = stars.create(i*70, 0, 'star');
    star.body.gravity.y = 6;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  
  cursors = game.input.keyboard.createCursorKeys();
  scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', 
    fill: '#000'});
}

// There is a core game loop that calls update() every frame
function update() {
  bg.tilePosition.x -= 2;
  game.physics.arcade.collide(robot, platforms);
  game.physics.arcade.collide(stars, platforms);
  game.physics.arcade.collide(diamond, robot);
  game.physics.arcade.overlap(robot, stars, collectStar, null, this);

  robot.body.velocity.x = 0;
  robot.animations.play('walking');

  
  if (cursors.left.isDown) {
    robot.scale.x = -1;
    robot.animations.play('running');
    robot.body.velocity.x = -250;
  } else if (cursors.right.isDown) {
    robot.body.velocity.x = 250;
    robot.scale.x = 1;
    robot.animations.play('running');
  } else {
    // robot.animations.stop();
    // robot.frameName = 'r-idle0';
  }
  if (cursors.up.isDown && robot.body.touching.down) {
    robot.body.velocity.y = -550;
  }
}

function collectStar (player, star) {
  star.kill() // Remove sprite from game
  score += 10;
  scoreText.text = 'Score: ' + score;
}