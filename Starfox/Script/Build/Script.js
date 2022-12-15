"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class EngineScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(EngineScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        rigidbody;
        power = 15000;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    // ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    this.rigidbody = this.node.getComponent(ƒ.ComponentRigidbody);
                    this.rigidbody.addEventListener("ColliderEnteredCollision" /* COLLISION_ENTER */, this.hndCollision);
                    this.node.addEventListener("SensorHit", this.hndCollision);
                    this.node.addEventListener("renderPrepare" /* RENDER_PREPARE */, this.update);
                    break;
            }
        };
        hndCollision = (_event) => {
            console.log("Bumm");
        };
        update = (_event) => {
            if (!Script.gameState)
                return;
            Script.gameState.height = this.node.mtxLocal.translation.y;
            Script.gameState.velocity = Math.round(this.rigidbody.getVelocity().magnitude);
        };
        yaw(_value) {
            this.rigidbody.applyTorque(new ƒ.Vector3(0, _value * -10, 0));
        }
        pitch(_value) {
            this.rigidbody.applyTorque(ƒ.Vector3.SCALE(this.node.mtxWorld.getX(), _value * 7.5));
        }
        roll(_value) {
            this.rigidbody.applyTorque(ƒ.Vector3.SCALE(this.node.mtxWorld.getZ(), _value));
        }
        backwards() {
            this.rigidbody.applyForce(ƒ.Vector3.SCALE(this.node.mtxWorld.getZ(), -this.power));
        }
        thrust() {
            this.rigidbody.applyForce(ƒ.Vector3.SCALE(this.node.mtxWorld.getZ(), this.power));
        }
    }
    Script.EngineScript = EngineScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒui = FudgeUserInterface;
    class GameState extends ƒ.Mutable {
        reduceMutator(_mutator) { }
        height = 1;
        velocity = 2;
        fuel = 20;
        controller;
        constructor(_config) {
            super();
            this.fuel = _config.fuel;
            this.controller = new ƒui.Controller(this, document.querySelector("#vui"));
            console.log(this.controller);
        }
    }
    Script.GameState = GameState;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let cmpEngine;
    let vctMouse = ƒ.Vector2.ZERO();
    document.addEventListener("interactiveViewportStarted", start);
    window.addEventListener("mousemove", hndMouse);
    async function start(_event) {
        let response = await fetch("config.json");
        let config = await response.json();
        Script.gameState = new Script.GameState(config);
        viewport = _event.detail;
        viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
        ƒ.Physics.settings.solverIterations = 300;
        Script.ship = viewport.getBranch().getChildrenByName("Ship")[0];
        cmpEngine = Script.ship.getComponent(Script.EngineScript);
        let cmpCamera = Script.ship.getChildrenByName("Camera")[0].getComponent(ƒ.ComponentCamera);
        console.log(cmpCamera);
        viewport.camera = cmpCamera;
        Script.cmpTerrain = viewport.getBranch().getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        control();
        ƒ.Physics.simulate(); // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function hndMouse(e) {
        vctMouse.x = 2 * (e.clientX / window.innerWidth) - 1;
        vctMouse.y = 2 * (e.clientY / window.innerHeight) - 1;
    }
    function control() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
            cmpEngine.thrust();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
            cmpEngine.backwards();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            cmpEngine.roll(-5);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            cmpEngine.roll(5);
        }
        cmpEngine.pitch(vctMouse.y);
        cmpEngine.yaw(vctMouse.x);
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class SensorScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(SensorScript);
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    // this.node.addEventListener(ƒ.EVENT.GRAPH_INSTANTIATED, this.hndEvent)
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    this.node.addEventListener("renderPrepare" /* RENDER_PREPARE */, this.update);
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        update = (_event) => {
            if (!Script.cmpTerrain)
                return;
            let mesh = Script.cmpTerrain.mesh;
            let parent = this.node.getParent();
            let info = mesh.getTerrainInfo(parent.mtxWorld.translation, Script.cmpTerrain.mtxWorld);
            if (info.distance < 0)
                this.node.dispatchEvent(new Event("SensorHit", { bubbles: true }));
        };
    }
    Script.SensorScript = SensorScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["ATTACK"] = 1] = "ATTACK";
    })(JOB || (JOB = {}));
    class TurretStateMachine extends ƒAid.ComponentStateMachine {
        static iSubclass = ƒ.Component.registerSubclass(TurretStateMachine);
        static instructions = TurretStateMachine.get();
        constructor() {
            super();
            this.instructions = TurretStateMachine.instructions; // setup instructions with the static set
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
            setup.transitDefault = TurretStateMachine.transitDefault;
            setup.actDefault = TurretStateMachine.actDefault;
            setup.setAction(JOB.IDLE, this.actIdle);
            setup.setAction(JOB.ATTACK, this.actAttack);
            return setup;
        }
        static transitDefault(_machine) {
            console.log("Transit to", _machine.stateNext);
        }
        static async actDefault(_machine) {
            console.log(JOB[_machine.stateCurrent]);
        }
        static async actIdle(_machine) {
            _machine.node.mtxLocal.rotateY(1);
            let distance = ƒ.Vector3.DIFFERENCE(Script.ship.mtxWorld.translation, _machine.node.mtxWorld.translation);
            if (distance.magnitude < 10)
                _machine.transit(JOB.ATTACK);
        }
        static async actAttack(_machine) {
            _machine.node.mtxLocal.rotateY(-5);
            let distance = ƒ.Vector3.DIFFERENCE(Script.ship.mtxWorld.translation, _machine.node.mtxWorld.translation);
            if (distance.magnitude > 10)
                _machine.transit(JOB.IDLE);
        }
        // private static async actEscape(_machine: StateMachine): Promise<void> {
        //   _machine.cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
        //   let difference: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(_machine.node.mtxWorld.translation, cart.mtxWorld.translation);
        //   difference.normalize(_machine.forceEscape);
        //   _machine.cmpBody.applyForce(difference);
        //   StateMachine.actDefault(_machine);
        // }
        // private static async actDie(_machine: StateMachine): Promise<void> {
        //   //
        // }
        // private static transitDie(_machine: StateMachine): void {
        //   _machine.cmpBody.applyLinearImpulse(ƒ.Vector3.Y(5));
        //   let timer: ƒ.Timer = new ƒ.Timer(ƒ.Time.game, 100, 20, (_event: ƒ.EventTimer) => {
        //     _machine.cmpMaterial.clrPrimary = ƒ.Color.CSS("black", 1 - _event.count / 20);
        //     if (_event.lastCall)
        //       _machine.transit(JOB.RESPAWN);
        //   });
        //   console.log(timer);
        // }
        // private static actRespawn(_machine: StateMachine): void {
        //   let range: ƒ.Vector3 = ƒ.Vector3.SCALE(mtxTerrain.scaling, 0.5);
        //   _machine.cmpBody.setPosition(ƒ.Random.default.getVector3(range, ƒ.Vector3.SCALE(range, -1)));
        //   _machine.transit(JOB.IDLE);
        // }
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
                    this.transit(JOB.IDLE);
                    // let trigger: ƒ.ComponentRigidbody = this.node.getChildren()[0].getComponent(ƒ.ComponentRigidbody);
                    // trigger.addEventListener(ƒ.EVENT_PHYSICS.TRIGGER_ENTER, (_event: ƒ.EventPhysics) => {
                    //   console.log("TriggerEnter", _event.cmpRigidbody.node.name);
                    //   if (_event.cmpRigidbody.node.name == "Cart" && this.stateCurrent != JOB.DIE)
                    //     this.transit(JOB.ESCAPE);
                    // });
                    // trigger.addEventListener(ƒ.EVENT_PHYSICS.TRIGGER_EXIT, (_event: ƒ.EventPhysics) => {
                    //   if (this.stateCurrent == JOB.ESCAPE)
                    //     this.transit(JOB.IDLE);
                    // });
                    break;
            }
        };
        update = (_event) => {
            this.act();
        };
    }
    Script.TurretStateMachine = TurretStateMachine;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map