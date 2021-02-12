import * as utils from '@dcl/ecs-scene-utils'
import { Sound } from './sound'

// Sound
const spawnSound = new Sound(new AudioClip('sounds/spawn.mp3'))
const explosionSound = new Sound(new AudioClip('sounds/explosion.mp3'))

// Preload glowing spaceship for when a spaceship is destroyed
const glowingSpaceship = new Entity()
engine.addEntity(glowingSpaceship)
glowingSpaceship.addComponent(new GLTFShape('models/glowingSpaceship.glb'))
glowingSpaceship.addComponent(new Transform())
glowingSpaceship.getComponent(Transform).scale.setAll(0)

// Configuration
const TRAVEL_DISTANCE = 28
const TRAVEL_TIME = 4
const MAX_TRAVEL_TIME_OFFSET = 3

export class Enemy extends Entity {
  constructor(model: GLTFShape, transform: Transform) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)
    spawnSound.getComponent(AudioSource).playOnce()

    // Spaceship movement
    let startPos = transform.position
    let endPos = new Vector3(
      startPos.x,
      startPos.y,
      startPos.z - TRAVEL_DISTANCE
    )
    this.addComponent(
      new utils.MoveTransformComponent(
        startPos,
        endPos,
        TRAVEL_TIME + Math.random() * MAX_TRAVEL_TIME_OFFSET,
        () => {
          engine.removeEntity(this)
        }
      )
    )

    // Spaceship destroyed
    this.addComponent(
      new OnPointerDown(
        () => {
          this.removeComponent(utils.MoveTransformComponent) // Stop the spaceship
          glowingSpaceship.getComponent(Transform).scale.setAll(1)
          glowingSpaceship.getComponent(Transform).position = this.getComponent(
            Transform
          ).position

          // Glow for 1/4 of a second before disappearing
          glowingSpaceship.addComponent(
            new utils.Delay(250, () => {
              glowingSpaceship.getComponent(Transform).scale.setAll(0) // Reset glowing spaceship scale
              engine.removeEntity(this)
            })
          )
          explosionSound.getComponent(AudioSource).playOnce()
        },
        {
          button: ActionButton.POINTER,
          showFeedback: false,
          distance: 50,
        }
      )
    )
  }
}
