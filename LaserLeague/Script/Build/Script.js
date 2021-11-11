"use strict";
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        health = 1;
        name = "Agent Smith";
        constructor() {
            super("Agent");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshQuad("MeshAgent")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
            this.mtxLocal.scale(ƒ.Vector3.ONE(0.5));
        }
    }
    LaserLeague.Agent = Agent;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    var ƒui = FudgeUserInterface;
    class GameState extends ƒ.Mutable {
        static controller;
        static instance;
        name = "LaserLeague";
        health = 1;
        constructor() {
            super();
            let domHud = document.querySelector("#Hud");
            GameState.instance = this;
            GameState.controller = new ƒui.Controller(this, domHud);
            console.log("Hud-Controller", GameState.controller);
        }
        static get() {
            return GameState.instance || new GameState();
        }
        reduceMutator(_mutator) { }
    }
    LaserLeague.GameState = GameState;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    LaserLeague.ƒ = FudgeCore;
    LaserLeague.ƒui = FudgeUserInterface;
    LaserLeague.ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    // let transform: ƒ.Matrix4x4;
    let agent;
    // let laser: ƒ.Node;
    let ctrForward = new LaserLeague.ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    let laser;
    async function start(_event) {
        viewport = _event.detail;
        let graph = viewport.getBranch();
        // laser = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser")[0];
        // transform = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
        // agent = graph.getChildrenByName("Agents")[0].getChildren()[0];
        agent = new LaserLeague.Agent();
        graph.getChildrenByName("Agents")[0].addChild(agent);
        document.addEventListener("click", hndClick);
        graph.addEventListener("agentSentEvent", hndAgentEvent);
        viewport.camera.mtxPivot.translateZ(-16);
        let graphLaser = FudgeCore.Project.resources["Graph|2021-10-28T13:06:19.996Z|71944"];
        laser = await LaserLeague.ƒ.Project.createGraphInstance(graphLaser);
        console.log("Copy", laser);
        graph.getChildrenByName("Lasers")[0].addChild(laser);
        // copyLaser.addComponent(new ƒ.ComponentTransform);
        laser.mtxLocal.translateX(5);
        LaserLeague.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        LaserLeague.ƒ.Loop.start(LaserLeague.ƒ.LOOP_MODE.TIME_REAL, 60); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let deltaTime = LaserLeague.ƒ.Loop.timeFrameReal / 1000;
        // let speedLaserRotate: number = 360; // degres per second
        let speedAgentRotation = 360; // meters per second
        // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
        //   ctrForward.setInput(1);
        // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
        let value = (LaserLeague.ƒ.Keyboard.mapToValue(-1, 0, [LaserLeague.ƒ.KEYBOARD_CODE.S, LaserLeague.ƒ.KEYBOARD_CODE.ARROW_DOWN])
            + LaserLeague.ƒ.Keyboard.mapToValue(1, 0, [LaserLeague.ƒ.KEYBOARD_CODE.W, LaserLeague.ƒ.KEYBOARD_CODE.ARROW_UP]));
        ctrForward.setInput(value * deltaTime);
        agent.mtxLocal.translateY(ctrForward.getOutput());
        // agent.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
        if (LaserLeague.ƒ.Keyboard.isPressedOne([LaserLeague.ƒ.KEYBOARD_CODE.A, LaserLeague.ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            agent.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
        if (LaserLeague.ƒ.Keyboard.isPressedOne([LaserLeague.ƒ.KEYBOARD_CODE.D, LaserLeague.ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            agent.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);
        // transform.rotateZ(speedLaserRotate * deltaTime);
        viewport.draw();
        checkCollision();
        LaserLeague.ƒ.AudioManager.default.update();
        LaserLeague.GameState.get().health -= 0.01;
    }
    function checkCollision() {
        // let beam: ƒ.Node = laser.getChildren()[3];
        // let posLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beam.mtxWorldInverse, true);
        // console.log(posLocal.toString());
    }
    function hndClick(_event) {
        console.log("Click");
        agent.dispatchEvent(new CustomEvent("agentSentEvent", { bubbles: true }));
    }
    function hndAgentEvent(_event) {
        console.log("Agent event received");
    }
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
    class ScriptLaser extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(ScriptLaser);
        // Properties may be mutated by users in the editor via the automatically created user interface
        rotSpeed = 60; // rotation per millisecond in degrees
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
        update = (_event) => {
            this.node.mtxLocal.rotateZ(this.rotSpeed * ƒ.Loop.timeFrameGame / 1000);
        };
    }
    LaserLeague.ScriptLaser = ScriptLaser;
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map