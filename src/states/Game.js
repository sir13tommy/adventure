/* globals __DEV__ */
import Phaser from 'phaser'

let map
let ground
let player
let gravity = 5000

export default class extends Phaser.State {
  create (game) {
    const { camera } = this
    
    game.physics.startSystem(Phaser.Physics.P2JS)
    game.physics.p2.gravity.y = gravity
    game.physics.p2.world.defaultContactMaterial.friction = 0
    game.physics.p2.setImpactEvents(true)

    const mapCollisionGroup = game.physics.p2.createCollisionGroup()
    const playerCollisionGroup = game.physics.p2.createCollisionGroup()
    const enemieCollisionGroup = game.physics.p2.createCollisionGroup()

    map = game.add.tilemap('level-1')
    map.addTilesetImage('enemies', 'enemies')
    map.addTilesetImage('tiles', 'tiles')

    map.setCollisionByExclusion([])
    
    const enemies = map.createLayer('enemies')
    const enemiesObjects = game.physics.p2.convertTilemap(map, enemies)
    enemiesObjects.forEach(enemieObj => {
      enemieObj.setCollisionGroup(enemieCollisionGroup)
      enemieObj.collides(playerCollisionGroup)
    })
    
    ground = map.createLayer('ground')
    ground.resizeWorld()
    game.physics.p2.setBoundsToWorld(true, true, true, true, true)
    const tiles = game.physics.p2.convertTilemap(map, ground)
    tiles.forEach(tile => {
      tile.setCollisionGroup(mapCollisionGroup)
      tile.collides(playerCollisionGroup)
    })

    let playerPos
    map.objects.points.forEach(object =>{ 
      if (object.hasOwnProperty('name') && object.name === 'Spawning Point') {
        playerPos = new Phaser.Point(object.x, object.y)
      }
    })
    player = game.add.sprite(playerPos.x, playerPos.y, 'player')
    game.physics.p2.enable(player)
    player.body.setCollisionGroup(playerCollisionGroup)
    player.body.collides(mapCollisionGroup)
    player.body.collides(enemieCollisionGroup, () => {

    })
    player.body.velocity.x = 800

    player.body.fixedRotation = true

    camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER)

    this._enableInputListener()
  }

  _enableInputListener () {
    this.game.input.onDown.add(() => {
      this.game.physics.p2.gravity.y *= -1
    })
  }

  update () {
    if (player.alive) {
      player.body.velocity.x = 800
    }
  }
  playerDie () {
    debugger
    if (player.alive) {
      player.kill()
      camera.shake()
    }
  }

  render() {
    this.game.debug.body(player);
  }
}
