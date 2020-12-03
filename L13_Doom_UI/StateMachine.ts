namespace L13_Doom_UI {
  import ƒaid = FudgeAid;

  export class ComponentStateMachineEnemy extends ƒaid.ComponentStateMachine<JOB> {
    private static instructions: ƒaid.StateMachineInstructions<JOB> = ComponentStateMachineEnemy.setupStateMachine();

    public constructor() {
      super();
      this.instructions = ComponentStateMachineEnemy.instructions;
    }

    private static setupStateMachine(): ƒaid.StateMachineInstructions<JOB> {
      let setup: ƒaid.StateMachineInstructions<JOB> = new ƒaid.StateMachineInstructions();

      setup.setAction(JOB.PATROL, (_machine) => {
        let container: Enemy = <Enemy>(<ƒaid.ComponentStateMachine<JOB>>_machine).getContainer();
        // console.log(container);
        if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
          _machine.transit(JOB.IDLE);
        container.move();
      });

      setup.setTransition(JOB.PATROL, JOB.IDLE, (_machine) => {
        let container: Enemy = <Enemy>(<ƒaid.ComponentStateMachine<JOB>>_machine).getContainer();
        ƒ.Time.game.setTimer(3000, 1, (_event: ƒ.EventTimer) => {
          container.chooseTargetPosition();
          _machine.transit(JOB.PATROL);
        })
      });

      return setup;
    }
  }
}