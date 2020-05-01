namespace L03_SnakeMove {
  import ƒ = FudgeCore;

  export class Snake extends ƒ.Node {
    public direction: ƒ.Vector3 = ƒ.Vector3.X();

    constructor() {
      super("Snake");
      console.log("Creating Snake");
      this.createSegement(4);
    }
    
    public move(): void {
      let child: ƒ.Node = this.getChildren()[0];
      let cmpPrev: ƒ.ComponentTransform = child.getComponent(ƒ.ComponentTransform);  // child.cmpTransform;
      let mtxHead: ƒ.Matrix4x4 = cmpPrev.local.copy;
      mtxHead.translate(this.direction);
      let cmpNew: ƒ.ComponentTransform = new ƒ.ComponentTransform(mtxHead);

      for (let segment of this.getChildren()) {
        cmpPrev = segment.getComponent(ƒ.ComponentTransform);
        segment.removeComponent(cmpPrev);
        segment.addComponent(cmpNew);
        cmpNew = cmpPrev;
      }
    }

    private createSegement(_segments: number): void {
      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
      let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));

      for (let i: number = 0; i < _segments; i++) {
        let segment: ƒ.Node = new ƒ.Node("Segment");

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        segment.addComponent(cmpMesh);
        cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));

        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        segment.addComponent(cmpMaterial);

        segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));

        this.appendChild(segment);
      }
    }
  }
}