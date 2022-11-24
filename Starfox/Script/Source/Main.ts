namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let cmpEngine: EngineScript;
  let vctMouse: ƒ.Vector2 = ƒ.Vector2.ZERO();
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  window.addEventListener("mousemove", hndMouse);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
    ƒ.Physics.settings.solverIterations = 300;
    let ship: ƒ.Node = viewport.getBranch().getChildrenByName("Ship")[0];
    cmpEngine = ship.getComponent(EngineScript);
    let cmpCamera = ship.getComponent(ƒ.ComponentCamera);
    viewport.camera = cmpCamera;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    control();
    ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function hndMouse(e: MouseEvent): void {
    vctMouse.x = 2 * (e.clientX / window.innerWidth) - 1;
    vctMouse.y = 2 * (e.clientY / window.innerHeight) - 1;
  }

  function control() {
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
      cmpEngine.thrust();
    }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
      cmpEngine.backwards();
    }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
      cmpEngine.roll(-5);
    }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
      cmpEngine.roll(5);
    }

    cmpEngine.pitch(vctMouse.y);
    cmpEngine.yaw(vctMouse.x);
  }
}