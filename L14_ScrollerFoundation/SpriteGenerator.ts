namespace L14_ScrollerFoundation {
  import ƒ = FudgeCore;

  class SpriteFrame {
    rectTexture: ƒ.Rectangle;
    pivot: ƒ.Matrix4x4;
    material: ƒ.Material;
  }

  export class Sprite extends ƒ.Node {
    // private static mesh: ƒ.Mesh = new ƒ.MeshQuad();
    private frames: SpriteFrame[] = [];

    public generate(_sizeTexture: ƒ.Vector2, _rects: ƒ.Rectangle[]): void {
      let rectTexture: ƒ.Rectangle = new ƒ.Rectangle(0, 0, _sizeTexture.x, _sizeTexture.y);
      let framing: ƒ.FramingScaled = new ƒ.FramingScaled();
      framing.setScale(1 / _sizeTexture.x, 1 / _sizeTexture.y);

      for (let rect of _rects) {
        this.frames = [];
        let frame: SpriteFrame = new SpriteFrame();
        frame.rectTexture = framing.getRect(rect);
        frame.rectTexture.position = framing.getPoint(rect.position, rectTexture);
        this.frames.push(frame);
        ƒ.Debug.log(frame.rectTexture.toString());
      }

    }
  }

  // Test
  let sprite: Sprite = new Sprite("Sprite");
  let sizeTexture: ƒ.Vector2 = new ƒ.Vector2(1000, 1000);
  let rects: ƒ.Rectangle[] = [
    new ƒ.Rectangle(0, 0, 100, 100),
    new ƒ.Rectangle(0, 0, 50, 50),
    new ƒ.Rectangle(50, 50, 50, 50),
    new ƒ.Rectangle(25, 25, 50, 50)
  ];

  sprite.generate(sizeTexture, rects);
}