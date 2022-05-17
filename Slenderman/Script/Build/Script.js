"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class DropToGroundInitial extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(DropToGroundInitial);
        // Properties may be mutated by users in the editor via the automatically created user interface
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
                    this.node.mtxLocal.translateY(-8);
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
    }
    Script.DropToGroundInitial = DropToGroundInitial;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒUi = FudgeUserInterface;
    class GameState extends ƒ.Mutable {
        battery = 1;
        constructor() {
            super();
            let domVui = document.querySelector("div#vui");
            console.log(new ƒUi.Controller(this, domVui));
        }
        reduceMutator(_mutator) { }
    }
    Script.GameState = GameState;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let avatar;
    let cmpCamera;
    let speedRotY = -0.1;
    let speedRotX = 0.2;
    let rotationX = 0;
    let cntWalk = new ƒ.Control("cntWalk", 6, 0 /* PROPORTIONAL */, 500);
    let gameState;
    let config;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        avatar = viewport.getBranch().getChildrenByName("Avatar")[0];
        viewport.camera = cmpCamera = avatar.getChild(0).getComponent(ƒ.ComponentCamera);
        viewport.getBranch().addEventListener("toggleTorch", hndToggleTorch);
        animateDoor(viewport.getBranch().getChildrenByName("Door")[0].getChildrenByName("Board")[0]);
        gameState = new Script.GameState();
        let response = await fetch("config.json");
        config = await response.json();
        console.log(config);
        let canvas = viewport.getCanvas();
        canvas.addEventListener("pointermove", hndPointerMove);
        canvas.requestPointerLock();
        document.addEventListener("keydown", hndKeydown);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function hndToggleTorch(_event) {
        console.log(_event);
    }
    function hndKeydown(_event) {
        if (_event.code != ƒ.KEYBOARD_CODE.SPACE)
            return;
        let torch = avatar.getChildrenByName("Torch")[0];
        torch.activate(!torch.isActive);
        torch.dispatchEvent(new Event("toggleTorch", { bubbles: true }));
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        controlWalk();
        viewport.draw();
        ƒ.AudioManager.default.update();
        gameState.battery -= config["drain"];
        // document.querySelector("input").value = battery.toFixed(3);
    }
    function controlWalk() {
        let input = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
        cntWalk.setInput(input);
        avatar.mtxLocal.translateZ(cntWalk.getOutput() * ƒ.Loop.timeFrameGame / 1000);
    }
    function hndPointerMove(_event) {
        avatar.mtxLocal.rotateY(_event.movementX * speedRotY);
        rotationX += _event.movementY * speedRotX;
        rotationX = Math.min(60, Math.max(-60, rotationX));
        cmpCamera.mtxPivot.rotation = ƒ.Vector3.X(rotationX);
    }
    function animateDoor(_door) {
        console.log(_door);
        let animseq = new ƒ.AnimationSequence();
        animseq.addKey(new ƒ.AnimationKey(0, 0));
        animseq.addKey(new ƒ.AnimationKey(1000, -1));
        let animStructure = {
            components: {
                ComponentTransform: [
                    {
                        "ƒ.ComponentTransform": {
                            mtxLocal: {
                                translation: {
                                    x: animseq
                                }
                            }
                        }
                    }
                ]
            }
        };
        let animation = new ƒ.Animation("animDoor", animStructure);
        let cmpAnimator = new ƒ.ComponentAnimator(animation, ƒ.ANIMATION_PLAYMODE.LOOP);
        _door.addComponent(cmpAnimator);
        cmpAnimator.activate(true);
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
        timeToChange = 0;
        direction = ƒ.Vector3.ZERO();
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    this.node.addEventListener("renderPrepare" /* RENDER_PREPARE */, this.move);
                    break;
            }
        };
        move = (_event) => {
            this.node.mtxLocal.translate(ƒ.Vector3.SCALE(this.direction, ƒ.Loop.timeFrameGame / 1000));
            if (this.timeToChange > ƒ.Time.game.get())
                return;
            this.timeToChange = ƒ.Time.game.get() + 1000;
            this.direction = ƒ.Random.default.getVector3(new ƒ.Vector3(-1, 0, -1), new ƒ.Vector3(1, 0, 1));
        };
    }
    Script.Slenderman = Slenderman;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map