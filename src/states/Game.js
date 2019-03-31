/* globals __DEV__ */
import Phaser from 'phaser'

let map
let layer
let player
let gravity = 9500

export default class extends Phaser.State {
  create (game) {
    const { camera } = this
    map = game.add.tilemap('level-1')
    map.addTilesetImage('tiles', 'tiles')

    map.setCollisionByExclusion([])

    layer = map.createLayer('world')
    layer.resizeWorld()

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = gravity

    let playerPos
    map.objects.points.forEach(object =>{ 
      if (object.hasOwnProperty('name') && object.name === 'Spawning Point') {
        playerPos = new Phaser.Point(object.x, object.y)
      }
    })
    player = game.add.sprite(playerPos.x, playerPos.y, 'player')
    game.physics.arcade.enableBody(player)
    player.body.collideWorldBounds = true
    player.body.velocity.x = 500

    camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER)

    this._enableInputListener()
  }

  _enableInputListener () {
    this.game.input.onDown.add(() => {
      this.game.physics.arcade.gravity.y *= -1
    })
  }

  update () {
    this.game.physics.arcade.collide(player, layer)

    const { camera } = this
  }
}
