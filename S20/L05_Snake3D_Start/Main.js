"use strict";
var L05_Snake3DStart;
(function (L05_Snake3DStart) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let snake;
    let cosys = new ƒAid.NodeCoordinateSystem("ControlSystem");
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let graph = new ƒ.Node("Game");
        snake = new L05_Snake3DStart.Snake();
        graph.addChild(snake);
        cosys.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(10))));
        graph.addChild(cosys);
        console.log(graph);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(5, 10, 40));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        // cmpCamera.pivot.rotateY(180);
        L05_Snake3DStart.viewport = new ƒ.Viewport();
        L05_Snake3DStart.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(L05_Snake3DStart.viewport);
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        snake.move();
        L05_Snake3DStart.viewport.draw();
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
        cosys.mtxLocal.rotate(rotation);
    }
})(L05_Snake3DStart || (L05_Snake3DStart = {}));
//# sourceMappingURL=Main.js.map