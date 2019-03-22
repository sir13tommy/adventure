import Phaser from 'phaser'

export default class extends Phaser.Scene {
  preload () {
    this.gameObjects = {}

    let {main: mainCamera} = this.cameras
    const logo = this.add.image(mainCamera.width /2 , mainCamera.height / 2, 'logo')

    this.gameObjects.logo = logo

    this.load.image('tiles', require('../assets/tiles.png'))
    this.load.tilemapTiledJSON('map', require('../levels/adventure-1.json'))
  }

  create () {
    this.scene.start('GAME')
  }

  update () {
    this.gameObjects.logo.rotation += 0.01
  }
}