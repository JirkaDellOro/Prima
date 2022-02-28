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
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderLit, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
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
    let agent;
    let lasers;
    let ctrForward = new LaserLeague.ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    window.addEventListener("load", init);
    // show dialog for startup
    function init(_event) {
        let dialog = document.querySelector("dialog");
        dialog.querySelector("h1").textContent = document.title;
        dialog.addEventListener("click", function (_event) {
            // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
            dialog.close();
            start(null);
        });
        //@ts-ignore
        dialog.showModal();
    }
    async function start(_event) {
        await FudgeCore.Project.loadResourcesFromHTML();
        let graph = LaserLeague.ƒ.Project.resources[document.head.querySelector("meta[autoView]").getAttribute("autoView")];
        let cmpCamera = new LaserLeague.ƒ.ComponentCamera();
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.mtxPivot.translateZ(-9);
        let canvas = document.querySelector("canvas");
        viewport = new LaserLeague.ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        LaserLeague.ƒ.AudioManager.default.listenTo(graph);
        LaserLeague.ƒ.AudioManager.default.listenWith(graph.getComponent(LaserLeague.ƒ.ComponentAudioListener));
        lasers = graph.getChildrenByName("Lasers")[0];
        agent = new LaserLeague.Agent();
        graph.getChildrenByName("Agents")[0].addChild(agent);
        viewport.getCanvas().addEventListener("mousedown", hndClick);
        graph.addEventListener("agentEvent", hndAgentEvent);
        viewport.camera.mtxPivot.translateZ(-16);
        let graphLaser = FudgeCore.Project.resources["Graph|2021-10-28T13:06:19.996Z|71944"];
        for (let i = -1; i < 2; i++) {
            let laser = await LaserLeague.ƒ.Project.createGraphInstance(graphLaser);
            laser.addEventListener("graphEvent", hndGraphEvent, true);
            lasers.addChild(laser);
            laser.mtxLocal.translateX(7 * i);
        }
        LaserLeague.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        LaserLeague.ƒ.Loop.start(LaserLeague.ƒ.LOOP_MODE.TIME_REAL, 60); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let deltaTime = LaserLeague.ƒ.Loop.timeFrameReal / 1000;
        let speedAgentRotation = 360; // meters per second
        let value = (LaserLeague.ƒ.Keyboard.mapToValue(-1, 0, [LaserLeague.ƒ.KEYBOARD_CODE.S, LaserLeague.ƒ.KEYBOARD_CODE.ARROW_DOWN])
            + LaserLeague.ƒ.Keyboard.mapToValue(1, 0, [LaserLeague.ƒ.KEYBOARD_CODE.W, LaserLeague.ƒ.KEYBOARD_CODE.ARROW_UP]));
        ctrForward.setInput(value * deltaTime);
        agent.mtxLocal.translateY(ctrForward.getOutput());
        if (LaserLeague.ƒ.Keyboard.isPressedOne([LaserLeague.ƒ.KEYBOARD_CODE.A, LaserLeague.ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            agent.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
        if (LaserLeague.ƒ.Keyboard.isPressedOne([LaserLeague.ƒ.KEYBOARD_CODE.D, LaserLeague.ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            agent.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);
        viewport.draw();
        agent.getComponent(LaserLeague.ƒ.ComponentMaterial).clrPrimary.a = 1;
        for (let laser of lasers.getChildren()) {
            if (laser.getComponent(LaserLeague.ScriptLaser).checkCollision(agent.mtxWorld.translation, 0.25)) {
                agent.getComponent(LaserLeague.ƒ.ComponentMaterial).clrPrimary.a = 0.5;
                break;
            }
        }
        LaserLeague.ƒ.AudioManager.default.update();
        LaserLeague.GameState.get().health -= 0.01;
    }
    function hndClick(_event) {
        console.log("mousedown event");
        agent.dispatchEvent(new CustomEvent("agentEvent", { bubbles: true }));
    }
    function hndAgentEvent(_event) {
        console.log("Agent event received by", _event.currentTarget);
        _event.currentTarget.broadcastEvent(new CustomEvent("graphEvent"));
    }
    function hndGraphEvent(_event) {
        console.log("Graph event received", _event.currentTarget);
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
        checkCollision(_pos, _radius) {
            let beams = this.node.getChildrenByName("Beam");
            let mtxMeshPivot = beams[0].getComponent(ƒ.ComponentMesh).mtxPivot;
            for (let beam of beams) {
                let posLocal = ƒ.Vector3.TRANSFORMATION(_pos, beam.mtxWorldInverse, true);
                if (posLocal.y < -_radius || posLocal.y > mtxMeshPivot.scaling.y + _radius || posLocal.x < -mtxMeshPivot.scaling.x / 2 - _radius || posLocal.x > mtxMeshPivot.scaling.x / 2 + _radius)
                    continue;
                return true;
            }
            return false;
        }
    }
    LaserLeague.ScriptLaser = ScriptLaser;
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map