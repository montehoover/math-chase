// Setting up the game size, which div it will be appended to
// (or body if ''), and telling it which functions to use for
// the required preload(), create(), and update() functions
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'div2', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursors;
var score = 0;
var scoreText;
var stars;


// loading images that will be added to the game as backgrounds
// sprites, and physics objects
function preload() {
  // game.load.image('sky', 'assets/sky.png');
  game.load.image('bg', 'assets/fence-background.png')
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  // load a spritesheet, which takes a single image and splits it into
  // frames 32px wide by 48px high (in an array)
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.atlasJSONHash('robot', 'assets/robot-spritesheet-copy.png', 
    'assets/robot-sprite-copy.json');
}

function create() {
  // The game will use the ARCADE physics engine
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0,0, 'bg'); //background (starting from 0,0 - top left)
  platforms = game.add.group(); //creating a grouping of similar physics objects
  platforms.enableBody = true; //enable physics on all members of the group
  
  // first instance of a platform, is the entire ground
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2); //doubles the h/w of the image
  ground.body.immovable = true; //so it doesn't get moved when other
  //bodies collide with it
  
  var ledge = platforms.create(400, 400, 'ground'); //another platform
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'ground'); //a third, starting off-screen
  ledge.body.immovable = true;

  // Add the player.
  player = game.add.sprite(32, game.world.height - 150, 'dude');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2; // Add a bit of vertical bounce.
  player.body.gravity.y = 300; // Add vertical gravity.
  player.body.collideWorldBounds = true; // Can't go off the screen
  // Defining animation for running left and right. Tells it which frames
  // to cycle through, run animation at 10 frames per sec, loop = true.
  player.animations.add('running left', [0, 1, 2, 3], 10, true);
  player.animations.add('running right', [5, 6, 7, 8], 10, true);

  robot = game.add.sprite(300, game.world.height - 150, 'robot');
  game.physics.enable(robot);
  robot.body.bounce.y = 0.2;
  robot.body.gravity.y = 300;
  robot.body.collideWorldBounds = true;
  robot.animations.add('running right', 
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
  // Tells the physics engine to continually test for collisions between
  // the player and platforms objects.
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);
  game.physics.arcade.overlap(player, stars, collectStar, null, this);

  // Continually resets horizontal velocity to 0, so the character
  // stops moving if you let off the arrow key.
  player.body.velocity.x = 0;
  // set movement for cursor keys
  if (cursors.left.isDown) {
    player.body.velocity.x = -150; // speed moving left
    player.animations.play('running left'); // animation moving left
    
    robot.body.velocity.x = -150;
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150; // Speed moving right.
    player.animations.play('running right'); // Animation moving right.

    robot.body.velocity.x = 150;
    robot.animations.play('running right');
  } else {
    player.animations.stop(); // Else it would keep animating after you
    // stoped pressing the arrows.
    player.frame = 4; // What frame it should rest on when stopped.
    robot.animations.stop();
    robot.frame = 'r-idle0';
  }
  // He jumps if both the up arrow is pushed AND he is touching a surface
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350; // How powerful the jump is
    robot.body.velocity.y = -350;
  }
}

function collectStar (player, star) {
  star.kill() // Remove sprite from game
  score += 10;
  scoreText.text = 'Score: ' + score;
}