namespace L10_Doom_Mouse {
  import ƒ = FudgeCore;

  export class Wall extends GameObject {
    // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();

    public constructor(_size: ƒ.Vector2, _position: ƒ.Vector3, _rotation: ƒ.Vector3, _material: ƒ.Material) {
      super("Wall", _size, _position, _rotation);

      // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(_material);
      cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));
      this.addComponent(cmpMaterial);
    }
  }
}