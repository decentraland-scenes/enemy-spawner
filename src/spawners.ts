import * as utils from '@dcl/ecs-scene-utils'
import { Enemy } from './enemy'

const spaceships = {
  redSpaceship: new GLTFShape('models/redSpaceship.glb'),
  greenSpaceship: new GLTFShape('models/greenSpaceship.glb'),
  blueSpaceship: new GLTFShape('models/blueSpaceship.glb'),
}

// General config
const BASE_SPAWN_TIME = 1500 // In milliseconds
const MAX_TIME_OFFSET = 1500
const POSITION_Z = 30

function spawnEnemy(index: string, x: number, y: number, z: number): void {
  const enemy = new Enemy(
    spaceships[index],
    new Transform({ position: new Vector3(x, y, z) })
  )
}

// Randomise the spawn time
function getRandomSpawnTime(): number {
  return BASE_SPAWN_TIME + Math.random() * MAX_TIME_OFFSET
}

// Spawning from a circle
const circle = {
  radius: 3.25,
  centerX: 6,
  centerY: 6,
}
const circleSpawner = new Entity()
circleSpawner.addComponent(
  new utils.Interval(getRandomSpawnTime(), () => {
    let randomRadius = circle.radius * Math.sqrt(Math.random())
    let angle = Math.random() * 2 * Math.PI
    let x = circle.centerX + randomRadius * Math.cos(angle)
    let y = circle.centerY + randomRadius * Math.sin(angle)
    spawnEnemy('redSpaceship', x, y, POSITION_Z)
  })
)
engine.addEntity(circleSpawner)

// Spawning from a triangle
const triangle = {
  pointA: new Vector2(3.114, -3.106),
  pointB: new Vector2(0, 2.289),
  pointC: new Vector2(-3.114, -3.106),
  centerX: 16,
  centerY: 6,
}
const triangleSpawner = new Entity()
triangleSpawner.addComponent(
  new utils.Interval(getRandomSpawnTime(), () => {
    let r1 = Math.random()
    let r2 = Math.random()
    let sqrtR1 = Math.sqrt(r1)
    let x =
      triangle.centerX +
      (1 - sqrtR1) * triangle.pointA.x +
      sqrtR1 * (1 - r2) * triangle.pointB.x +
      sqrtR1 * r2 * triangle.pointC.x
    let y =
      triangle.centerY +
      (1 - sqrtR1) * triangle.pointA.y +
      sqrtR1 * (1 - r2) * triangle.pointB.y +
      sqrtR1 * r2 * triangle.pointC.y
    spawnEnemy('greenSpaceship', x, y, POSITION_Z)
  })
)
engine.addEntity(triangleSpawner)

// Spawning from a rectangle
const rectangle = {
  sizeX: 6,
  sizeY: 6,
  centerX: 27,
  centerY: 6,
}
const rectangleSpawner = new Entity()
rectangleSpawner.addComponent(
  new utils.Interval(getRandomSpawnTime(), () => {
    let x =
      rectangle.centerX - rectangle.sizeX / 2 + Math.random() * rectangle.sizeX
    let y =
      rectangle.centerY - rectangle.sizeY / 2 + Math.random() * rectangle.sizeY
    spawnEnemy('blueSpaceship', x, y, POSITION_Z)
  })
)
engine.addEntity(rectangleSpawner)
