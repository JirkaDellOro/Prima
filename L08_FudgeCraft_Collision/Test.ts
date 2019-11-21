namespace L08_FudgeCraft_Collision {
    export function test(): void {
        testGrid();
    }

    function testGrid(): void {
        let cube: Cube = new Cube(CUBE_TYPE.GREEN, ƒ.Vector3.ZERO());
        grid.push(cube);
        let cube2: Cube = grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == cube2, "Grid push and pull", cube, cube2);

        let cube3: Cube = grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == cube3, "Grid pop", cube, cube3);

        let cube4: Cube = grid.pull(cube.cmpTransform.local.translation);
        logResult(cube4 == undefined, "Grid element deleted");
    }

    function logResult(_success: boolean, ..._args: Object[]): void {
        let log: Function = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
}