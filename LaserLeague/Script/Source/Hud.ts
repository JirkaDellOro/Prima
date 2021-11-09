namespace LaserLeague {
  import ƒ = FudgeCore;
  import ƒui = FudgeUserInterface;

  export class GameState extends ƒ.Mutable {
    private static controller: ƒui.Controller;
    private static instance: GameState;
    public name: string = "LaserLeague";
    public health: number = 1;

    private constructor() {
      super();
      let domHud: HTMLDivElement = document.querySelector("#Hud");
      GameState.instance = this;
      GameState.controller = new ƒui.Controller(this, domHud);
      console.log("Hud-Controller", GameState.controller);
    }

    public static get(): GameState {
      return GameState.instance || new GameState();
    }

    protected reduceMutator(_mutator: ƒ.Mutator): void {/* */ }
  }
}