"use strict";
var L10_FudgeCraft_DetectCombos;
(function (L10_FudgeCraft_DetectCombos) {
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    L10_FudgeCraft_DetectCombos.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                L10_FudgeCraft_DetectCombos.game.appendChild(_element.cube);
        }
        pull(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            return element;
        }
        pop(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            this.delete(key);
            if (element)
                L10_FudgeCraft_DetectCombos.game.removeChild(element.cube);
            return element;
        }
        findNeigbors(_of) {
            let found = [];
            let offsets = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
            for (let offset of offsets) {
                let posNeighbor = L10_FudgeCraft_DetectCombos.ƒ.Vector3.SUM(_of, new L10_FudgeCraft_DetectCombos.ƒ.Vector3(...offset));
                let neighbor = L10_FudgeCraft_DetectCombos.grid.pull(posNeighbor);
                if (neighbor)
                    found.push(neighbor);
            }
            return found;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L10_FudgeCraft_DetectCombos.Grid = Grid;
})(L10_FudgeCraft_DetectCombos || (L10_FudgeCraft_DetectCombos = {}));
//# sourceMappingURL=Grid.js.map