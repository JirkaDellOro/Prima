"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Block extends ƒ.Node {
        static mshCube = new ƒ.MeshCube("Block");
        static mtrCube = new ƒ.Material("Block", ƒ.ShaderFlat, new ƒ.CoatRemissive());
        constructor(_position, _color) {
            super("Block");
            this.addComponent(new ƒ.ComponentMesh(Block.mshCube));
            let cmpMaterial = new ƒ.ComponentMaterial(Block.mtrCube);
            cmpMaterial.clrPrimary = _color;
            this.addComponent(cmpMaterial);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
            let cmpPick = new ƒ.ComponentPick();
            cmpPick.pick = ƒ.PICK.RADIUS;
            this.addComponent(cmpPick);
        }
    }
    Script.Block = Block;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
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
                    ƒ.Debug.log(this.message, this.node);
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
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        generateWorld(10, 3, 10);
        viewport.canvas.addEventListener("pointerdown", pick);
        viewport.getBranch().addEventListener("pointerdown", hit);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function pick(_event) {
        console.log("pick");
        viewport.dispatchPointerEvent(_event);
    }
    function hit(_event) {
        let node = _event.target;
        let cmpPick = node.getComponent(ƒ.ComponentPick);
        console.log(cmpPick.node.name);
    }
    function generateWorld(_width, _height, _depth) {
        for (let y = 0; y < _height; y++)
            for (let z = 0; z < _depth; z++)
                for (let x = 0; x < _width; x++) {
                    let vctPostion = new ƒ.Vector3(x - _width / 2, -y, z - _depth / 2);
                    let txtColor = ƒ.Random.default.getElement(["red", "lime", "blue", "yellow"]);
                    let instance = new Script.Block(vctPostion, ƒ.Color.CSS(txtColor));
                    instance.name = vctPostion.toString() + "|" + txtColor;
                    viewport.getBranch().addChild(instance);
                }
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map