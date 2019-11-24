"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    L08_FudgeCraft_Collision.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L08_FudgeCraft_Collision.game = new L08_FudgeCraft_Collision.ƒ.Node("FudgeCraft");
    L08_FudgeCraft_Collision.grid = new L08_FudgeCraft_Collision.Grid();
    let control = new L08_FudgeCraft_Collision.Control();
    let viewport;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L08_FudgeCraft_Collision.ƒ.RenderManager.initialize(true);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Canvas", canvas);
        let cmpCamera = new L08_FudgeCraft_Collision.ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new L08_FudgeCraft_Collision.ƒ.Vector3(4, 6, 20));
        cmpCamera.pivot.lookAt(L08_FudgeCraft_Collision.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = L08_FudgeCraft_Collision.ƒ.Color.WHITE;
        let cmpLight = new L08_FudgeCraft_Collision.ƒ.ComponentLight(new L08_FudgeCraft_Collision.ƒ.LightDirectional(L08_FudgeCraft_Collision.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L08_FudgeCraft_Collision.ƒ.Vector3(0.5, 1, 0.8));
        L08_FudgeCraft_Collision.game.addComponent(cmpLight);
        let cmpLightAmbient = new L08_FudgeCraft_Collision.ƒ.ComponentLight(new L08_FudgeCraft_Collision.ƒ.LightAmbient(L08_FudgeCraft_Collision.ƒ.Color.DARK_GREY));
        L08_FudgeCraft_Collision.game.addComponent(cmpLightAmbient);
        viewport = new L08_FudgeCraft_Collision.ƒ.Viewport();
        viewport.initialize("Viewport", L08_FudgeCraft_Collision.game, cmpCamera, canvas);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Viewport", viewport);
        viewport.draw();
        startRandomFragment();
        L08_FudgeCraft_Collision.game.appendChild(control);
        viewport.draw();
        L08_FudgeCraft_Collision.ƒ.Debug.log("Game", L08_FudgeCraft_Collision.game);
        window.addEventListener("keydown", hndKeyDown);
        //test();
    }
    function hndKeyDown(_event) {
        if (_event.code == L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = L08_FudgeCraft_Collision.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        // ƒ.RenderManager.update();
        viewport.draw();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L08_FudgeCraft_Collision.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L08_FudgeCraft_Collision.ƒ.Vector3(),
            translation: _transformation.translation ? L08_FudgeCraft_Collision.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new L08_FudgeCraft_Collision.ƒ.Vector3()
        };
        let timers = L08_FudgeCraft_Collision.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L08_FudgeCraft_Collision.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = L08_FudgeCraft_Collision.Fragment.getRandom();
        control.cmpTransform.local = L08_FudgeCraft_Collision.ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L08_FudgeCraft_Collision.startRandomFragment = startRandomFragment;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Main.js.map