"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class QuadNode extends ƒ.Node {
        constructor(_name, _pos, _scale) {
            super(_name);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            let cmpMesh = new ƒ.ComponentMesh(QuadNode.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);
            this.addComponent(new ƒ.ComponentMaterial(QuadNode.material));
        }
    }
    QuadNode.mesh = new ƒ.MeshQuad("Quad");
    QuadNode.material = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored());
    SpaceInvaders.QuadNode = QuadNode;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=QuadNode.js.map