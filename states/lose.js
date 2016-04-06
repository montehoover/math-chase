Lose = function(game) {
  this.game = game;
}

Lose.prototype = {
  create: function() {
    console.log('menu create');
    var title = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'You Lose!\nClick to play again!', { font: '35px Arial', fill: '#ffffff', align: 'center' });
    title.anchor.setTo(0.5, 0.5);
    
    this.game.input.onDown.addOnce(this.start, this);
  },
  
  start: function() {
    this.game.state.start('menu');
  }
}