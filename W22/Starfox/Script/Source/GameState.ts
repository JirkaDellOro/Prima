namespace Script {
  import ƒ = FudgeCore;
  import ƒui = FudgeUserInterface;

  export class GameState extends ƒ.Mutable {
    protected reduceMutator(_mutator: ƒ.Mutator): void {/* */}

    public height: number = 1;
    public velocity: number = 2;
    public fuel: number = 20;
    private controller: ƒui.Controller;

    constructor(_config: {[key: string]: number}) {
      super();
      this.fuel = _config.fuel;
      this.controller = new ƒui.Controller(this, document.querySelector("#vui"));
      console.log(this.controller);
    }
  }
}