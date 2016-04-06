Menu = function(game) {
  this.game = game;
}

Menu.prototype = {
  create: function() {
    var title = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Math Chase\nHit space to continue', { font: '35px Arial', fill: '#ffffff', align: 'center' });
    title.anchor.setTo(0.5, 0.5);
    
    var space = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    space.onDown.addOnce(this.start, this);
    this.game.input.onDown.addOnce(this.start, this);

  },
  
  start: function() {
    this.game.state.start('play');
  }
}