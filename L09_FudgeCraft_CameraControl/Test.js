"use strict";
var L09_FudgeCraft_CameraControl;
(function (L09_FudgeCraft_CameraControl) {
    function test() {
        testGrid();
    }
    L09_FudgeCraft_CameraControl.test = test;
    function testGrid() {
        let cube = new L09_FudgeCraft_CameraControl.Cube(L09_FudgeCraft_CameraControl.CUBE_TYPE.GREEN, L09_FudgeCraft_CameraControl.ƒ.Vector3.ZERO());
        L09_FudgeCraft_CameraControl.grid.push(cube.cmpTransform.local.translation, new L09_FudgeCraft_CameraControl.GridElement(cube));
        let pulled = L09_FudgeCraft_CameraControl.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L09_FudgeCraft_CameraControl.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L09_FudgeCraft_CameraControl.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L09_FudgeCraft_CameraControl || (L09_FudgeCraft_CameraControl = {}));
//# sourceMappingURL=Test.js.map