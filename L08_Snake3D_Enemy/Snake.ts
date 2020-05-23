namespace L08_Snake3D_Enemy {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Snake extends ƒ.Node {
    private static mesh: ƒ.MeshCube = new ƒ.MeshCube();
    public head: ƒ.Node;
    protected color: ƒ.Color;
    private dirCurrent: ƒ.Vector3 = ƒ.Vector3.X();
    private dirNew: ƒ.Vector3;

    constructor(_name: string = "Snake", _color: ƒ.Color = ƒ.Color.CSS("yellow")) {
      super(_name);
      this.color = _color;

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

    private grow(_nSegments: number, _color: ƒ.Color = this.color): void {
      // TODO: implement shrinking
      if (_nSegments < 0)
        return;

      for (let i: number = 0; i < _nSegments; i++) {
        let segment: ƒ.Node = this.createSegment(_color);
        this.appendChild(segment);
      }
    }

    private createSegment(_color: ƒ.Color = this.color): ƒ.Node {
      let segment: ƒ.Node = new ƒ.Node("Segment");

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Snake.mesh);
      segment.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrStandard);
      segment.addComponent(cmpMaterial);
      cmpMaterial.clrPrimary = _color;

      let mtxSegment: ƒ.Matrix4x4 = new ƒ.Matrix4x4();
      if (this.nChildren)
        mtxSegment = this.getChild(this.nChildren - 1).mtxLocal.copy;
      segment.addComponent(new ƒ.ComponentTransform(mtxSegment));

      return segment;
    }
  }
}