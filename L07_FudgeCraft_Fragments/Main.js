"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        let game = new ƒ.Node("FudgeCraft");
        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment = new L07_FudgeCraft_Fragments.Fragment(0);
        // ƒ.Debug.log("Fragment", fragment);
        game.appendChild(fragment);
        fragment = new L07_FudgeCraft_Fragments.Fragment(1);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(3))));
        game.appendChild(fragment);
        fragment = new L07_FudgeCraft_Fragments.Fragment(2);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-3))));
        game.appendChild(fragment);
        let cmpLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        L07_FudgeCraft_Fragments.viewport = new ƒ.Viewport();
        L07_FudgeCraft_Fragments.viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log("Viewport", L07_FudgeCraft_Fragments.viewport);
        L07_FudgeCraft_Fragments.viewport.draw();
        ƒ.Debug.log("Game", game);
    }
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Main.js.map