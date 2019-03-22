import Phaser from "phaser";
import Boot from './scenes/Boot'
import Preload from './scenes/Preload'
import GameScene from './scenes/Game'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: window.innerWidth,
  height: window.innerHeight
};

const game = new Phaser.Game(config);

game.scene.add('BOOT', Boot, false)
game.scene.add('PRELOAD', Preload, false)
game.scene.add('GAME', GameScene, false)

game.scene.start('BOOT')