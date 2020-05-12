namespace L06_Snake3D_HeadControl {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Snake extends ƒ.Node {
    private dirCurrent: ƒ.Vector3 = ƒ.Vector3.X();
    private dirNew: ƒ.Vector3;
    private head: ƒ.Node;

    constructor() {
      super("Snake");
      console.log("Creating Snake");
      this.createSegement(4);
    }

    public move(): void {
      this.dirCurrent = this.dirNew || this.dirCurrent;
      let child: ƒ.Node = this.head;
      let cmpPrev: ƒ.ComponentTransform = child.getComponent(ƒ.ComponentTransform); 
      let mtxHead: ƒ.Matrix4x4;
      while (true) {
        mtxHead = cmpPrev.local.copy;
        mtxHead.translate(this.dirCurrent);
        if (Math.abs(mtxHead.translation.x) < 4 && Math.abs(mtxHead.translation.y) < 4 && Math.abs(mtxHead.translation.z) < 4)
          break;
        this.rotate(ƒ.Vector3.Z(-90));
      }

      let cmpNew: ƒ.ComponentTransform = new ƒ.ComponentTransform(mtxHead);

      for (let segment of this.getChildren()) {
        cmpPrev = segment.getComponent(ƒ.ComponentTransform);
        segment.removeComponent(cmpPrev);
        segment.addComponent(cmpNew);
        cmpNew = cmpPrev;
      }
    }

    public set direction(_new: ƒ.Vector3) {
      if (this.dirCurrent.equals(ƒ.Vector3.SCALE(_new, -1)))
        return;
      console.log(this.dirCurrent, _new);
      this.dirNew = _new;
    }

    public rotate(_rotation: ƒ.Vector3): void {
      this.head.mtxLocal.rotate(_rotation);
    }

    private createSegement(_segments: number): void {
      let mesh: ƒ.MeshCube = new ƒ.MeshCube();
      let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));

      for (let i: number = 0; i < _segments; i++) {
        let segment: ƒ.Node = new ƒ.Node("Segment");

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        segment.addComponent(cmpMesh);
        cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));

        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        segment.addComponent(cmpMaterial);
        cmpMaterial.clrPrimary = ƒ.Color.CSS("yellow");

        segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));

        this.appendChild(segment);
      }

      this.head = this.getChildren()[0];
      let cosys: ƒAid.NodeCoordinateSystem = new ƒAid.NodeCoordinateSystem("ControlSystem");
      cosys.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(5))));
      this.head.addChild(cosys);
    }
  }
}