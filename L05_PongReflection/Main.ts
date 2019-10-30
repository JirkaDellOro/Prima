namespace L05_PongReflection {

    interface KeyPressed {
        [code: string]: boolean;
    }

    import ƒ = FudgeCore;
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", hndLoad);
    let viewport: ƒ.Viewport;

    let ball: ƒ.Node = new ƒ.Node("Ball");
    let paddleLeft: ƒ.Node = new ƒ.Node("PaddleLeft");
    let paddleRight: ƒ.Node = new ƒ.Node("PaddleRight");

    let ballSpeed: ƒ.Vector3 = new ƒ.Vector3(0.1, -0.1, 0);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);

        let pong: ƒ.Node = createPong();

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);


        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);

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

        
        let sclRect: ƒ.Vector3 = paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRect: ƒ.Vector3 = paddleRight.cmpTransform.local.translation.copy;
        let hit: boolean = detectHit(ball.cmpTransform.local.translation, posRect, sclRect);
        console.log(hit);
        if (!hit) moveBall();

        ƒ.RenderManager.update();
        viewport.draw();
    }

    function detectHit(_position: ƒ.Vector3, _posRect: ƒ.Vector3, _sclRect: ƒ.Vector3): boolean {
        let rect: ƒ.Rectangle = new ƒ.Rectangle(_posRect.x, _posRect.y, _sclRect.x, _sclRect.y, ƒ.ORIGIN2D.CENTER);
        return rect.isInside(_position.getVector2());
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

        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();

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
}