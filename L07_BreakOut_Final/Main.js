"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    var ƒ = FudgeCore;
    let GAMESTATE;
    (function (GAMESTATE) {
        GAMESTATE[GAMESTATE["PLAY"] = 0] = "PLAY";
        GAMESTATE[GAMESTATE["GAMEOVER"] = 1] = "GAMEOVER";
    })(GAMESTATE || (GAMESTATE = {}));
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball;
    let walls;
    let paddle;
    let bricks;
    let wallBottom;
    let gameState = GAMESTATE.PLAY;
    let score = 0;
    let powerUps;
    let root;
    let control = new ƒ.Control("PaddleControl", 20, 0 /* PROPORTIONAL */);
    control.setDelay(100);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);
        root = new ƒ.Node("Root");
        ball = new L07_BreakOut_Final.Moveable("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(1, 1));
        root.addChild(ball);
        paddle = new L07_BreakOut_Final.Moveable("Paddle", new ƒ.Vector2(0, -10), new ƒ.Vector2(5, 1));
        root.addChild(paddle);
        walls = new ƒ.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L07_BreakOut_Final.GameObject("WallLeft", new ƒ.Vector2(-18, 0), new ƒ.Vector2(1, 30)));
        walls.addChild(new L07_BreakOut_Final.GameObject("WallRight", new ƒ.Vector2(18, 0), new ƒ.Vector2(1, 30)));
        walls.addChild(new L07_BreakOut_Final.GameObject("WallTop", new ƒ.Vector2(0, 12), new ƒ.Vector2(40, 1)));
        wallBottom = new L07_BreakOut_Final.GameObject("WallBottom", new ƒ.Vector2(0, -15), new ƒ.Vector2(40, 1));
        wallBottom.removeComponent(wallBottom.getComponent(ƒ.ComponentMaterial));
        walls.appendChild(wallBottom);
        bricks = createBricks(24);
        root.addChild(bricks);
        powerUps = new ƒ.Node("PowerUps");
        root.appendChild(powerUps);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L07_BreakOut_Final.viewport = new ƒ.Viewport();
        L07_BreakOut_Final.viewport.initialize("Viewport", root, cmpCamera, canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
    }
    function createBricks(_amount) {
        let bricks = new ƒ.Node("Bricks");
        let x = -15;
        let y = 10;
        for (let i = 0; i < _amount; i++) {
            if (x > 15) {
                x = -15;
                y -= 2;
            }
            bricks.addChild(new L07_BreakOut_Final.GameObject(`Brick-${i}`, new ƒ.Vector2(x, y), new ƒ.Vector2(3, 1)));
            x += 4;
        }
        return bricks;
    }
    function hndLoop(_event) {
        if (gameState == GAMESTATE.GAMEOVER)
            return;
        ball.move();
        controlPaddle();
        for (let powerUp of powerUps.getChildren())
            powerUp.move();
        hndCollision();
        L07_BreakOut_Final.viewport.draw();
    }
    function hndCollision() {
        for (let wall of walls.getChildren()) {
            if (ball.checkCollision(wall))
                if (wall == wallBottom) {
                    gameState = GAMESTATE.GAMEOVER;
                    displayScore(true);
                }
        }
        for (let brick of bricks.getChildren()) {
            if (ball.checkCollision(brick)) {
                bricks.removeChild(brick);
                score++;
                displayScore();
                if (Math.random() < 0.5) {
                    powerUps.appendChild(new L07_BreakOut_Final.PowerUp("PowerUp", brick.mtxLocal.translation.toVector2(), ƒ.Vector2.ONE()));
                }
            }
        }
        ball.checkCollision(paddle);
        for (let powerUp of powerUps.getChildren())
            if (paddle.checkCollision(powerUp)) {
                powerUps.removeChild(powerUp);
                console.log("PowerUp!");
            }
    }
    function controlPaddle() {
        control.setInput(ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
            + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]));
        // let posPaddle: ƒ.Vector3 = paddle.mtxLocal.translation;
        let mutator = paddle.mtxLocal.getMutator();
        paddle.velocity = ƒ.Vector3.X(control.getOutput());
        paddle.move();
        if (paddle.checkCollision(walls.getChildrenByName("WallLeft")[0]) ||
            paddle.checkCollision(walls.getChildrenByName("WallRight")[0]))
            paddle.mtxLocal.mutate(mutator); //paddle.mtxLocal.translation = posPaddle;
    }
    function displayScore(_gameOver = false) {
        let output = document.querySelector("h2#Score");
        output.innerHTML = "Score: " + score;
        if (_gameOver)
            output.innerHTML += "<br/>GAME OVER";
    }
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=Main.js.map