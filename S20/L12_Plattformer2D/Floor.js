"use strict";
var L12_Plattformer2D;
(function (L12_Plattformer2D) {
    var ƒ = FudgeCore;
    let Floor = /** @class */ (() => {
        class Floor extends ƒ.Node {
            constructor() {
                super("Floor");
                this.addComponent(new ƒ.ComponentTransform());
                this.addComponent(new ƒ.ComponentMaterial(Floor.material));
                let cmpMesh = new ƒ.ComponentMesh(Floor.mesh);
                //cmpMesh.pivot.translateY(-0.5);
                cmpMesh.pivot = Floor.pivot;
                this.addComponent(cmpMesh);
            }
            getRectWorld() {
                let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
                let topleft = new ƒ.Vector3(-0.5, 0.5, 0);
                let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
                //let pivot: ƒ.Matrix4x4 = this.getComponent(ƒ.ComponentMesh).pivot;
                let mtxResult = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
                topleft.transform(mtxResult, true);
                bottomright.transform(mtxResult, true);
                let size = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
                rect.position = topleft.toVector2();
                rect.size = size;
                return rect;
            }
        }
        Floor.mesh = new ƒ.MeshSprite();
        Floor.material = new ƒ.Material("Floor", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("red")));
        Floor.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
        return Floor;
    })();
    L12_Plattformer2D.Floor = Floor;
})(L12_Plattformer2D || (L12_Plattformer2D = {}));
//# sourceMappingURL=Floor.js.map