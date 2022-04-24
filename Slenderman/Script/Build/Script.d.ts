declare namespace Script {
    import ƒ = FudgeCore;
    class Forest extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        amount: number;
        constructor();
        hndEvent: (_event: Event) => Promise<void>;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    let avatar: ƒ.Node;
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Slenderman extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        speed: number;
        constructor();
        hndEvent: (_event: Event) => void;
        private update;
    }
}
