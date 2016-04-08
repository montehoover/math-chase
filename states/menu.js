// Menu object class, which inherits from Phaser.State class

// As an instance of Phaser.State, the Phaser.Game.StateManager
// cleanly handles running the following state methods:
// 1. .init()
// 2. .preload()
// 3. .create()
// 4. .update()

Menu = function(game) {
  this.game = game;
}

Menu.prototype.init = function(status) {
  this.status = status || '';
}

Menu.prototype.create = function() {
  var message = ''
  if (this.status == 'won') {
    message = 'You win!\nTap to play again';
  } else if (this.status == 'lost') {
    message = 'Game over\nTap to play again';
  }
  else {  
    message = 'Math Chase\nTap to continue';
  } 
  var title = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, message, { font: '35px Arial', fill: '#ffffff', align: 'center' });
  title.anchor.setTo(0.5, 0.5);
  
  var space = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  space.onDown.addOnce(this.start, this);
  this.game.input.onDown.addOnce(this.start, this);

}
  
Menu.prototype.start = function() {
    this.game.state.start('play');
}
