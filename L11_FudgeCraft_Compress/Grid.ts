namespace L11_FudgeCraft_Compress {
    interface Gain {
        value: number;
        popped: GridElement;
        neighbor: GridElement;
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

        public findNeighbors(_of: ƒ.Vector3): GridElement[] {
            let found: GridElement[] = [];
            let offsets: number[][] = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
            for (let offset of offsets) {
                let posNeighbor: ƒ.Vector3 = ƒ.Vector3.SUM(_of, new ƒ.Vector3(...offset));
                let neighbor: GridElement = grid.pull(posNeighbor);
                if (neighbor)
                    found.push(neighbor);
            }
            return found;
        }

        public compress(_popped: GridElement[]): void {
            let gains: Gain[] = [];
            for (let popped of _popped) {
                let neighbors: GridElement[] = this.findNeighbors(popped.position);
                for (let neighbor of neighbors) {
                    let distanceToGain: number = neighbor.position.length - popped.position.length;
                    if (distanceToGain > 0) {
                        let gain: Gain = { value: distanceToGain, neighbor: neighbor, popped: popped };
                        gains.push(gain);
                    }
                }
            }

            gains.sort((_a: Gain, _b: Gain) => _a.value < _b.value ? 1 : 0);

            let moves: Gain[] = [];

            for (let gain of gains) {
                let alreadySet: number = moves.findIndex((_gain: Gain) => _gain.neighbor == gain.neighbor || _gain.popped == gain.popped);
                if (alreadySet == -1)
                    moves.push(gain);
            }

            for (let move of moves) {
                let iPopped: number = _popped.indexOf(move.popped);
                if (iPopped >= 0)
                    _popped.splice(iPopped, 1);
                _popped.push(move.neighbor);
                grid.pop(move.neighbor.position);
                grid.push(move.popped.position, move.neighbor);
            }
        }

        private toKey(_position: ƒ.Vector3): string {
            let position: ƒ.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }
    }
}