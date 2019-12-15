namespace L06_PongFinal {
    import ƒ = FudgeCore;

    interface KeyPressed {
        [code: string]: boolean;
    }

    interface Control {
        paddle: ƒ.Node;
        translation: ƒ.Vector3;
        rotation: number;
    }

    interface Controls {
        [code: string]: Control;
    }


    let viewport: ƒ.Viewport;

    let pong: ƒ.Node;
    let ball: ƒ.Node;
    let mtxBall: ƒ.Matrix4x4;
    let paddleLeft: ƒ.Node;
    let paddleRight: ƒ.Node;
    let keysPressed: KeyPressed = {};
    let ballSpeed: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.0, 0);
    let paddleSpeedTranslation: number = 0.5;
    let paddleSpeedRotation: number = 5;
    let controls: Controls;

    let crc2: CanvasRenderingContext2D;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);

        crc2 = canvas.getContext("2d");

        pong = createPong();
        controls = defineControls();
        mtxBall = ball.cmpTransform.local;

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50); //42);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);

        viewport.draw();

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start();
    }

    function update(_event: Event): void {
        processInput();
        let hit: boolean = false;
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

    function detectHit(_position: ƒ.Vector3, _node: ƒ.Node): boolean {
        let sclRect: ƒ.Vector3 = _node.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let mtxInverse: ƒ.Matrix4x4 = ƒ.Matrix4x4.INVERSION(_node.cmpTransform.local);
        _position.transform(mtxInverse);
        let rect: ƒ.Rectangle = new ƒ.Rectangle(0, 0, sclRect.x, sclRect.y, ƒ.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    }

    function processHit(_node: ƒ.Node): void {
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

    function reflectBall(_paddle: ƒ.Node): void {
        let normal: ƒ.Vector3 = ƒ.Vector3.X(-1);
        normal.transform(_paddle.cmpTransform.local, false);
        ballSpeed.reflect(normal);
    }

    function processInput(): void {
        for (let code in controls) {
            if (keysPressed[code]) {
                let control: Control = controls[code];
                let mtxPaddle: ƒ.Matrix4x4 = control.paddle.cmpTransform.local;
                mtxPaddle.translation = ƒ.Vector3.SUM(mtxPaddle.translation, control.translation);
                mtxPaddle.rotateZ(control.rotation);
            }
        }
    }

    function defineControls(): Controls {
        let controls: Controls = {};
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

    function moveBall(): void {
        mtxBall.translate(ballSpeed);
    }

    function hndKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }

    function createPong(): ƒ.Node {
        let pong: ƒ.Node = new ƒ.Node("Pong");

        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();

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

    function createNode(_name: string, _mesh: ƒ.Mesh, _material: ƒ.Material, _translation: ƒ.Vector2, _scaling: ƒ.Vector2): ƒ.Node {
        let node: ƒ.Node = new ƒ.Node(_name);
        node.addComponent(new ƒ.ComponentTransform);
        node.addComponent(new ƒ.ComponentMaterial(_material));
        node.addComponent(new ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(ƒ.ComponentMesh).pivot.scale(ƒ.Vector3.SUM(_scaling.toVector3(), ƒ.Vector3.Z()));

        return node;
    }
}