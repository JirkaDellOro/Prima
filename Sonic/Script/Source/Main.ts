namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let sonic: ƒ.Node;
  let gravity: number = -9.81;
  let ySpeed: number = 0;
  let isGrounded: boolean = true;

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
    let timeFrame: number = ƒ.Loop.timeFrameGame / 1000; // time since last frame in seconds
    // ƒ.Physics.simulate();  // if physics is included and used
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
      sonic.mtxLocal.translateX(1 * timeFrame);
    if (isGrounded && ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
      ySpeed = 5;
      isGrounded = false;
    }


    ySpeed += gravity * timeFrame;
    let pos: ƒ.Vector3 = sonic.mtxLocal.translation;
    pos.y += ySpeed * timeFrame;
    if (pos.y < 0.5) {
      ySpeed = 0;
      pos.y = 0.5;
      isGrounded = true;
    }
    sonic.mtxLocal.translation = pos;

    viewport.draw();
    // ƒ.AudioManager.default.update();
  }

  // function hndKeyboard(_event: KeyboardEvent) {
  //   if (_event.code == )
  // }
}

