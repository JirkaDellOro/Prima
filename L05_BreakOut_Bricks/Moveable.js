"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var ƒ = FudgeCore;
    class Moveable extends L05_BreakOut_Bricks.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.speed = 15;
            this.velocity = ƒ.Vector3.ZERO();
            this.velocity = new ƒ.Vector3(ƒ.Random.default.getRange(-1, 1), ƒ.Random.default.getRange(-1, 1), 0);
            this.velocity.normalize(this.speed);
        }
        /**
         * move moves the game object and the collision detection reactangle
         */
        move() {
            let frameTime = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector3.SCALE(this.velocity, frameTime);
            this.mtxLocal.translate(distance);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
        /**
         * collides returns if the moveable itself collides with the _target and if so
         * reflects the movement
         */
        checkCollision(_target) {
            let intersection = this.rect.getIntersection(_target.rect);
            if (intersection == null)
                return false;
            if (intersection.size.x > intersection.size.y)
                this.velocity.reflect(Moveable.REFLECT_VECTOR_Y);
            else
                this.velocity.reflect(Moveable.REFLECT_VECTOR_X);
            return true;
        }
    }
    Moveable.REFLECT_VECTOR_X = ƒ.Vector3.X();
    Moveable.REFLECT_VECTOR_Y = ƒ.Vector3.Y();
    L05_BreakOut_Bricks.Moveable = Moveable;
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=Moveable.js.map