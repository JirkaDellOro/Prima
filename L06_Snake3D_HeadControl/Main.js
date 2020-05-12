"use strict";
var L06_Snake3D_HeadControl;
(function (L06_Snake3D_HeadControl) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let snake;
    let cosys = new ƒAid.NodeCoordinateSystem("ControlSystem");
    ƒ.RenderManager.initialize(true);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let graph = new ƒ.Node("Game");
        snake = new L06_Snake3D_HeadControl.Snake();
        graph.addChild(snake);
        cosys.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(10))));
        // graph.addChild(cosys);
        let cube = new ƒAid.Node("Cube", ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(9)), new ƒ.Material("Cube", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("aqua"))), new ƒ.MeshCube());
        graph.addChild(cube);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(5, 10, 40));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        // cmpCamera.pivot.rotateY(180);
        L06_Snake3D_HeadControl.viewport = new ƒ.Viewport();
        L06_Snake3D_HeadControl.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(L06_Snake3D_HeadControl.viewport);
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        snake.move();
        moveCamera();
        L06_Snake3D_HeadControl.viewport.draw();
    }
    function moveCamera() {
        let posCamera = snake.head.mtxLocal.translation;
        posCamera.normalize(30);
        L06_Snake3D_HeadControl.viewport.camera.pivot.translation = posCamera;
        L06_Snake3D_HeadControl.viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO());
    }
    function control(_event) {
        // let direction: ƒ.Vector3;
        // direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.W]);
        // direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.S]));
        // if (direction.y == 0) {
        //   direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.X(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.D]);
        //   direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.X(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.A]));
        // }
        // if (!direction.equals(ƒ.Vector3.ZERO()))
        //   snake.direction = direction;
        let rotation = ƒ.Vector3.ZERO();
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotation = ƒ.Vector3.Y(-90);
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotation = ƒ.Vector3.Y(90);
                break;
            case ƒ.KEYBOARD_CODE.SPACE:
                rotation = ƒ.Vector3.Z(-90);
                break;
            default:
                return;
        }
        snake.rotate(rotation);
        // cosys.mtxLocal.rotate(rotation);
    }
})(L06_Snake3D_HeadControl || (L06_Snake3D_HeadControl = {}));
//# sourceMappingURL=Main.js.map