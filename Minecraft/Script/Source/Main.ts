namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", start);

  async function start(_event: Event): Promise<void> {
    viewport = (<CustomEvent>_event).detail;

    generateWorld(10, 3, 10);

    viewport.canvas.addEventListener("pointerdown", pick);
    viewport.getBranch().addEventListener("pointerdown", <ƒ.EventListenerUnified>hit);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function pick(_event: PointerEvent): void {
    console.log("pick");
    viewport.dispatchPointerEvent(_event);
  }

  function hit(_event: PointerEvent): void {
    let node: ƒ.Node = (<ƒ.Node>_event.target);
    let cmpPick: ƒ.ComponentPick = node.getComponent(ƒ.ComponentPick);
    console.log(cmpPick.node.name);
  }

  function generateWorld(_width: number, _height: number, _depth: number): void {
    for (let y: number = 0; y < _height; y++)
      for (let z: number = 0; z < _depth; z++)
        for (let x: number = 0; x < _width; x++) {
          let vctPostion: ƒ.Vector3 = new ƒ.Vector3(x - _width / 2, -y, z - _depth / 2);
          let txtColor: string = ƒ.Random.default.getElement(["red", "lime", "blue", "yellow"]);
          let instance: Block = new Block(vctPostion, ƒ.Color.CSS(txtColor));
          instance.name = vctPostion.toString() + "|" + txtColor; 
          viewport.getBranch().addChild(instance);
        }
  }
}

