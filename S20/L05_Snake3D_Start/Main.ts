namespace L05_Snake3DStart {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  window.addEventListener("load", hndLoad);
  export let viewport: ƒ.Viewport;
  let snake: Snake;
  let cosys: ƒAid.NodeCoordinateSystem = new ƒAid.NodeCoordinateSystem("ControlSystem");

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.Debug.log(canvas);

    let graph: ƒ.Node = new ƒ.Node("Game");
    snake = new Snake();
    graph.addChild(snake);
    cosys.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(10))));
    graph.addChild(cosys);
    console.log(graph);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translate(new ƒ.Vector3(5, 10, 40));
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
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
    viewport.draw();
  }

  function control(_event: KeyboardEvent): void {
    let direction: ƒ.Vector3;
    direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.W]);
    direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.S]));

    if (direction.y == 0) {
      direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.X(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.D]);
      direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.X(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.A]));
    }

    if (!direction.equals(ƒ.Vector3.ZERO()))
      snake.direction = direction;

    let rotation: ƒ.Vector3 = ƒ.Vector3.ZERO();
    rotation = new ƒ.Vector3(
      _event.code == ƒ.KEYBOARD_CODE.ARROW_DOWN ? 90 : (_event.code == ƒ.KEYBOARD_CODE.ARROW_UP ? -90 : 0),
      _event.code == ƒ.KEYBOARD_CODE.ARROW_RIGHT ? 90 : (_event.code == ƒ.KEYBOARD_CODE.ARROW_LEFT ? -90 : 0),
      0);

    snake.rotate(rotation);
    cosys.mtxLocal.rotate(rotation);


  }
}