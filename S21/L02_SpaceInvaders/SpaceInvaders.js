"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new ƒ.Viewport();
    let ship;
    let speedShip = 5;
    let gunReady = true;
    let projectiles = new ƒ.Node("Projectiles");
    let invaders = new ƒ.Node("Invaders");
    invaders.addComponent(new ƒ.ComponentTransform());
    let velocityInvaders = new ƒ.Vector2(0.5, 0);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        let space = new ƒ.Node("Space");
        ship = SpaceInvaders.Ship.getInstance();
        space.addChild(ship);
        space.addChild(SpaceInvaders.MotherShip.getInstance());
        space.addChild(projectiles);
        let columnCount = 11;
        let rowCount = 5;
        for (let row = 0; row < rowCount; ++row) {
            for (let column = 0; column < columnCount; ++column) {
                let pos = new ƒ.Vector2();
                pos.x = (column - (columnCount - 1) / 2) * 15 / 13;
                pos.y = (row * 15 + 65) / 13;
                invaders.addChild(new SpaceInvaders.Invader(pos));
            }
        }
        space.addChild(invaders);
        ƒ.Time.game.setTimer(500, 0, moveInvaders);
        let barricades = new ƒ.Node("Barricades");
        let nBarricade = 4;
        for (let iBarricade = 0; iBarricade < nBarricade; ++iBarricade) {
            let pos = new ƒ.Vector2();
            pos.x = (iBarricade - (nBarricade - 1) / 2) * 53 / 13;
            pos.y = 24 / 13;
            barricades.addChild(new SpaceInvaders.Barricade(pos));
        }
        space.addChild(barricades);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(18);
        cmpCamera.mtxPivot.translateY(77 / 13);
        cmpCamera.mtxPivot.rotateY(180);
        console.log(cmpCamera);
        viewport.initialize("Viewport", space, cmpCamera, canvas);
        viewport.draw();
        console.log(space);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        // console.log(_event);
        let offset = speedShip * ƒ.Loop.timeFrameReal / 1000;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            ship.mtxLocal.translateX(-offset);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            ship.mtxLocal.translateX(+offset);
        if (gunReady && ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
            let projectile = new SpaceInvaders.Projectile(ship.mtxLocal.translation.toVector2());
            projectiles.addChild(projectile);
            gunReady = false;
            ƒ.Time.game.setTimer(1000, 1, () => gunReady = true);
        }
        for (let projectile of projectiles.getChildren()) {
            projectile.move();
            if (projectile.mtxLocal.translation.y > 10)
                projectiles.removeChild(projectile);
        }
        checkProjectileCollision();
        viewport.draw();
    }
    function checkProjectileCollision() {
        for (let projectile of projectiles.getChildren()) {
            // let mtxInverse: ƒ.Matrix4x4 = ƒ.Matrix4x4.INVERSION(invaders.mtxLocal);
            // let posWorld: ƒ.Vector3 = projectile.mtxLocal.translation;
            // let posInvaderSpace: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(posWorld, mtxInverse, true);
            // projectile.mtxLocal.translation = posInvaderSpace;
            // projectile.setRectPosition();
            let mtxProjectile = projectile.mtxLocal;
            projectile.cmpTransform.mtxLocal = ƒ.Matrix4x4.RELATIVE(mtxProjectile, invaders.mtxLocal);
            projectile.setRectPosition();
            for (let invader of invaders.getChildren()) {
                if (projectile.checkCollision(invader)) {
                    projectiles.removeChild(projectile);
                    invaders.removeChild(invader);
                }
            }
            // projectile.mtxLocal.translation = posWorld;
            projectile.cmpTransform.mtxLocal = mtxProjectile;
            projectile.setRectPosition();
        }
    }
    function moveInvaders() {
        invaders.mtxLocal.translate(velocityInvaders.toVector3());
    }
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=SpaceInvaders.js.map