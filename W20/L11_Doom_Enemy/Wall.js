"use strict";
var L11_Doom_Enemy;
(function (L11_Doom_Enemy) {
    var ƒ = FudgeCore;
    class Wall extends L11_Doom_Enemy.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new ƒ.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L11_Doom_Enemy.Wall = Wall;
})(L11_Doom_Enemy || (L11_Doom_Enemy = {}));
//# sourceMappingURL=Wall.js.map