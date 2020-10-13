namespace L09_TowerDefenseStart {
  import ƒAid = FudgeAid;
  export class Tower extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Tower", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static meshBase: ƒ.MeshPyramid = new ƒ.MeshPyramid();
    private static meshTop: ƒ.MeshSphere = new ƒ.MeshSphere(10, 4);
    private static meshGun: ƒ.MeshCube = new ƒ.MeshCube();

    public health: number = 1;
    public strength: number = 0.1;
    public range: number = 4;
    public rate: number = 0.5;

    private top: ƒ.Node;
    private gun: ƒ.Node;

    constructor(_name: string, _pos: ƒ.Vector3) {
      super(_name);
      let base: ƒAid.Node = new ƒAid.Node("Base", null, Tower.material, Tower.meshBase);
      this.top = new ƒAid.Node("Top", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), Tower.material, Tower.meshTop);
      this.gun = new ƒAid.Node("Base", ƒ.Matrix4x4.IDENTITY(), Tower.material, Tower.meshGun);
      let mtxGun: ƒ.Matrix4x4 = this.gun.getComponent(ƒ.ComponentMesh).pivot;
      mtxGun.scale(new ƒ.Vector3(0.1, 0.1, 1));
      mtxGun.translateZ(0.5);

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
      this.addChild(base);
      this.addChild(this.top);
      this.top.addChild(this.gun);
    }

    public follow(_enemy: ƒ.Node): void {
      let distanceSquared: number = ƒ.Vector3.DIFFERENCE(this.mtxWorld.translation, _enemy.mtxWorld.translation).magnitudeSquared;
      if (distanceSquared > (this.range * this.range))
        return;

      this.top.mtxLocal.lookAt(_enemy.mtxWorld.translation, ƒ.Vector3.Y());
      // this.gun.mtxLocal.lookAt(_enemy.mtxWorld.translation);
    }
  }
}