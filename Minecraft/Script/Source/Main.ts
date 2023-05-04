namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  export let blocks: ƒ.Node
  export let grid: Block[][][] = [];

  document.addEventListener("interactiveViewportStarted", start);

  async function start(_event: Event): Promise<void> {
    viewport = (<CustomEvent>_event).detail;

    generateWorld(10, 3, 9);

    let pickAlgorithm = [pickByComponent, pickByCamera, pickByRadius, pickByGrid];

    viewport.canvas.addEventListener("pointerdown", pickAlgorithm[1]);
    viewport.getBranch().addEventListener("pointerdown", <ƒ.EventListenerUnified>hitComponent);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function generateWorld(_width: number, _height: number, _depth: number): void {
    blocks = new ƒ.Node("Blocks");
    viewport.getBranch().addChild(blocks);
    // let vctOffset: ƒ.Vector2 = new ƒ.Vector2(Math.floor(_width / 2), Math.floor(_depth / 2));
    let vctOffset: ƒ.Vector2 = ƒ.Vector2.ZERO();

    for (let y: number = 0; y < _height; y++) {
      grid[y] = [];
      for (let z: number = 0; z < _depth; z++) {
        grid[y][z] = [];
        for (let x: number = 0; x < _width; x++) {
          let vctPostion: ƒ.Vector3 = new ƒ.Vector3(x - vctOffset.x, y, z - vctOffset.y);
          let txtColor: string = ƒ.Random.default.getElement(["red", "lime", "blue", "yellow"]);
          let block: Block = new Block(vctPostion, ƒ.Color.CSS(txtColor));
          block.name = vctPostion.toString() + "|" + txtColor;
          blocks.addChild(block);
          grid[y][z][x] = block;
        }
      }
    }
    console.log(grid);
  }
}


