namespace L10_TowerDefenseEnemyProjectiles {
  export class Enemy extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(4, 2);

    public health: number = 1;
    public stamina: number = 1;
    public speed: number = 1 / 1000;
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

    public update(_event: ƒ.Eventƒ): void {
      // via mutator for demonstration
      let distanceToTravel: number = this.speed * ƒ.Loop.timeFrameGame;
      let move: ƒ.Vector3;
      while (true) {
        move = ƒ.Vector3.DIFFERENCE(path[this.nextWaypoint], this.mtxLocal.translation);
        if (move.magnitudeSquared > distanceToTravel * distanceToTravel)
          break;

        this.nextWaypoint = ++this.nextWaypoint % (sizeTerrain + 1);
        if (this.nextWaypoint == 0) 
          this.mtxLocal.translation = path[0];
      }

      this.mtxLocal.translate(ƒ.Vector3.NORMALIZATION(move, distanceToTravel));
    }
  }
}