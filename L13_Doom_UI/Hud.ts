namespace L13_Doom_UI {
  export class Hud {
    public static displayPosition(_position: ƒ.Vector3): void {
      let divPosition: HTMLDivElement = document.querySelector("div#position");
      divPosition.innerHTML = _position.toString();
    }
  }
}