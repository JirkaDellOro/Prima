namespace L14_ScrollerFoundation {
  import ƒ = FudgeCore;

  window.addEventListener("load", test);

  function test(): void {
    let img: HTMLImageElement = document.querySelector("img");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let txtImage: ƒ.TextureImage = new ƒ.TextureImage();
    txtImage.image = img;

    let sprite: Sprite = new Sprite("Test");
    let rects: ƒ.Rectangle[] = [
      new ƒ.Rectangle(0, 0, 360, 416),
      new ƒ.Rectangle(0, 0, 180, 208),
      new ƒ.Rectangle(180, 0, 180, 208),
      new ƒ.Rectangle(0, 208, 180, 208),
      new ƒ.Rectangle(180, 208, 180, 208)
    ];

    sprite.generate(txtImage, rects, 300, ƒ.ORIGIN2D.BOTTOMCENTER);

    ƒ.RenderManager.initialize(true, false);
    let root: ƒ.Node = new ƒ.Node("Root");
    root.addComponent(new ƒ.ComponentMesh(Sprite.getMesh()));
    let spriteFrame: SpriteFrame = sprite.getFrame(1);
    root.addComponent(new ƒ.ComponentMaterial(spriteFrame.material));
    root.getComponent(ƒ.ComponentMesh).pivot = spriteFrame.pivot;
    // root.addComponent(new ƒ.ComponentMaterial(red));
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();
  }
}