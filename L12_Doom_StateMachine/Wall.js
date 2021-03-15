"use strict";
var L12_Doom_StateMachine;
(function (L12_Doom_StateMachine) {
    var ƒ = FudgeCore;
    class Wall extends L12_Doom_StateMachine.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new ƒ.ComponentMaterial(_material);
            cmpMaterial.mtxPivot.scale(ƒ.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L12_Doom_StateMachine.Wall = Wall;
})(L12_Doom_StateMachine || (L12_Doom_StateMachine = {}));
//# sourceMappingURL=Wall.js.map