"use strict";
var L03_SnakeMove;
(function (L03_SnakeMove) {
    var ƒ = FudgeCore;
    class Snake extends ƒ.Node {
        constructor() {
            super("Snake");
            this.direction = ƒ.Vector3.X();
            console.log("Creating Snake");
            this.createSegement(4);
        }
        move() {
            let child = this.getChildren()[0];
            let cmpPrev = child.getComponent(ƒ.ComponentTransform); // child.cmpTransform;
            let mtxHead = cmpPrev.local.copy;
            mtxHead.translate(this.direction);
            let cmpNew = new ƒ.ComponentTransform(mtxHead);
            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(ƒ.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
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
    L03_SnakeMove.Snake = Snake;
})(L03_SnakeMove || (L03_SnakeMove = {}));
//# sourceMappingURL=Snake.js.map