namespace L11_FudgeCraft_Compress {
    type Setup = { type: CUBE_TYPE, positions: number[][] };

    export function startTests(): void {
        //    testGrid();
        // testCombos();
        testCompression();
    }

    async function testCompression(): Promise<void> {
        let setups: Setup[] = [
            { type: CUBE_TYPE.BLACK, positions: [[0, 0, 0]] },
            { type: CUBE_TYPE.RED, positions: [[-2, -2, 0], [-2, -2, 1], [-2, -2, -1]] },
            { type: CUBE_TYPE.GREEN, positions: [[0, -2, 0], [1, -2, 0], [-1, -2, 0]] },
            { type: CUBE_TYPE.BLUE, positions: [[0, 0, 2], [0, -1, 2], [0, 1, 2]] },
            { type: CUBE_TYPE.YELLOW, positions: [[0, -2, -2], [1, -2, -2], [-1, -2, -2]] }
        ];

        setupGrid(setups);
        updateDisplay();
        // debugger;
        // ƒ.Time.game.setTimer(3000, 1, compress);
        ƒ.Time.game.setScale(1);
        await ƒ.Time.game.delay(3000);
        compress();

        function compress(): void {
            let moves: Move[] = grid.compress();

            for (let move of moves) {
                grid.pop(move.element.position);
                move.element.position = move.target;
                grid.push(move.target, move.element);
            }
            updateDisplay();

            if (moves.length > 0)
                ƒ.Time.game.setTimer(100, 1, compress);
        }
    }

    function testCombos(): void {
        let setups: Setup[] = [
            { type: CUBE_TYPE.RED, positions: [[0, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, -1], [-1, 0, 0]] },
            { type: CUBE_TYPE.GREEN, positions: [[-5, 0, 0], [-5, 0, 1], [-5, 1, 2], [-5, -1, 2], [-5, 0, 2]] },
            { type: CUBE_TYPE.CYAN, positions: [[3, 0, 0], [3, 0, 1], [3, 0, 2], [3, 0, 3], [3, 0, 4], [3, 0, 5], [3, 0, 6], [3, 0, -1], [3, 0, -2]] },
            { type: CUBE_TYPE.BLUE, positions: [[0, 3, 0], [0, 3, 1], [0, 3, 2], [1, 3, 2], [2, 3, 2], [2, 3, 1], [2, 3, 0], [1, 3, 0], [0, 3, 0]] }
        ];

        setupGrid(setups);

        let startElements: GridElement[] = setups.map((_setup: Setup): GridElement => {
            return grid.pull(new ƒ.Vector3(..._setup.positions[1]));
        });

        let combos: Combos = new Combos(startElements);
        for (let combo of combos.found)
            for (let element of combo) {
                let mtxLocal: ƒ.Matrix4x4 = element.cube.cmpTransform.local;
                ƒ.Debug.log(element.cube.name, mtxLocal.translation.getMutator());
                // mtxLocal.rotateX(45);
                // mtxLocal.rotateY(45);
                // mtxLocal.rotateY(45, true);
                // mtxLocal.translateX(1);
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

    function setupGrid(_setups: Setup[]): void {
        _setups.forEach((_setup: Setup) => {
            _setup.positions.forEach((_position: number[]) => {
                let position: ƒ.Vector3 = new ƒ.Vector3(..._position);
                let cube: Cube = new Cube(_setup.type, position);
                grid.push(position, new GridElement(cube));
            });
        });
    }

    function logResult(_success: boolean, ..._args: Object[]): void {
        let log: Function = _success ? ƒ.Debug.log : ƒ.Debug.warn;
        log(`Test success: ${_success}`, _args);
    }
}