"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Invader extends SpaceInvaders.QuadNode {
        constructor(_pos) {
            let scale = new ƒ.Vector2(12 / 13, 8 / 13);
            super("Invader" + (++Invader.count), _pos, scale);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = new ƒ.Color(0.5, 1, 0.1, 1);
        }
    }
    Invader.count = 0;
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map