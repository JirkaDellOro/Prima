"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        L02_FirstFudge.viewport = new ƒ.Viewport();
        let mesh = new ƒ.MeshQuad();
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        let node = new ƒ.Node("Quad");
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        let camera = new ƒ.ComponentCamera();
        camera.pivot.translate(new ƒ.Vector3(0, 0, 2));
        L02_FirstFudge.viewport.initialize("Viewport", node, camera, canvas);
        // ƒ.RenderManager.update();
        L02_FirstFudge.viewport.draw();
        ƒ.Debug.log(L02_FirstFudge.viewport);
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map