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
            this.createSegement(4);
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
                if (mtxHead.translation.isInside(cubeCorner, ƒ.Vector3.SCALE(cubeCorner, -1)))
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
        createSegement(_segments) {
            let mesh = new ƒ.MeshCube();
            // let mtrSolidWhite: ƒ.Material = new ƒ.Material("White", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
            for (let i = 0; i < _segments; i++) {
                let segment = new ƒ.Node("Segment");
                let cmpMesh = new ƒ.ComponentMesh(mesh);
                segment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
                // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
                let cmpMaterial = new ƒ.ComponentMaterial(L07_Snake3D_Food.mtrStandard);
                segment.addComponent(cmpMaterial);
                cmpMaterial.clrPrimary = ƒ.Color.CSS("yellow");
                segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));
                this.appendChild(segment);
            }
            this.head = this.getChildren()[0];
            let cosys = new ƒAid.NodeCoordinateSystem("ControlSystem");
            cosys.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(2))));
            this.head.addChild(cosys);
        }
    }
    L07_Snake3D_Food.Snake = Snake;
})(L07_Snake3D_Food || (L07_Snake3D_Food = {}));
//# sourceMappingURL=Snake.js.map