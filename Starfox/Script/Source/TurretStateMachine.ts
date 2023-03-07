namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  enum JOB {
    IDLE, ATTACK
  }

  export class TurretStateMachine extends ƒAid.ComponentStateMachine<JOB> {
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(TurretStateMachine);
    private static instructions: ƒAid.StateMachineInstructions<JOB> = TurretStateMachine.get();

    constructor() {
      super();
      this.instructions = TurretStateMachine.instructions; // setup instructions with the static set

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
      setup.transitDefault = TurretStateMachine.transitDefault;
      setup.actDefault = TurretStateMachine.actDefault;
      setup.setAction(JOB.IDLE, <ƒ.General>this.actIdle);
      setup.setAction(JOB.ATTACK, <ƒ.General>this.actAttack);
      return setup;
    }

    private static transitDefault(_machine: TurretStateMachine): void {
      console.log("Transit to", _machine.stateNext);
    }

    private static async actDefault(_machine: TurretStateMachine): Promise<void> {
      console.log(JOB[_machine.stateCurrent]);
    }

    private static async actIdle(_machine: TurretStateMachine): Promise<void> {
      _machine.node.mtxLocal.rotateY(1);
      let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(ship.mtxWorld.translation, _machine.node.mtxWorld.translation);
      if (distance.magnitude < 10)
        _machine.transit(JOB.ATTACK);
    }

    private static async actAttack(_machine: TurretStateMachine): Promise<void> {
      _machine.node.mtxLocal.lookAt(ƒ.Vector3.TRANSFORMATION(ship.mtxWorld.translation, _machine.node.getParent().mtxWorldInverse, true), undefined, true);
      let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(ship.mtxWorld.translation, _machine.node.mtxWorld.translation);
      if (distance.magnitude > 10)
        _machine.transit(JOB.IDLE);
    }

    // private static async actEscape(_machine: StateMachine): Promise<void> {
    //   _machine.cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
    //   let difference: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(_machine.node.mtxWorld.translation, cart.mtxWorld.translation);
    //   difference.normalize(_machine.forceEscape);
    //   _machine.cmpBody.applyForce(difference);
    //   StateMachine.actDefault(_machine);
    // }
    // private static async actDie(_machine: StateMachine): Promise<void> {
    //   //
    // }

    // private static transitDie(_machine: StateMachine): void {
    //   _machine.cmpBody.applyLinearImpulse(ƒ.Vector3.Y(5));
    //   let timer: ƒ.Timer = new ƒ.Timer(ƒ.Time.game, 100, 20, (_event: ƒ.EventTimer) => {
    //     _machine.cmpMaterial.clrPrimary = ƒ.Color.CSS("black", 1 - _event.count / 20);
    //     if (_event.lastCall)
    //       _machine.transit(JOB.RESPAWN);
    //   });
    //   console.log(timer);
    // }

    // private static actRespawn(_machine: StateMachine): void {
    //   let range: ƒ.Vector3 = ƒ.Vector3.SCALE(mtxTerrain.scaling, 0.5);
    //   _machine.cmpBody.setPosition(ƒ.Random.default.getVector3(range, ƒ.Vector3.SCALE(range, -1)));
    //   _machine.transit(JOB.IDLE);
    // }

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
          this.transit(JOB.IDLE);
          // let trigger: ƒ.ComponentRigidbody = this.node.getChildren()[0].getComponent(ƒ.ComponentRigidbody);
          // trigger.addEventListener(ƒ.EVENT_PHYSICS.TRIGGER_ENTER, (_event: ƒ.EventPhysics) => {
          //   console.log("TriggerEnter", _event.cmpRigidbody.node.name);
          //   if (_event.cmpRigidbody.node.name == "Cart" && this.stateCurrent != JOB.DIE)
          //     this.transit(JOB.ESCAPE);
          // });
          // trigger.addEventListener(ƒ.EVENT_PHYSICS.TRIGGER_EXIT, (_event: ƒ.EventPhysics) => {
          //   if (this.stateCurrent == JOB.ESCAPE)
          //     this.transit(JOB.IDLE);
          // });
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