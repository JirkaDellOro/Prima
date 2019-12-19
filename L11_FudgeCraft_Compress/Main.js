"use strict";
var L11_FudgeCraft_Compress;
(function (L11_FudgeCraft_Compress) {
    L11_FudgeCraft_Compress.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L11_FudgeCraft_Compress.game = new L11_FudgeCraft_Compress.ƒ.Node("FudgeCraft");
    L11_FudgeCraft_Compress.grid = new L11_FudgeCraft_Compress.Grid();
    let control = new L11_FudgeCraft_Compress.Control();
    let viewport;
    let camera;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L11_FudgeCraft_Compress.ƒ.RenderManager.initialize(true);
        L11_FudgeCraft_Compress.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new L11_FudgeCraft_Compress.ƒ.ComponentLight(new L11_FudgeCraft_Compress.ƒ.LightDirectional(L11_FudgeCraft_Compress.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L11_FudgeCraft_Compress.ƒ.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient = new L11_FudgeCraft_Compress.ƒ.ComponentLight(new L11_FudgeCraft_Compress.ƒ.LightAmbient(L11_FudgeCraft_Compress.ƒ.Color.DARK_GREY));
        L11_FudgeCraft_Compress.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        camera = new L11_FudgeCraft_Compress.CameraOrbit(75);
        L11_FudgeCraft_Compress.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        camera.cmpCamera.getContainer().addComponent(cmpLight);
        // setup viewport
        viewport = new L11_FudgeCraft_Compress.ƒ.Viewport();
        viewport.initialize("Viewport", L11_FudgeCraft_Compress.game, camera.cmpCamera, canvas);
        L11_FudgeCraft_Compress.ƒ.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        L11_FudgeCraft_Compress.game.appendChild(control);
        if (1)
            startGame();
        if (0)
            L11_FudgeCraft_Compress.startTests();
        updateDisplay();
        L11_FudgeCraft_Compress.ƒ.Debug.log("Game", L11_FudgeCraft_Compress.game);
    }
    function startGame() {
        L11_FudgeCraft_Compress.grid.push(L11_FudgeCraft_Compress.ƒ.Vector3.ZERO(), new L11_FudgeCraft_Compress.GridElement(new L11_FudgeCraft_Compress.Cube(L11_FudgeCraft_Compress.CUBE_TYPE.BLACK, L11_FudgeCraft_Compress.ƒ.Vector3.ZERO())));
        startRandomFragment();
    }
    function updateDisplay() {
        viewport.draw();
    }
    L11_FudgeCraft_Compress.updateDisplay = updateDisplay;
    function hndPointerMove(_event) {
        // ƒ.Debug.log(_event.movementX, _event.movementY);
        let segmentBefore = camera.getSegmentY();
        camera.rotateY(_event.movementX * speedCameraRotation);
        camera.rotateX(_event.movementY * speedCameraRotation);
        let segmentAfter = camera.getSegmentY();
        switch (segmentAfter - segmentBefore) {
            case 1:
            case -3:
                control.rotatePerspektive(-90);
                break;
            case -1:
            case 3:
                control.rotatePerspektive(90);
                break;
        }
        updateDisplay();
    }
    function hndWheelMove(_event) {
        camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (_event.code == L11_FudgeCraft_Compress.ƒ.KEYBOARD_CODE.SPACE) {
            dropFragment();
        }
        if (_event.code == L11_FudgeCraft_Compress.ƒ.KEYBOARD_CODE.Q)
            control.rotatePerspektive(-90);
        if (_event.code == L11_FudgeCraft_Compress.ƒ.KEYBOARD_CODE.E)
            control.rotatePerspektive(90);
        let transformation = L11_FudgeCraft_Compress.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    function dropFragment() {
        let dropped = control.dropFragment();
        let combos = new L11_FudgeCraft_Compress.Combos(dropped);
        let combosPopped = handleCombos(combos);
        if (combosPopped)
            compressAndHandleCombos();
        startRandomFragment();
    }
    async function compressAndHandleCombos() {
        let moves;
        do {
            moves = compress();
            await L11_FudgeCraft_Compress.ƒ.Time.game.delay(400);
            let moved = moves.map(_move => _move.element);
            let combos = new L11_FudgeCraft_Compress.Combos(moved);
            handleCombos(combos);
        } while (moves.length > 0);
    }
    L11_FudgeCraft_Compress.compressAndHandleCombos = compressAndHandleCombos;
    function handleCombos(_combos) {
        let pop = false;
        for (let combo of _combos.found)
            if (combo.length > 2) {
                pop = true;
                for (let element of combo) {
                    let mtxLocal = element.cube.cmpTransform.local;
                    L11_FudgeCraft_Compress.ƒ.Debug.log(element.cube.name, mtxLocal.translation.getMutator());
                    // mtxLocal.rotateX(45);
                    // mtxLocal.rotateY(45);
                    // mtxLocal.rotateY(45, true);
                    mtxLocal.scale(L11_FudgeCraft_Compress.ƒ.Vector3.ONE(0.5));
                    L11_FudgeCraft_Compress.grid.pop(element.position);
                }
            }
        updateDisplay();
        return pop;
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L11_FudgeCraft_Compress.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L11_FudgeCraft_Compress.ƒ.Vector3(),
            translation: _transformation.translation ? L11_FudgeCraft_Compress.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new L11_FudgeCraft_Compress.ƒ.Vector3()
        };
        let timers = L11_FudgeCraft_Compress.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        if (control.checkCollisions(move).length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L11_FudgeCraft_Compress.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            updateDisplay();
        });
    }
    function startRandomFragment() {
        let fragment = L11_FudgeCraft_Compress.Fragment.getRandom();
        control.cmpTransform.local = L11_FudgeCraft_Compress.ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
        control.cmpTransform.local.translateZ(5);
    }
    L11_FudgeCraft_Compress.startRandomFragment = startRandomFragment;
    function compress() {
        let moves = L11_FudgeCraft_Compress.grid.compress();
        for (let move of moves) {
            L11_FudgeCraft_Compress.grid.pop(move.element.position);
            L11_FudgeCraft_Compress.grid.push(move.target, move.element);
        }
        let animationSteps = 10;
        L11_FudgeCraft_Compress.ƒ.Time.game.setTimer(10, animationSteps, function () {
            for (let move of moves) {
                let translation = L11_FudgeCraft_Compress.ƒ.Vector3.DIFFERENCE(move.target, move.element.position);
                translation.normalize(1 / animationSteps);
                move.element.position = L11_FudgeCraft_Compress.ƒ.Vector3.SUM(move.element.position, translation);
            }
            updateDisplay();
        });
        return moves;
    }
    L11_FudgeCraft_Compress.compress = compress;
})(L11_FudgeCraft_Compress || (L11_FudgeCraft_Compress = {}));
//# sourceMappingURL=Main.js.map