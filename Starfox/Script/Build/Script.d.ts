declare namespace Script {
    import ƒ = FudgeCore;
    class EngineScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        private rigidbody;
        power: number;
        constructor();
        hndEvent: (_event: Event) => void;
        private hndCollision;
        yaw(_value: number): void;
        pitch(_value: number): void;
        roll(_value: number): void;
        backwards(): void;
        thrust(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    let cmpTerrain: ƒ.ComponentMesh;
}
declare namespace Script {
    import ƒ = FudgeCore;
    class SensorScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        constructor();
        hndEvent: (_event: Event) => void;
        private update;
    }
}
