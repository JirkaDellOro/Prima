"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    function test() {
        testGrid();
    }
    L08_FudgeCraft_Collision.test = test;
    function testGrid() {
        let cube = new L08_FudgeCraft_Collision.Cube(L08_FudgeCraft_Collision.CUBE_TYPE.GREEN, L08_FudgeCraft_Collision.ƒ.Vector3.ZERO());
        L08_FudgeCraft_Collision.grid.push(cube.cmpTransform.local.translation, new L08_FudgeCraft_Collision.GridElement(cube));
        let pulled = L08_FudgeCraft_Collision.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L08_FudgeCraft_Collision.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L08_FudgeCraft_Collision.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Test.js.map