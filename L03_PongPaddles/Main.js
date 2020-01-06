"use strict";
var L03_PongPaddle;
(function (L03_PongPaddle) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let ball = new ƒ.Node("Ball");
    let paddleLeft = new ƒ.Node("PaddleLeft");
    let paddleRight = new ƒ.Node("PaddleRight");
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        let pong = createPong();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
        document.addEventListener("keydown", hndKeydown);
        viewport.draw();
    }
    function hndKeydown(_event) {
        // let keycode: number = 
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                paddleRight.cmpTransform.local.translate(ƒ.Vector3.Y(-0.3));
                break;
            case ƒ.KEYBOARD_CODE.W:
                paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                break;
            case ƒ.KEYBOARD_CODE.S:
                paddleLeft.cmpTransform.local.translate(ƒ.Vector3.Y(-0.3));
                break;
        }
        ƒ.RenderManager.update();
        viewport.draw();
    }
    function createPong() {
        let pong = new ƒ.Node("Pong");
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let meshQuad = new ƒ.MeshQuad();
        ball.addComponent(new ƒ.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new ƒ.ComponentMesh(meshQuad));
        paddleRight.addComponent(new ƒ.ComponentMesh(meshQuad));
        ball.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        paddleLeft.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new ƒ.ComponentTransform());
        paddleLeft.addComponent(new ƒ.ComponentTransform());
        paddleRight.addComponent(new ƒ.ComponentTransform());
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
})(L03_PongPaddle || (L03_PongPaddle = {}));
//# sourceMappingURL=Main.js.map