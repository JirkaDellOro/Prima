"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    function test() {
        testGrid();
    }
    L08_FudgeCraft_Collision.test = test;
    function testGrid() {
        let cube = new L08_FudgeCraft_Collision.Cube(L08_FudgeCraft_Collision.CUBE_TYPE.GREEN, L08_FudgeCraft_Collision.ƒ.Vector3.ZERO());
        L08_FudgeCraft_Collision.grid.push(cube);
        let cube2 = L08_FudgeCraft_Collision.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == cube2, "Grid push and pull", cube, cube2);
        let cube3 = L08_FudgeCraft_Collision.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == cube3, "Grid pop", cube, cube3);
        let cube4 = L08_FudgeCraft_Collision.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube4 == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Test.js.map