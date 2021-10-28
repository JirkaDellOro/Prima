declare namespace Script {
}
declare namespace Script {
    import ƒ = FudgeCore;
    class ScriptLaser extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        rotSpeed: number;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
    }
}
