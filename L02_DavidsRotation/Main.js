"use strict";
var L02_DavidsRotation;
(function (L02_DavidsRotation) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);
        root = new ƒ.Node("Root");
        root.addComponent(new ƒ.ComponentTransform());
        let quad = new ƒ.Node("Quad");
        let meshQuad = new ƒ.MeshQuad();
        let cmpQuad = new ƒ.ComponentMesh(meshQuad);
        quad.addComponent(cmpQuad);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        quad.addComponent(cMaterial);
        root.addChild(quad);
        let torus = new ƒ.Node("Torus");
        let meshTorus = new ƒ.MeshTorus("Torus", 1, 10, 1);
        let cmpTorus = new ƒ.ComponentMesh(meshTorus);
        cmpTorus.mtxPivot.translateX(0);
        cmpTorus.mtxPivot.rotateZ(90);
        cmpTorus.mtxPivot.rotateX(90);
        torus.addComponent(cmpTorus);
        let orange = new ƒ.Material("Orange", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("ORANGE")));
        let corange = new ƒ.ComponentMaterial(orange);
        torus.addComponent(corange);
        root.appendChild(torus);
        let cube = new ƒ.Node("Cube");
        let meshCube = new ƒ.MeshCube();
        let cmpCube = new ƒ.ComponentMesh(meshCube);
        let red = new ƒ.Material("Red", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));
        let cred = new ƒ.ComponentMaterial(red);
        cmpCube.mtxPivot.scaleX(0.5);
        cmpCube.mtxPivot.scaleY(0.5);
        torus.addComponent(corange);
        cube.addComponent(cmpCube);
        cube.addComponent(cred);
        root.appendChild(cube);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(4);
        cmpCamera.mtxPivot.rotateY(180);
        L02_DavidsRotation.viewport = new ƒ.Viewport();
        L02_DavidsRotation.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // ƒ.Debug.log(viewport);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        console.log("Tick");
        root.mtxLocal.rotateZ(10);
        L02_DavidsRotation.viewport.draw();
    }
})(L02_DavidsRotation || (L02_DavidsRotation = {}));
//# sourceMappingURL=Main.js.map