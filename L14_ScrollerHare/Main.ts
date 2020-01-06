/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L14_ScrollerHare {
  import ƒ = FudgeCore;
  import Sprite = L14_ScrollerFoundation.Sprite;
  import NodeSprite = L14_ScrollerFoundation.NodeSprite;

  window.addEventListener("load", test);
  let sprite: Sprite;
  let root: ƒ.Node;

  function test(): void {
    let img: HTMLImageElement = document.querySelector("img");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let txtImage: ƒ.TextureImage = new ƒ.TextureImage();
    txtImage.image = img;

    sprite = new Sprite("Hare");
    sprite.generateByGrid(txtImage, ƒ.Rectangle.GET(2, 104, 68, 64), 6, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);

    ƒ.RenderManager.initialize(true, false);
    root = new ƒ.Node("Root");
    let mtxHare: ƒ.Matrix4x4;
    let hare: NodeSprite;

    hare = new NodeSprite("Hare0", sprite);
    hare.setFrameDirection(-1);
    root.appendChild(hare);

    hare = new NodeSprite("Hare1", sprite);
    mtxHare = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(1));
    mtxHare.scaleX(-1);
    hare.addComponent(new ƒ.ComponentTransform(mtxHare));
    root.appendChild(hare);

    hare = new NodeSprite("Hare2", sprite);
    mtxHare = ƒ.Matrix4x4.IDENTITY;
    hare.addComponent(new ƒ.ComponentTransform(mtxHare));
    root.appendChild(hare);

    hare = new NodeSprite("Hare3", sprite);
    mtxHare = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-1));
    hare.addComponent(new ƒ.ComponentTransform(mtxHare));
    root.appendChild(hare);

    for (let child of root.getChildren())
      child.addEventListener(
        "showNext",
        (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
        true
      );

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
      // root.showFrameNext();
      root.broadcastEvent(new CustomEvent("showNext"));
      root.getChildren()[3].cmpTransform.local.rotateY(5);
      mtxHare = root.getChildren()[2].cmpTransform.local;
      mtxHare.translateX(0.1);
      // ƒ.Debug.log(mtxHare.translation.toString());
      if (mtxHare.translation.x > 2)
        mtxHare.translation = ƒ.Vector3.X(-2);


      viewport.draw();

      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }
}