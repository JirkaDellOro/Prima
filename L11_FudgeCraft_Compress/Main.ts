namespace L11_FudgeCraft_Compress {
  export import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);

  export let game: ƒ.Node = new ƒ.Node("FudgeCraft");
  export let grid: Grid = new Grid();
  export let args: URLSearchParams;
  export let camera: CameraOrbit;
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
    let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.CSS("WHITE")));
    cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
    // game.addComponent(cmpLight);
    let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(new ƒ.Color(0.25, 0.25, 0.25, 1)));
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

  function hndPointerMove(_event: ƒ.EventPointer): void {
    if (ƒ.Time.game.hasTimers())
      return;
    let segmentBefore: number = camera.getSegmentY();
    camera.rotateY(_event.movementX * speedCameraRotation);
    camera.rotateX(_event.movementY * speedCameraRotation);
    let segmentAfter: number = camera.getSegmentY();

    if (segmentAfter - segmentBefore) {
      control.rotateToSegment(segmentAfter);
    }

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

  function dropFragment(): void {
    let dropped: GridElement[] = control.dropFragment();
    let combos: Combos = new Combos(dropped);

    let combosPopped: boolean = handleCombos(combos);
    if (combosPopped)
      compressAndHandleCombos();
    startRandomFragment();
  }

  export async function compressAndHandleCombos(): Promise<void> {
    let moves: Move[];
    do {
      moves = compress();
      await ƒ.Time.game.delay(400);

      let moved: GridElement[] = moves.map(_move => _move.element);
      let combos: Combos = new Combos(moved);
      handleCombos(combos);
    } while (moves.length > 0);
  }

  function handleCombos(_combos: Combos): boolean {
    let pop: boolean = false;
    for (let combo of _combos.found)
      if (combo.length > 2) {
        pop = true;
        for (let element of combo) {
          let mtxLocal: ƒ.Matrix4x4 = element.cube.cmpTransform.local;
          ƒ.Debug.log(element.cube.name, mtxLocal.translation.getMutator());
          // mtxLocal.rotateX(45);
          // mtxLocal.rotateY(45);
          // mtxLocal.rotateY(45, true);
          mtxLocal.scale(ƒ.Vector3.ONE(0.5));
          grid.pop(element.position);
        }
      }
    updateDisplay();
    return pop;
  }

  function move(_transformation: Transformation): void {
    let animationSteps: number = 10;
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

    ƒ.Time.game.setTimer(10, animationSteps, function (_event: ƒ.EventTimer): void {
      control.move(move);
      updateDisplay();
    });
  }

  export function startRandomFragment(): void {
    let fragment: Fragment = Fragment.getRandom();
    control.cmpTransform.local.translation = ƒ.Vector3.Z(5);
    control.setFragment(fragment);
  }

  export function compress(): Move[] {
    let moves: Move[] = grid.compress();

    for (let move of moves) {
      grid.pop(move.element.position);
      grid.push(move.target, move.element);
    }

    let animationSteps: number = 10;
    ƒ.Time.game.setTimer(10, animationSteps, function (): void {
      for (let move of moves) {
        let translation: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(move.target, move.element.position);
        translation.normalize(1 / animationSteps);
        move.element.position = ƒ.Vector3.SUM(move.element.position, translation);
      }
      updateDisplay();
    });

    return moves;
  }
}