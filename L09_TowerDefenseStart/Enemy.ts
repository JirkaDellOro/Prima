namespace L09_TowerDefenseStart {
  export class Enemy extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(4, 2);

    public health: number = 1;
    public stamina: number = 1;
    public speed: number = 0.3 / 1000;
    public nextWaypoint: number = 0;

    constructor(_name: string, _pos: ƒ.Vector3) {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Enemy.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("lightblue");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Enemy.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.5));
      cmpMesh.pivot.translateY(0.5);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    public update(): void {
      // via mutator for demonstration
      let mutator: ƒ.Mutator = this.mtxLocal.getMutator();
      mutator.translation.x += this.speed * ƒ.Loop.timeFrameGame;
      if (mutator.translation.x > 5)
        mutator.translation.x = -5;
      this.mtxLocal.mutate(mutator);
    }
  }
}