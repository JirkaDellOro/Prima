namespace L08_FudgeCraft_Collision {
    export import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    export let grid: Grid = new Grid();
    export let game: ƒ.Node;
    let viewport: ƒ.Viewport;
    // let rotate: ƒ.Vector3 = ƒ.Vector3.ZERO();


    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());

        game = new ƒ.Node("FudgeCraft");

        game.appendChild(new Fragment(0));
        // game.appendChild(new Fragment(1, ƒ.Vector3.X(3)));
        // game.appendChild(new Fragment(2, ƒ.Vector3.X(-3)));

        let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.DARK_GREY));
        game.addComponent(cmpLightAmbient);


        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log("Viewport", viewport);

        viewport.draw();

        ƒ.Debug.log("Game", game);

        window.addEventListener("keydown", hndKeyDown);

        test();
    }

    function hndKeyDown(_event: KeyboardEvent): void {
        let angle: number = 10;
        let rotate: ƒ.Vector3 = new ƒ.Vector3();
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                rotate.add(ƒ.Vector3.X(-angle));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(ƒ.Vector3.X(angle));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(ƒ.Vector3.Y(-angle));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(ƒ.Vector3.Y(angle));
                break;
        }

        let count: number = 9;
        let interval: number = window.setInterval(function (): void {
            for (let fragment of game.getChildren()) {
                // fragment.cmpTransform.local.rotation = rotate;   
                // fragment.cmpTransform.local.rotateX(rotate.x, true);
                // fragment.cmpTransform.local.rotateY(rotate.y, true);
                fragment.cmpTransform.local.rotate(rotate, true);
            }

            ƒ.RenderManager.update();
            viewport.draw();

            if (--count <= 0)
                window.clearInterval(interval);
        },
            10);
    }
}