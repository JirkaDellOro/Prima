"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let speedRotY = 0.5;
    let cntWalk = new ƒ.Control("ControlWalk", 1.5, 0 /* PROPORTIONAL */);
    let rotationX = 0;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        Script.avatar = viewport.getBranch().getChildrenByName("Avatar")[0];
        viewport.camera = Script.avatar.getChildrenByName("Camera")[0].getComponent(ƒ.ComponentCamera);
        // ƒ.Viewport.expandCameraToInteractiveOrbit(viewport);
        document.addEventListener("pointermove", hndPointer);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        control();
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function control() {
        let input = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
        cntWalk.setInput(input);
        Script.avatar.mtxLocal.translateZ(cntWalk.getOutput() * ƒ.Loop.timeFrameGame / 1000);
    }
    function hndPointer(_event) {
        Script.avatar.mtxLocal.rotateY(-speedRotY * _event.movementX);
        rotationX = Math.max(Math.min(rotationX + _event.movementY, 60), -60);
        Script.avatar.getChildrenByName("Camera")[0].mtxLocal.rotation = ƒ.Vector3.X(rotationX);
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class Slenderman extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Slenderman);
        // Properties may be mutated by users in the editor via the automatically created user interface
        // public message: string = "CustomComponentScript added to ";
        speed = 1;
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
                    // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
                    this.node.addEventListener("renderPrepare" /* RENDER_PREPARE */, this.update);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        update = (_event) => {
            let diff = ƒ.Vector3.DIFFERENCE(Script.avatar.mtxLocal.translation, this.node.getParent().mtxLocal.translation);
            diff.normalize(this.speed * ƒ.Loop.timeFrameGame / 1000);
            this.node.getParent().mtxLocal.translate(diff);
        };
    }
    Script.Slenderman = Slenderman;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map