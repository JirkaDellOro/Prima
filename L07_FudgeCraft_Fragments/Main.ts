namespace L07_FudgeCraft_Fragments {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());

        let game: ƒ.Node = new ƒ.Node("FudgeCraft");

        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment: Fragment = new Fragment(0);
        // ƒ.Debug.log("Fragment", fragment);
        game.appendChild(fragment);

        fragment = new Fragment(1);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(3))));
        game.appendChild(fragment);

        fragment = new Fragment(2);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-3))));
        game.appendChild(fragment);

        let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);


        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log("Viewport", viewport);

        viewport.draw();

        ƒ.Debug.log("Game", game);
    }
}