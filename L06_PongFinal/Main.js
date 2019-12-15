"use strict";
var L06_PongFinal;
(function (L06_PongFinal) {
    var ƒ = FudgeCore;
    let viewport;
    let pong;
    let ball;
    let mtxBall;
    let paddleLeft;
    let paddleRight;
    let keysPressed = {};
    let ballSpeed = new ƒ.Vector3(0.5, -0.0, 0);
    let paddleSpeedTranslation = 0.5;
    let paddleSpeedRotation = 5;
    let controls;
    let crc2;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        crc2 = canvas.getContext("2d");
        pong = createPong();
        controls = defineControls();
        mtxBall = ball.cmpTransform.local;
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50); //42);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);
        viewport.draw();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update(_event) {
        processInput();
        let hit = false;
        for (let node of pong.getChildren()) {
            if (node.name == "Ball")
                continue;
            hit = detectHit(mtxBall.translation, node);
            if (hit) {
                processHit(node);
                break;
            }
        }
        moveBall();
        ƒ.RenderManager.update();
        viewport.draw();
        crc2.strokeStyle = "white";
        crc2.lineWidth = 4;
        crc2.setLineDash([10, 10]);
        crc2.moveTo(crc2.canvas.width / 2, 0);
        crc2.lineTo(crc2.canvas.width / 2, crc2.canvas.height);
        crc2.stroke();
    }
    function detectHit(_position, _node) {
        let sclRect = _node.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let mtxInverse = ƒ.Matrix4x4.INVERSION(_node.cmpTransform.local);
        _position.transform(mtxInverse);
        let rect = new ƒ.Rectangle(0, 0, sclRect.x, sclRect.y, ƒ.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    }
    function processHit(_node) {
        ƒ.Debug.log("Reflect at ", _node.name);
        switch (_node.name) {
            case "WallTop":
            case "WallBottom":
                ballSpeed.y *= -1;
                break;
            case "WallRight":
            case "WallLeft":
                ballSpeed.x *= -1;
                break;
            case "PaddleLeft":
            case "PaddleRight":
                reflectBall(_node);
                break;
            default:
                ƒ.Debug.warn("Oh, no, I hit something unknown!!", _node.name);
                break;
        }
    }
    function reflectBall(_paddle) {
        let normal = ƒ.Vector3.X(-1);
        normal.transform(_paddle.cmpTransform.local, false);
        ballSpeed.reflect(normal);
    }
    function processInput() {
        for (let code in controls) {
            if (keysPressed[code]) {
                let control = controls[code];
                let mtxPaddle = control.paddle.cmpTransform.local;
                mtxPaddle.translation = ƒ.Vector3.SUM(mtxPaddle.translation, control.translation);
                mtxPaddle.rotateZ(control.rotation);
            }
        }
    }
    function defineControls() {
        let controls = {};
        controls[ƒ.KEYBOARD_CODE.ARROW_UP] = { paddle: paddleRight, translation: ƒ.Vector3.Y(paddleSpeedTranslation), rotation: 0 };
        controls[ƒ.KEYBOARD_CODE.ARROW_DOWN] = { paddle: paddleRight, translation: ƒ.Vector3.Y(-paddleSpeedTranslation), rotation: 0 };
        controls[ƒ.KEYBOARD_CODE.ARROW_LEFT] = { paddle: paddleRight, translation: ƒ.Vector3.ZERO(), rotation: paddleSpeedRotation };
        controls[ƒ.KEYBOARD_CODE.ARROW_RIGHT] = { paddle: paddleRight, translation: ƒ.Vector3.ZERO(), rotation: -paddleSpeedRotation };
        controls[ƒ.KEYBOARD_CODE.W] = { paddle: paddleLeft, translation: ƒ.Vector3.Y(paddleSpeedTranslation), rotation: 0 };
        controls[ƒ.KEYBOARD_CODE.S] = { paddle: paddleLeft, translation: ƒ.Vector3.Y(-paddleSpeedTranslation), rotation: 0 };
        controls[ƒ.KEYBOARD_CODE.A] = { paddle: paddleLeft, translation: ƒ.Vector3.ZERO(), rotation: paddleSpeedRotation };
        controls[ƒ.KEYBOARD_CODE.D] = { paddle: paddleLeft, translation: ƒ.Vector3.ZERO(), rotation: -paddleSpeedRotation };
        return controls;
    }
    function moveBall() {
        mtxBall.translate(ballSpeed);
    }
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function createPong() {
        let pong = new ƒ.Node("Pong");
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let meshQuad = new ƒ.MeshQuad();
        pong.appendChild(createNode("WallLeft", meshQuad, mtrSolidWhite, new ƒ.Vector2(-22, 0), new ƒ.Vector2(1, 30)));
        pong.appendChild(createNode("WallRight", meshQuad, mtrSolidWhite, new ƒ.Vector2(22, 0), new ƒ.Vector2(1, 30)));
        pong.appendChild(createNode("WallTop", meshQuad, mtrSolidWhite, new ƒ.Vector2(0, 15), new ƒ.Vector2(45, 1)));
        pong.appendChild(createNode("WallBottom", meshQuad, mtrSolidWhite, new ƒ.Vector2(0, -15), new ƒ.Vector2(45, 1)));
        ball = createNode("Ball", meshQuad, mtrSolidWhite, ƒ.Vector2.ZERO(), new ƒ.Vector2(1, 1));
        paddleLeft = createNode("PaddleLeft", meshQuad, mtrSolidWhite, new ƒ.Vector2(-20, 0), new ƒ.Vector2(1, 4));
        paddleRight = createNode("PaddleRight", meshQuad, mtrSolidWhite, new ƒ.Vector2(20, 0), new ƒ.Vector2(1, 4));
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new ƒ.Node(_name);
        node.addComponent(new ƒ.ComponentTransform);
        node.addComponent(new ƒ.ComponentMaterial(_material));
        node.addComponent(new ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(ƒ.ComponentMesh).pivot.scale(ƒ.Vector3.SUM(_scaling.toVector3(), ƒ.Vector3.Z()));
        return node;
    }
})(L06_PongFinal || (L06_PongFinal = {}));
//# sourceMappingURL=Main.js.map