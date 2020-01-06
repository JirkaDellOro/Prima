"use strict";
var L13_Craftris;
(function (L13_Craftris) {
    L13_Craftris.ƒ = FudgeCore;
    let GAME_STATE;
    (function (GAME_STATE) {
        GAME_STATE[GAME_STATE["START"] = 0] = "START";
        GAME_STATE[GAME_STATE["MENU"] = 1] = "MENU";
        GAME_STATE[GAME_STATE["PLAY"] = 2] = "PLAY";
        GAME_STATE[GAME_STATE["OVER"] = 3] = "OVER";
    })(GAME_STATE || (GAME_STATE = {}));
    window.addEventListener("load", hndLoad);
    L13_Craftris.game = new L13_Craftris.ƒ.Node("FudgeCraft");
    L13_Craftris.grid = new L13_Craftris.Grid();
    let state = GAME_STATE.START;
    let control = new L13_Craftris.Control();
    let viewport;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L13_Craftris.args = new URLSearchParams(location.search);
        L13_Craftris.ƒ.RenderManager.initialize(true, true);
        L13_Craftris.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new L13_Craftris.ƒ.ComponentLight(new L13_Craftris.ƒ.LightDirectional(L13_Craftris.ƒ.Color.CSS("WHITE")));
        cmpLight.pivot.lookAt(new L13_Craftris.ƒ.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient = new L13_Craftris.ƒ.ComponentLight(new L13_Craftris.ƒ.LightAmbient(new L13_Craftris.ƒ.Color(0.25, 0.25, 0.25, 1)));
        L13_Craftris.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        L13_Craftris.camera = new L13_Craftris.CameraOrbit(75);
        L13_Craftris.game.appendChild(L13_Craftris.camera);
        L13_Craftris.camera.setRotationX(-20);
        L13_Craftris.camera.setRotationY(20);
        L13_Craftris.camera.cmpCamera.getContainer().addComponent(cmpLight);
        // setup viewport
        viewport = new L13_Craftris.ƒ.Viewport();
        viewport.initialize("Viewport", L13_Craftris.game, L13_Craftris.camera.cmpCamera, canvas);
        L13_Craftris.ƒ.Debug.log("Viewport", viewport);
        L13_Craftris.points = new L13_Craftris.Points(viewport, document.querySelector("#Score"), document.querySelector("div#Calculation"));
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        L13_Craftris.game.appendChild(control);
        if (L13_Craftris.args.get("test"))
            L13_Craftris.startTests();
        else
            start();
        updateDisplay();
        L13_Craftris.ƒ.Debug.log("Game", L13_Craftris.game);
    }
    function setState(_new) {
        state = _new;
        L13_Craftris.ƒ.Debug.log("State", state);
    }
    async function start() {
        setState(GAME_STATE.MENU);
        L13_Craftris.grid.push(L13_Craftris.ƒ.Vector3.ZERO(), new L13_Craftris.GridElement(new L13_Craftris.Cube(L13_Craftris.CUBE_TYPE.BLACK, L13_Craftris.ƒ.Vector3.ZERO())));
        startRandomFragment();
        L13_Craftris.ƒ.Debug.log("Wait for space");
        await waitForKeyPress(L13_Craftris.ƒ.KEYBOARD_CODE.SPACE);
        L13_Craftris.ƒ.Debug.log("Space pressed");
        let domMenu = document.querySelector("div#Menu");
        domMenu.style.visibility = "hidden";
        window.addEventListener("keydown", hndKeyDown); // activate when user starts...
        startCountDown();
        setState(GAME_STATE.PLAY);
    }
    function end() {
        let domOver = document.querySelector("div#Over");
        domOver.style.visibility = "visible";
        window.removeEventListener("keydown", hndKeyDown); // activate when user starts...
        setState(GAME_STATE.OVER);
    }
    async function waitForKeyPress(_code) {
        return new Promise(_resolve => {
            window.addEventListener("keydown", hndKeyDown);
            function hndKeyDown(_event) {
                if (_event.code == _code) {
                    window.removeEventListener("keydown", hndKeyDown);
                    _resolve();
                }
            }
        });
    }
    function startCountDown() {
        let countDown = new L13_Craftris.ƒ.Time();
        countDown.setTimer(1000, 0, showCountDown);
        function showCountDown(_event) {
            let time = 3 * 60 * 1000 - countDown.get();
            displayTime(time);
            if (time < 0) {
                countDown.clearAllTimers();
                displayTime(0);
                end();
            }
        }
    }
    function displayTime(_time) {
        let units = L13_Craftris.ƒ.Time.getUnits(_time);
        let domTime = document.querySelector("h1#Time");
        domTime.textContent = units.minutes.toString().padStart(2, "0") + ":" + units.seconds.toString().padStart(2, "0");
    }
    function updateDisplay() {
        viewport.draw();
    }
    L13_Craftris.updateDisplay = updateDisplay;
    //#region Interaction
    function hndPointerMove(_event) {
        // let segmentBefore: number = camera.getSegmentY();
        L13_Craftris.camera.rotateY(_event.movementX * speedCameraRotation);
        L13_Craftris.camera.rotateX(_event.movementY * speedCameraRotation);
        // let segmentAfter: number = camera.getSegmentY();
        // if (segmentAfter - segmentBefore) {
        if (!L13_Craftris.ƒ.Time.game.hasTimers())
            control.rotateToSegment(L13_Craftris.camera.getSegmentY());
        // }
        updateDisplay();
    }
    function hndWheelMove(_event) {
        L13_Craftris.camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (L13_Craftris.ƒ.Time.game.hasTimers())
            return;
        if (_event.code == L13_Craftris.ƒ.KEYBOARD_CODE.SPACE) {
            dropFragment();
        }
        if (_event.code == L13_Craftris.ƒ.KEYBOARD_CODE.Q)
            control.rotatePerspektive(-90);
        if (_event.code == L13_Craftris.ƒ.KEYBOARD_CODE.E)
            control.rotatePerspektive(90);
        let transformation = L13_Craftris.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    //#endregion
    //#region Start/Drop Fragments
    function startRandomFragment() {
        let fragment = L13_Craftris.Fragment.getRandom();
        let cardinals = Array.from(L13_Craftris.Grid.cardinals);
        control.cmpTransform.local.translation = L13_Craftris.ƒ.Vector3.ZERO();
        control.setFragment(fragment);
        updateDisplay();
        let start;
        try {
            do {
                let index = L13_Craftris.ƒ.random.getIndex(cardinals);
                let offset = cardinals.splice(index, 1)[0];
                start = { translation: L13_Craftris.ƒ.Vector3.SCALE(offset, 5), rotation: L13_Craftris.ƒ.Vector3.ZERO() };
                // ƒ.Debug.log(control.checkCollisions(start).length );
            } while (control.checkCollisions(start).length > 0);
        }
        catch (_error) {
            callToAction("GAME OVER");
        }
        control.move(start);
        updateDisplay();
    }
    L13_Craftris.startRandomFragment = startRandomFragment;
    async function dropFragment() {
        if (!control.isConnected()) {
            callToAction("CONNECT TO EXISTING CUBES!");
            return;
        }
        L13_Craftris.points.clearCalc();
        let dropped = control.dropFragment();
        let combos = new L13_Craftris.Combos(dropped);
        callToAction("CREATE COMBOS OF 3 OR MORE!");
        let iCombo = await handleCombos(combos, 0);
        if (iCombo > 0) {
            compressAndHandleCombos(iCombo);
            if (L13_Craftris.ƒ.random.getBoolean())
                callToAction("MULTIPLE COMBOS SCORE HIGHER!");
            else
                callToAction("LARGER COMBOS SCORE HIGHER!");
        }
        startRandomFragment();
        updateDisplay();
    }
    //#endregion
    //#region Combos & Compression
    async function compressAndHandleCombos(_iCombo) {
        let moves;
        let iCombo = _iCombo;
        do {
            moves = compress();
            await L13_Craftris.ƒ.Time.game.delay(400);
            let moved = moves.map(_move => _move.element);
            let combos = new L13_Craftris.Combos(moved);
            let iCounted = await handleCombos(combos, iCombo);
            iCombo += iCounted;
        } while (moves.length > 0);
    }
    L13_Craftris.compressAndHandleCombos = compressAndHandleCombos;
    async function handleCombos(_combos, _iCombo) {
        let iCombo = 0;
        for (let combo of _combos.found)
            if (combo.length > 2) {
                iCombo++;
                L13_Craftris.points.showCombo(combo, _iCombo + iCombo);
                for (let shrink = Math.PI - Math.asin(0.9); shrink >= 0; shrink -= 0.2) {
                    for (let element of combo) {
                        let mtxLocal = element.cube.cmpTransform.local;
                        mtxLocal.scaling = L13_Craftris.ƒ.Vector3.ONE(Math.sin(shrink) * 1.2);
                    }
                    updateDisplay();
                    await L13_Craftris.ƒ.Time.game.delay(20);
                }
                for (let element of combo)
                    L13_Craftris.grid.pop(element.position);
            }
        updateDisplay();
        return iCombo;
    }
    L13_Craftris.handleCombos = handleCombos;
    function move(_transformation) {
        let animationSteps = 5;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L13_Craftris.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L13_Craftris.ƒ.Vector3(),
            translation: _transformation.translation ? L13_Craftris.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new L13_Craftris.ƒ.Vector3()
        };
        if (control.checkCollisions(move).length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L13_Craftris.ƒ.Time.game.setTimer(20, animationSteps, function (_event) {
            control.move(move);
            updateDisplay();
        });
    }
    function compress() {
        let moves = L13_Craftris.grid.compress();
        for (let move of moves) {
            L13_Craftris.grid.pop(move.element.position);
            L13_Craftris.grid.push(move.target, move.element);
        }
        let animationSteps = 5;
        L13_Craftris.ƒ.Time.game.setTimer(20, animationSteps, function (_event) {
            for (let move of moves) {
                let translation = L13_Craftris.ƒ.Vector3.DIFFERENCE(move.target, move.element.position);
                translation.normalize(1 / animationSteps);
                move.element.position = L13_Craftris.ƒ.Vector3.SUM(move.element.position, translation);
                if (_event.lastCall)
                    move.element.position = move.target;
            }
            updateDisplay();
        });
        return moves;
    }
    L13_Craftris.compress = compress;
    //#endregion
    function callToAction(_message) {
        let span = document.querySelector("span#CallToAction");
        span.textContent = _message;
        span.style.animation = "none";
        isNaN(span.offsetHeight); // stupid hack to restart css-animation, read offsetHeight
        span.style.animation = null;
    }
})(L13_Craftris || (L13_Craftris = {}));
//# sourceMappingURL=Main.js.map