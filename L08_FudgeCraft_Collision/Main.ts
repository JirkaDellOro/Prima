namespace L08_FudgeCraft_Collision {
    export import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    export let grid: Grid = new Grid();
    export let game: ƒ.Node;
    let viewport: ƒ.Viewport;
    let control: Control;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());

        game = new ƒ.Node("FudgeCraft");
        control = new Control();
        let fragment: Fragment = new Fragment(0);
        control.setFragment(fragment);
        game.appendChild(control);

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
        let transformation: Transformation = Control.transformations[_event.code];
        if (!transformation)
            return;

        let animationSteps: number = 10;
        let fullRotation: number = 90;
        let fullTranslation: number = 1;
        let move: Transformation = {
            rotation: transformation.rotation ? ƒ.Vector3.SCALE(transformation.rotation, fullRotation / animationSteps) : new ƒ.Vector3(),
            translation: transformation.translation ? ƒ.Vector3.SCALE(transformation.translation, fullTranslation / animationSteps) : new ƒ.Vector3()
        };
        
        let timers: ƒ.Timers = ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;

        ƒ.Time.game.setTimer(10, animationSteps, function (): void {
            control.move(move);
            ƒ.RenderManager.update();
            viewport.draw();
        });
    }
}