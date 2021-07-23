"use strict";
var L05_PhysicsGame;
(function (L05_PhysicsGame) {
    var ƒ = FudgeCore;
    // import ƒAid = FudgeAid;
    let root;
    let cmpAvatar;
    let camera = new ƒ.Node("Camera");
    let viewport;
    let config;
    window.addEventListener("load", start);
    class ComponentScriptTest extends ƒ.ComponentScript {
        constructor() {
            super();
            this.hndTimer = (_event) => {
                // console.log("Timer", this);
                let body = this.getContainer().getComponent(ƒ.ComponentRigidbody);
                if (ƒ.Random.default.getRangeFloored(0, 5) == 0)
                    body.applyLinearImpulse(ƒ.Vector3.Y(1));
            };
            console.log("ComponentScriptTest created");
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndComponentAdd);
            // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.hndTimer);
            ƒ.Time.game.setTimer(100, 0, this.hndTimer);
        }
        hndComponentAdd(_event) {
            console.log("ComponentAdd");
            // this.getContainer().addEventListener(ƒ.EVENT.RENDER_PREPARE_START, (_event: Event): void => console.log("Render"));
        }
    }
    L05_PhysicsGame.ComponentScriptTest = ComponentScriptTest;
    async function start(_event) {
        ƒ.Physics.settings.debugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
        ƒ.Physics.settings.debugDraw = true;
        ƒ.Physics.settings.defaultRestitution = 0.5;
        ƒ.Physics.settings.defaultFriction = 0.8;
        let response = await fetch("Config.json");
        config = await response.json();
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
        cmpCamera.mtxPivot.translate(ƒ.Vector3.ONE(20));
        cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        L05_PhysicsGame.Hud.start();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update() {
        let speed = config.speed;
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
            try {
                tryGrab();
            }
            catch (_e) { /* */ }
        ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
        //cmpCamera.mtxPivot.lookAt(ball.mtxLocal.translation);
        // playerIsGroundedRaycast();
        viewport.draw();
    }
    function createAvatar() {
        let avatar = new ƒ.Node("Avatar");
        cmpAvatar = new ƒ.ComponentRigidbody(80, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
        cmpAvatar.restitution = 0;
        cmpAvatar.rotationInfluenceFactor = ƒ.Vector3.ZERO();
        // cmpAvatar.friction = 2;
        avatar.addComponent(cmpAvatar);
        avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(3))));
        let audListener = new ƒ.ComponentAudioListener();
        avatar.addComponent(audListener);
        ƒ.AudioManager.default.listenTo(root);
        avatar.appendChild(camera);
        let triggerInteraction = new ƒ.Node("TriggerInteraction");
        triggerInteraction.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.TRIGGER));
        triggerInteraction.addComponent(new ƒ.ComponentTransform());
        triggerInteraction.mtxLocal.translateZ(1.5);
        avatar.appendChild(triggerInteraction);
        triggerInteraction.getComponent(ƒ.ComponentRigidbody).addEventListener("TriggerEnteredCollision" /* TRIGGER_ENTER */, hndTrigger);
        root.appendChild(avatar);
    }
    function hndTrigger(_event) {
        console.log(_event.cmpRigidbody.getContainer().name);
    }
    function tryGrab() {
        let mtxAvatar = cmpAvatar.getContainer().mtxWorld;
        let rayHit = ƒ.Physics.raycast(ƒ.Vector3.DIFFERENCE(cmpAvatar.getPosition(), ƒ.Vector3.Y(0.5)), mtxAvatar.getZ(), 4);
        if (rayHit.hit)
            console.log(rayHit.hitDistance);
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
            let cmpRigidbody = new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.DEFAULT);
            cmpRigidbody.restitution = 0.8;
            cmpRigidbody.friction = 2.5;
            node.addComponent(cmpRigidbody);
            // console.log(node.name, node.cmpTransform?.mtxLocal.toString());
            node.addComponent(new ComponentScriptTest());
            // console.log(node);
        }
    }
})(L05_PhysicsGame || (L05_PhysicsGame = {}));
//# sourceMappingURL=PhysicsGame.js.map