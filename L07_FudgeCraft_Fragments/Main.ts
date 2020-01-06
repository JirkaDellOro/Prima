namespace L07_FudgeCraft_Fragments {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    let viewport: ƒ.Viewport;
    let game: ƒ.Node;
    let rotate: ƒ.Vector3 = ƒ.Vector3.ZERO();

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());

        game = new ƒ.Node("FudgeCraft");

        game.appendChild(new Fragment(0));
        game.appendChild(new Fragment(1, ƒ.Vector3.X(3)));
        game.appendChild(new Fragment(2, ƒ.Vector3.X(-3)));

        let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.CSS("WHITE")));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);


        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log("Viewport", viewport);

        viewport.draw();

        ƒ.Debug.log("Game", game);

        window.addEventListener("keydown", hndKeyDown);
    }

    function hndKeyDown(_event: KeyboardEvent): void {
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                rotate.add(ƒ.Vector3.X(-5));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(ƒ.Vector3.X(5));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(ƒ.Vector3.Y(-5));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(ƒ.Vector3.Y(5));
                break;
        }
        for (let fragment of game.getChildren()) {
            fragment.cmpTransform.local.rotation = rotate;
        }

        ƒ.RenderManager.update();
        viewport.draw();
    }
}