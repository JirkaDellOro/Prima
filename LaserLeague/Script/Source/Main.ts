namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let transform: ƒ.Matrix4x4;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    let graph: ƒ.Node = viewport.getBranch();
    let laser: ƒ.Node = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser")[0];
    transform = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    transform.rotateZ(5);
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}