namespace L13_Doom_UI {
  import ƒUi = FudgeUserInterface;

  export class GameState extends ƒ.Mutable {
    public health: number = 100;
    public score: number = 0;
    public ammo: number = 100;
    protected reduceMutator(_mutator: ƒ.Mutator): void {/* */ }
  }

  export let gameState: GameState = new GameState();

  export class Hud {
    private static controller: ƒUi.Controller;

    public static start(): void {
      let domHud: HTMLDivElement = document.querySelector("div#hud");
      Hud.controller = new ƒUi.Controller(gameState, domHud);
      Hud.controller.updateUserInterface();
    }
  }
}