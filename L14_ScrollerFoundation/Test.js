"use strict";
var L14_ScrollerFoundation;
(function (L14_ScrollerFoundation) {
    var ƒ = FudgeCore;
    window.addEventListener("load", test);
    function test() {
        let img = document.querySelector("img");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        let sprite = new L14_ScrollerFoundation.Sprite("Test");
        let rects = [
            new ƒ.Rectangle(0, 0, 100, 100),
            new ƒ.Rectangle(0, 0, 50, 50),
            new ƒ.Rectangle(50, 50, 50, 50),
            new ƒ.Rectangle(25, 25, 50, 50)
        ];
        sprite.generate(txtImage, rects, 100, ƒ.ORIGIN2D.BOTTOMCENTER);
    }
})(L14_ScrollerFoundation || (L14_ScrollerFoundation = {}));
//# sourceMappingURL=Test.js.map