export class Sound extends Entity {
  constructor(clip: AudioClip) {
    super()
    engine.addEntity(this)
    this.addComponent(new AudioSource(clip))
    this.addComponent(new Transform())
    this.getComponent(Transform).position = Camera.instance.position
  }
  playAudio() {
    this.getComponent(AudioSource).playOnce()
  }
}