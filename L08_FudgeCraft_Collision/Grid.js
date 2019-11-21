"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        setCube(_cube) {
            console.log(_cube.cmpTransform.local.translation.toString());
            let rounded = _cube.cmpTransform.local.translation.apply(Math.round);
            console.log(rounded.toString());
        }
    }
    L08_FudgeCraft_Collision.Grid = Grid;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Grid.js.map