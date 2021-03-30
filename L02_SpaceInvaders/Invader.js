"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Invader extends ƒ.Node {
        constructor(_x, _y) {
            super("Invader" + (_x + _y * 11));
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX((_x - 5) * 15 / 13);
            this.mtxLocal.translateY((_y * 15 + 65) / 13);
            let cmpMesh = new ƒ.ComponentMesh(SpaceInvaders.quadMesh);
            cmpMesh.mtxPivot.scaleX(12 / 13);
            cmpMesh.mtxPivot.scaleY(8 / 13);
            this.addComponent(cmpMesh);
            this.addComponent(new ƒ.ComponentMaterial(SpaceInvaders.material));
        }
    }
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map