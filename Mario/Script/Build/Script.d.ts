declare namespace Mario {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class Avatar extends ƒAid.NodeSprite {
        readonly xSpeedDefault: number;
        readonly xSpeedSprint: number;
        private ySpeed;
        private leftDirection;
        private prevSprint;
        private animWalk;
        private animSprint;
        private animJump;
        private animLook;
        private animDeath;
        constructor();
        update(_deltaTime: number): void;
        walk(_deltaTime: number, _left: boolean): void;
        initializeAnimations(_imgSpriteSheet: ƒ.TextureImage): Promise<void>;
    }
}
declare namespace Mario {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Mario {
    import ƒ = FudgeCore;
    let graph: ƒ.Node;
    let gravity: number;
}
