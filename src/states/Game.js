/* globals __DEV__ */
import Phaser from 'phaser'

let map
let layer
let player
let gravity = 5000

export default class extends Phaser.State {
  create (game) {
    const { camera } = this
    
    game.physics.startSystem(Phaser.Physics.P2JS)
    game.physics.p2.gravity.y = gravity

    map = game.add.tilemap('level-1')
    map.addTilesetImage('tiles', 'tiles')

    map.setCollisionByExclusion([])

    layer = map.createLayer('world')
    layer.resizeWorld()

    game.physics.p2.convertTilemap(map, layer);

    let playerPos
    map.objects.points.forEach(object =>{ 
      if (object.hasOwnProperty('name') && object.name === 'Spawning Point') {
        playerPos = new Phaser.Point(object.x, object.y)
      }
    })
    player = game.add.sprite(playerPos.x, playerPos.y, 'player')
    game.physics.p2.enable(player)
    player.body.collideWorldBounds = true
    player.body.velocity.x = 800

    camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER)

    this._enableInputListener()
  }

  _enableInputListener () {
    this.game.input.onDown.add(() => {
      this.game.physics.p2.gravity.y *= -1
    })
  }

  update () {
    const { camera } = this
  }

  render() {
    this.game.debug.body(player);
  }
}
