namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  interface Config {
    [key: string]: number | string | Config;
  }


  let viewport: ƒ.Viewport;
  let avatar: ƒ.Node;
  let cmpCamera: ƒ.ComponentCamera;
  let speedRotY: number = -0.1;
  let speedRotX: number = 0.2;
  let rotationX: number = 0;
  let cntWalk: ƒ.Control = new ƒ.Control("cntWalk", 6, ƒ.CONTROL_TYPE.PROPORTIONAL, 500);
  let gameState: GameState;
  let config: Config;

  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    avatar = viewport.getBranch().getChildrenByName("Avatar")[0];
    viewport.camera = cmpCamera = avatar.getChild(0).getComponent(ƒ.ComponentCamera);
    viewport.getBranch().addEventListener("toggleTorch", hndToggleTorch);

    gameState = new GameState();
    let response: Response = await fetch("config.json");
    config = await response.json();
    console.log(config);

    let canvas: HTMLCanvasElement = viewport.getCanvas();
    canvas.addEventListener("pointermove", hndPointerMove);
    canvas.requestPointerLock();
    document.addEventListener("keydown", hndKeydown);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function hndToggleTorch(_event: Event): void {
    console.log(_event);
  }

  function hndKeydown(_event: KeyboardEvent): void {
    if (_event.code != ƒ.KEYBOARD_CODE.SPACE)
      return;

    let torch: ƒ.Node = avatar.getChildrenByName("Torch")[0];
    torch.activate(!torch.isActive);

    torch.dispatchEvent(new Event("toggleTorch", { bubbles: true }));
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    controlWalk();
    viewport.draw();
    ƒ.AudioManager.default.update();
    gameState.battery -= <number>config["drain"];
    // document.querySelector("input").value = battery.toFixed(3);
  }

  function controlWalk(): void {
    let input: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
    cntWalk.setInput(input);
    avatar.mtxLocal.translateZ(cntWalk.getOutput() * ƒ.Loop.timeFrameGame / 1000);
  }

  function hndPointerMove(_event: PointerEvent): void {
    avatar.mtxLocal.rotateY(_event.movementX * speedRotY);
    rotationX += _event.movementY * speedRotX;
    rotationX = Math.min(60, Math.max(-60, rotationX));
    cmpCamera.mtxPivot.rotation = ƒ.Vector3.X(rotationX);
  }
}