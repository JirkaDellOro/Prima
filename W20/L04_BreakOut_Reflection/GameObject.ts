namespace L04_BreakOut_Reflection {
  import ƒ = FudgeCore;

  export class GameObject extends ƒ.Node {
    private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
    private static readonly mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));

    public velocity: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public rect: ƒ.Rectangle;

    public constructor(_name: string, _position: ƒ.Vector2, _size: ƒ.Vector2) {
      super(_name);

      this.rect = new ƒ.Rectangle(_position.x, _position.y, _size.x, _size.y, ƒ.ORIGIN2D.CENTER);

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position.toVector3(0))));

      let cmpQuad: ƒ.ComponentMesh = new ƒ.ComponentMesh(GameObject.meshQuad);
      this.addComponent(cmpQuad);
      cmpQuad.pivot.scale(_size.toVector3(0));

      let cMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(GameObject.mtrSolidWhite);
      this.addComponent(cMaterial);
    }

    /**
     * move moves the game object and the collision detection reactangle
     */
    public move(): void {
      let frameTime: number = ƒ.Time.game.getElapsedSincePreviousCall() / 1000;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.velocity, frameTime);

      this.mtxLocal.translate(distance);
      this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
      this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
    }
  }
}