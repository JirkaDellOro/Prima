namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  enum JOB {
    IDLE, PATROL, CHASE
  }

  export class StateMachine extends ƒAid.ComponentStateMachine<JOB> {
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(StateMachine);
    private static instructions: ƒAid.StateMachineInstructions<JOB> = StateMachine.get();


    constructor() {
      super();
      this.instructions = StateMachine.instructions; // setup instructions with the static set

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
    }

    public static get(): ƒAid.StateMachineInstructions<JOB> {
      let setup: ƒAid.StateMachineInstructions<JOB> = new ƒAid.StateMachineInstructions();
      setup.transitDefault = StateMachine.transitDefault;
      setup.actDefault = StateMachine.actDefault;
      setup.setAction(JOB.CHASE, <ƒ.General>this.actSpin);
      return setup;
    }

    private static transitDefault(_machine: StateMachine): void {
      let random: number = Math.floor(Math.random() * Object.keys(JOB).length / 2);
      window.setTimeout(() => _machine.transit(random), 1000);
      console.log(`${JOB[_machine.stateNext]}`);
    }

    private static async actDefault(_machine: StateMachine): Promise<void> {
      //
    }

    private static async actSpin(_machine: StateMachine): Promise<void> {
      _machine.node.mtxLocal.rotateY(10);
    }

    // Activate the functions of this component as response to events
    private hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          StateMachine.transitDefault(this);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;
      }
    }

    private update = (_event: Event): void => {
      if (this.stateCurrent == JOB.CHASE)
        this.act();
    }



    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}