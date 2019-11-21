namespace L08_FudgeCraft_Collision {
    export class Grid extends Map<string, Cube> {
        // private grid: Map<string, Cube> = new Map();

        push(_cube: Cube): void {
            let key: string = this.toKey(_cube.cmpTransform.local.translation.map(Math.round));
            this.set(key, _cube);
            game.appendChild(_cube);
        }

        pull(_position: ƒ.Vector3): Cube {
            let key: string = this.toKey(_position);
            let cube: Cube = this.get(key);
            return cube;
        }

        pop(_position: ƒ.Vector3): Cube {
            let key: string = this.toKey(_position);
            let cube: Cube = this.get(key);
            this.delete(key);
            game.removeChild(cube);
            return cube;
        }

        toKey(_position: ƒ.Vector3): string {
            let position: ƒ.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }
    }
}