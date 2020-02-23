"use strict";
var L12_FudgeCraft_Score;
(function (L12_FudgeCraft_Score) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(_shape, _position = ƒ.Vector3.ZERO()) {
            super("Fragment-Type" + _shape);
            this.position = new ƒ.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type;
                do {
                    type = Fragment.getRandomEnum(L12_FudgeCraft_Score.CUBE_TYPE);
                } while (type == L12_FudgeCraft_Score.CUBE_TYPE.BLACK);
                let vctPosition = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L12_FudgeCraft_Score.Cube(type, vctPosition);
                this.appendChild(cube);
            }
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
        }
        static getRandom() {
            let shape = Math.floor(Math.random() * Fragment.shapes.length);
            let fragment = new Fragment(shape);
            return fragment;
        }
        static getShapeArray() {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    L12_FudgeCraft_Score.Fragment = Fragment;
})(L12_FudgeCraft_Score || (L12_FudgeCraft_Score = {}));
//# sourceMappingURL=Fragment.js.map