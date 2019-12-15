"use strict";
var L11_FudgeCraft_Compress;
(function (L11_FudgeCraft_Compress) {
    function startTests() {
        //    testGrid();
        testCombos();
    }
    L11_FudgeCraft_Compress.startTests = startTests;
    function testCombos() {
        let setup = [
            { type: L11_FudgeCraft_Compress.CUBE_TYPE.RED, positions: [[0, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, -1], [-1, 0, 0]] },
            { type: L11_FudgeCraft_Compress.CUBE_TYPE.GREEN, positions: [[-5, 0, 0], [-5, 0, 1], [-5, 1, 2], [-5, -1, 2], [-5, 0, 2]] },
            { type: L11_FudgeCraft_Compress.CUBE_TYPE.CYAN, positions: [[3, 0, 0], [3, 0, 1], [3, 0, 2], [3, 0, 3], [3, 0, 4], [3, 0, 5], [3, 0, 6], [3, 0, -1], [3, 0, -2]] },
            { type: L11_FudgeCraft_Compress.CUBE_TYPE.BLUE, positions: [[0, 3, 0], [0, 3, 1], [0, 3, 2], [1, 3, 2], [2, 3, 2], [2, 3, 1], [2, 3, 0], [1, 3, 0], [0, 3, 0]] }
        ];
        setup.forEach((_combo) => {
            _combo.positions.forEach((_position) => {
                let position = new L11_FudgeCraft_Compress.ƒ.Vector3(..._position);
                let cube = new L11_FudgeCraft_Compress.Cube(_combo.type, position);
                L11_FudgeCraft_Compress.grid.push(position, new L11_FudgeCraft_Compress.GridElement(cube));
            });
        });
        let startElements = setup.map((_combo) => {
            return L11_FudgeCraft_Compress.grid.pull(new L11_FudgeCraft_Compress.ƒ.Vector3(..._combo.positions[1]));
        });
        let combos = new L11_FudgeCraft_Compress.Combos(startElements);
        for (let combo of combos.found)
            for (let element of combo) {
                let mtxLocal = element.cube.cmpTransform.local;
                L11_FudgeCraft_Compress.ƒ.Debug.log(element.cube.name, mtxLocal.translation.getMutator());
                // mtxLocal.rotateX(45);
                // mtxLocal.rotateY(45);
                // mtxLocal.rotateY(45, true);
                // mtxLocal.translateX(1);
                mtxLocal.scale(L11_FudgeCraft_Compress.ƒ.Vector3.ONE(0.5));
            }
        L11_FudgeCraft_Compress.updateDisplay();
    }
    function testGrid() {
        let cube = new L11_FudgeCraft_Compress.Cube(L11_FudgeCraft_Compress.CUBE_TYPE.GREEN, L11_FudgeCraft_Compress.ƒ.Vector3.ZERO());
        L11_FudgeCraft_Compress.grid.push(cube.cmpTransform.local.translation, new L11_FudgeCraft_Compress.GridElement(cube));
        let pulled = L11_FudgeCraft_Compress.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L11_FudgeCraft_Compress.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L11_FudgeCraft_Compress.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? L11_FudgeCraft_Compress.ƒ.Debug.log : L11_FudgeCraft_Compress.ƒ.Debug.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L11_FudgeCraft_Compress || (L11_FudgeCraft_Compress = {}));
//# sourceMappingURL=Test.js.map