"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    L08_FudgeCraft_Collision.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let game;
    let rotate = L08_FudgeCraft_Collision.ƒ.Vector3.ZERO();
    let grid = new L08_FudgeCraft_Collision.Grid();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L08_FudgeCraft_Collision.ƒ.RenderManager.initialize(true);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Canvas", canvas);
        let cmpCamera = new L08_FudgeCraft_Collision.ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new L08_FudgeCraft_Collision.ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(L08_FudgeCraft_Collision.ƒ.Vector3.ZERO());
        game = new L08_FudgeCraft_Collision.ƒ.Node("FudgeCraft");
        game.appendChild(new L08_FudgeCraft_Collision.Fragment(0));
        game.appendChild(new L08_FudgeCraft_Collision.Fragment(1, L08_FudgeCraft_Collision.ƒ.Vector3.X(3)));
        game.appendChild(new L08_FudgeCraft_Collision.Fragment(2, L08_FudgeCraft_Collision.ƒ.Vector3.X(-3)));
        grid.set("Jonas", new L08_FudgeCraft_Collision.Cube(L08_FudgeCraft_Collision.CUBE_TYPE.GREEN, L08_FudgeCraft_Collision.ƒ.Vector3.ZERO()));
        let jonas = grid.get("Jonas");
        jonas.cmpTransform.local.translate(new L08_FudgeCraft_Collision.ƒ.Vector3(1.5, 7.6, -12.3));
        game.appendChild(jonas);
        L08_FudgeCraft_Collision.ƒ.RenderManager.update();
        grid.setCube(jonas);
        let cmpLight = new L08_FudgeCraft_Collision.ƒ.ComponentLight(new L08_FudgeCraft_Collision.ƒ.LightDirectional(L08_FudgeCraft_Collision.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L08_FudgeCraft_Collision.ƒ.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new L08_FudgeCraft_Collision.ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Viewport", viewport);
        viewport.draw();
        L08_FudgeCraft_Collision.ƒ.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
    }
    function hndKeyDown(_event) {
        switch (_event.code) {
            case L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.ARROW_UP:
                rotate.add(L08_FudgeCraft_Collision.ƒ.Vector3.X(-5));
                break;
            case L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(L08_FudgeCraft_Collision.ƒ.Vector3.X(5));
                break;
            case L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(L08_FudgeCraft_Collision.ƒ.Vector3.Y(-5));
                break;
            case L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(L08_FudgeCraft_Collision.ƒ.Vector3.Y(5));
                break;
        }
        for (let fragment of game.getChildren()) {
            fragment.cmpTransform.local.rotation = rotate;
        }
        L08_FudgeCraft_Collision.ƒ.RenderManager.update();
        viewport.draw();
    }
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Main.js.map