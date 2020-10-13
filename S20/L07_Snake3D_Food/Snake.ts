namespace L07_Snake3D_Food {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Snake extends ƒ.Node {
    public head: ƒ.Node;
    private dirCurrent: ƒ.Vector3 = ƒ.Vector3.X();
    private dirNew: ƒ.Vector3;
    private mesh: ƒ.MeshCube;

    constructor() {
      super("Snake");
      console.log("Creating Snake");
      this.mesh = new ƒ.MeshCube();

      // start with a number of segments including head
      this.grow(4);
      this.head = this.getChild(0);

      let cosys: ƒAid.NodeCoordinateSystem = new ƒAid.NodeCoordinateSystem("ControlSystem");
      cosys.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(2))));
      this.head.addChild(cosys);
    }

    public move(): void {
      this.dirCurrent = this.dirNew || this.dirCurrent;
      let child: ƒ.Node = this.head;
      let cmpPrev: ƒ.ComponentTransform = child.getComponent(ƒ.ComponentTransform);
      let mtxHead: ƒ.Matrix4x4;
      while (true) {
        mtxHead = cmpPrev.local.copy;
        mtxHead.translate(this.dirCurrent);
        let cubeCorner: ƒ.Vector3 = ƒ.Vector3.ONE(size);
        if (mtxHead.translation.isInsideCube(cubeCorner, ƒ.Vector3.SCALE(cubeCorner, -1)))
          // if (Math.abs(mtxHead.translation.x) < 6 && Math.abs(mtxHead.translation.y) < 6 && Math.abs(mtxHead.translation.z) < 6)
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


    public eat(): void {
      let posHead: ƒ.Vector3 = this.head.mtxLocal.translation;
      for (let item of items.getChildren()) {
        if (posHead.isInsideSphere(item.mtxLocal.translation, 0.5)) {
          items.removeChild(item);
          this.grow(1);
        }
      }
    }

    private grow(_nSegments: number): void {
      // TODO: implement shrinking
      if (_nSegments < 0)
        return;

      for (let i: number = 0; i < _nSegments; i++) {
        let segment: ƒ.Node = this.createSegment();
        this.appendChild(segment);
      }
    }

    private createSegment(): ƒ.Node {
      let segment: ƒ.Node = new ƒ.Node("Segment");

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(this.mesh);
      segment.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrStandard);
      segment.addComponent(cmpMaterial);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("yellow");

      let mtxSegment: ƒ.Matrix4x4 = new ƒ.Matrix4x4();
      if (this.nChildren)
        mtxSegment = this.getChild(this.nChildren - 1).mtxLocal.copy;
      segment.addComponent(new ƒ.ComponentTransform(mtxSegment));

      return segment;
    }
  }
}