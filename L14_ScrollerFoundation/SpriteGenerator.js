"use strict";
var L14_ScrollerFoundation;
(function (L14_ScrollerFoundation) {
    var ƒ = FudgeCore;
    class SpriteFrame {
    }
    class Sprite {
        constructor(_name) {
            this.frames = [];
            this.name = _name;
        }
        /**
         * Creates a series of frames for this [[Sprite]] resulting in pivot matrices and materials to use on a sprite node
         * @param _sizeTexture The size of a spritesheet to use for texturing
         * @param _rects A series of rectangles in pixel coordinates defining the single sprites on the sheet
         * @param _resolutionQuad The desired number of pixels within a length of 1 of the sprite mesh
         * @param _origin The location of the origin of the sprite mesh
         */
        generate(_texture, _rects, _resolutionQuad, _origin) {
            this.frames = [];
            let framing = new ƒ.FramingScaled();
            framing.setScale(1 / _texture.image.width, 1 / _texture.image.height);
            let count = 0;
            for (let rect of _rects) {
                let frame = this.createFrame(this.name + `${count}`, _texture, framing, rect, _resolutionQuad, _origin);
                this.frames.push(frame);
                ƒ.Debug.log(frame.rectTexture.toString());
                ƒ.Debug.log(frame.pivot.toString());
                ƒ.Debug.log(frame.material);
                count++;
            }
        }
        getMesh() {
            return Sprite.mesh;
        }
        createFrame(_name, _texture, _framing, _rect, _resolutionQuad, _origin) {
            let rectTexture = new ƒ.Rectangle(0, 0, _texture.image.width, _texture.image.height);
            let frame = new SpriteFrame();
            frame.rectTexture = _framing.getRect(_rect);
            frame.rectTexture.position = _framing.getPoint(_rect.position, rectTexture);
            let rectQuad = new ƒ.Rectangle(0, 0, _rect.width / _resolutionQuad, _rect.height / _resolutionQuad, _origin);
            frame.pivot = ƒ.Matrix4x4.IDENTITY;
            frame.pivot.translate(rectQuad.position.toVector3());
            frame.pivot.scaleX(rectQuad.size.x);
            frame.pivot.scaleY(rectQuad.size.y);
            let coat = new ƒ.CoatTextured();
            coat.pivot.translate(frame.rectTexture.position);
            coat.pivot.scale(frame.rectTexture.size);
            coat.name = _name;
            coat.texture = _texture;
            frame.material = new ƒ.Material(_name, ƒ.ShaderTexture, coat);
            return frame;
        }
    }
    Sprite.mesh = new ƒ.MeshQuad();
    L14_ScrollerFoundation.Sprite = Sprite;
    class ComponentSprite extends ƒ.Component {
    }
    L14_ScrollerFoundation.ComponentSprite = ComponentSprite;
    class NodeSprite extends Node {
        constructor(_name) {
            super(_name);
        }
    }
    L14_ScrollerFoundation.NodeSprite = NodeSprite;
})(L14_ScrollerFoundation || (L14_ScrollerFoundation = {}));
//# sourceMappingURL=SpriteGenerator.js.map