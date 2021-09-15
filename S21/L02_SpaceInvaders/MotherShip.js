"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class MotherShip extends SpaceInvaders.QuadNode {
        constructor() {
            let pos = new ƒ.Vector2(75 / 13, 140 / 13);
            let scale = new ƒ.Vector2(14 / 13, 7 / 13);
            super("MotherShip", pos, scale);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = new ƒ.Color(1, 0.2, 0.2, 1);
        }
        static getInstance() {
            if (this.instance == null)
                this.instance = new MotherShip();
            return this.instance;
        }
    }
    MotherShip.material = new ƒ.Material("MotherShipMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0.2, 0.2, 1)));
    SpaceInvaders.MotherShip = MotherShip;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=MotherShip.js.map