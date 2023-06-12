namespace Script {
  import ƒ = FudgeCore;
  import ƒUi = FudgeUserInterface;

  export class Gamestate extends ƒ.Mutable {
    public points: number;
    public health: number;
    public name: string;

    constructor() {
      super();
      this.points = 0;
      this.health = 100;
      this.name = "Steve";

      let vui: HTMLDivElement = document.querySelector("div#vui");
      new ƒUi.Controller(this, vui);
      this.addEventListener(ƒ.EVENT.MUTATE, () => console.log(this));
    }

    protected reduceMutator(_mutator: ƒ.Mutator): void {
    }
  }
}