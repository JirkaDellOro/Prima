declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        health: number;
        name: string;
        constructor();
    }
}
declare namespace LaserLeague {
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class ScriptLaser extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        rotSpeed: number;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
    }
}
