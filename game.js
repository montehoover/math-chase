// var game = new Phaser.Game(438, 160, Phaser.CANVAS);
var game = new Phaser.Game(1024, 512, Phaser.AUTO, 'div2');


game.state.add('boot', new Boot(game));
game.state.add('load', new Load(game));
game.state.add('menu', new Menu(game));
game.state.add('play', new Play(game));

game.state.start('boot');