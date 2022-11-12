declare namespace Mario {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    enum ACTION {
        IDLE = 0,
        WALK = 1,
        SPRINT = 2,
        CROUCH = 3,
        LOOK = 4
    }
    class Avatar extends ƒAid.NodeSprite {
        readonly speedWalk: number;
        readonly speedSprint: number;
        ySpeed: number;
        private xSpeed;
        private animationCurrent;
        private animWalk;
        private animSprint;
        private animJump;
        private animLook;
        private animDeath;
        constructor();
        update(_deltaTime: number): void;
        act(_action: ACTION): void;
        initializeAnimations(_imgSpriteSheet: ƒ.TextureImage): Promise<void>;
    }
}
declare namespace Mario {
    import ƒ = FudgeCore;
    let graph: ƒ.Node;
    let gravity: number;
}
declare namespace Mario {
    import ƒ = FudgeCore;
    class ScriptRotator extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        speed: number;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
    }
}
