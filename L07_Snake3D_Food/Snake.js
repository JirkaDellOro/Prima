"use strict";
var L07_Snake3D_Food;
(function (L07_Snake3D_Food) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Snake extends ƒ.Node {
        constructor() {
            super("Snake");
            this.dirCurrent = ƒ.Vector3.X();
            console.log("Creating Snake");
            this.mesh = new ƒ.MeshCube();
            // start with a number of segments including head
            this.grow(4);
            this.head = this.getChild(0);
            let cosys = new ƒAid.NodeCoordinateSystem("ControlSystem");
            cosys.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(2))));
            this.head.addChild(cosys);
        }
        move() {
            this.dirCurrent = this.dirNew || this.dirCurrent;
            let child = this.head;
            let cmpPrev = child.getComponent(ƒ.ComponentTransform);
            let mtxHead;
            while (true) {
                mtxHead = cmpPrev.local.copy;
                mtxHead.translate(this.dirCurrent);
                let cubeCorner = ƒ.Vector3.ONE(L07_Snake3D_Food.size);
                if (mtxHead.translation.isInsideCube(cubeCorner, ƒ.Vector3.SCALE(cubeCorner, -1)))
                    // if (Math.abs(mtxHead.translation.x) < 6 && Math.abs(mtxHead.translation.y) < 6 && Math.abs(mtxHead.translation.z) < 6)
                    break;
                this.rotate(ƒ.Vector3.Z(-90));
            }
            let cmpNew = new ƒ.ComponentTransform(mtxHead);
            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(ƒ.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
        }
        set direction(_new) {
            if (this.dirCurrent.equals(ƒ.Vector3.SCALE(_new, -1)))
                return;
            console.log(this.dirCurrent, _new);
            this.dirNew = _new;
        }
        rotate(_rotation) {
            this.head.mtxLocal.rotate(_rotation);
        }
        eat() {
            let posHead = this.head.mtxLocal.translation;
            for (let item of L07_Snake3D_Food.items.getChildren()) {
                if (posHead.isInsideSphere(item.mtxLocal.translation, 0.5)) {
                    L07_Snake3D_Food.items.removeChild(item);
                    this.grow(1);
                }
            }
        }
        grow(_nSegments) {
            // TODO: implement shrinking
            if (_nSegments < 0)
                return;
            for (let i = 0; i < _nSegments; i++) {
                let segment = this.createSegment();
                this.appendChild(segment);
            }
        }
        createSegment() {
            let segment = new ƒ.Node("Segment");
            let cmpMesh = new ƒ.ComponentMesh(this.mesh);
            segment.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            let cmpMaterial = new ƒ.ComponentMaterial(L07_Snake3D_Food.mtrStandard);
            segment.addComponent(cmpMaterial);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("yellow");
            let mtxSegment = new ƒ.Matrix4x4();
            if (this.nChildren)
                mtxSegment = this.getChild(this.nChildren - 1).mtxLocal.copy;
            segment.addComponent(new ƒ.ComponentTransform(mtxSegment));
            return segment;
        }
    }
    L07_Snake3D_Food.Snake = Snake;
})(L07_Snake3D_Food || (L07_Snake3D_Food = {}));
//# sourceMappingURL=Snake.js.map