import Phaser from 'phaser'

export default class extends Phaser.Scene {
  create () {
    const map = this.make.tilemap({key: 'map'})
    const tileset = map.addTilesetImage('adventure', 'tiles')

    const layer = map.createStaticLayer('ground', tileset, 0, 0)
    layer.setScale(this.cameras.main.height / layer.height)
  }
}