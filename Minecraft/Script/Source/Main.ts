namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  //@ts-ignore
  document.addEventListener("interactiveViewportStarted", start);

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    let block: ƒ.Graph = <ƒ.Graph>ƒ.Project.resources["Graph|2023-04-20T13:16:47.382Z|26427"];
    let instance: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(block);
    console.log(instance);
    instance.mtxLocal.translateX(1);
    viewport.getBranch().addChild(instance);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}