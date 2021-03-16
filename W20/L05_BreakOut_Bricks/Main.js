"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball;
    let walls;
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);
        root = new ƒ.Node("Root");
        ball = new L05_BreakOut_Bricks.Moveable("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(1, 1));
        root.addChild(ball);
        walls = new ƒ.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallLeft", new ƒ.Vector2(-18, 0), new ƒ.Vector2(1, 30)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallRight", new ƒ.Vector2(18, 0), new ƒ.Vector2(1, 30)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallTop", new ƒ.Vector2(0, 12), new ƒ.Vector2(40, 1)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallBottom", new ƒ.Vector2(0, -12), new ƒ.Vector2(40, 1)));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L05_BreakOut_Bricks.viewport = new ƒ.Viewport();
        L05_BreakOut_Bricks.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // ƒ.Debug.log(viewport);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        // console.log("Tick");
        ball.move();
        L05_BreakOut_Bricks.viewport.draw();
        hndCollision();
    }
    function hndCollision() {
        for (let wall of walls.getChildren())
            ball.checkCollision(wall);
    }
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=Main.js.map