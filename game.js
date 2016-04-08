// Runs a new game of Math Chase

// As an instance of Phaser.Game, it has a 'state' attribute
// that stores Phaser.State objects and handles cleanly running
// the following state methods:
// 1. .init()
// 2. .preload()
// 3. .create()
// 4. .update()

var game = new Phaser.Game(1024, 512, Phaser.AUTO, 'div2');


game.state.add('boot', new Boot(game));
game.state.add('load', new Load(game));
game.state.add('menu', new Menu(game));
game.state.add('play', new Play(game));

game.state.start('boot');