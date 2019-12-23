"use strict";
var L12_FudgeCraft_Points;
(function (L12_FudgeCraft_Points) {
    L12_FudgeCraft_Points.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L12_FudgeCraft_Points.game = new L12_FudgeCraft_Points.ƒ.Node("FudgeCraft");
    L12_FudgeCraft_Points.grid = new L12_FudgeCraft_Points.Grid();
    let control = new L12_FudgeCraft_Points.Control();
    let viewport;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L12_FudgeCraft_Points.args = new URLSearchParams(location.search);
        L12_FudgeCraft_Points.ƒ.RenderManager.initialize(true);
        L12_FudgeCraft_Points.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new L12_FudgeCraft_Points.ƒ.ComponentLight(new L12_FudgeCraft_Points.ƒ.LightDirectional(L12_FudgeCraft_Points.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L12_FudgeCraft_Points.ƒ.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient = new L12_FudgeCraft_Points.ƒ.ComponentLight(new L12_FudgeCraft_Points.ƒ.LightAmbient(L12_FudgeCraft_Points.ƒ.Color.DARK_GREY));
        L12_FudgeCraft_Points.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        L12_FudgeCraft_Points.camera = new L12_FudgeCraft_Points.CameraOrbit(75);
        L12_FudgeCraft_Points.game.appendChild(L12_FudgeCraft_Points.camera);
        L12_FudgeCraft_Points.camera.setRotationX(-20);
        L12_FudgeCraft_Points.camera.setRotationY(20);
        L12_FudgeCraft_Points.camera.cmpCamera.getContainer().addComponent(cmpLight);
        // setup viewport
        viewport = new L12_FudgeCraft_Points.ƒ.Viewport();
        viewport.initialize("Viewport", L12_FudgeCraft_Points.game, L12_FudgeCraft_Points.camera.cmpCamera, canvas);
        L12_FudgeCraft_Points.ƒ.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        L12_FudgeCraft_Points.game.appendChild(control);
        if (L12_FudgeCraft_Points.args.get("test"))
            L12_FudgeCraft_Points.startTests();
        else
            startGame();
        updateDisplay();
        L12_FudgeCraft_Points.ƒ.Debug.log("Game", L12_FudgeCraft_Points.game);
    }
    function startGame() {
        L12_FudgeCraft_Points.grid.push(L12_FudgeCraft_Points.ƒ.Vector3.ZERO(), new L12_FudgeCraft_Points.GridElement(new L12_FudgeCraft_Points.Cube(L12_FudgeCraft_Points.CUBE_TYPE.BLACK, L12_FudgeCraft_Points.ƒ.Vector3.ZERO())));
        startRandomFragment();
    }
    function updateDisplay() {
        viewport.draw();
    }
    L12_FudgeCraft_Points.updateDisplay = updateDisplay;
    function hndPointerMove(_event) {
        // if (ƒ.Time.game.hasTimers())
        //   return;
        let segmentBefore = L12_FudgeCraft_Points.camera.getSegmentY();
        L12_FudgeCraft_Points.camera.rotateY(_event.movementX * speedCameraRotation);
        L12_FudgeCraft_Points.camera.rotateX(_event.movementY * speedCameraRotation);
        let segmentAfter = L12_FudgeCraft_Points.camera.getSegmentY();
        if (segmentAfter - segmentBefore) {
            control.rotateToSegment(segmentAfter);
        }
        updateDisplay();
    }
    function hndWheelMove(_event) {
        L12_FudgeCraft_Points.camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (L12_FudgeCraft_Points.ƒ.Time.game.hasTimers())
            return;
        if (_event.code == L12_FudgeCraft_Points.ƒ.KEYBOARD_CODE.SPACE) {
            dropFragment();
        }
        if (_event.code == L12_FudgeCraft_Points.ƒ.KEYBOARD_CODE.Q)
            control.rotatePerspektive(-90);
        if (_event.code == L12_FudgeCraft_Points.ƒ.KEYBOARD_CODE.E)
            control.rotatePerspektive(90);
        let transformation = L12_FudgeCraft_Points.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    async function dropFragment() {
        let dropped = control.dropFragment();
        let combos = new L12_FudgeCraft_Points.Combos(dropped);
        let combosPopped = await handleCombos(combos);
        if (combosPopped)
            compressAndHandleCombos();
        startRandomFragment();
        updateDisplay();
    }
    async function compressAndHandleCombos() {
        let moves;
        do {
            moves = compress();
            await L12_FudgeCraft_Points.ƒ.Time.game.delay(400);
            let moved = moves.map(_move => _move.element);
            let combos = new L12_FudgeCraft_Points.Combos(moved);
            await handleCombos(combos);
        } while (moves.length > 0);
    }
    L12_FudgeCraft_Points.compressAndHandleCombos = compressAndHandleCombos;
    async function handleCombos(_combos) {
        let pop = false;
        for (let combo of _combos.found)
            if (combo.length > 2) {
                pop = true;
                for (let shrink = Math.PI - Math.asin(0.9); shrink >= 0; shrink -= 0.1) {
                    for (let element of combo) {
                        let mtxLocal = element.cube.cmpTransform.local;
                        mtxLocal.scaling = L12_FudgeCraft_Points.ƒ.Vector3.ONE(Math.sin(shrink) * 1.2);
                    }
                    updateDisplay();
                    await L12_FudgeCraft_Points.ƒ.Time.game.delay(10);
                }
                for (let element of combo)
                    L12_FudgeCraft_Points.grid.pop(element.position);
            }
        updateDisplay();
        return pop;
    }
    L12_FudgeCraft_Points.handleCombos = handleCombos;
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L12_FudgeCraft_Points.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L12_FudgeCraft_Points.ƒ.Vector3(),
            translation: _transformation.translation ? L12_FudgeCraft_Points.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new L12_FudgeCraft_Points.ƒ.Vector3()
        };
        if (control.checkCollisions(move).length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L12_FudgeCraft_Points.ƒ.Time.game.setTimer(10, animationSteps, function (_event) {
            control.move(move);
            updateDisplay();
        });
    }
    function startRandomFragment() {
        let fragment = L12_FudgeCraft_Points.Fragment.getRandom();
        control.cmpTransform.local.translation = L12_FudgeCraft_Points.ƒ.Vector3.Z(5);
        control.setFragment(fragment);
    }
    L12_FudgeCraft_Points.startRandomFragment = startRandomFragment;
    function compress() {
        let moves = L12_FudgeCraft_Points.grid.compress();
        for (let move of moves) {
            L12_FudgeCraft_Points.grid.pop(move.element.position);
            L12_FudgeCraft_Points.grid.push(move.target, move.element);
        }
        let animationSteps = 10;
        L12_FudgeCraft_Points.ƒ.Time.game.setTimer(10, animationSteps, function () {
            for (let move of moves) {
                let translation = L12_FudgeCraft_Points.ƒ.Vector3.DIFFERENCE(move.target, move.element.position);
                translation.normalize(1 / animationSteps);
                move.element.position = L12_FudgeCraft_Points.ƒ.Vector3.SUM(move.element.position, translation);
            }
            updateDisplay();
        });
        return moves;
    }
    L12_FudgeCraft_Points.compress = compress;
})(L12_FudgeCraft_Points || (L12_FudgeCraft_Points = {}));
//# sourceMappingURL=Main.js.map