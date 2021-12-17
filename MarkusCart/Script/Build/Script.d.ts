/// <reference types="../../../FudgeCore/FudgeCore" />
/// <reference types="../../../FudgeAid/FudgeAid" />
declare namespace Script {
    import ƒ = FudgeCore;
    let cart: ƒ.Node;
}
declare namespace Script {
    import ƒAid = FudgeAid;
    enum JOB {
        IDLE = 0,
        ESCAPE = 1,
        DIE = 2,
        RESPAWN = 3
    }
    export class StateMachine extends ƒAid.ComponentStateMachine<JOB> {
        static readonly iSubclass: number;
        private static instructions;
        speedEscape: number;
        constructor();
        static get(): ƒAid.StateMachineInstructions<JOB>;
        private static transitDefault;
        private static actDefault;
        private static actIdle;
        private static actEscape;
        private hndEvent;
        private update;
    }
    export {};
}
