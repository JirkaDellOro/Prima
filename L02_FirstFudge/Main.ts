namespace L02_FirstFudge {
    import ƒ = FudgeCore;
    
    window.addEventListener("load", hndLoad);
    
    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        console.log(canvas);
        
        let viewport: ƒ.Viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", null, null,canvas);

    }
}