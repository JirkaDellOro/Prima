namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export class MotherShip extends QuadNode {
    static instance: MotherShip;
    static material: ƒ.Material = new ƒ.Material("MotherShipMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0.2, 0.2, 1)));

    private constructor() {
      let pos: ƒ.Vector2 = new ƒ.Vector2(75 / 13, 140 / 13);
      let scale: ƒ.Vector2 = new ƒ.Vector2(14 / 13, 7 / 13);
      super("MotherShip", pos, scale);
      this.getComponent(ƒ.ComponentMaterial).clrPrimary = new ƒ.Color(1, 0.2, 0.2, 1);
    }

    static getInstance(): Invader {
      if (this.instance == null) this.instance = new MotherShip();
      return this.instance;
    }
  }
}