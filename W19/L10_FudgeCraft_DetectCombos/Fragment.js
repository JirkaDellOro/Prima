"use strict";
var L10_FudgeCraft_DetectCombos;
(function (L10_FudgeCraft_DetectCombos) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(_shape, _position = ƒ.Vector3.ZERO()) {
            super("Fragment-Type" + _shape);
            this.position = new ƒ.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type;
                do {
                    type = Fragment.getRandomEnum(L10_FudgeCraft_DetectCombos.CUBE_TYPE);
                } while (type == L10_FudgeCraft_DetectCombos.CUBE_TYPE.GREY);
                let vctPosition = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L10_FudgeCraft_DetectCombos.Cube(type, vctPosition);
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
    L10_FudgeCraft_DetectCombos.Fragment = Fragment;
})(L10_FudgeCraft_DetectCombos || (L10_FudgeCraft_DetectCombos = {}));
//# sourceMappingURL=Fragment.js.map