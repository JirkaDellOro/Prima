namespace L11_FudgeCraft_Compress {
  type Setup = { type: CUBE_TYPE, positions: number[][] };

  export function startTests(): void {
    switch (args.get("test")) {
      case "grid": testGrid(); break;
      case "combos": testCombos(); break;
      case "compression": testCompression(); break;
      case "camera": testCamera(); break;
    }
  }

  function testCamera(): void {
    let setups: Setup[] = [
      { type: CUBE_TYPE.BLACK, positions: [[0, 0, 0]] }
    ];
    setupGrid(setups);
    startRandomFragment();
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, rotateY);
    ƒ.Loop.start();
    // ƒ.Time.game.setTimer(4, 0, rotateY);
    function rotateY(_event: Event): void {
      camera.rotateY(1 * ƒ.Loop.timeFrameReal);
      // camera.rotateX(5 * Math.sin(ƒ.Time.game.get() / 100));
      updateDisplay();
    }
  }

  async function testCompression(): Promise<void> {
    let setups: Setup[] = [
      { type: CUBE_TYPE.BLACK, positions: [[0, 0, 0]] },
      // { type: CUBE_TYPE.RED, positions: [[-2, -2, 0], [-2, -2, 1], [-2, -2, -1]] },
      // { type: CUBE_TYPE.GREEN, positions: [[0, -2 , 0], [1, -2, 0], [-1, -2, 0]] },
      // { type: CUBE_TYPE.BLUE, positions: [[1, 0, 0] /*, [0, 0, 2], [0, -1, 2], [0, 1, 2]*/] },
      { type: CUBE_TYPE.YELLOW, positions: [[3, 1, 0], [2, 0, 1], [2, 1, 1]] }
      // { type: CUBE_TYPE.YELLOW, positions: [[0, -2, -2], [1, -2, -2], [-1, -2, -2]] }
    ];

    setupGrid(setups);
    updateDisplay();
    // debugger;

    // ƒ.Time.game.setScale(0.2);
    await ƒ.Time.game.delay(2000);
    compressAndHandleCombos();
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