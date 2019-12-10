"use strict";
var L10_FudgeCraft_DetectCombos;
(function (L10_FudgeCraft_DetectCombos) {
    L10_FudgeCraft_DetectCombos.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L10_FudgeCraft_DetectCombos.game = new L10_FudgeCraft_DetectCombos.ƒ.Node("FudgeCraft");
    L10_FudgeCraft_DetectCombos.grid = new L10_FudgeCraft_DetectCombos.Grid();
    let control = new L10_FudgeCraft_DetectCombos.Control();
    let viewport;
    let camera;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L10_FudgeCraft_DetectCombos.ƒ.RenderManager.initialize(true);
        L10_FudgeCraft_DetectCombos.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new L10_FudgeCraft_DetectCombos.ƒ.ComponentLight(new L10_FudgeCraft_DetectCombos.ƒ.LightDirectional(L10_FudgeCraft_DetectCombos.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L10_FudgeCraft_DetectCombos.ƒ.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient = new L10_FudgeCraft_DetectCombos.ƒ.ComponentLight(new L10_FudgeCraft_DetectCombos.ƒ.LightAmbient(L10_FudgeCraft_DetectCombos.ƒ.Color.DARK_GREY));
        L10_FudgeCraft_DetectCombos.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        camera = new L10_FudgeCraft_DetectCombos.CameraOrbit(75);
        L10_FudgeCraft_DetectCombos.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        camera.cmpCamera.getContainer().addComponent(cmpLight);
        // setup viewport
        viewport = new L10_FudgeCraft_DetectCombos.ƒ.Viewport();
        viewport.initialize("Viewport", L10_FudgeCraft_DetectCombos.game, camera.cmpCamera, canvas);
        L10_FudgeCraft_DetectCombos.ƒ.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        L10_FudgeCraft_DetectCombos.game.appendChild(control);
        startGame();
        // startTests();
        updateDisplay();
        L10_FudgeCraft_DetectCombos.ƒ.Debug.log("Game", L10_FudgeCraft_DetectCombos.game);
    }
    function startGame() {
        L10_FudgeCraft_DetectCombos.grid.push(L10_FudgeCraft_DetectCombos.ƒ.Vector3.ZERO(), new L10_FudgeCraft_DetectCombos.GridElement(new L10_FudgeCraft_DetectCombos.Cube(L10_FudgeCraft_DetectCombos.CUBE_TYPE.GREY, L10_FudgeCraft_DetectCombos.ƒ.Vector3.ZERO())));
        startRandomFragment();
    }
    function updateDisplay() {
        viewport.draw();
    }
    L10_FudgeCraft_DetectCombos.updateDisplay = updateDisplay;
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
        if (_event.code == L10_FudgeCraft_DetectCombos.ƒ.KEYBOARD_CODE.SPACE) {
            let frozen = control.freeze();
            let combos = new L10_FudgeCraft_DetectCombos.Combos(frozen);
            handleCombos(combos);
            startRandomFragment();
        }
        let transformation = L10_FudgeCraft_DetectCombos.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    function handleCombos(_combos) {
        for (let combo of _combos.found)
            if (combo.length > 2)
                for (let element of combo) {
                    let mtxLocal = element.cube.cmpTransform.local;
                    console.log(element.cube.name, mtxLocal.translation.getMutator());
                    // mtxLocal.rotateX(45);
                    // mtxLocal.rotateY(45);
                    // mtxLocal.rotateY(45, true);
                    mtxLocal.scale(L10_FudgeCraft_DetectCombos.ƒ.Vector3.ONE(0.5));
                }
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L10_FudgeCraft_DetectCombos.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L10_FudgeCraft_DetectCombos.ƒ.Vector3(),
            translation: _transformation.translation ? L10_FudgeCraft_DetectCombos.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new L10_FudgeCraft_DetectCombos.ƒ.Vector3()
        };
        let timers = L10_FudgeCraft_DetectCombos.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L10_FudgeCraft_DetectCombos.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            updateDisplay();
        });
    }
    function startRandomFragment() {
        let fragment = L10_FudgeCraft_DetectCombos.Fragment.getRandom();
        control.cmpTransform.local = L10_FudgeCraft_DetectCombos.ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L10_FudgeCraft_DetectCombos.startRandomFragment = startRandomFragment;
})(L10_FudgeCraft_DetectCombos || (L10_FudgeCraft_DetectCombos = {}));
//# sourceMappingURL=Main.js.map