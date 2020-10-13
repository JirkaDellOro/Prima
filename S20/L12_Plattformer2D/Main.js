"use strict";
var L12_Plattformer2D;
(function (L12_Plattformer2D) {
    L12_Plattformer2D.ƒ = FudgeCore;
    L12_Plattformer2D.ƒAid = FudgeAid;
    window.addEventListener("load", test);
    let hare;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let spritesheet = L12_Plattformer2D.ƒAid.createSpriteSheet("Hare", img);
        L12_Plattformer2D.Hare.generateSprites(spritesheet);
        L12_Plattformer2D.game = new L12_Plattformer2D.ƒ.Node("Game");
        hare = new L12_Plattformer2D.Hare("Hare");
        L12_Plattformer2D.level = createLevel();
        L12_Plattformer2D.game.appendChild(L12_Plattformer2D.level);
        L12_Plattformer2D.game.appendChild(hare);
        for (let i = 0; i < 5; i++) {
            let hare = new L12_Plattformer2D.Hare();
            hare.mtxLocal.translation = new L12_Plattformer2D.ƒ.Vector3(L12_Plattformer2D.ƒ.Random.default.getRange(-1, 1), L12_Plattformer2D.ƒ.Random.default.getRange(-1, 1));
            L12_Plattformer2D.game.appendChild(hare);
        }
        let cmpCamera = new L12_Plattformer2D.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(L12_Plattformer2D.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = L12_Plattformer2D.ƒ.Color.CSS("aliceblue");
        let viewport = new L12_Plattformer2D.ƒ.Viewport();
        viewport.initialize("Viewport", L12_Plattformer2D.game, cmpCamera, canvas);
        viewport.draw();
        viewport.addEventListener("\u0192keydown" /* DOWN */, handleKeyboard);
        viewport.activateKeyboardEvent("\u0192keydown" /* DOWN */, true);
        viewport.setFocus(true);
        L12_Plattformer2D.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L12_Plattformer2D.ƒ.Loop.start(L12_Plattformer2D.ƒ.LOOP_MODE.TIME_GAME, 60);
        function update(_event) {
            processInput();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        if (_event.code == L12_Plattformer2D.ƒ.KEYBOARD_CODE.SPACE)
            hare.act(L12_Plattformer2D.ACTION.JUMP);
    }
    function processInput() {
        if (L12_Plattformer2D.ƒ.Keyboard.isPressedOne([L12_Plattformer2D.ƒ.KEYBOARD_CODE.A, L12_Plattformer2D.ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            hare.act(L12_Plattformer2D.ACTION.WALK, L12_Plattformer2D.DIRECTION.LEFT);
        else if (L12_Plattformer2D.ƒ.Keyboard.isPressedOne([L12_Plattformer2D.ƒ.KEYBOARD_CODE.D, L12_Plattformer2D.ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            hare.act(L12_Plattformer2D.ACTION.WALK, L12_Plattformer2D.DIRECTION.RIGHT);
        else
            hare.act(L12_Plattformer2D.ACTION.IDLE);
    }
    function createLevel() {
        let level = new L12_Plattformer2D.ƒ.Node("Level");
        let floor = new L12_Plattformer2D.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        level.appendChild(floor);
        floor = new L12_Plattformer2D.Floor();
        floor.cmpTransform.local.translateX(1.4);
        floor.cmpTransform.local.translateY(0.17);
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(2);
        level.appendChild(floor);
        floor = new L12_Plattformer2D.Floor();
        floor.cmpTransform.local.translateY(-1.6);
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(5);
        level.appendChild(floor);
        return level;
    }
})(L12_Plattformer2D || (L12_Plattformer2D = {}));
//# sourceMappingURL=Main.js.map