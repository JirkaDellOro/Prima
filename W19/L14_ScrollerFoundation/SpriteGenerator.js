"use strict";
var L14_ScrollerFoundation;
(function (L14_ScrollerFoundation) {
    var ƒ = FudgeCore;
    class SpriteFrame {
    }
    L14_ScrollerFoundation.SpriteFrame = SpriteFrame;
    class Sprite {
        constructor(_name) {
            this.frames = [];
            this.name = _name;
        }
        static getMesh() {
            return Sprite.mesh;
        }
        /**
         * Creates a series of frames for this [[Sprite]] resulting in pivot matrices and materials to use on a sprite node
         * @param _texture The spritesheet
         * @param _rects A series of rectangles in pixel coordinates defining the single sprites on the sheet
         * @param _resolutionQuad The desired number of pixels within a length of 1 of the sprite quad
         * @param _origin The location of the origin of the sprite quad
         */
        generate(_texture, _rects, _resolutionQuad, _origin) {
            this.frames = [];
            let framing = new ƒ.FramingScaled();
            framing.setScale(1 / _texture.image.width, 1 / _texture.image.height);
            let count = 0;
            for (let rect of _rects) {
                let frame = this.createFrame(this.name + `${count}`, _texture, framing, rect, _resolutionQuad, _origin);
                frame.timeScale = 1;
                this.frames.push(frame);
                // ƒ.Debug.log(frame.rectTexture.toString());
                // ƒ.Debug.log(frame.pivot.toString());
                // ƒ.Debug.log(frame.material);
                count++;
            }
        }
        generateByGrid(_texture, _startRect, _frames, _borderSize, _resolutionQuad, _origin) {
            let rect = _startRect.copy;
            let rects = [];
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
            rects.forEach((_rect) => ƒ.Debug.log(_rect.toString()));
            this.generate(_texture, rects, _resolutionQuad, _origin);
        }
        createFrame(_name, _texture, _framing, _rect, _resolutionQuad, _origin) {
            let rectTexture = new ƒ.Rectangle(0, 0, _texture.image.width, _texture.image.height);
            let frame = new SpriteFrame();
            frame.rectTexture = _framing.getRect(_rect);
            frame.rectTexture.position = _framing.getPoint(_rect.position, rectTexture);
            let rectQuad = new ƒ.Rectangle(0, 0, _rect.width / _resolutionQuad, _rect.height / _resolutionQuad, _origin);
            frame.pivot = ƒ.Matrix4x4.IDENTITY;
            frame.pivot.translate(new ƒ.Vector3(rectQuad.position.x + rectQuad.size.x / 2, -rectQuad.position.y - rectQuad.size.y / 2, 0));
            frame.pivot.scaleX(rectQuad.size.x);
            frame.pivot.scaleY(rectQuad.size.y);
            // ƒ.Debug.log(rectQuad.toString());
            let coat = new ƒ.CoatTextured();
            coat.pivot.translate(frame.rectTexture.position);
            coat.pivot.scale(frame.rectTexture.size);
            coat.name = _name;
            coat.texture = _texture;
            frame.material = new ƒ.Material(_name, ƒ.ShaderTexture, coat);
            // ƒ.Debug.log(coat.pivot.toString());  
            return frame;
        }
    }
    Sprite.mesh = new ƒ.MeshSprite();
    L14_ScrollerFoundation.Sprite = Sprite;
    class NodeSprite extends ƒ.Node {
        constructor(_name, _sprite) {
            super(_name);
            this.frameCurrent = 0;
            this.direction = 1;
            this.sprite = _sprite;
            this.cmpMesh = new ƒ.ComponentMesh(Sprite.getMesh());
            this.cmpMaterial = new ƒ.ComponentMaterial();
            this.addComponent(this.cmpMesh);
            this.addComponent(this.cmpMaterial);
            this.showFrame(this.frameCurrent);
            ƒ.Debug.info("NodeSprite constructor", this);
        }
        showFrame(_index) {
            let spriteFrame = this.sprite.frames[_index];
            this.cmpMesh.pivot = spriteFrame.pivot;
            this.cmpMaterial.material = spriteFrame.material;
            ƒ.RenderManager.updateNode(this);
            this.frameCurrent = _index;
        }
        showFrameNext() {
            this.frameCurrent = (this.frameCurrent + this.direction + this.sprite.frames.length) % this.sprite.frames.length;
            this.showFrame(this.frameCurrent);
        }
        setFrameDirection(_direction) {
            this.direction = Math.floor(_direction);
        }
    }
    L14_ScrollerFoundation.NodeSprite = NodeSprite;
})(L14_ScrollerFoundation || (L14_ScrollerFoundation = {}));
//# sourceMappingURL=SpriteGenerator.js.map