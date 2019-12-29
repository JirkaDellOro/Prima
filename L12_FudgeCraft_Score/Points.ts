namespace L12_FudgeCraft_Score {

  class DomLabel {
    private static maxLifeTime: number = 1000; // in milliseconds
    public domElement: HTMLElement;
    private posWorld: ƒ.Vector3;
    private lifeTime: number = DomLabel.maxLifeTime;

    constructor(_domElement: HTMLElement, _node: ƒ.Node) {
      this.domElement = _domElement;
      this.posWorld = _node.mtxWorld.translation.copy;
    }

    place(_viewport: ƒ.Viewport, _lapse: number): boolean {
      let projection: ƒ.Vector3 = _viewport.camera.project(this.posWorld);
      let position: ƒ.Vector2 = _viewport.pointClipToClient(projection.toVector2());
      position = _viewport.pointClientToScreen(position);

      this.lifeTime -= _lapse;
      if (this.lifeTime < 0)
        return false;

      this.domElement.style.left = position.x + "px";
      this.domElement.style.top = (position.y - 40 + 40 * this.lifeTime / DomLabel.maxLifeTime) + "px";

      return true;
    }
  }

  export class Points extends Array<DomLabel> {
    public score: number = 0;
    private viewport: ƒ.Viewport;
    private time: ƒ.Time = new ƒ.Time();
    private domScore: HTMLElement;
    private domCalculation: HTMLElement;


    constructor(_viewport: ƒ.Viewport, _domScore: HTMLElement, _domCalculation: HTMLElement) {
      super();
      this.viewport = _viewport;
      this.domCalculation = _domCalculation;
      this.domScore = _domScore;
      if (this.domScore)
        this.time.setTimer(40, 0, this.animate);
    }

    public showCombo(_combo: GridElement[], _iCombo: number): void {
      let pointsCombo: number = 0;
      let pointsCube: number = Math.pow(2, _iCombo - 1);
      for (let element of _combo) {
        this.create(element, pointsCube);
        pointsCombo += pointsCube;
        pointsCube *= 2;
      }
      this.score += pointsCombo;
      let text: string = _iCombo + ". combo of " + _combo.length + " cubes ⇨ " + pointsCombo;
      this.addLineCalc(text, _combo[0].cube.getColor().getCSS());
      this.domScore.textContent = "Score: " + this.score;
      ƒ.Debug.log(text);
    }

    public create(_element: GridElement, _points: number): void {
      let domPoints: HTMLSpanElement = document.createElement("span");
      let domLabel: DomLabel = new DomLabel(domPoints, _element.cube);
      document.querySelector("div#PointsAnimation").appendChild(domLabel.domElement);

      domPoints.textContent = "+" + _points; //.toString();
      domPoints.style.color = _element.cube.getColor().getCSS();

      this.push(domLabel);
    }

    public remove(_index: number): void {
      let domLabel: DomLabel = this[_index];
      domLabel.domElement.parentNode.removeChild(domLabel.domElement);
      this.splice(_index, 1);
    }

    public addLineCalc(_text: string, _color: string): void {
      let line: HTMLElement = document.createElement("div");
      line.textContent = _text;
      line.style.color = _color;
      this.domCalculation.appendChild(line);
    }

    public clearCalc(): void {
      this.domCalculation.innerHTML = "";
    }

    private animate: ƒ.TimerHandler = (_event: ƒ.EventTimer) => {
      let lapse: number = _event.target.lapse;
      for (let i: number = this.length - 1; i >= 0; i--) {
        let domLabel: DomLabel = this[i];
        let stillAlive: boolean = domLabel.place(this.viewport, lapse);
        if (stillAlive)
          continue;
        this.remove(i);
      }
    }
  }
}