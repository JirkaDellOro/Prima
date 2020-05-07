"use strict";
var L05_Snake3DStart;
(function (L05_Snake3DStart) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        snake = new L05_Snake3DStart.Snake();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L05_Snake3DStart.viewport = new ƒ.Viewport();
        L05_Snake3DStart.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        ƒ.Debug.log(L05_Snake3DStart.viewport);
        // let axisVertical = new ƒ.Axis("Vertical", 1, ƒ.CONTROL_TYPE.PROPORTIONAL, true);
        // axisVertical.addControl(new ƒ.Control())
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        L05_Snake3DStart.viewport.draw();
        snake.move();
        console.log("Loop");
    }
    function control(_event) {
        let direction;
        direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.W]);
        direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.S]));
        if (direction.y == 0) {
            direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.X(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.D]);
            direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.X(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.A]));
        }
        if (!direction.equals(ƒ.Vector3.ZERO()))
            snake.direction = direction;
        let rotation = ƒ.Vector3.ZERO();
        rotation = new ƒ.Vector3(_event.code == ƒ.KEYBOARD_CODE.ARROW_DOWN ? 90 : (_event.code == ƒ.KEYBOARD_CODE.ARROW_UP ? -90 : 0), _event.code == ƒ.KEYBOARD_CODE.ARROW_RIGHT ? 90 : (_event.code == ƒ.KEYBOARD_CODE.ARROW_LEFT ? -90 : 0), 0);
        snake.rotate(rotation);
    }
})(L05_Snake3DStart || (L05_Snake3DStart = {}));
//# sourceMappingURL=Main.js.map