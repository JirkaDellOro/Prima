"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var ƒ = FudgeCore;
    var ƒaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new ƒ.Node("Root");
        let meshQuad = new ƒ.MeshQuad("Quad");
        let txtFloor = new ƒ.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new ƒ.Material("Floor", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtFloor));
        let floor = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(ƒ.Vector3.ONE(20));
        floor.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(10));
        root.appendChild(floor);
        let txtWall = new ƒ.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtWall));
        let wall = new ƒaid.Node("Wall", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), mtrWall, meshQuad);
        wall.mtxLocal.scale(ƒ.Vector3.ONE(2));
        wall.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(1));
        root.appendChild(wall);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(ƒ.Vector3.ONE(7));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");
        L08_Doom_Design.viewport = new ƒ.Viewport();
        L08_Doom_Design.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L08_Doom_Design.viewport.draw();
    }
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=Main.js.map