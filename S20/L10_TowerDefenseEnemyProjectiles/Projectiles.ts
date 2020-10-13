namespace L10_TowerDefenseEnemyProjectiles {
  export class Projectile extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshCube = new ƒ.MeshCube();
    public speed: number = 10 / 1000;
    public target: Enemy;

    constructor(_start: ƒ.Vector3, _target: Enemy) {
      super("Projectile");
      this.target = _target;
      
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_start)));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Projectile.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Projectile.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.2));

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    private update(_event: ƒ.Eventƒ): void {
      console.log("Projectile flying");
      let position: ƒ.Vector3 = this.mtxLocal.translation;
      let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
      let distanceToTravel: number = this.speed * ƒ.Loop.timeFrameGame;
      let travel: ƒ.Vector3 = ƒ.Vector3.NORMALIZATION(distance, distanceToTravel);
      this.mtxLocal.translate(travel);
    }
  }
}