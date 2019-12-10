namespace L10_FudgeCraft_DetectCombos {
    export function startTests(): void {
        //    testGrid();
        testCombos();
    }

    function testCombos(): void {
        type Setup = { type: CUBE_TYPE, positions: number[][] };
        let setup: Setup[] = [
            { type: CUBE_TYPE.RED, positions: [[0, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, -1], [-1, 0, 0]] },
            { type: CUBE_TYPE.GREEN, positions: [[-5, 0, 0], [-5, 0, 1], [-5, 1, 2], [-5, -1, 2]] },
            { type: CUBE_TYPE.CYAN, positions: [[3, 0, 0], [3, 0, 1], [3, 0, 2], [3, 0, 3], [3, 0, 4], [3, 0, 5], [3, 0, 6], [3, 0, -1], [3, 0, -2]] }
        ];

        setup.forEach((_combo: Setup) => {
            _combo.positions.forEach((_position: number[]) => {
                let position: ƒ.Vector3 = new ƒ.Vector3(..._position);
                let cube: Cube = new Cube(_combo.type, position);
                grid.push(position, new GridElement(cube));
            });
        });

        let startElements: GridElement[] = setup.map((_combo: Setup): GridElement => {
            return grid.pull(new ƒ.Vector3(..._combo.positions[0]));
        });
        let combos: Combos = new Combos(startElements);
        for (let combo of combos.found)
            for (let element of combo) {
                let mtxLocal: ƒ.Matrix4x4 = element.cube.cmpTransform.local;
                console.log(element.cube.name, mtxLocal.translation.getMutator());
                // mtxLocal.rotateX(45);
                // mtxLocal.rotateY(45);
                // mtxLocal.rotateY(45, true);
                mtxLocal.scale(ƒ.Vector3.ONE(0.5));
            }
        updateDisplay();
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