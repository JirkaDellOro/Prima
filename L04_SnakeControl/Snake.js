"use strict";
var L04_SnakeControl;
(function (L04_SnakeControl) {
    var ƒ = FudgeCore;
    class Snake extends ƒ.Node {
        constructor() {
            super("Snake");
            this.dirCurrent = ƒ.Vector3.X();
            console.log("Creating Snake");
            this.createSegement(4);
        }
        move() {
            this.dirCurrent = this.dirNew || this.dirCurrent;
            let child = this.getChildren()[0];
            let cmpPrev = child.getComponent(ƒ.ComponentTransform); // child.cmpTransform;
            let mtxHead = cmpPrev.local.copy;
            mtxHead.translate(this.dirCurrent);
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
        createSegement(_segments) {
            let mesh = new ƒ.MeshQuad();
            let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
            for (let i = 0; i < _segments; i++) {
                let segment = new ƒ.Node("Segment");
                let cmpMesh = new ƒ.ComponentMesh(mesh);
                segment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
                let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
                segment.addComponent(cmpMaterial);
                segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));
                this.appendChild(segment);
            }
        }
    }
    L04_SnakeControl.Snake = Snake;
})(L04_SnakeControl || (L04_SnakeControl = {}));
//# sourceMappingURL=Snake.js.map