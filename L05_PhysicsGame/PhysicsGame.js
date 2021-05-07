"use strict";
var L05_PhysicsGame;
(function (L05_PhysicsGame) {
    var ƒ = FudgeCore;
    // import ƒAid = FudgeAid;
    let root;
    let cmpAvatar;
    let camera = new ƒ.Node("Camera");
    let viewport;
    window.addEventListener("load", start);
    async function start(_event) {
        ƒ.Physics.settings.debugDraw = true;
        await FudgeCore.Project.loadResourcesFromHTML();
        // await FudgeCore.Project.loadResources("PhysicsGame.json");
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        // pick the graph to show
        root = FudgeCore.Project.resources["Graph|2021-04-27T14:37:42.239Z|64317"];
        createAvatar();
        createRigidbodies();
        ƒ.Physics.adjustTransforms(root, true);
        let cmpCamera = new ƒ.ComponentCamera();
        camera.addComponent(cmpCamera);
        // cmpCamera.mtxPivot.translate(ƒ.Vector3.ONE(20));
        // cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function createAvatar() {
        cmpAvatar = new ƒ.ComponentRigidbody(0.1, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
        cmpAvatar.restitution = 0.5;
        cmpAvatar.rotationInfluenceFactor = ƒ.Vector3.ZERO();
        cmpAvatar.friction = 2;
        let avatar = new ƒ.Node("Avatar");
        avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(3))));
        avatar.addComponent(cmpAvatar);
        avatar.appendChild(camera);
        root.appendChild(avatar);
    }
    function update() {
        let speed = 1;
        let rotate = 3;
        let forward;
        forward = cmpAvatar.getContainer().mtxWorld.getZ();
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
            cmpAvatar.applyForce(ƒ.Vector3.SCALE(forward, speed));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            cmpAvatar.applyForce(ƒ.Vector3.SCALE(forward, -speed));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            cmpAvatar.rotateBody(ƒ.Vector3.Y(rotate));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            cmpAvatar.rotateBody(ƒ.Vector3.Y(-rotate));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.E]))
            tryGrab();
        ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
        //cmpCamera.mtxPivot.lookAt(ball.mtxLocal.translation);
        // playerIsGroundedRaycast();
        viewport.draw();
        ƒ.Physics.settings.debugDraw = true;
    }
    function tryGrab() {
        let mtxAvatar = cmpAvatar.getContainer().mtxLocal;
        // let rayHit: ƒ.RayHitInfo = ƒ.Physics.raycast(mtxAvatar.translation, mtxAvatar.getZ(), 4, ƒ.PHYSICS_GROUP.DEFAULT);
        // console.log(rayHit.hit);
        let moveables = root.getChildrenByName("moveables")[0];
        for (let node of moveables.getChildren()) {
            let distance = ƒ.Vector3.DIFFERENCE(mtxAvatar.translation, node.mtxLocal.translation);
            if (distance.magnitude > 2)
                continue;
            pickup(node);
            break;
        }
    }
    function pickup(_node) {
        let avatar = cmpAvatar.getContainer();
        avatar.appendChild(_node);
        _node.mtxLocal.set(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(1.5)));
        _node.getComponent(ƒ.ComponentRigidbody).physicsType = ƒ.PHYSICS_TYPE.KINEMATIC;
    }
    function createRigidbodies() {
        let level = root.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigidbody = new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
            // console.log(node.name, node.cmpTransform?.mtxLocal.toString());
        }
        let moveables = root.getChildrenByName("moveables")[0];
        for (let node of moveables.getChildren()) {
            let cmpRigidbody = new ƒ.ComponentRigidbody(0.01, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.DEFAULT);
            cmpRigidbody.restitution = 2.5;
            cmpRigidbody.friction = 2.5;
            node.addComponent(cmpRigidbody);
            // console.log(node.name, node.cmpTransform?.mtxLocal.toString());
        }
    }
})(L05_PhysicsGame || (L05_PhysicsGame = {}));
//# sourceMappingURL=PhysicsGame.js.map