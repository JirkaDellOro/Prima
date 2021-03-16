"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var ƒ = FudgeCore;
    class GameObject extends ƒ.Node {
        constructor(_name, _position, _size) {
            super(_name);
            this.rect = new ƒ.Rectangle(_position.x, _position.y, _size.x, _size.y, ƒ.ORIGIN2D.CENTER);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position.toVector3(0))));
            let cmpQuad = new ƒ.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(0));
            let cMaterial = new ƒ.ComponentMaterial(GameObject.mtrSolidWhite);
            this.addComponent(cMaterial);
        }
    }
    GameObject.meshQuad = new ƒ.MeshQuad();
    GameObject.mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    L05_BreakOut_Bricks.GameObject = GameObject;
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=GameObject.js.map