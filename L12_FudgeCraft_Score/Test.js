"use strict";
var L12_FudgeCraft_Score;
(function (L12_FudgeCraft_Score) {
    function startTests() {
        switch (L12_FudgeCraft_Score.args.get("test")) {
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
    L12_FudgeCraft_Score.startTests = startTests;
    function testPoints() {
        let setups = [
            { type: L12_FudgeCraft_Score.CUBE_TYPE.BLACK, positions: [[0, 0, 0]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.RED, positions: [[2, 0, 0]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.GREEN, positions: [[0, 2, 0]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.BLUE, positions: [[0, 0, 2]] }
            // { type: CUBE_TYPE.YELLOW, positions: [[-2, 0, 0]] },
            // { type: CUBE_TYPE.CYAN, positions: [[0, -2, 0]] },
            // { type: CUBE_TYPE.MAGENTA, positions: [[0, 0, -2]] }
        ];
        setupGrid(setups);
        L12_FudgeCraft_Score.updateDisplay();
        let elements = Array.from(L12_FudgeCraft_Score.grid.values());
        L12_FudgeCraft_Score.ƒ.Debug.log(elements);
        L12_FudgeCraft_Score.points.showCombo(elements, 1);
    }
    function testCamera() {
        let setups = [
            { type: L12_FudgeCraft_Score.CUBE_TYPE.BLACK, positions: [[0, 0, 0]] }
        ];
        setupGrid(setups);
        L12_FudgeCraft_Score.startRandomFragment();
        L12_FudgeCraft_Score.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, rotateY);
        L12_FudgeCraft_Score.ƒ.Loop.start();
        // ƒ.Time.game.setTimer(4, 0, rotateY);
        function rotateY(_event) {
            L12_FudgeCraft_Score.camera.rotateY(1 * L12_FudgeCraft_Score.ƒ.Loop.timeFrameReal);
            // camera.rotateX(5 * Math.sin(ƒ.Time.game.get() / 100));
            L12_FudgeCraft_Score.updateDisplay();
        }
    }
    async function testCompression() {
        let setups = [
            { type: L12_FudgeCraft_Score.CUBE_TYPE.BLACK, positions: [[0, 0, 0]] },
            // four combos
            // { type: CUBE_TYPE.RED, positions: [[-2, -2, 0], [-2, -2, 1], [-2, -2, -1]] },
            // { type: CUBE_TYPE.GREEN, positions: [[0, -2 , 0], [1, -2, 0], [-1, -2, 0]] },
            // { type: CUBE_TYPE.BLUE, positions: [[0, 0, 2], [0, -1, 2], [0, 1, 2]] },
            // { type: CUBE_TYPE.YELLOW, positions: [[0, -2, -2], [1, -2, -2], [-1, -2, -2]] }
            // one combo travel
            // two combos following up
            { type: L12_FudgeCraft_Score.CUBE_TYPE.BLUE, positions: [[-1, 0, 0], [1, 0, 0]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.RED, positions: [[-1, 0, -1], [0, 0, -1], [1, 0, -4]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.GREEN, positions: [[0, 0, -2], [1, 0, -3], [1, 0, -1]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.YELLOW, positions: [[-3, 0, -2], [0, 0, -5], [0, 0, -10]] }
        ];
        setupGrid(setups);
        L12_FudgeCraft_Score.updateDisplay();
        // debugger;
        // ƒ.Time.game.setScale(0.2);
        await L12_FudgeCraft_Score.ƒ.Time.game.delay(2000);
        L12_FudgeCraft_Score.compressAndHandleCombos(0);
    }
    function testCombos() {
        let setups = [
            { type: L12_FudgeCraft_Score.CUBE_TYPE.RED, positions: [[0, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, -1], [-1, 0, 0]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.GREEN, positions: [[-5, 0, 0], [-5, 0, 1], [-5, 1, 2], [-5, -1, 2], [-5, 0, 2]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.CYAN, positions: [[3, 0, 0], [3, 0, 1], [3, 0, 2], [3, 0, 3], [3, 0, 4], [3, 0, 5], [3, 0, 6], [3, 0, -1], [3, 0, -2]] },
            { type: L12_FudgeCraft_Score.CUBE_TYPE.BLUE, positions: [[0, 3, 0], [0, 3, 1], [0, 3, 2], [1, 3, 2], [2, 3, 2], [2, 3, 1], [2, 3, 0], [1, 3, 0], [0, 3, 0]] }
        ];
        setupGrid(setups);
        let startElements = setups.map((_setup) => {
            return L12_FudgeCraft_Score.grid.pull(new L12_FudgeCraft_Score.ƒ.Vector3(..._setup.positions[1]));
        });
        let combos = new L12_FudgeCraft_Score.Combos(startElements);
        L12_FudgeCraft_Score.handleCombos(combos, 1);
    }
    function testGrid() {
        let cube = new L12_FudgeCraft_Score.Cube(L12_FudgeCraft_Score.CUBE_TYPE.GREEN, L12_FudgeCraft_Score.ƒ.Vector3.ZERO());
        L12_FudgeCraft_Score.grid.push(cube.cmpTransform.local.translation, new L12_FudgeCraft_Score.GridElement(cube));
        let pulled = L12_FudgeCraft_Score.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L12_FudgeCraft_Score.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L12_FudgeCraft_Score.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function setupGrid(_setups) {
        _setups.forEach((_setup) => {
            _setup.positions.forEach((_position) => {
                let position = new L12_FudgeCraft_Score.ƒ.Vector3(..._position);
                let cube = new L12_FudgeCraft_Score.Cube(_setup.type, position);
                L12_FudgeCraft_Score.grid.push(position, new L12_FudgeCraft_Score.GridElement(cube));
            });
        });
    }
    function logResult(_success, ..._args) {
        let log = _success ? L12_FudgeCraft_Score.ƒ.Debug.log : L12_FudgeCraft_Score.ƒ.Debug.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L12_FudgeCraft_Score || (L12_FudgeCraft_Score = {}));
//# sourceMappingURL=Test.js.map