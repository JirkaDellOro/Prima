namespace L06_Snake3D_HeadControl {
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
    // let direction: ƒ.Vector3;
    // direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.W]);
    // direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.S]));

    // if (direction.y == 0) {
    //   direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.X(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.D]);
    //   direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.X(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.A]));
    // }

    // if (!direction.equals(ƒ.Vector3.ZERO()))
    //   snake.direction = direction;

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
    // cosys.mtxLocal.rotate(rotation);
  }
}