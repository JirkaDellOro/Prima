/// <reference types="../../../FudgeAid/FudgeAid" />
declare namespace Script {
}
declare namespace Script {
    import ƒAid = FudgeAid;
    enum JOB {
        IDLE = 0,
        PATROL = 1,
        CHASE = 2
    }
    export class StateMachine extends ƒAid.ComponentStateMachine<JOB> {
        static readonly iSubclass: number;
        private static instructions;
        constructor();
        static get(): ƒAid.StateMachineInstructions<JOB>;
        private static transitDefault;
        private static actDefault;
        private static actSpin;
        private hndEvent;
        private update;
    }
    export {};
}
