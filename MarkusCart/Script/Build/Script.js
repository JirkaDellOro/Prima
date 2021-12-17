"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let body;
    let isGrounded = false;
    let dampTranslation;
    let dampRotation;
    let ctrForward = new ƒ.Control("Forward", 7000, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    let ctrTurn = new ƒ.Control("Turn", 1000, 0 /* PROPORTIONAL */);
    ctrTurn.setDelay(50);
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        viewport.calculateTransforms();
        viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
        let cmpMeshTerrain = viewport.getBranch().getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
        Script.meshTerrain = cmpMeshTerrain.mesh;
        Script.mtxTerrain = cmpMeshTerrain.mtxWorld;
        Script.cart = viewport.getBranch().getChildrenByName("Cart")[0];
        body = Script.cart.getComponent(ƒ.ComponentRigidbody);
        dampTranslation = body.dampTranslation;
        dampRotation = body.dampRotation;
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        let maxHeight = 0.3;
        let minHeight = 0.2;
        let forceNodes = Script.cart.getChildren();
        let force = ƒ.Vector3.SCALE(ƒ.Physics.world.getGravity(), -body.mass / forceNodes.length);
        isGrounded = false;
        for (let forceNode of forceNodes) {
            let posForce = forceNode.getComponent(ƒ.ComponentMesh).mtxWorld.translation;
            let terrainInfo = Script.meshTerrain.getTerrainInfo(posForce, Script.mtxTerrain);
            if (terrainInfo.distance < maxHeight) {
                body.applyForceAtPoint(ƒ.Vector3.SCALE(force, (maxHeight - terrainInfo.distance) / (maxHeight - minHeight)), posForce);
                isGrounded = true;
            }
        }
        if (isGrounded) {
            body.dampTranslation = dampTranslation;
            body.dampRotation = dampRotation;
            let turn = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
            ctrTurn.setInput(turn);
            body.applyTorque(ƒ.Vector3.SCALE(Script.cart.mtxLocal.getY(), ctrTurn.getOutput()));
            let forward = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
            ctrForward.setInput(forward);
            body.applyForce(ƒ.Vector3.SCALE(Script.cart.mtxLocal.getZ(), ctrForward.getOutput()));
        }
        else
            body.dampRotation = body.dampTranslation = 0;
        ƒ.Physics.world.simulate(); // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["ESCAPE"] = 1] = "ESCAPE";
        JOB[JOB["DIE"] = 2] = "DIE";
        JOB[JOB["RESPAWN"] = 3] = "RESPAWN";
    })(JOB || (JOB = {}));
    class StateMachine extends ƒAid.ComponentStateMachine {
        static iSubclass = ƒ.Component.registerSubclass(StateMachine);
        static instructions = StateMachine.get();
        forceEscape = 25;
        torqueIdle = 5;
        cmpBody;
        cmpMaterial;
        constructor() {
            super();
            this.instructions = StateMachine.instructions; // setup instructions with the static set
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        static get() {
            let setup = new ƒAid.StateMachineInstructions();
            setup.transitDefault = StateMachine.transitDefault;
            setup.actDefault = StateMachine.actDefault;
            setup.setAction(JOB.IDLE, this.actIdle);
            setup.setAction(JOB.ESCAPE, this.actEscape);
            setup.setAction(JOB.DIE, this.actDie);
            setup.setAction(JOB.RESPAWN, this.actRespawn);
            setup.setTransition(JOB.ESCAPE, JOB.DIE, this.transitDie);
            return setup;
        }
        static transitDefault(_machine) {
            console.log("Transit to", _machine.stateNext);
        }
        static async actDefault(_machine) {
            console.log(JOB[_machine.stateCurrent]);
            let terrainInfo = Script.meshTerrain.getTerrainInfo(_machine.node.mtxWorld.translation, Script.mtxTerrain);
            if (terrainInfo.distance < 0.5)
                _machine.cmpBody.applyForce(ƒ.Vector3.Y(20));
        }
        static async actIdle(_machine) {
            _machine.cmpMaterial.clrPrimary = ƒ.Color.CSS("magenta");
            _machine.cmpBody.applyTorque(ƒ.Vector3.Y(_machine.torqueIdle));
            StateMachine.actDefault(_machine);
        }
        static async actEscape(_machine) {
            _machine.cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            let difference = ƒ.Vector3.DIFFERENCE(_machine.node.mtxWorld.translation, Script.cart.mtxWorld.translation);
            difference.normalize(_machine.forceEscape);
            _machine.cmpBody.applyForce(difference);
            StateMachine.actDefault(_machine);
        }
        static async actDie(_machine) {
            //
        }
        static transitDie(_machine) {
            _machine.cmpBody.applyLinearImpulse(ƒ.Vector3.Y(5));
            let timer = new ƒ.Timer(ƒ.Time.game, 100, 20, (_event) => {
                _machine.cmpMaterial.clrPrimary = ƒ.Color.CSS("black", 1 - _event.count / 20);
                if (_event.lastCall)
                    _machine.transit(JOB.RESPAWN);
            });
            console.log(timer);
        }
        static actRespawn(_machine) {
            let range = ƒ.Vector3.SCALE(Script.mtxTerrain.scaling, 0.5);
            _machine.cmpBody.setPosition(ƒ.Random.default.getVector3(range, ƒ.Vector3.SCALE(range, -1)));
            _machine.transit(JOB.IDLE);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    this.transit(JOB.IDLE);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    this.cmpBody = this.node.getComponent(ƒ.ComponentRigidbody);
                    this.cmpMaterial = this.node.getComponent(ƒ.ComponentMaterial);
                    this.cmpBody.addEventListener("ColliderEnteredCollision" /* COLLISION_ENTER */, (_event) => {
                        if (_event.cmpRigidbody.node.name == "Cart")
                            this.transit(JOB.DIE);
                    });
                    let trigger = this.node.getChildren()[0].getComponent(ƒ.ComponentRigidbody);
                    trigger.addEventListener("TriggerEnteredCollision" /* TRIGGER_ENTER */, (_event) => {
                        console.log("TriggerEnter", _event.cmpRigidbody.node.name);
                        if (_event.cmpRigidbody.node.name == "Cart" && this.stateCurrent != JOB.DIE)
                            this.transit(JOB.ESCAPE);
                    });
                    trigger.addEventListener("TriggerLeftCollision" /* TRIGGER_EXIT */, (_event) => {
                        if (this.stateCurrent == JOB.ESCAPE)
                            this.transit(JOB.IDLE);
                    });
                    break;
            }
        };
        update = (_event) => {
            this.act();
        };
    }
    Script.StateMachine = StateMachine;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map