"use strict";
var L14_ScrollerFoundation;
(function (L14_ScrollerFoundation) {
    var ƒ = FudgeCore;
    class SpriteFrame {
    }
    class Sprite extends ƒ.Node {
        constructor() {
            super(...arguments);
            // private static mesh: ƒ.Mesh = new ƒ.MeshQuad();
            this.frames = [];
        }
        generate(_sizeTexture, _rects) {
            let rectTexture = new ƒ.Rectangle(0, 0, _sizeTexture.x, _sizeTexture.y);
            let framing = new ƒ.FramingScaled();
            framing.setScale(1 / _sizeTexture.x, 1 / _sizeTexture.y);
            for (let rect of _rects) {
                this.frames = [];
                let frame = new SpriteFrame();
                frame.rectTexture = framing.getRect(rect);
                frame.rectTexture.position = framing.getPoint(rect.position, rectTexture);
                this.frames.push(frame);
                ƒ.Debug.log(frame.rectTexture.toString());
            }
        }
    }
    L14_ScrollerFoundation.Sprite = Sprite;
    // Test
    let sprite = new Sprite("Sprite");
    let sizeTexture = new ƒ.Vector2(1000, 1000);
    let rects = [
        new ƒ.Rectangle(0, 0, 100, 100),
        new ƒ.Rectangle(0, 0, 50, 50),
        new ƒ.Rectangle(50, 50, 50, 50),
        new ƒ.Rectangle(25, 25, 50, 50)
    ];
    sprite.generate(sizeTexture, rects);
})(L14_ScrollerFoundation || (L14_ScrollerFoundation = {}));
//# sourceMappingURL=SpriteGenerator.js.map