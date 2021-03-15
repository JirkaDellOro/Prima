"use strict";
var L04_BreakOut_Reflection;
(function (L04_BreakOut_Reflection) {
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
        ball = new L04_BreakOut_Reflection.GameObject("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(1, 1));
        root.addChild(ball);
        ball.velocity = new ƒ.Vector3(ƒ.Random.default.getRange(-1, 1), ƒ.Random.default.getRange(-1, 1), 0);
        let speed = 15;
        ball.velocity.normalize(speed);
        walls = new ƒ.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L04_BreakOut_Reflection.GameObject("WallLeft", new ƒ.Vector2(-18, 0), new ƒ.Vector2(1, 30)));
        walls.addChild(new L04_BreakOut_Reflection.GameObject("WallRight", new ƒ.Vector2(18, 0), new ƒ.Vector2(1, 30)));
        walls.addChild(new L04_BreakOut_Reflection.GameObject("WallTop", new ƒ.Vector2(0, 12), new ƒ.Vector2(40, 1)));
        walls.addChild(new L04_BreakOut_Reflection.GameObject("WallBottom", new ƒ.Vector2(0, -12), new ƒ.Vector2(40, 1)));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(40);
        cmpCamera.mtxPivot.rotateY(180);
        L04_BreakOut_Reflection.viewport = new ƒ.Viewport();
        L04_BreakOut_Reflection.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // ƒ.Debug.log(viewport);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        // console.log("Tick");
        ball.move();
        L04_BreakOut_Reflection.viewport.draw();
        hndCollision();
    }
    function hndCollision() {
        for (let wall of walls.getChildren()) {
            let intersection = ball.rect.getIntersection(wall.rect);
            if (intersection) {
                console.log("Ball collides");
                if (intersection.size.x > intersection.size.y)
                    ball.velocity.y *= -1;
                else
                    ball.velocity.x *= -1;
            }
        }
    }
})(L04_BreakOut_Reflection || (L04_BreakOut_Reflection = {}));
//# sourceMappingURL=Main.js.map