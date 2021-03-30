namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export class Invader extends ƒ.Node {
    constructor(_x: number, _y: number) {
      super("Invader" + (_x + _y * 11));

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX((_x - 5) * 15 / 13);
      this.mtxLocal.translateY((_y * 15 + 65) / 13);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
      cmpMesh.mtxPivot.scaleX(12 / 13);
      cmpMesh.mtxPivot.scaleY(8 / 13);
      this.addComponent(cmpMesh);

      this.addComponent(new ƒ.ComponentMaterial(material));
    }
  }
}