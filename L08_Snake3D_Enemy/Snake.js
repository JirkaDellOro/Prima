"use strict";
var L08_Snake3D_Enemy;
(function (L08_Snake3D_Enemy) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Snake extends ƒ.Node {
        constructor(_name = "Snake", _color = ƒ.Color.CSS("yellow")) {
            super(_name);
            this.dirCurrent = ƒ.Vector3.X();
            this.color = _color;
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
                let cubeCorner = ƒ.Vector3.ONE(L08_Snake3D_Enemy.size);
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
            for (let item of L08_Snake3D_Enemy.items.getChildren()) {
                if (posHead.isInsideSphere(item.mtxLocal.translation, 0.5)) {
                    L08_Snake3D_Enemy.items.removeChild(item);
                    this.grow(1);
                }
            }
        }
        grow(_nSegments, _color = this.color) {
            // TODO: implement shrinking
            if (_nSegments < 0)
                return;
            for (let i = 0; i < _nSegments; i++) {
                let segment = this.createSegment(_color);
                this.appendChild(segment);
            }
        }
        createSegment(_color = this.color) {
            let segment = new ƒ.Node("Segment");
            let cmpMesh = new ƒ.ComponentMesh(Snake.mesh);
            segment.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            let cmpMaterial = new ƒ.ComponentMaterial(L08_Snake3D_Enemy.mtrStandard);
            segment.addComponent(cmpMaterial);
            cmpMaterial.clrPrimary = _color;
            let mtxSegment = new ƒ.Matrix4x4();
            if (this.nChildren)
                mtxSegment = this.getChild(this.nChildren - 1).mtxLocal.copy;
            segment.addComponent(new ƒ.ComponentTransform(mtxSegment));
            return segment;
        }
    }
    Snake.mesh = new ƒ.MeshCube();
    L08_Snake3D_Enemy.Snake = Snake;
})(L08_Snake3D_Enemy || (L08_Snake3D_Enemy = {}));
//# sourceMappingURL=Snake.js.map