namespace L05_Snake3DStart {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  export let viewport: ƒ.Viewport;
  let snake: Snake;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.Debug.log(canvas);

    snake = new Snake();

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", snake, cmpCamera, canvas);
    ƒ.Debug.log(viewport);

    // let axisVertical = new ƒ.Axis("Vertical", 1, ƒ.CONTROL_TYPE.PROPORTIONAL, true);
    // axisVertical.addControl(new ƒ.Control())

    document.addEventListener("keydown", control);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
  }

  function update(_event: ƒ.Eventƒ): void {
    viewport.draw();

    snake.move();
    console.log("Loop");
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
  }
}