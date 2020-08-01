import { Sound } from "./sound"

// Base
const base = new Entity()
base.addComponent(new GLTFShape("models/baseLight.glb"))
base.addComponent(
  new Transform({
    scale: new Vector3(2, 1, 2),
  })
)
engine.addEntity(base)

// Portals
const POSITION_Z = 30
const redPortal = new Entity()
redPortal.addComponent(new GLTFShape("models/redPortal.glb"))
redPortal.addComponent(
  new Transform({
    position: new Vector3(6, 6, POSITION_Z),
  })
)
engine.addEntity(redPortal)

const greenPortal = new Entity()
greenPortal.addComponent(new GLTFShape("models/greenPortal.glb"))
greenPortal.addComponent(
  new Transform({
    position: new Vector3(16, 6, POSITION_Z),
  })
)
engine.addEntity(greenPortal)

const bluePortal = new Entity()
bluePortal.addComponent(new GLTFShape("models/bluePortal.glb"))
bluePortal.addComponent(
  new Transform({
    position: new Vector3(27, 6, POSITION_Z),
  })
)
engine.addEntity(bluePortal)

// Controls
const blasterSound = new Sound(new AudioClip("sounds/blaster.mp3"))

Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, () => {
  blasterSound.getComponent(AudioSource).playOnce()
})
