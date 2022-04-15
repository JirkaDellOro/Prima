namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let avatar: ƒ.Node;
  let speedRotY: number = 0.5;
  let cntWalk: ƒ.Control = new ƒ.Control("ControlWalk", 6, ƒ.CONTROL_TYPE.PROPORTIONAL);


  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    avatar = viewport.getBranch().getChildrenByName("Avatar")[0];
    viewport.camera = avatar.getChildrenByName("Camera")[0].getComponent(ƒ.ComponentCamera);

    document.addEventListener("pointermove", hndPointer);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    control();
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function control(): void {
    let input: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
    cntWalk.setInput(input);
    avatar.mtxLocal.translateZ(cntWalk.getOutput() * ƒ.Loop.timeFrameGame / 1000);
  }
  function hndPointer(_event: PointerEvent): void {
    avatar.mtxLocal.rotateY(speedRotY * _event.movementX);
  }
}