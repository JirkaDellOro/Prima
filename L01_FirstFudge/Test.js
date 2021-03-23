"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    function init(_event) {
        let node = new ƒ.Node("Test");
        const canvas = document.querySelector("canvas");
        let mesh = new ƒ.MeshQuad("Quad");
        node.addComponent(new ƒ.ComponentMesh(mesh));
        let material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        let cmpMaterial = new ƒ.ComponentMaterial(material);
        node.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(3);
        cmpCamera.mtxPivot.rotateY(180);
        console.log(cmpCamera);
        let viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Test.js.map