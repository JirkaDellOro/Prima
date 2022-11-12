"use strict";
var Mario;
(function (Mario) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION[ACTION["IDLE"] = 0] = "IDLE";
        ACTION[ACTION["WALK"] = 1] = "WALK";
        ACTION[ACTION["SPRINT"] = 2] = "SPRINT";
        ACTION[ACTION["CROUCH"] = 3] = "CROUCH";
        ACTION[ACTION["LOOK"] = 4] = "LOOK";
    })(ACTION = Mario.ACTION || (Mario.ACTION = {}));
    class Avatar extends ƒAid.NodeSprite {
        speedWalk = .9;
        speedSprint = 2;
        ySpeed = 0;
        xSpeed = 0;
        animationCurrent;
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
            this.mtxLocal.translateX(this.xSpeed * _deltaTime, true);
            this.mtxLocal.rotateX(this.xSpeed * _deltaTime, true);
        }
        act(_action) {
            let animation;
            this.xSpeed = 0;
            switch (_action) {
                case ACTION.WALK:
                    this.xSpeed = this.speedWalk;
                    animation = this.animWalk;
                    break;
                case ACTION.SPRINT:
                    this.xSpeed = this.speedSprint;
                    animation = this.animSprint;
                    break;
                case ACTION.IDLE:
                    this.showFrame(0);
                    animation = this.animWalk;
                    break;
                case ACTION.CROUCH:
                    this.showFrame(0);
                    animation = this.animLook;
                    break;
                case ACTION.LOOK:
                    this.showFrame(1);
                    animation = this.animLook;
                    break;
            }
            if (animation != this.animationCurrent) {
                this.setAnimation(animation);
                this.animationCurrent = animation;
            }
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
    // Initialize Viewport
    let viewport;
    Mario.gravity = 5;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        hndLoad(_event);
    }
    // Load Sprite
    let avatar;
    async function hndLoad(_event) {
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load("./Images/Mario_Spritesheet.png");
        Mario.graph = viewport.getBranch();
        avatar = new Mario.Avatar();
        avatar.initializeAnimations(imgSpriteSheet);
        Mario.graph.addChild(avatar);
        let cmpAudio = Mario.graph.getComponent(ƒ.ComponentAudio);
        cmpAudio.volume = 0.1;
        console.log(cmpAudio);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update(_event) {
        let deltaTime = ƒ.Loop.timeFrameGame / 1000;
        let run = ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT, ƒ.KEYBOARD_CODE.SHIFT_RIGHT]);
        // Check for key presses
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            avatar.mtxLocal.rotation = ƒ.Vector3.Y(180);
            avatar.act(run ? Mario.ACTION.SPRINT : Mario.ACTION.WALK);
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            avatar.mtxLocal.rotation = ƒ.Vector3.Y(0);
            avatar.act(run ? Mario.ACTION.SPRINT : Mario.ACTION.WALK);
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
            avatar.act(Mario.ACTION.LOOK);
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            avatar.act(Mario.ACTION.CROUCH);
        else
            avatar.act(Mario.ACTION.IDLE);
        avatar.update(deltaTime);
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
                    avatar.ySpeed = 0;
                }
            }
        }
    }
})(Mario || (Mario = {}));
var Mario;
(function (Mario) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Mario); // Register the namespace to FUDGE for serialization
    class ScriptRotator extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(ScriptRotator);
        // Properties may be mutated by users in the editor via the automatically created user interface
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
                    this.node.addComponent(new ƒ.ComponentTransform());
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
            this.node.mtxLocal.rotateY(this.speed);
        };
    }
    Mario.ScriptRotator = ScriptRotator;
})(Mario || (Mario = {}));
//# sourceMappingURL=Script.js.map