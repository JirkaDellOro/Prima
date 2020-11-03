namespace L06_BreakOut_Control {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let ball: Moveable;
  let walls: ƒ.Node;
  let paddle: Moveable;

  export let viewport: ƒ.Viewport;
  let root: ƒ.Node;

  let control: ƒ.Control = new ƒ.Control("PaddleControl", 20, ƒ.CONTROL_TYPE.PROPORTIONAL);
  control.setDelay(100);

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // ƒ.Debug.log(canvas);

    root = new ƒ.Node("Root");

    ball = new Moveable("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(1, 1));
    root.addChild(ball);

    paddle = new Moveable("Paddle", new ƒ.Vector2(0, -10), new ƒ.Vector2(5, 1));
    root.addChild(paddle);

    walls = new ƒ.Node("Walls");
    root.addChild(walls);

    walls.addChild(new GameObject("WallLeft", new ƒ.Vector2(-18, 0), new ƒ.Vector2(1, 30)));
    walls.addChild(new GameObject("WallRight", new ƒ.Vector2(18, 0), new ƒ.Vector2(1, 30)));
    walls.addChild(new GameObject("WallTop", new ƒ.Vector2(0, 12), new ƒ.Vector2(40, 1)));
    walls.addChild(new GameObject("WallBottom", new ƒ.Vector2(0, -12), new ƒ.Vector2(40, 1)));


    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    // ƒ.Debug.log(viewport);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
  }

  function hndLoop(_event: Event): void {
    // console.log("Tick");
    ball.move();
    viewport.draw();

    control.setInput(
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
    );

    // console.log(control.getOutput());
    paddle.velocity = ƒ.Vector3.X(control.getOutput());

    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
    //   paddle.velocity = ƒ.Vector3.X(-20);
    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
    //   paddle.velocity = ƒ.Vector3.X(20);

    paddle.move();

    hndCollision();
  }

  function hndCollision(): void {
    for (let wall of walls.getChildren())
      ball.checkCollision(<GameObject>wall);

    ball.checkCollision(paddle);
  }
}