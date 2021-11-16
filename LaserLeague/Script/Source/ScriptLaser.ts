namespace LaserLeague {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(LaserLeague);  // Register the namespace to FUDGE for serialization

  export class ScriptLaser extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(ScriptLaser);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public rotSpeed: number = 60;  // rotation per millisecond in degrees


    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
      }
    }

    public update = (_event: Event): void => {
      this.node.mtxLocal.rotateZ(this.rotSpeed * ƒ.Loop.timeFrameGame / 1000);
    }

    public checkCollision(_pos: ƒ.Vector3, _radius: number): boolean {
      let beams: ƒ.Node[] = this.node.getChildrenByName("Beam");
      let mtxMeshPivot: ƒ.Matrix4x4 = beams[0].getComponent(ƒ.ComponentMesh).mtxPivot;
      for (let beam of beams) {
        let posLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(_pos, beam.mtxWorldInverse, true);
        if (posLocal.y < -_radius || posLocal.y > mtxMeshPivot.scaling.y + _radius || posLocal.x < -mtxMeshPivot.scaling.x / 2 - _radius || posLocal.x > mtxMeshPivot.scaling.x / 2 + _radius)
          continue;
        return true;
      }
      return false;
    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}