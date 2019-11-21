"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    L08_FudgeCraft_Collision.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L08_FudgeCraft_Collision.grid = new L08_FudgeCraft_Collision.Grid();
    let viewport;
    let rotate = L08_FudgeCraft_Collision.ƒ.Vector3.ZERO();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L08_FudgeCraft_Collision.ƒ.RenderManager.initialize(true);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Canvas", canvas);
        let cmpCamera = new L08_FudgeCraft_Collision.ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new L08_FudgeCraft_Collision.ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(L08_FudgeCraft_Collision.ƒ.Vector3.ZERO());
        L08_FudgeCraft_Collision.game = new L08_FudgeCraft_Collision.ƒ.Node("FudgeCraft");
        L08_FudgeCraft_Collision.game.appendChild(new L08_FudgeCraft_Collision.Fragment(0));
        // game.appendChild(new Fragment(1, ƒ.Vector3.X(3)));
        // game.appendChild(new Fragment(2, ƒ.Vector3.X(-3)));
        let cmpLight = new L08_FudgeCraft_Collision.ƒ.ComponentLight(new L08_FudgeCraft_Collision.ƒ.LightDirectional(L08_FudgeCraft_Collision.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L08_FudgeCraft_Collision.ƒ.Vector3(0.5, 1, 0.8));
        L08_FudgeCraft_Collision.game.addComponent(cmpLight);
        viewport = new L08_FudgeCraft_Collision.ƒ.Viewport();
        viewport.initialize("Viewport", L08_FudgeCraft_Collision.game, cmpCamera, canvas);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Viewport", viewport);
        viewport.draw();
        L08_FudgeCraft_Collision.ƒ.Debug.log("Game", L08_FudgeCraft_Collision.game);
        window.addEventListener("keydown", hndKeyDown);
        L08_FudgeCraft_Collision.test();
    }
    function hndKeyDown(_event) {
        let angle = 10;
        let rotate = new L08_FudgeCraft_Collision.ƒ.Vector3();
        switch (_event.code) {
            case L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.ARROW_UP:
                rotate.add(L08_FudgeCraft_Collision.ƒ.Vector3.X(-angle));
                break;
            case L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(L08_FudgeCraft_Collision.ƒ.Vector3.X(angle));
                break;
            case L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(L08_FudgeCraft_Collision.ƒ.Vector3.Y(-angle));
                break;
            case L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(L08_FudgeCraft_Collision.ƒ.Vector3.Y(angle));
                break;
        }
        let count = 9;
        let interval = window.setInterval(function () {
            for (let fragment of L08_FudgeCraft_Collision.game.getChildren()) {
                // fragment.cmpTransform.local.rotation = rotate;   
                // fragment.cmpTransform.local.rotateX(rotate.x, true);
                // fragment.cmpTransform.local.rotateY(rotate.y, true);
                fragment.cmpTransform.local.rotate(rotate, true);
            }
            L08_FudgeCraft_Collision.ƒ.RenderManager.update();
            viewport.draw();
            if (--count <= 0)
                window.clearInterval(interval);
        }, 10);
    }
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Main.js.map