namespace L14_ScrollerFoundation {
  import ƒ = FudgeCore;

  window.addEventListener("load", test);
  let sprite: Sprite;
  let root: NodeSprite;

  function test(): void {
    let img: HTMLImageElement = document.querySelector("img");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let txtImage: ƒ.TextureImage = new ƒ.TextureImage();
    txtImage.image = img;

    sprite = new Sprite("Test");
    let rects: ƒ.Rectangle[] = [
      new ƒ.Rectangle(0, 0, 360, 416),
      new ƒ.Rectangle(0, 0, 180, 208),
      new ƒ.Rectangle(180, 0, 180, 208),
      new ƒ.Rectangle(0, 208, 180, 208),
      new ƒ.Rectangle(180, 208, 180, 208)
    ];

    sprite.generate(txtImage, rects, 300, ƒ.ORIGIN2D.BOTTOMCENTER);

    ƒ.RenderManager.initialize(true, false);
    root = new NodeSprite("Root", sprite);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);

    function update(_event: ƒ.Eventƒ): void {
      // ƒ.Debug.log(frame);
      root.showFrameNext();
      viewport.draw();
      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }
}