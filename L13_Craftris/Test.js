"use strict";
var L13_Craftris;
(function (L13_Craftris) {
    function startTests() {
        switch (L13_Craftris.args.get("test")) {
            case "grid":
                testGrid();
                break;
            case "combos":
                testCombos();
                break;
            case "compression":
                testCompression();
                break;
            case "camera":
                testCamera();
                break;
            case "points":
                testPoints();
                break;
            default:
                alert("Test not defined");
        }
    }
    L13_Craftris.startTests = startTests;
    function testPoints() {
        let setups = [
            { type: L13_Craftris.CUBE_TYPE.BLACK, positions: [[0, 0, 0]] },
            { type: L13_Craftris.CUBE_TYPE.RED, positions: [[2, 0, 0]] },
            { type: L13_Craftris.CUBE_TYPE.GREEN, positions: [[0, 2, 0]] },
            { type: L13_Craftris.CUBE_TYPE.BLUE, positions: [[0, 0, 2]] }
            // { type: CUBE_TYPE.YELLOW, positions: [[-2, 0, 0]] },
            // { type: CUBE_TYPE.CYAN, positions: [[0, -2, 0]] },
            // { type: CUBE_TYPE.MAGENTA, positions: [[0, 0, -2]] }
        ];
        setupGrid(setups);
        L13_Craftris.updateDisplay();
        let elements = Array.from(L13_Craftris.grid.values());
        L13_Craftris.ƒ.Debug.log(elements);
        L13_Craftris.points.showCombo(elements, 1);
    }
    function testCamera() {
        let setups = [
            { type: L13_Craftris.CUBE_TYPE.BLACK, positions: [[0, 0, 0]] }
        ];
        setupGrid(setups);
        L13_Craftris.startRandomFragment();
        L13_Craftris.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, rotateY);
        L13_Craftris.ƒ.Loop.start();
        // ƒ.Time.game.setTimer(4, 0, rotateY);
        function rotateY(_event) {
            L13_Craftris.camera.rotateY(1 * L13_Craftris.ƒ.Loop.timeFrameReal);
            // camera.rotateX(5 * Math.sin(ƒ.Time.game.get() / 100));
            L13_Craftris.updateDisplay();
        }
    }
    async function testCompression() {
        let setups = [
            { type: L13_Craftris.CUBE_TYPE.BLACK, positions: [[0, 0, 0]] },
            // four combos
            // { type: CUBE_TYPE.RED, positions: [[-2, -2, 0], [-2, -2, 1], [-2, -2, -1]] },
            // { type: CUBE_TYPE.GREEN, positions: [[0, -2 , 0], [1, -2, 0], [-1, -2, 0]] },
            // { type: CUBE_TYPE.BLUE, positions: [[0, 0, 2], [0, -1, 2], [0, 1, 2]] },
            // { type: CUBE_TYPE.YELLOW, positions: [[0, -2, -2], [1, -2, -2], [-1, -2, -2]] }
            // one combo travel
            // two combos following up
            { type: L13_Craftris.CUBE_TYPE.BLUE, positions: [[-1, 0, 0], [1, 0, 0]] },
            { type: L13_Craftris.CUBE_TYPE.RED, positions: [[-1, 0, -1], [0, 0, -1], [1, 0, -4]] },
            { type: L13_Craftris.CUBE_TYPE.GREEN, positions: [[0, 0, -2], [1, 0, -3], [1, 0, -1]] },
            { type: L13_Craftris.CUBE_TYPE.YELLOW, positions: [[-3, 0, -2], [0, 0, -5], [0, 0, -10]] }
        ];
        setupGrid(setups);
        L13_Craftris.updateDisplay();
        // debugger;
        // ƒ.Time.game.setScale(0.2);
        await L13_Craftris.ƒ.Time.game.delay(2000);
        L13_Craftris.compressAndHandleCombos(0);
    }
    function testCombos() {
        let setups = [
            { type: L13_Craftris.CUBE_TYPE.RED, positions: [[0, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, -1], [-1, 0, 0]] },
            { type: L13_Craftris.CUBE_TYPE.GREEN, positions: [[-5, 0, 0], [-5, 0, 1], [-5, 1, 2], [-5, -1, 2], [-5, 0, 2]] },
            { type: L13_Craftris.CUBE_TYPE.CYAN, positions: [[3, 0, 0], [3, 0, 1], [3, 0, 2], [3, 0, 3], [3, 0, 4], [3, 0, 5], [3, 0, 6], [3, 0, -1], [3, 0, -2]] },
            { type: L13_Craftris.CUBE_TYPE.BLUE, positions: [[0, 3, 0], [0, 3, 1], [0, 3, 2], [1, 3, 2], [2, 3, 2], [2, 3, 1], [2, 3, 0], [1, 3, 0], [0, 3, 0]] }
        ];
        setupGrid(setups);
        let startElements = setups.map((_setup) => {
            return L13_Craftris.grid.pull(new L13_Craftris.ƒ.Vector3(..._setup.positions[1]));
        });
        let combos = new L13_Craftris.Combos(startElements);
        L13_Craftris.handleCombos(combos, 1);
    }
    function testGrid() {
        let cube = new L13_Craftris.Cube(L13_Craftris.CUBE_TYPE.GREEN, L13_Craftris.ƒ.Vector3.ZERO());
        L13_Craftris.grid.push(cube.cmpTransform.local.translation, new L13_Craftris.GridElement(cube));
        let pulled = L13_Craftris.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L13_Craftris.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L13_Craftris.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function setupGrid(_setups) {
        _setups.forEach((_setup) => {
            _setup.positions.forEach((_position) => {
                let position = new L13_Craftris.ƒ.Vector3(..._position);
                let cube = new L13_Craftris.Cube(_setup.type, position);
                L13_Craftris.grid.push(position, new L13_Craftris.GridElement(cube));
            });
        });
    }
    function logResult(_success, ..._args) {
        let log = _success ? L13_Craftris.ƒ.Debug.log : L13_Craftris.ƒ.Debug.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L13_Craftris || (L13_Craftris = {}));
//# sourceMappingURL=Test.js.map