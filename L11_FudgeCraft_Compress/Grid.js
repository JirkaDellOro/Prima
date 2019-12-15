"use strict";
var L11_FudgeCraft_Compress;
(function (L11_FudgeCraft_Compress) {
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
        get position() {
            if (this.cube)
                return this.cube.cmpTransform.local.translation;
            return null;
        }
    }
    L11_FudgeCraft_Compress.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            if (this.pop(_position))
                L11_FudgeCraft_Compress.ƒ.Debug.warn("Grid push to occupied position, popped: ", key);
            this.set(key, _element);
            if (_element)
                L11_FudgeCraft_Compress.game.appendChild(_element.cube);
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
                L11_FudgeCraft_Compress.game.removeChild(element.cube);
            return element;
        }
        findNeighbors(_of) {
            let found = [];
            let offsets = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
            for (let offset of offsets) {
                let posNeighbor = L11_FudgeCraft_Compress.ƒ.Vector3.SUM(_of, new L11_FudgeCraft_Compress.ƒ.Vector3(...offset));
                let neighbor = L11_FudgeCraft_Compress.grid.pull(posNeighbor);
                if (neighbor)
                    found.push(neighbor);
            }
            return found;
        }
        compress(_popped) {
            let gains = [];
            for (let popped of _popped) {
                let neighbors = this.findNeighbors(popped.position);
                for (let neighbor of neighbors) {
                    let distanceToGain = neighbor.position.length - popped.position.length;
                    if (distanceToGain > 0) {
                        let gain = { value: distanceToGain, neighbor: neighbor, popped: popped };
                        gains.push(gain);
                    }
                }
            }
            gains.sort((_a, _b) => _a.value < _b.value ? 1 : 0);
            let moves = [];
            for (let gain of gains) {
                let alreadySet = moves.findIndex((_gain) => _gain.neighbor == gain.neighbor || _gain.popped == gain.popped);
                if (alreadySet == -1)
                    moves.push(gain);
            }
            for (let move of moves) {
                let iPopped = _popped.indexOf(move.popped);
                if (iPopped >= 0)
                    _popped.splice(iPopped, 1);
                _popped.push(move.neighbor);
                L11_FudgeCraft_Compress.grid.pop(move.neighbor.position);
                L11_FudgeCraft_Compress.grid.push(move.popped.position, move.neighbor);
            }
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L11_FudgeCraft_Compress.Grid = Grid;
})(L11_FudgeCraft_Compress || (L11_FudgeCraft_Compress = {}));
//# sourceMappingURL=Grid.js.map