namespace L14_ScrollerFoundation {
  import ƒ = FudgeCore;

  class SpriteFrame {
    rectTexture: ƒ.Rectangle;
    pivot: ƒ.Matrix4x4;
    material: ƒ.Material;
  }

  export class Sprite {
    private static mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
    private frames: SpriteFrame[] = [];
    private name: string;

    constructor(_name: string) {
      this.name = _name;
    }

    /**
     * Creates a series of frames for this [[Sprite]] resulting in pivot matrices and materials to use on a sprite node
     * @param _sizeTexture The size of a spritesheet to use for texturing
     * @param _rects A series of rectangles in pixel coordinates defining the single sprites on the sheet
     * @param _resolutionQuad The desired number of pixels within a length of 1 of the sprite mesh
     * @param _origin The location of the origin of the sprite mesh
     */
    public generate(_texture: ƒ.TextureImage, _rects: ƒ.Rectangle[], _resolutionQuad: number, _origin: ƒ.ORIGIN2D): void {
      this.frames = [];
      let framing: ƒ.FramingScaled = new ƒ.FramingScaled();
      framing.setScale(1 / _texture.image.width, 1 / _texture.image.height);

      let count: number = 0;
      for (let rect of _rects) {
        let frame: SpriteFrame = this.createFrame(this.name + `${count}`, _texture, framing, rect, _resolutionQuad, _origin);
        this.frames.push(frame);

        ƒ.Debug.log(frame.rectTexture.toString());
        ƒ.Debug.log(frame.pivot.toString());
        ƒ.Debug.log(frame.material);

        count++;
      }
    }

    public getMesh(): ƒ.MeshQuad {
      return Sprite.mesh;
    }

    private createFrame(_name: string, _texture: ƒ.TextureImage, _framing: ƒ.FramingScaled, _rect: ƒ.Rectangle, _resolutionQuad: number, _origin: ƒ.ORIGIN2D): SpriteFrame {
      let rectTexture: ƒ.Rectangle = new ƒ.Rectangle(0, 0, _texture.image.width, _texture.image.height);
      let frame: SpriteFrame = new SpriteFrame();

      frame.rectTexture = _framing.getRect(_rect);
      frame.rectTexture.position = _framing.getPoint(_rect.position, rectTexture);

      let rectQuad: ƒ.Rectangle = new ƒ.Rectangle(0, 0, _rect.width / _resolutionQuad, _rect.height / _resolutionQuad, _origin);
      frame.pivot = ƒ.Matrix4x4.IDENTITY;
      frame.pivot.translate(rectQuad.position.toVector3());
      frame.pivot.scaleX(rectQuad.size.x);
      frame.pivot.scaleY(rectQuad.size.y);

      let coat: ƒ.CoatTextured = new ƒ.CoatTextured();
      coat.pivot.translate(frame.rectTexture.position);
      coat.pivot.scale(frame.rectTexture.size);
      coat.name = _name;
      coat.texture = _texture;

      frame.material = new ƒ.Material(_name, ƒ.ShaderTexture, coat);

      return frame;
    }
  }

  export class ComponentSprite extends ƒ.Component {

  }

  export class NodeSprite extends Node {
    constructor(_name: string) {
      super(_name);
      
    }
  }
}