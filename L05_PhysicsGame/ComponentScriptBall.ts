namespace L05_PhysicsGame {
  ƒ.Project.registerScriptNamespace(L05_PhysicsGame);

  export class ComponentScriptBall extends ƒ.ComponentScript {
    public name: string = "AudioControl";

    constructor() {
      super();
      console.log("ComponentScriptBall is alive!");

      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndComponentAdd);
    }

    private hndComponentAdd = (_event: CustomEvent): void => {
      if (_event.target == this)
        this.getContainer().addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndComponentAdd);
      else {
        if (_event.detail instanceof ƒ.ComponentRigidbody)
          _event.detail.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.hndCollision);
      }
    }
    private hndCollision = (_event: CustomEvent): void => {
      let cmpAudio: ƒ.ComponentAudio = this.getContainer().getComponent(ƒ.ComponentAudio);
      cmpAudio.play(false);
      gameState.hits++;
    }
  }
}