"use strict";
var L09_FudgeCraft_DetectCombos;
(function (L09_FudgeCraft_DetectCombos) {
    function test() {
        testGrid();
    }
    L09_FudgeCraft_DetectCombos.test = test;
    function testGrid() {
        let cube = new L09_FudgeCraft_DetectCombos.Cube(L09_FudgeCraft_DetectCombos.CUBE_TYPE.GREEN, L09_FudgeCraft_DetectCombos.ƒ.Vector3.ZERO());
        L09_FudgeCraft_DetectCombos.grid.push(cube.cmpTransform.local.translation, new L09_FudgeCraft_DetectCombos.GridElement(cube));
        let pulled = L09_FudgeCraft_DetectCombos.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L09_FudgeCraft_DetectCombos.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L09_FudgeCraft_DetectCombos.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L09_FudgeCraft_DetectCombos || (L09_FudgeCraft_DetectCombos = {}));
//# sourceMappingURL=Test.js.map