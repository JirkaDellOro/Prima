"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Projectile extends SpaceInvaders.QuadNode {
        constructor(_pos) {
            let scale = new ƒ.Vector2(1 / 13, 5 / 13);
            super("Projectile" + (Projectile.count++), _pos, scale);
        }
        move() {
            this.mtxLocal.translateY(5 * ƒ.Loop.timeFrameReal / 1000);
            this.setRectPosition();
        }
    }
    Projectile.count = 0;
    SpaceInvaders.Projectile = Projectile;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map