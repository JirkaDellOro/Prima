/// <reference types="../../../FudgeCore/FudgeCore" />
/// <reference types="../../../FudgeUserInterface/FudgeUserInterface" />
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        health: number;
        name: string;
        constructor();
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class GameState extends ƒ.Mutable {
        private static controller;
        private static instance;
        name: string;
        health: number;
        private constructor();
        static get(): GameState;
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace LaserLeague {
    export import ƒ = FudgeCore;
    export import ƒui = FudgeUserInterface;
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class ScriptLaser extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        rotSpeed: number;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
        checkCollision(_pos: ƒ.Vector3, _radius: number): boolean;
    }
}
