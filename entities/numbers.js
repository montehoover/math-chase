Numbers = function(game) {
    
    this.game = game;
    this.group = null;
    this.numCount = null;
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
  this.numCount = 1;
  
  // // Audio
  // this.hurtSound = this.game.add.audio('hurt');
  // this.hurtSound.volume = 0.4;
  // this.hurtSound.loop = false;
  
  // this.letter_found = this.game.add.audio('letter-found');
  // this.letter_found.volume = 0.4;
  // this.letter_found.loop = false;

}


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
  console.log('created ' + n.value);
}


Numbers.prototype.collectNumber = function(player, n) {
  // this.hurtSound.play();
  console.log('collected ', n.value);
  console.log('numcount ', this.numCount);
  console.log('sum ', this.numCount + n.value);
  this.numCount += n.value;
  console.log('new numcount ', this.numCount)
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