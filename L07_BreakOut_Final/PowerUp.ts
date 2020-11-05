namespace L07_BreakOut_Final {
  import ƒ = FudgeCore;

  export class PowerUp extends Moveable {
    private static readonly meshSphere: ƒ.MeshSphere = new ƒ.MeshSphere("Sphere", 5, 10);

    public constructor(_name: string, _position: ƒ.Vector2, _size: ƒ.Vector2) {
      super(_name, _position, _size);
      this.velocity = ƒ.Vector3.Y(-5);

      this.getComponent(ƒ.ComponentMesh).mesh = PowerUp.meshSphere;
    }
  }
}