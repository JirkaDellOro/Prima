"use strict";
var L09_FudgeCraft_DetectCombos;
(function (L09_FudgeCraft_DetectCombos) {
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    L09_FudgeCraft_DetectCombos.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
            this.push(L09_FudgeCraft_DetectCombos.ƒ.Vector3.ZERO(), new GridElement(new L09_FudgeCraft_DetectCombos.Cube(L09_FudgeCraft_DetectCombos.CUBE_TYPE.GREY, L09_FudgeCraft_DetectCombos.ƒ.Vector3.ZERO())));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                L09_FudgeCraft_DetectCombos.game.appendChild(_element.cube);
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
                L09_FudgeCraft_DetectCombos.game.removeChild(element.cube);
            return element;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L09_FudgeCraft_DetectCombos.Grid = Grid;
})(L09_FudgeCraft_DetectCombos || (L09_FudgeCraft_DetectCombos = {}));
//# sourceMappingURL=Grid.js.map