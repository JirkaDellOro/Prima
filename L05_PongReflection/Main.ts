namespace L05_PongReflection {

    interface KeyPressed {
        [code: string]: boolean;
    }

    import ƒ = FudgeCore;
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", hndLoad);
    let viewport: ƒ.Viewport;

    let pong: ƒ.Node;
    let ball: ƒ.Node;
    let paddleLeft: ƒ.Node;
    let paddleRight: ƒ.Node;

    let ballSpeed: ƒ.Vector3 = new ƒ.Vector3(1, -1, 0);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);

        pong = createPong();

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50); //42);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);

        viewport.draw();

        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start();
    }

    function update(_event: Event): void {

        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_UP])
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_DOWN])
            paddleRight.cmpTransform.local.translate(ƒ.Vector3.Y(-0.3));
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_LEFT])
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(-0.3, 0, 0));
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_RIGHT])
            paddleRight.cmpTransform.local.translate(ƒ.Vector3.X(0.3));
        if (keysPressed[ƒ.KEYBOARD_CODE.W])
            paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
        if (keysPressed[ƒ.KEYBOARD_CODE.S])
            paddleLeft.cmpTransform.local.translate(ƒ.Vector3.Y(-0.3));

        let hit: boolean = false;
        for (let node of pong.getChildren()) {
            if (node.name == "Ball")
                continue;
            hit = detectHit(ball.cmpTransform.local.translation, node);

            if (hit) {
                processHit(node);
                break;
            }
        }

        // if (!hit)
        moveBall();

        ƒ.RenderManager.update();
        viewport.draw();
    }

    function detectHit(_position: ƒ.Vector3, _node: ƒ.Node): boolean {
        let sclRect: ƒ.Vector3 = _node.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRect: ƒ.Vector3 = _node.cmpTransform.local.translation.copy;
        let rect: ƒ.Rectangle = new ƒ.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, ƒ.ORIGIN2D.CENTER);
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
            // break;
            case "WallLeft":
            // ballSpeed.x *= -1;
            // break;
            case "PaddleLeft":
            // ballSpeed.x *= -1;
            // break;
            case "PaddleRight":
                ballSpeed.x *= -1;
                break;
            default:
                ƒ.Debug.warn("Oh, no, I hit something unknown!!", _node.name);
                break;
        }
    }

    function moveBall(): void {
        ball.cmpTransform.local.translate(ballSpeed);
    }

    function hndKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }

    function createPong(): ƒ.Node {
        let pong: ƒ.Node = new ƒ.Node("Pong");

        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
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
        node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling.toVector3());

        return node;
    }
}