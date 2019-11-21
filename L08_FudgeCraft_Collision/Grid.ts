namespace L08_FudgeCraft_Collision {
    export class Grid extends Map<string, Cube> {
        // private grid: Map<string, Cube> = new Map();

        setCube(_cube: Cube): void {
            console.log(_cube.cmpTransform.local.translation.toString());
            let rounded: ƒ.Vector3 = _cube.cmpTransform.local.translation.apply(Math.round);
            console.log(rounded.toString());
        }
    }
}