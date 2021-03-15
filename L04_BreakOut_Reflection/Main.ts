namespace L04_BreakOut_Reflection {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let ball: GameObject;
  let walls: ƒ.Node;

  export let viewport: ƒ.Viewport;
  let root: ƒ.Node;

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // ƒ.Debug.log(canvas);

    root = new ƒ.Node("Root");

    ball = new GameObject("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(1, 1));
    root.addChild(ball);
    
    ball.velocity = new ƒ.Vector3(ƒ.Random.default.getRange(-1, 1), ƒ.Random.default.getRange(-1, 1), 0);
    let speed: number = 15;
    ball.velocity.normalize(speed);

    walls = new ƒ.Node("Walls");
    root.addChild(walls);

    walls.addChild(new GameObject("WallLeft", new ƒ.Vector2(-18, 0), new ƒ.Vector2(1, 30)));
    walls.addChild(new GameObject("WallRight", new ƒ.Vector2(18, 0), new ƒ.Vector2(1, 30)));
    walls.addChild(new GameObject("WallTop", new ƒ.Vector2(0, 12), new ƒ.Vector2(40, 1)));
    walls.addChild(new GameObject("WallBottom", new ƒ.Vector2(0, -12), new ƒ.Vector2(40, 1)));


    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(40);
    cmpCamera.mtxPivot.rotateY(180);

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

    hndCollision();
  }

  function hndCollision(): void {
    for (let wall of walls.getChildren()) {
      let intersection: ƒ.Rectangle = ball.rect.getIntersection((<GameObject>wall).rect);
      if (intersection) {
        console.log("Ball collides");
        if (intersection.size.x > intersection.size.y)
          ball.velocity.y *= -1;
        else
          ball.velocity.x *= -1;
      }
    }
  }
}