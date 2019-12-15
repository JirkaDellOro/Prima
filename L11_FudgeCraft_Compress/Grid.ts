namespace L11_FudgeCraft_Compress {
    interface Gain {
        value: number;
        empty: ƒ.Vector3;
        element: GridElement;
    }

    export class GridElement {
        public cube: Cube;

        constructor(_cube: Cube = null) {
            this.cube = _cube;
        }

        get position(): ƒ.Vector3 {
            if (this.cube)
                return this.cube.cmpTransform.local.translation;
            return null;
        }

        set position(_new: ƒ.Vector3) {
            if (this.cube)
                this.cube.cmpTransform.local.translation = _new;
        }
    }

    export class Grid extends Map<string, GridElement> {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
        }

        public push(_position: ƒ.Vector3, _element: GridElement = null): void {
            let key: string = this.toKey(_position);
            if (this.pop(_position))
                ƒ.Debug.warn("Grid push to occupied position, popped: ", key);
            this.set(key, _element);
            if (_element)
                game.appendChild(_element.cube);
        }

        public pull(_position: ƒ.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            return element;
        }

        public pop(_position: ƒ.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            this.delete(key);
            if (element)
                game.removeChild(element.cube);
            return element;
        }

        public findNeighbors(_of: ƒ.Vector3, _empty: boolean = false): GridElement[] | ƒ.Vector3[] {
            let found: GridElement[] = [];
            let empty: ƒ.Vector3[] = [];
            let offsets: number[][] = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
            for (let offset of offsets) {
                let posNeighbor: ƒ.Vector3 = ƒ.Vector3.SUM(_of, new ƒ.Vector3(...offset));
                let neighbor: GridElement = grid.pull(posNeighbor);
                if (neighbor)
                    found.push(neighbor);
                else
                    empty.push(posNeighbor);
            }
            return _empty ? empty : found;
        }

        public compress(): void {
            let gains: Gain[] = [];
            for (let element of this) {
                let emptySpaces: ƒ.Vector3[] = <ƒ.Vector3[]>this.findNeighbors(element[1].position);
                for (let emptySpace of emptySpaces) {
                    let relativeGain: number = emptySpace.length / element[1].position.length;
                    if (relativeGain < 1) {
                        let gain: Gain = { value: relativeGain, empty: emptySpace, element: element[1] };
                        gains.push(gain);
                    }
                }
            }

            gains.sort((_a: Gain, _b: Gain) => _a.value < _b.value ? 1 : 0);

            let moves: Gain[] = [];

            for (let gain of gains) {
                let alreadySet: number = moves.findIndex((_gain: Gain) => _gain.empty == gain.empty || _gain.element == gain.element);
                if (alreadySet == -1)
                    moves.push(gain);
            }

            if (moves.length == 0)
                return;

            for (let move of moves) {
                grid.pop(move.element.position);
                move.element.position = move.empty;
                grid.push(move.empty, move.element);
            }

            this.compress();
        }

        private toKey(_position: ƒ.Vector3): string {
            let position: ƒ.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }
    }
}