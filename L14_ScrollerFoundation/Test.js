"use strict";
var L14_ScrollerFoundation;
(function (L14_ScrollerFoundation) {
    var ƒ = FudgeCore;
    window.addEventListener("load", test);
    function test() {
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        let sprite = new L14_ScrollerFoundation.Sprite("Test");
        let rects = [
            new ƒ.Rectangle(0, 0, 360, 416),
            new ƒ.Rectangle(0, 0, 180, 208),
            new ƒ.Rectangle(180, 0, 180, 208),
            new ƒ.Rectangle(0, 208, 180, 208),
            new ƒ.Rectangle(180, 208, 180, 208)
        ];
        sprite.generate(txtImage, rects, 300, ƒ.ORIGIN2D.BOTTOMCENTER);
        ƒ.RenderManager.initialize(true, false);
        let root = new ƒ.Node("Root");
        root.addComponent(new ƒ.ComponentMesh(L14_ScrollerFoundation.Sprite.getMesh()));
        let spriteFrame = sprite.getFrame(1);
        root.addComponent(new ƒ.ComponentMaterial(spriteFrame.material));
        root.getComponent(ƒ.ComponentMesh).pivot = spriteFrame.pivot;
        // root.addComponent(new ƒ.ComponentMaterial(red));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");
        let viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
    }
})(L14_ScrollerFoundation || (L14_ScrollerFoundation = {}));
//# sourceMappingURL=Test.js.map