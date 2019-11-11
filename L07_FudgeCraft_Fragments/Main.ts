namespace L07_FudgeCraft_Fragments {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());

        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment: Fragment = new Fragment(0);
        console.log(fragment);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", fragment, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        viewport.draw();

    }
}