namespace L09_FudgeCraft_CameraControl {
    export function test(): void {
       testGrid();
    }

    function testGrid(): void {
        let cube: Cube = new Cube(CUBE_TYPE.GREEN, ƒ.Vector3.ZERO());
        grid.push(cube.cmpTransform.local.translation, new GridElement(cube));

        let pulled: GridElement = grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);

        let popped: GridElement = grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);

        let empty: GridElement = grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }

    function logResult(_success: boolean, ..._args: Object[]): void {
        let log: Function = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
}