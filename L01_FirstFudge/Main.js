"use strict";
var L01_FirstFudgeXXX;
(function (L01_FirstFudgeXXX) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let node = new ƒ.Node("Quad");
        let mesh = new ƒ.MeshQuad();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);
        L01_FirstFudgeXXX.viewport = new ƒ.Viewport();
        L01_FirstFudgeXXX.viewport.initialize("Viewport", node, cmpCamera, canvas);
        ƒ.Debug.log(L01_FirstFudgeXXX.viewport);
        L01_FirstFudgeXXX.viewport.draw();
    }
})(L01_FirstFudgeXXX || (L01_FirstFudgeXXX = {}));
//# sourceMappingURL=Main.js.map