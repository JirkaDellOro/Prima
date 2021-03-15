"use strict";
var L04_BreakOut_Reflection;
(function (L04_BreakOut_Reflection) {
    var ƒ = FudgeCore;
    class GameObject extends ƒ.Node {
        constructor(_name, _position, _size) {
            super(_name);
            this.velocity = ƒ.Vector3.ZERO();
            this.rect = new ƒ.Rectangle(_position.x, _position.y, _size.x, _size.y, ƒ.ORIGIN2D.CENTER);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position.toVector3(0))));
            let cmpQuad = new ƒ.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.mtxPivot.scale(_size.toVector3(0));
            let cMaterial = new ƒ.ComponentMaterial(GameObject.mtrSolidWhite);
            this.addComponent(cMaterial);
        }
        /**
         * move moves the game object and the collision detection reactangle
         */
        move() {
            let frameTime = ƒ.Time.game.getElapsedSincePreviousCall() / 1000;
            let distance = ƒ.Vector3.SCALE(this.velocity, frameTime);
            this.mtxLocal.translate(distance);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
    }
    GameObject.meshQuad = new ƒ.MeshQuad();
    GameObject.mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    L04_BreakOut_Reflection.GameObject = GameObject;
})(L04_BreakOut_Reflection || (L04_BreakOut_Reflection = {}));
//# sourceMappingURL=GameObject.js.map