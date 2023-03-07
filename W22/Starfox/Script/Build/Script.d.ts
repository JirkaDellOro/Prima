declare namespace Script {
    import ƒ = FudgeCore;
    class EngineScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        private rigidbody;
        power: number;
        constructor();
        hndEvent: (_event: Event) => void;
        private hndCollision;
        private update;
        yaw(_value: number): void;
        pitch(_value: number): void;
        roll(_value: number): void;
        backwards(): void;
        thrust(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class GameState extends ƒ.Mutable {
        protected reduceMutator(_mutator: ƒ.Mutator): void;
        height: number;
        velocity: number;
        fuel: number;
        private controller;
        constructor(_config: {
            [key: string]: number;
        });
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    let ship: ƒ.Node;
    let cmpTerrain: ƒ.ComponentMesh;
    let gameState: GameState;
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
declare namespace Script {
    import ƒAid = FudgeAid;
    enum JOB {
        IDLE = 0,
        ATTACK = 1
    }
    export class TurretStateMachine extends ƒAid.ComponentStateMachine<JOB> {
        static readonly iSubclass: number;
        private static instructions;
        constructor();
        static get(): ƒAid.StateMachineInstructions<JOB>;
        private static transitDefault;
        private static actDefault;
        private static actIdle;
        private static actAttack;
        private hndEvent;
        private update;
    }
    export {};
}
