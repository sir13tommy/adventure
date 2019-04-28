import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('tiles', 'assets/images/atlas/.dist/tiles.png')
    this.load.image('enemies', 'assets/images/atlas/.dist/enemies.png')
    this.load.image('player', 'assets/images/player.png')
    this.load.tilemap('level-1', 'assets/levels/level-1.json', null, Phaser.Tilemap.TILED_JSON)
  }

  create () {
    this.state.start('Game')
  }
}
