"use strict";
var L03_SnakeMove;
(function (L03_SnakeMove) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        snake = new L03_SnakeMove.Snake();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        L03_SnakeMove.viewport = new ƒ.Viewport();
        L03_SnakeMove.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        ƒ.Debug.log(L03_SnakeMove.viewport);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        L03_SnakeMove.viewport.draw();
        snake.move();
        console.log("Loop");
    }
})(L03_SnakeMove || (L03_SnakeMove = {}));
//# sourceMappingURL=Main.js.map