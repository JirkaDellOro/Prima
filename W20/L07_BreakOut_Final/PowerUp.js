"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    var ƒ = FudgeCore;
    class PowerUp extends L07_BreakOut_Final.Moveable {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.velocity = ƒ.Vector3.Y(-5);
            this.getComponent(ƒ.ComponentMesh).mesh = PowerUp.meshSphere;
        }
    }
    PowerUp.meshSphere = new ƒ.MeshSphere("Sphere", 5, 10);
    L07_BreakOut_Final.PowerUp = PowerUp;
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=PowerUp.js.map