namespace L11_FudgeCraft_Compress {
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
            for (let popped of _popped) {
                let neighbors: GridElement[] = this.findNeighbors(popped.position);
                for (let neighbor of neighbors)
                    
            }
        }

        private toKey(_position: ƒ.Vector3): string {
            let position: ƒ.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }
    }
}