"use strict";
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
    var ƒAid = FudgeAid;
    // Initialize Viewport
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        hndLoad(_event);
    }
    let animWalk;
    let animSprint;
    let animJump;
    let animLook;
    let animDeath;
    function initializeAnimations(coat) {
        animWalk = new ƒAid.SpriteSheetAnimation("Walk", coat);
        animWalk.generateByGrid(ƒ.Rectangle.GET(0, 0, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
        animSprint = new ƒAid.SpriteSheetAnimation("Sprint", coat);
        animSprint.generateByGrid(ƒ.Rectangle.GET(0, 24, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
        animJump = new ƒAid.SpriteSheetAnimation("Jump", coat);
        animJump.generateByGrid(ƒ.Rectangle.GET(0, 48, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
        animLook = new ƒAid.SpriteSheetAnimation("Look", coat);
        animLook.generateByGrid(ƒ.Rectangle.GET(32, 0, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
        animDeath = new ƒAid.SpriteSheetAnimation("Death", coat);
        animDeath.generateByGrid(ƒ.Rectangle.GET(32, 24, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
    }
    // Load Sprite
    let avatar;
    async function hndLoad(_event) {
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load("./Images/Mario_Spritesheet.png");
        let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
        initializeAnimations(coat);
        avatar = new ƒAid.NodeSprite("Avatar");
        avatar.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        avatar.setAnimation(animWalk);
        avatar.framerate = 20;
        avatar.mtxLocal.translateY(0.3);
        let branch = viewport.getBranch();
        // let mario: ƒ.Node = branch.getChildrenByName("Mario")[0];
        branch.addChild(avatar);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    const xSpeedDefault = .9;
    const xSpeedSprint = 2;
    let ySpeed = 0.01;
    let gravity = 0.05;
    let leftDirection = false;
    let prevSprint = false;
    function update(_event) {
        let deltaTime = ƒ.Loop.timeFrameGame / 1000;
        ySpeed -= gravity * deltaTime;
        avatar.mtxLocal.translateY(ySpeed);
        let pos = avatar.mtxLocal.translation;
        if (pos.y + ySpeed > 0)
            avatar.mtxLocal.translateY(ySpeed);
        else {
            ySpeed = 0;
            pos.y = 0;
            avatar.mtxLocal.translation = pos;
        }
        let speed = xSpeedDefault;
        if (leftDirection) {
            speed = -xSpeedDefault;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT, ƒ.KEYBOARD_CODE.SHIFT_RIGHT])) {
            speed = xSpeedSprint;
            if (leftDirection) {
                speed = -xSpeedSprint;
            }
        }
        // Calculate (walk) speed
        const xTranslation = speed * deltaTime;
        // Check for key presses
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            avatar.mtxLocal.translateX(-xTranslation);
            leftDirection = true;
            if (speed < -1) {
                if (!prevSprint) {
                    prevSprint = true;
                    avatar.setAnimation(animSprint);
                }
            }
            else {
                prevSprint = false;
            }
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            avatar.mtxLocal.translateX(xTranslation);
            leftDirection = false;
            if (speed > 1) {
                if (!prevSprint) {
                    prevSprint = true;
                    avatar.setAnimation(animSprint);
                }
            }
            else {
                prevSprint = false;
            }
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
            avatar.setAnimation(animLook);
            avatar.showFrame(1);
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
            avatar.setAnimation(animLook);
            avatar.showFrame(0);
        }
        else {
            avatar.showFrame(0);
            avatar.setAnimation(animWalk);
        }
        // Rotate based on direction
        avatar.mtxLocal.rotation = ƒ.Vector3.Y(leftDirection ? 180 : 0);
        viewport.draw();
        //ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map