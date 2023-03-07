namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class SensorScript extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(SensorScript);


    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          // this.node.addEventListener(ƒ.EVENT.GRAPH_INSTANTIATED, this.hndEvent)
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.node.addEventListener(ƒ.EVENT.RENDER_PREPARE, this.update)
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    private update = (_event: Event): void => {
      if (!cmpTerrain)
        return;
      let mesh: ƒ.MeshTerrain = (<ƒ.MeshTerrain>cmpTerrain.mesh);
      let parent: ƒ.Node = this.node.getParent();
      let info: ƒ.TerrainInfo = mesh.getTerrainInfo(parent.mtxWorld.translation, cmpTerrain.mtxWorld);
      if (info.distance < 0)
        this.node.dispatchEvent(new Event("SensorHit", {bubbles: true}));
    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}