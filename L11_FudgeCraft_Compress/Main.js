"use strict";
var L11_FudgeCraft_Compress;
(function (L11_FudgeCraft_Compress) {
    L11_FudgeCraft_Compress.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L11_FudgeCraft_Compress.game = new L11_FudgeCraft_Compress.ƒ.Node("FudgeCraft");
    L11_FudgeCraft_Compress.grid = new L11_FudgeCraft_Compress.Grid();
    let control = new L11_FudgeCraft_Compress.Control();
    let viewport;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L11_FudgeCraft_Compress.args = new URLSearchParams(location.search);
        L11_FudgeCraft_Compress.ƒ.RenderManager.initialize(true);
        L11_FudgeCraft_Compress.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new L11_FudgeCraft_Compress.ƒ.ComponentLight(new L11_FudgeCraft_Compress.ƒ.LightDirectional(L11_FudgeCraft_Compress.ƒ.Color.CSS("WHITE")));
        cmpLight.pivot.lookAt(new L11_FudgeCraft_Compress.ƒ.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient = new L11_FudgeCraft_Compress.ƒ.ComponentLight(new L11_FudgeCraft_Compress.ƒ.LightAmbient(new L11_FudgeCraft_Compress.ƒ.Color(0.25, 0.25, 0.25, 1)));
        L11_FudgeCraft_Compress.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        L11_FudgeCraft_Compress.camera = new L11_FudgeCraft_Compress.CameraOrbit(75);
        L11_FudgeCraft_Compress.game.appendChild(L11_FudgeCraft_Compress.camera);
        L11_FudgeCraft_Compress.camera.setRotationX(-20);
        L11_FudgeCraft_Compress.camera.setRotationY(20);
        L11_FudgeCraft_Compress.camera.cmpCamera.getContainer().addComponent(cmpLight);
        // setup viewport
        viewport = new L11_FudgeCraft_Compress.ƒ.Viewport();
        viewport.initialize("Viewport", L11_FudgeCraft_Compress.game, L11_FudgeCraft_Compress.camera.cmpCamera, canvas);
        L11_FudgeCraft_Compress.ƒ.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        L11_FudgeCraft_Compress.game.appendChild(control);
        if (L11_FudgeCraft_Compress.args.get("test"))
            L11_FudgeCraft_Compress.startTests();
        else
            startGame();
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
        if (L11_FudgeCraft_Compress.ƒ.Time.game.hasTimers())
            return;
        let segmentBefore = L11_FudgeCraft_Compress.camera.getSegmentY();
        L11_FudgeCraft_Compress.camera.rotateY(_event.movementX * speedCameraRotation);
        L11_FudgeCraft_Compress.camera.rotateX(_event.movementY * speedCameraRotation);
        let segmentAfter = L11_FudgeCraft_Compress.camera.getSegmentY();
        if (segmentAfter - segmentBefore) {
            control.rotateToSegment(segmentAfter);
        }
        updateDisplay();
    }
    function hndWheelMove(_event) {
        L11_FudgeCraft_Compress.camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (L11_FudgeCraft_Compress.ƒ.Time.game.hasTimers())
            return;
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
        if (control.checkCollisions(move).length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L11_FudgeCraft_Compress.ƒ.Time.game.setTimer(10, animationSteps, function (_event) {
            control.move(move);
            updateDisplay();
        });
    }
    function startRandomFragment() {
        let fragment = L11_FudgeCraft_Compress.Fragment.getRandom();
        control.cmpTransform.local.translation = L11_FudgeCraft_Compress.ƒ.Vector3.Z(5);
        control.setFragment(fragment);
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