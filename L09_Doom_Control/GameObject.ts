namespace L09_Doom_Control {
  import ƒ = FudgeCore;

  export class GameObject extends ƒ.Node {
    private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();

    public constructor(_name: string, _size: ƒ.Vector2, _position: ƒ.Vector3, _rotation: ƒ.Vector3) {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
      this.mtxLocal.rotation = _rotation;

      let cmpQuad: ƒ.ComponentMesh = new ƒ.ComponentMesh(GameObject.meshQuad);
      this.addComponent(cmpQuad);
      cmpQuad.pivot.scale(_size.toVector3(1));
    }
  }
}