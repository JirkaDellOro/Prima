"use strict";
var L06_BreakOut_Control;
(function (L06_BreakOut_Control) {
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
    L06_BreakOut_Control.GameObject = GameObject;
})(L06_BreakOut_Control || (L06_BreakOut_Control = {}));
//# sourceMappingURL=GameObject.js.map