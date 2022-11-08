"use strict";
var Mario;
(function (Mario) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Avatar extends ƒAid.NodeSprite {
        xSpeedDefault = .9;
        xSpeedSprint = 2;
        ySpeed = 0;
        leftDirection = false;
        prevSprint = false;
        animWalk;
        animSprint;
        animJump;
        animLook;
        animDeath;
        constructor() {
            super("AvatarInstance");
            this.addComponent(new ƒ.ComponentTransform());
            // this.addEventListener(ƒ.EVENT.RENDER_PREPARE, () => console.log("Render"));
        }
        update(_deltaTime) {
            this.ySpeed -= Mario.gravity * _deltaTime;
            let yOffset = this.ySpeed * _deltaTime;
            this.mtxLocal.translateY(yOffset);
        }
        walk(_deltaTime, _left) {
            const xTranslation = this.xSpeedDefault * _deltaTime;
            this.mtxLocal.translateX(xTranslation * (_left ? -1 : 1));
        }
        async initializeAnimations(_imgSpriteSheet) {
            let coat = new ƒ.CoatTextured(undefined, _imgSpriteSheet);
            this.animWalk = new ƒAid.SpriteSheetAnimation("Walk", coat);
            this.animWalk.generateByGrid(ƒ.Rectangle.GET(0, 0, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
            this.animSprint = new ƒAid.SpriteSheetAnimation("Sprint", coat);
            this.animSprint.generateByGrid(ƒ.Rectangle.GET(0, 24, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
            this.animJump = new ƒAid.SpriteSheetAnimation("Jump", coat);
            this.animJump.generateByGrid(ƒ.Rectangle.GET(0, 48, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
            this.animLook = new ƒAid.SpriteSheetAnimation("Look", coat);
            this.animLook.generateByGrid(ƒ.Rectangle.GET(32, 0, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
            this.animDeath = new ƒAid.SpriteSheetAnimation("Death", coat);
            this.animDeath.generateByGrid(ƒ.Rectangle.GET(32, 24, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
            this.setAnimation(this.animDeath);
            this.framerate = 20;
        }
    }
    Mario.Avatar = Avatar;
})(Mario || (Mario = {}));
var Mario;
(function (Mario) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Mario); // Register the namespace to FUDGE for serialization
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
    Mario.CustomComponentScript = CustomComponentScript;
})(Mario || (Mario = {}));
var Mario;
(function (Mario) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    // Initialize Viewport
    let viewport;
    Mario.gravity = 5;
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
    let avatarInstance;
    async function hndLoad(_event) {
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load("./Images/Mario_Spritesheet.png");
        let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
        initializeAnimations(coat);
        avatar = new ƒAid.NodeSprite("Avatar");
        avatar.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        avatar.setAnimation(animWalk);
        avatar.framerate = 20;
        Mario.graph = viewport.getBranch();
        // let mario: ƒ.Node = branch.getChildrenByName("Mario")[0];
        Mario.graph.addChild(avatar);
        avatarInstance = new Mario.Avatar();
        avatarInstance.initializeAnimations(imgSpriteSheet);
        console.log(avatarInstance);
        Mario.graph.addChild(avatarInstance);
        let cmpAudio = Mario.graph.getComponent(ƒ.ComponentAudio);
        cmpAudio.volume = 0.1;
        console.log(cmpAudio);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    const xSpeedDefault = .9;
    const xSpeedSprint = 2;
    let ySpeed = 1;
    let leftDirection = false;
    let prevSprint = false;
    function update(_event) {
        let deltaTime = ƒ.Loop.timeFrameGame / 1000;
        avatarInstance.update(deltaTime);
        ySpeed -= Mario.gravity * deltaTime;
        let yOffset = ySpeed * deltaTime;
        avatar.mtxLocal.translateY(yOffset);
        // let pos: ƒ.Vector3 = avatar.mtxLocal.translation;
        // if (pos.y + yOffset > 0)
        //   avatar.mtxLocal.translateY(yOffset);
        // else {
        //   ySpeed = 0;
        //   pos.y = 0;
        //   avatar.mtxLocal.translation = pos;
        // }
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
            leftDirection = true;
            avatarInstance.walk(deltaTime, leftDirection);
            avatar.mtxLocal.translateX(-xTranslation);
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
        checkCollision();
        viewport.draw();
        //ƒ.AudioManager.default.update();
    }
    function checkCollision() {
        let blocks = Mario.graph.getChildrenByName("Blocks")[0];
        let pos = avatar.mtxLocal.translation;
        for (let block of blocks.getChildren()) {
            let posBlock = block.mtxLocal.translation;
            if (Math.abs(pos.x - posBlock.x) < 0.5) {
                if (pos.y < posBlock.y + 0.5) {
                    pos.y = posBlock.y + 0.5;
                    avatar.mtxLocal.translation = pos;
                    ySpeed = 0;
                }
            }
        }
    }
})(Mario || (Mario = {}));
//# sourceMappingURL=Script.js.map