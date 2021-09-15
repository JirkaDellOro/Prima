"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let node = new ƒ.Node("Test");
    let viewport = new ƒ.Viewport();
    function init(_event) {
        const canvas = document.querySelector("canvas");
        node.addComponent(new ƒ.ComponentTransform());
        let mesh = new ƒ.MeshQuad("Quad");
        node.addComponent(new ƒ.ComponentMesh(mesh));
        let material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        let cmpMaterial = new ƒ.ComponentMaterial(material);
        node.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(3);
        cmpCamera.mtxPivot.rotateY(180);
        console.log(cmpCamera);
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        // console.log(_event);
        let rotSpeed = 90;
        let timeSinceLastFrameInSeconds = ƒ.Loop.timeFrameReal / 1000;
        node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * timeSinceLastFrameInSeconds);
        viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Test.js.map