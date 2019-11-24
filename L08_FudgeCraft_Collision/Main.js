"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    L08_FudgeCraft_Collision.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L08_FudgeCraft_Collision.grid = new L08_FudgeCraft_Collision.Grid();
    let viewport;
    let control;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L08_FudgeCraft_Collision.ƒ.RenderManager.initialize(true);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Canvas", canvas);
        let cmpCamera = new L08_FudgeCraft_Collision.ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new L08_FudgeCraft_Collision.ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(L08_FudgeCraft_Collision.ƒ.Vector3.ZERO());
        L08_FudgeCraft_Collision.game = new L08_FudgeCraft_Collision.ƒ.Node("FudgeCraft");
        control = new L08_FudgeCraft_Collision.Control();
        let fragment = new L08_FudgeCraft_Collision.Fragment(0);
        control.setFragment(fragment);
        L08_FudgeCraft_Collision.game.appendChild(control);
        let cmpLight = new L08_FudgeCraft_Collision.ƒ.ComponentLight(new L08_FudgeCraft_Collision.ƒ.LightDirectional(L08_FudgeCraft_Collision.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L08_FudgeCraft_Collision.ƒ.Vector3(0.5, 1, 0.8));
        L08_FudgeCraft_Collision.game.addComponent(cmpLight);
        let cmpLightAmbient = new L08_FudgeCraft_Collision.ƒ.ComponentLight(new L08_FudgeCraft_Collision.ƒ.LightAmbient(L08_FudgeCraft_Collision.ƒ.Color.DARK_GREY));
        L08_FudgeCraft_Collision.game.addComponent(cmpLightAmbient);
        viewport = new L08_FudgeCraft_Collision.ƒ.Viewport();
        viewport.initialize("Viewport", L08_FudgeCraft_Collision.game, cmpCamera, canvas);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Viewport", viewport);
        viewport.draw();
        L08_FudgeCraft_Collision.ƒ.Debug.log("Game", L08_FudgeCraft_Collision.game);
        window.addEventListener("keydown", hndKeyDown);
        L08_FudgeCraft_Collision.test();
    }
    function hndKeyDown(_event) {
        let transformation = L08_FudgeCraft_Collision.Control.transformations[_event.code];
        if (!transformation)
            return;
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: transformation.rotation ? L08_FudgeCraft_Collision.ƒ.Vector3.SCALE(transformation.rotation, fullRotation / animationSteps) : new L08_FudgeCraft_Collision.ƒ.Vector3(),
            translation: transformation.translation ? L08_FudgeCraft_Collision.ƒ.Vector3.SCALE(transformation.translation, fullTranslation / animationSteps) : new L08_FudgeCraft_Collision.ƒ.Vector3()
        };
        let timers = L08_FudgeCraft_Collision.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        L08_FudgeCraft_Collision.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            L08_FudgeCraft_Collision.ƒ.RenderManager.update();
            viewport.draw();
        });
    }
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Main.js.map