"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.position = new ƒ.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            let type = L07_FudgeCraft_Fragments.CUBE_TYPE.RED;
            for (let position of shape) {
                let vctPosition = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L07_FudgeCraft_Fragments.Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }
        static getShapeArray() {
            return [
                // small flat L
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]
            ];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    L07_FudgeCraft_Fragments.Fragment = Fragment;
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Fragment.js.map