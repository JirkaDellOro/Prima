namespace L12_FudgeCraft_Score {
  export import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);

  export let game: ƒ.Node = new ƒ.Node("FudgeCraft");
  export let grid: Grid = new Grid();
  export let args: URLSearchParams;
  export let camera: CameraOrbit;
  export let points: Points;
  let control: Control = new Control();
  let viewport: ƒ.Viewport;
  let speedCameraRotation: number = 0.2;
  let speedCameraTranslation: number = 0.02;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    args = new URLSearchParams(location.search);
    ƒ.RenderManager.initialize(true);
    ƒ.Debug.log("Canvas", canvas);

    // enable unlimited mouse-movement (user needs to click on canvas first)
    canvas.addEventListener("click", canvas.requestPointerLock);

    // set lights
    let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
    cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
    // game.addComponent(cmpLight);
    let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.DARK_GREY));
    game.addComponent(cmpLightAmbient);

    // setup orbiting camera
    camera = new CameraOrbit(75);
    game.appendChild(camera);
    camera.setRotationX(-20);
    camera.setRotationY(20);
    camera.cmpCamera.getContainer().addComponent(cmpLight);

    // setup viewport
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", game, camera.cmpCamera, canvas);
    ƒ.Debug.log("Viewport", viewport);
    points = new Points(viewport, document.querySelector("#score"));

    // setup event handling
    viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
    viewport.activateWheelEvent(ƒ.EVENT_WHEEL.WHEEL, true);
    viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, hndPointerMove);
    viewport.addEventListener(ƒ.EVENT_WHEEL.WHEEL, hndWheelMove);
    window.addEventListener("keydown", hndKeyDown);

    game.appendChild(control);

    if (args.get("test"))
      startTests();
    else
      startGame();

    updateDisplay();
    ƒ.Debug.log("Game", game);

  }

  function startGame(): void {
    grid.push(ƒ.Vector3.ZERO(), new GridElement(new Cube(CUBE_TYPE.BLACK, ƒ.Vector3.ZERO())));
    startRandomFragment();
  }

  export function updateDisplay(): void {
    viewport.draw();
  }

  //#region Interaction

  function hndPointerMove(_event: ƒ.PointerEventƒ): void {
    // let segmentBefore: number = camera.getSegmentY();
    camera.rotateY(_event.movementX * speedCameraRotation);
    camera.rotateX(_event.movementY * speedCameraRotation);
    // let segmentAfter: number = camera.getSegmentY();

    // if (segmentAfter - segmentBefore) {
    if (!ƒ.Time.game.hasTimers())
      control.rotateToSegment(camera.getSegmentY());
    // }

    updateDisplay();
  }

  function hndWheelMove(_event: WheelEvent): void {
    camera.translate(_event.deltaY * speedCameraTranslation);
    updateDisplay();
  }

  function hndKeyDown(_event: KeyboardEvent): void {
    if (ƒ.Time.game.hasTimers())
      return;

    if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
      dropFragment();
    }

    if (_event.code == ƒ.KEYBOARD_CODE.Q)
      control.rotatePerspektive(-90);
    if (_event.code == ƒ.KEYBOARD_CODE.E)
      control.rotatePerspektive(90);

    let transformation: Transformation = Control.transformations[_event.code];
    if (transformation)
      move(transformation);

    updateDisplay();
  }

  //#endregion

  //#region Start/Drop Fragments
  export function startRandomFragment(): void {
    let fragment: Fragment = Fragment.getRandom();
    control.cmpTransform.local.translation = ƒ.Vector3.Z(5);
    control.setFragment(fragment);
  }

  async function dropFragment(): Promise<void> {
    if (!control.isConnected()) 
      return;
    let dropped: GridElement[] = control.dropFragment();
    let combos: Combos = new Combos(dropped);

    let iCombo: number = await handleCombos(combos, 0);
    if (iCombo > 0)
      compressAndHandleCombos(iCombo);
    startRandomFragment();
    updateDisplay();
  }
  //#endregion

  //#region Combos & Compression
  export async function compressAndHandleCombos(_iCombo: number): Promise<void> {
    let moves: Move[];
    let iCombo: number = _iCombo;
    do {
      moves = compress();
      await ƒ.Time.game.delay(400);

      let moved: GridElement[] = moves.map(_move => _move.element);
      let combos: Combos = new Combos(moved);
      let iCounted: number = await handleCombos(combos, iCombo);
      iCombo += iCounted;
    } while (moves.length > 0);
  }

  export async function handleCombos(_combos: Combos, _iCombo: number): Promise<number> {
    let iCombo: number = 0;
    for (let combo of _combos.found)
      if (combo.length > 2) {
        iCombo++;
        points.showCombo(combo, _iCombo + iCombo);
        for (let shrink: number = Math.PI - Math.asin(0.9); shrink >= 0; shrink -= 0.2) {
          for (let element of combo) {
            let mtxLocal: ƒ.Matrix4x4 = element.cube.cmpTransform.local;
            mtxLocal.scaling = ƒ.Vector3.ONE(Math.sin(shrink) * 1.2);
          }
          updateDisplay();
          await ƒ.Time.game.delay(20);
        }
        for (let element of combo)
          grid.pop(element.position);
      }
    updateDisplay();
    return iCombo;
  }

  function move(_transformation: Transformation): void {
    let animationSteps: number = 5;
    let fullRotation: number = 90;
    let fullTranslation: number = 1;
    let move: Transformation = {
      rotation: _transformation.rotation ? ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new ƒ.Vector3(),
      translation: _transformation.translation ? ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new ƒ.Vector3()
    };

    if (control.checkCollisions(move).length > 0)
      return;

    move.translation.scale(1 / animationSteps);
    move.rotation.scale(1 / animationSteps);

    ƒ.Time.game.setTimer(20, animationSteps, function (_event: ƒ.TimerEventƒ): void {
      control.move(move);
      updateDisplay();
    });
  }

  export function compress(): Move[] {
    let moves: Move[] = grid.compress();

    for (let move of moves) {
      grid.pop(move.element.position);
      grid.push(move.target, move.element);
    }

    let animationSteps: number = 5;
    ƒ.Time.game.setTimer(20, animationSteps, function (_event: ƒ.TimerEventƒ): void {
      for (let move of moves) {
        let translation: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(move.target, move.element.position);
        translation.normalize(1 / animationSteps);
        move.element.position = ƒ.Vector3.SUM(move.element.position, translation);
        if (_event.lastCall)
          move.element.position = move.target;

      }
      updateDisplay();
    });

    return moves;
  }
  //#endregion
}