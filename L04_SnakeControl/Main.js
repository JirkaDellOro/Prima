"use strict";
var L04_SnakeControl;
(function (L04_SnakeControl) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        snake = new L04_SnakeControl.Snake();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        L04_SnakeControl.viewport = new ƒ.Viewport();
        L04_SnakeControl.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        ƒ.Debug.log(L04_SnakeControl.viewport);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        L04_SnakeControl.viewport.draw();
        snake.move();
        console.log("Loop");
    }
})(L04_SnakeControl || (L04_SnakeControl = {}));
//# sourceMappingURL=Main.js.map