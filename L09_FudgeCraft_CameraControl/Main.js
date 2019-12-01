"use strict";
var L09_FudgeCraft_CameraControl;
(function (L09_FudgeCraft_CameraControl) {
    L09_FudgeCraft_CameraControl.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L09_FudgeCraft_CameraControl.game = new L09_FudgeCraft_CameraControl.ƒ.Node("FudgeCraft");
    L09_FudgeCraft_CameraControl.grid = new L09_FudgeCraft_CameraControl.Grid();
    let control = new L09_FudgeCraft_CameraControl.Control();
    let viewport;
    let camera;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L09_FudgeCraft_CameraControl.ƒ.RenderManager.initialize(true);
        L09_FudgeCraft_CameraControl.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new L09_FudgeCraft_CameraControl.ƒ.ComponentLight(new L09_FudgeCraft_CameraControl.ƒ.LightDirectional(L09_FudgeCraft_CameraControl.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L09_FudgeCraft_CameraControl.ƒ.Vector3(0.5, 1, 0.8));
        L09_FudgeCraft_CameraControl.game.addComponent(cmpLight);
        let cmpLightAmbient = new L09_FudgeCraft_CameraControl.ƒ.ComponentLight(new L09_FudgeCraft_CameraControl.ƒ.LightAmbient(L09_FudgeCraft_CameraControl.ƒ.Color.DARK_GREY));
        L09_FudgeCraft_CameraControl.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        camera = new L09_FudgeCraft_CameraControl.CameraOrbit(75);
        L09_FudgeCraft_CameraControl.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        // setup viewport
        viewport = new L09_FudgeCraft_CameraControl.ƒ.Viewport();
        viewport.initialize("Viewport", L09_FudgeCraft_CameraControl.game, camera.cmpCamera, canvas);
        L09_FudgeCraft_CameraControl.ƒ.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        // start game
        startRandomFragment();
        L09_FudgeCraft_CameraControl.game.appendChild(control);
        updateDisplay();
        L09_FudgeCraft_CameraControl.ƒ.Debug.log("Game", L09_FudgeCraft_CameraControl.game);
        //test();
    }
    function updateDisplay() {
        viewport.draw();
    }
    function hndPointerMove(_event) {
        // console.log(_event.movementX, _event.movementY);
        camera.rotateY(_event.movementX * speedCameraRotation);
        camera.rotateX(_event.movementY * speedCameraRotation);
        updateDisplay();
    }
    function hndWheelMove(_event) {
        camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (_event.code == L09_FudgeCraft_CameraControl.ƒ.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = L09_FudgeCraft_CameraControl.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L09_FudgeCraft_CameraControl.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L09_FudgeCraft_CameraControl.ƒ.Vector3(),
            translation: _transformation.translation ? L09_FudgeCraft_CameraControl.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new L09_FudgeCraft_CameraControl.ƒ.Vector3()
        };
        let timers = L09_FudgeCraft_CameraControl.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L09_FudgeCraft_CameraControl.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            updateDisplay();
        });
    }
    function startRandomFragment() {
        let fragment = L09_FudgeCraft_CameraControl.Fragment.getRandom();
        control.cmpTransform.local = L09_FudgeCraft_CameraControl.ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L09_FudgeCraft_CameraControl.startRandomFragment = startRandomFragment;
})(L09_FudgeCraft_CameraControl || (L09_FudgeCraft_CameraControl = {}));
//# sourceMappingURL=Main.js.map