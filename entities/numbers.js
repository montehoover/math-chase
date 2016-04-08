Numbers = function(game) {
    
    this.game = game;
    this.group = null;
    this.numCount = 1;
};

var frameArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'n-one', 'half']
var frameDict = {
  'zero'  : 0,
  'one'   : 1, 
  'two'   : 2, 
  'three' : 3, 
  'four'  : 4, 
  'five'  : 5, 
  'six'   : 6, 
  'seven' : 7, 
  'eight' : 8, 
  'nine'  : 9, 
  'ten'   : 10, 
  'eleven': 11, 
  'twelve': 12, 
  'n-one' : -1, 
  'half'  : 0.5
}

Numbers.prototype.create = function() {
        
  this.group = this.game.add.group();
  this.group.enableBody = true;

  this.levelText 
  this.targetText
  this.speedText = this.game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
  this.messageText

  
  // this.createLetter(game.world.height - 107);
  // this.createLetter(game.world.height - 85);
  // this.createLetter(game.world.height - 53);
  
  // // Timed function that will create a new letter on the x-axis every 30 seconds
  // this.game.time.events.add(Phaser.Timer.SECOND * 30, this.createLetterTop, this);
  // this.game.time.events.add(Phaser.Timer.SECOND * 60, this.createLetterTop, this);
  // this.game.time.events.add(Phaser.Timer.SECOND * 90, this.createLetterTop, this);
  // this.game.time.events.add(Phaser.Timer.SECOND * 120, this.createLetterTop, this);
  // this.game.time.events.add(Phaser.Timer.SECOND * 150, this.createLetter, this, 185); // Add another horizontal one
  // this.game.time.events.add(Phaser.Timer.SECOND * 180, this.createLetterTop, this);
  // this.game.time.events.add(Phaser.Timer.SECOND * 210, this.createLetterTop, this);
  // this.game.time.events.add(Phaser.Timer.SECOND * 240, this.createLetterTop, this);
  
  // // Our player death counter (will replace with hangman later)
  // var style = {font: "20px Frijole", fill: "#FFFFFF"};
  // this.counterMessage = this.game.add.text(0.5, 0.5, 'Wrong Letters: ' + this.deathCounter, style);
  
  // // Audio
  // this.hurtSound = this.game.add.audio('hurt');
  // this.hurtSound.volume = 0.4;
  // this.hurtSound.loop = false;
  
  // this.letter_found = this.game.add.audio('letter-found');
  // this.letter_found.volume = 0.4;
  // this.letter_found.loop = false;

}

    
// Numbers.prototype.update = function() {      
//   this.game.physics.arcade.overlap(this.game.player.sprite, this.group, this.collectNumber, null, this);
// }


Numbers.prototype.createNumber = function(x, level) {
  // Get a random number for the number bubble based on the current level.
  var num = getNum(level);
  var n = this.group.create(x, getY(), 'numbers', num);
  n.body.allowGravity = false;
  n.scale.setTo(0.25, 0.25);
  n.checkWorldBounds = true;
  n.events.onOutOfBounds.add(function(n) {n.destroy()}, this);
  n.body.velocity.x = this.game.rnd.integerInRange(-300, -100);
  n.value = frameDict[num];
}


Numbers.prototype.collectNumber = function(player, n) {
  // this.hurtSound.play();
  this.numCount += n.value;
  n.destroy();
  //this.numberRecycle(n);
}


function getY() {
  var heights = [100, 250, 400];
  return heights[this.game.rnd.integerInRange(0,2)];
}


// Returns frame name string for random number based on current level.
function getNum(level) {
  return frameArray[this.game.rnd.integerInRange(0, frameArray.length - 1)];
}