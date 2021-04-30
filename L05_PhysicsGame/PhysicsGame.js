"use strict";
var L05_PhysicsGame;
(function (L05_PhysicsGame) {
    var ƒ = FudgeCore;
    // import ƒAid = FudgeAid;
    let root;
    let cmpAvatar;
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
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translate(ƒ.Vector3.ONE(20));
        cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());
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
        cmpAvatar.friction = 1;
        let avatar = new ƒ.Node("Avatar");
        avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(3))));
        avatar.addComponent(cmpAvatar);
        root.appendChild(avatar);
    }
    function update() {
        ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
        // cmpCamera.mtxPivot.lookAt(ball.mtxLocal.translation);
        // playerIsGroundedRaycast();
        viewport.draw();
        ƒ.Physics.settings.debugDraw = true;
    }
    function createRigidbodies() {
        let level = root.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigidbody = new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
            console.log(node.name, node.cmpTransform?.mtxLocal.toString());
        }
        ƒ.Physics.adjustTransforms(root, true);
        for (let node of level.getChildren()) {
            console.log(node.name, node.cmpTransform?.mtxLocal.toString());
        }
    }
})(L05_PhysicsGame || (L05_PhysicsGame = {}));
//# sourceMappingURL=PhysicsGame.js.map