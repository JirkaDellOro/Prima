"use strict";
var L03_BreakOut_Move;
(function (L03_BreakOut_Move) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball;
    let velocity = new ƒ.Vector3(ƒ.Random.default.getRange(-1, 1), ƒ.Random.default.getRange(-1, 1), 0);
    let speed = 15;
    velocity.normalize(speed);
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);
        root = new ƒ.Node("Root");
        ball = new ƒ.Node("Ball");
        ball.addComponent(new ƒ.ComponentTransform());
        let meshQuad = new ƒ.MeshQuad();
        let cmpQuad = new ƒ.ComponentMesh(meshQuad);
        ball.addComponent(cmpQuad);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);
        root.addChild(ball);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L03_BreakOut_Move.viewport = new ƒ.Viewport();
        L03_BreakOut_Move.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // ƒ.Debug.log(viewport);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        // console.log("Tick");
        let frameTime = ƒ.Time.game.getElapsedSincePreviousCall() / 1000;
        let move = ƒ.Vector3.SCALE(velocity, frameTime);
        ball.mtxLocal.translate(move);
        L03_BreakOut_Move.viewport.draw();
    }
})(L03_BreakOut_Move || (L03_BreakOut_Move = {}));
//# sourceMappingURL=Main.js.map