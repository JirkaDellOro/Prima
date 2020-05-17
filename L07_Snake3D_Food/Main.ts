namespace L07_Snake3D_Food {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.RenderManager.initialize(true, true);
  window.addEventListener("load", hndLoad);


  export let size: number = 7;
  export let viewport: ƒ.Viewport;
  export let mtrStandard: ƒ.Material = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("white")));

  let snake: Snake;
  let items: ƒ.Node;
  let cosys: ƒAid.NodeCoordinateSystem = new ƒAid.NodeCoordinateSystem("ControlSystem");



  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.Debug.log(canvas);

    let graph: ƒ.Node = new ƒ.Node("Game");
    snake = new Snake();
    graph.addChild(snake);

    items = new ƒ.Node("Items");
    graph.addChild(items);
    for (let i: number = 0; i < 20; i++)
      placeFood();

    let cube: ƒAid.Node = new ƒAid.Node(
      "Cube", ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(2 * size - 1)),
      mtrStandard,
      new ƒ.MeshCube()
    );
    cube.getComponent(ƒ.ComponentMaterial).clrPrimary = new ƒ.Color(0.4, 0.6, 0.3, 0.3);
    graph.addChild(cube);

    ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translate(new ƒ.Vector3(5, 10, 40));
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("white");
    // cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);
    ƒ.Debug.log(viewport);

    document.addEventListener("keydown", control);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
  }

  function update(_event: ƒ.Eventƒ): void {
    snake.move();
    moveCamera();
    viewport.draw();
  }

  function moveCamera(): void {
    let mtxHead: ƒ.Matrix4x4 = snake.head.mtxLocal;
    let posCamera: ƒ.Vector3 = mtxHead.translation;
    posCamera.normalize(30);
    viewport.camera.pivot.translation = posCamera;
    let up: ƒ.Vector3 = ƒ.Vector3.X();
    up.transform(mtxHead, false);
    viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO());
    // viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO(), up);
  }


  function control(_event: KeyboardEvent): void {
    let rotation: ƒ.Vector3 = ƒ.Vector3.ZERO();

    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
        rotation = ƒ.Vector3.Y(-90);
        break;
      case ƒ.KEYBOARD_CODE.ARROW_LEFT:
        rotation = ƒ.Vector3.Y(90);
        break;
      case ƒ.KEYBOARD_CODE.SPACE:
        rotation = ƒ.Vector3.Z(-90);
        break;
      default:
        return;
    }

    snake.rotate(rotation);
  }

  function placeFood(): void {
    let position: ƒ.Vector3 = new ƒ.Vector3(
      ƒ.Random.default.getRangeFloored(-size, size),
      ƒ.Random.default.getRangeFloored(-size, size),
      ƒ.Random.default.getSign() * size
    );
    position.shuffle();
    let food: ƒAid.Node = new ƒAid.Node("Food", ƒ.Matrix4x4.TRANSLATION(position), mtrStandard, new ƒ.MeshCube());
    food.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("red");
    items.addChild(food);
  }
}