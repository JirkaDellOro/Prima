namespace L14_ScrollerFoundation {
  import ƒ = FudgeCore;

  export class SpriteFrame {
    rectTexture: ƒ.Rectangle;
    pivot: ƒ.Matrix4x4;
    material: ƒ.Material;
    timeScale: number;
  }

  export class Sprite {
    private static mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
    public frames: SpriteFrame[] = [];
    private name: string;

    constructor(_name: string) {
      this.name = _name;
    }

    public static getMesh(): ƒ.MeshSprite {
      return Sprite.mesh;
    }

    /**
     * Creates a series of frames for this [[Sprite]] resulting in pivot matrices and materials to use on a sprite node
     * @param _texture The spritesheet
     * @param _rects A series of rectangles in pixel coordinates defining the single sprites on the sheet
     * @param _resolutionQuad The desired number of pixels within a length of 1 of the sprite quad
     * @param _origin The location of the origin of the sprite quad
     */
    public generate(_texture: ƒ.TextureImage, _rects: ƒ.Rectangle[], _resolutionQuad: number, _origin: ƒ.ORIGIN2D): void {
      this.frames = [];
      let framing: ƒ.FramingScaled = new ƒ.FramingScaled();
      framing.setScale(1 / _texture.image.width, 1 / _texture.image.height);

      let count: number = 0;
      for (let rect of _rects) {
        let frame: SpriteFrame = this.createFrame(this.name + `${count}`, _texture, framing, rect, _resolutionQuad, _origin);
        frame.timeScale = 1;
        this.frames.push(frame);

        // ƒ.Debug.log(frame.rectTexture.toString());
        // ƒ.Debug.log(frame.pivot.toString());
        // ƒ.Debug.log(frame.material);

        count++;
      }
    }

    public generateByGrid(_texture: ƒ.TextureImage, _startRect: ƒ.Rectangle, _frames: number, _borderSize: ƒ.Vector2, _resolutionQuad: number, _origin: ƒ.ORIGIN2D): void {
      let rect: ƒ.Rectangle = _startRect.copy;
      let rects: ƒ.Rectangle[] = [];
      while (_frames--) {
        rects.push(rect.copy);
        rect.position.x += _startRect.size.x + _borderSize.x;

        if (rect.right < _texture.image.width)
          continue;

        _startRect.position.y += _startRect.size.y + _borderSize.y;
        rect = _startRect.copy;
        if (rect.bottom > _texture.image.height)
          break;
      }

      rects.forEach((_rect: ƒ.Rectangle) => ƒ.Debug.log(_rect.toString()));
      this.generate(_texture, rects, _resolutionQuad, _origin);
    }

    private createFrame(_name: string, _texture: ƒ.TextureImage, _framing: ƒ.FramingScaled, _rect: ƒ.Rectangle, _resolutionQuad: number, _origin: ƒ.ORIGIN2D): SpriteFrame {
      let rectTexture: ƒ.Rectangle = new ƒ.Rectangle(0, 0, _texture.image.width, _texture.image.height);
      let frame: SpriteFrame = new SpriteFrame();

      frame.rectTexture = _framing.getRect(_rect);
      frame.rectTexture.position = _framing.getPoint(_rect.position, rectTexture);

      let rectQuad: ƒ.Rectangle = new ƒ.Rectangle(0, 0, _rect.width / _resolutionQuad, _rect.height / _resolutionQuad, _origin);
      frame.pivot = ƒ.Matrix4x4.IDENTITY;
      frame.pivot.translate(new ƒ.Vector3(rectQuad.position.x + rectQuad.size.x / 2, -rectQuad.position.y - rectQuad.size.y / 2, 0));
      frame.pivot.scaleX(rectQuad.size.x);
      frame.pivot.scaleY(rectQuad.size.y);
      // ƒ.Debug.log(rectQuad.toString());

      let coat: ƒ.CoatTextured = new ƒ.CoatTextured();
      coat.pivot.translate(frame.rectTexture.position);
      coat.pivot.scale(frame.rectTexture.size);
      coat.name = _name;
      coat.texture = _texture;

      frame.material = new ƒ.Material(_name, ƒ.ShaderTexture, coat);
      // ƒ.Debug.log(coat.pivot.toString());  

      return frame;
    }
  }

  export class NodeSprite extends ƒ.Node {
    private cmpMesh: ƒ.ComponentMesh;
    private cmpMaterial: ƒ.ComponentMaterial;
    private sprite: Sprite;
    private frameCurrent: number = 0;
    private direction: number = 1;

    constructor(_name: string, _sprite: Sprite) {
      super(_name);
      this.sprite = _sprite;

      this.cmpMesh = new ƒ.ComponentMesh(Sprite.getMesh());
      this.cmpMaterial = new ƒ.ComponentMaterial();
      this.addComponent(this.cmpMesh);
      this.addComponent(this.cmpMaterial);

      this.showFrame(this.frameCurrent);

      ƒ.Debug.info("NodeSprite constructor", this);
    }

    public showFrame(_index: number): void {
      let spriteFrame: SpriteFrame = this.sprite.frames[_index];
      this.cmpMesh.pivot = spriteFrame.pivot;
      this.cmpMaterial.material = spriteFrame.material;
      ƒ.RenderManager.updateNode(this);
      this.frameCurrent = _index;
    }

    public showFrameNext(): void {
      this.frameCurrent = (this.frameCurrent + this.direction + this.sprite.frames.length) % this.sprite.frames.length;
      this.showFrame(this.frameCurrent);
    }

    public setFrameDirection(_direction: number): void {
      this.direction = Math.floor(_direction);
    }
  }
}