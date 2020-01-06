"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let game;
    let rotate = ƒ.Vector3.ZERO();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        game = new ƒ.Node("FudgeCraft");
        game.appendChild(new L07_FudgeCraft_Fragments.Fragment(0));
        game.appendChild(new L07_FudgeCraft_Fragments.Fragment(1, ƒ.Vector3.X(3)));
        game.appendChild(new L07_FudgeCraft_Fragments.Fragment(2, ƒ.Vector3.X(-3)));
        let cmpLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.CSS("WHITE")));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log("Viewport", viewport);
        viewport.draw();
        ƒ.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
    }
    function hndKeyDown(_event) {
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                rotate.add(ƒ.Vector3.X(-5));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(ƒ.Vector3.X(5));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(ƒ.Vector3.Y(-5));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(ƒ.Vector3.Y(5));
                break;
        }
        for (let fragment of game.getChildren()) {
            fragment.cmpTransform.local.rotation = rotate;
        }
        ƒ.RenderManager.update();
        viewport.draw();
    }
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Main.js.map