namespace LaserLeague {
  import ƒ = FudgeCore;

  export class Agent extends ƒ.Node {
    public health: number = 1;
    public name: string = "Agent Smith";

    constructor() {
      super("Agent");

      this.addComponent(new ƒ.ComponentTransform);

      this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshQuad("MeshAgent")));
      this.addComponent(new ƒ.ComponentMaterial(
        new ƒ.Material("mtrAgent", ƒ.ShaderLit, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
      );

      this.mtxLocal.scale(ƒ.Vector3.ONE(0.5));
    }
  }
}