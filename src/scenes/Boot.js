import Phaser from 'phaser'
import logo from '../assets/logo.png'

export default class extends Phaser.Scene {
  constructor() {
    super()
  }
  preload () {
    this.load.image('logo', logo)
  }

  create () {
    this.scene.start('PRELOAD')
  }
}