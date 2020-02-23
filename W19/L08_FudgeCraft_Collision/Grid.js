"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    L08_FudgeCraft_Collision.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
            this.push(L08_FudgeCraft_Collision.ƒ.Vector3.ZERO(), new GridElement(new L08_FudgeCraft_Collision.Cube(L08_FudgeCraft_Collision.CUBE_TYPE.GREY, L08_FudgeCraft_Collision.ƒ.Vector3.ZERO())));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                L08_FudgeCraft_Collision.game.appendChild(_element.cube);
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
                L08_FudgeCraft_Collision.game.removeChild(element.cube);
            return element;
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