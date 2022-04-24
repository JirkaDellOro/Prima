namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class Forest extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(Forest);
    // Properties may be mutated by users in the editor via the automatically created user interface
    // public message: string = "CustomComponentScript added to ";
    public amount: number = 10;


    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = async (_event: Event): Promise<void> => {
      switch (_event.type) {
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.node.addEventListener(ƒ.EVENT.ATTACH_BRANCH, this.hndEvent);
          break;
        case ƒ.EVENT.ATTACH_BRANCH:
          console.log("Forest generation");
          let tree: ƒ.Graph = <ƒ.Graph>ƒ.Project.getResourcesByName("Tree")[0];
          let instance: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(tree);
          this.node.appendChild(instance);
          instance.addComponent(new ƒ.ComponentTransform());
          instance.mtxLocal.rotateX(29);
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}