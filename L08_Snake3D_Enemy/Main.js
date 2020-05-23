"use strict";
var L08_Snake3D_Enemy;
(function (L08_Snake3D_Enemy) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    // ƒ.RenderManager.initialize(true, true);
    window.addEventListener("load", hndLoad);
    L08_Snake3D_Enemy.size = 7;
    L08_Snake3D_Enemy.mtrStandard = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("white")));
    let snake;
    let enemy;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let graph = new ƒ.Node("Game");
        snake = new L08_Snake3D_Enemy.Snake();
        graph.addChild(snake);
        enemy = new L08_Snake3D_Enemy.Enemy();
        graph.addChild(enemy);
        L08_Snake3D_Enemy.items = new ƒ.Node("Items");
        graph.addChild(L08_Snake3D_Enemy.items);
        for (let i = 0; i < 20; i++)
            placeFood();
        let cube = new ƒAid.Node("Cube", ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(2 * L08_Snake3D_Enemy.size - 1)), L08_Snake3D_Enemy.mtrStandard, new ƒ.MeshCube());
        cube.getComponent(ƒ.ComponentMaterial).clrPrimary = new ƒ.Color(0.4, 0.6, 0.3, 0.3);
        graph.addChild(cube);
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(5, 10, 40));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("white");
        // cmpCamera.pivot.rotateY(180);
        L08_Snake3D_Enemy.viewport = new ƒ.Viewport();
        L08_Snake3D_Enemy.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(L08_Snake3D_Enemy.viewport);
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        snake.move();
        snake.eat();
        enemy.move();
        enemy.eat();
        moveCamera();
        L08_Snake3D_Enemy.viewport.draw();
    }
    function moveCamera() {
        let mtxHead = snake.head.mtxLocal;
        let posCamera = mtxHead.translation;
        posCamera.normalize(30);
        L08_Snake3D_Enemy.viewport.camera.pivot.translation = posCamera;
        let up = ƒ.Vector3.X();
        up.transform(mtxHead, false);
        L08_Snake3D_Enemy.viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO());
        // viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO(), up);
    }
    function control(_event) {
        let rotation = ƒ.Vector3.ZERO();
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotation = ƒ.Vector3.Y(-90);
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotation = ƒ.Vector3.Y(90);
                break;
            case ƒ.KEYBOARD_CODE.SPACE:
                rotation = ƒ.Vector3.Z(-90);
                break;
            default:
                return;
        }
        snake.rotate(rotation);
    }
    function placeFood() {
        let position = new ƒ.Vector3(ƒ.Random.default.getRangeFloored(-L08_Snake3D_Enemy.size, L08_Snake3D_Enemy.size), ƒ.Random.default.getRangeFloored(-L08_Snake3D_Enemy.size, L08_Snake3D_Enemy.size), ƒ.Random.default.getSign() * L08_Snake3D_Enemy.size);
        position.shuffle();
        let food = new ƒAid.Node("Food", ƒ.Matrix4x4.TRANSLATION(position), L08_Snake3D_Enemy.mtrStandard, new ƒ.MeshCube());
        food.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("red");
        L08_Snake3D_Enemy.items.addChild(food);
    }
})(L08_Snake3D_Enemy || (L08_Snake3D_Enemy = {}));
//# sourceMappingURL=Main.js.map