"use strict";
var L14_DoomFace;
(function (L14_DoomFace) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    console.log(ƒ, ƒAid);
    window.addEventListener("load", init);
    function init(_event) {
        let coat = new ƒ.CoatTextured();
        coat.texture = new ƒ.TextureImage();
        coat.texture.image = document.querySelector("img");
        let idle = new ƒAid.SpriteSheetAnimation("Idle", coat);
        // easier to have the pivot in the center
        let startRect = new ƒ.Rectangle(0, 0, 24, 30, ƒ.ORIGIN2D.TOPLEFT);
        idle.generateByGrid(startRect, 3, new ƒ.Vector2(0, 0), 72, ƒ.ORIGIN2D.CENTER);
        let face = new ƒAid.NodeSprite("DoomFace");
        face.setAnimation(idle);
        face.framerate = 1;
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(-1);
        let viewport = new ƒ.Viewport();
        viewport.initialize("Portrait", face, cmpCamera, document.querySelector("canvas"));
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            viewport.draw();
        }
    }
})(L14_DoomFace || (L14_DoomFace = {}));
//# sourceMappingURL=Main.js.map