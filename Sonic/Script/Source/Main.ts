namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let sonic: ƒ.Node;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  // document.addEventListener("keydown", hndKeyboard)


  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    sonic = viewport.getBranch().getChildrenByName("Sonic")[0];
    console.log(sonic);

    let cmpCamera: ƒ.ComponentCamera = viewport.getBranch().getComponent(ƒ.ComponentCamera);
    viewport.camera = cmpCamera;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
      sonic.mtxLocal.translateX(0.05);
    viewport.draw();
    // ƒ.AudioManager.default.update();
  }

  // function hndKeyboard(_event: KeyboardEvent) {
  //   if (_event.code == )
  // }
}

