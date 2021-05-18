export class Sound extends Entity {
  constructor(clip: AudioClip) {
    super()
    engine.addEntity(this)
    this.addComponent(new AudioSource(clip))
    this.addComponent(new Transform())
    this.setParent(Attachable.AVATAR)
  }
  playAudio() {
    this.getComponent(AudioSource).playOnce()
  }
}
