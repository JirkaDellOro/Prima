"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        push(_cube) {
            let key = this.toKey(_cube.cmpTransform.local.translation.map(Math.round));
            this.set(key, _cube);
            L08_FudgeCraft_Collision.game.appendChild(_cube);
        }
        pull(_position) {
            let key = this.toKey(_position);
            let cube = this.get(key);
            return cube;
        }
        pop(_position) {
            let key = this.toKey(_position);
            let cube = this.get(key);
            this.delete(key);
            L08_FudgeCraft_Collision.game.removeChild(cube);
            return cube;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L08_FudgeCraft_Collision.Grid = Grid;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Grid.js.map