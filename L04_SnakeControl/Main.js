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
        // let axisVertical = new ƒ.Axis("Vertical", 1, ƒ.CONTROL_TYPE.PROPORTIONAL, true);
        // axisVertical.addControl(new ƒ.Control())
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        L04_SnakeControl.viewport.draw();
        snake.move();
        console.log("Loop");
    }
    function control(_event) {
        let direction;
        direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]);
        direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]));
        if (direction.y == 0) {
            direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.X(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
            direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.X(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]));
        }
        if (!direction.equals(ƒ.Vector3.ZERO()))
            snake.direction = direction;
    }
})(L04_SnakeControl || (L04_SnakeControl = {}));
//# sourceMappingURL=Main.js.map