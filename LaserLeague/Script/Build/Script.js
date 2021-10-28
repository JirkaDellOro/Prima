"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    // let transform: ƒ.Matrix4x4;
    let agent;
    let laser;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    let copyLaser;
    async function start(_event) {
        viewport = _event.detail;
        let graph = viewport.getBranch();
        laser = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser")[0];
        // transform = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
        agent = graph.getChildrenByName("Agents")[0].getChildren()[0];
        viewport.camera.mtxPivot.translateZ(-16);
        let graphLaser = await ƒ.Project.registerAsGraph(laser, false);
        copyLaser = await ƒ.Project.createGraphInstance(graphLaser);
        console.log("Copy", copyLaser);
        graph.getChildrenByName("Lasers")[0].addChild(copyLaser);
        // copyLaser.addComponent(new ƒ.ComponentTransform);
        copyLaser.mtxLocal.translateX(5);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        // let speedLaserRotate: number = 360; // degres per second
        let speedAgentRotation = 360; // meters per second
        // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
        //   ctrForward.setInput(1);
        // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
        let value = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
            + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]));
        ctrForward.setInput(value * deltaTime);
        agent.mtxLocal.translateY(ctrForward.getOutput());
        // agent.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            agent.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            agent.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);
        // transform.rotateZ(speedLaserRotate * deltaTime);
        viewport.draw();
        checkCollision();
        ƒ.AudioManager.default.update();
    }
    function checkCollision() {
        // let beam: ƒ.Node = laser.getChildren()[3];
        // let posLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beam.mtxWorldInverse, true);
        // console.log(posLocal.toString());
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
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
    Script.ScriptLaser = ScriptLaser;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map