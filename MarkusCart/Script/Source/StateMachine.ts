namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  enum JOB {
    IDLE, ESCAPE, DIE, RESPAWN
  }

  export class StateMachine extends ƒAid.ComponentStateMachine<JOB> {
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(StateMachine);
    private static instructions: ƒAid.StateMachineInstructions<JOB> = StateMachine.get();
    public speedEscape: number = 3;


    constructor() {
      super();
      this.instructions = StateMachine.instructions; // setup instructions with the static set

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    public static get(): ƒAid.StateMachineInstructions<JOB> {
      let setup: ƒAid.StateMachineInstructions<JOB> = new ƒAid.StateMachineInstructions();
      setup.transitDefault = StateMachine.transitDefault;
      setup.actDefault = StateMachine.actDefault;
      setup.setAction(JOB.IDLE, <ƒ.General>this.actIdle);
      setup.setAction(JOB.ESCAPE, <ƒ.General>this.actEscape);
      return setup;
    }

    private static transitDefault(_machine: StateMachine): void {
      // 
    }

    private static async actDefault(_machine: StateMachine): Promise<void> {
      // console.log(_machine.stateCurrent);
    }

    private static async actIdle(_machine: StateMachine): Promise<void> {
      _machine.node.mtxLocal.rotateY(10);
    }
    private static async actEscape(_machine: StateMachine): Promise<void> {
      let difference: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(_machine.node.mtxWorld.translation, cart.mtxWorld.translation);
      difference.normalize(_machine.speedEscape * ƒ.Loop.timeFrameGame / 1000);
      _machine.node.mtxLocal.translate(difference, false);
    }

    // Activate the functions of this component as response to events
    private hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          this.transit(JOB.IDLE);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          let trigger: ƒ.ComponentRigidbody = this.node.getChildren()[0].getComponent(ƒ.ComponentRigidbody);
          trigger.addEventListener(ƒ.EVENT_PHYSICS.TRIGGER_ENTER, (_event: ƒ.EventPhysics) => {
            console.log("TriggerEnter", _event.cmpRigidbody.node.name);
            this.transit(JOB.ESCAPE);
          });
          trigger.addEventListener(ƒ.EVENT_PHYSICS.TRIGGER_EXIT, (_event: ƒ.EventPhysics) => {
            console.log("TriggerExit", _event.cmpRigidbody.node.name);
            if (this.stateCurrent == JOB.ESCAPE)
              this.transit(JOB.IDLE);
          });
          break;
      }
    }

    private update = (_event: Event): void => {
      this.act();
    }



    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}