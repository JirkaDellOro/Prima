namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export class Projectile extends QuadNode {
    private static count: number = 0;

    constructor(_pos: ƒ.Vector2) {
      let scale: ƒ.Vector2 = new ƒ.Vector2(1 / 13, 5 / 13);
      super("Projectile" + (Projectile.count++), _pos, scale);
    }

    public move(): void {
      this.mtxLocal.translateY(5 * ƒ.Loop.timeFrameReal / 1000);
      this.setRectPosition();
    }
  }
}