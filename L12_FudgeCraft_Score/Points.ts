namespace L12_FudgeCraft_Points {

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

      // let posNew: string = (parseInt(domLabel.domElement.style.top) - 2) + "px";
      //   domLabel.domElement.style.top = posNew;
      return true;
    }
  }

  export class Points extends Array<DomLabel> {
    private viewport: ƒ.Viewport;
    private time: ƒ.Time = new ƒ.Time();

    constructor(_viewport: ƒ.Viewport) {
      super();
      this.viewport = _viewport;
      this.time.setTimer(40, 0, this.animate);
    }


    public showCombo(_combo: GridElement[], _iCombo: number): void {
      let points: number = 1;
      for (let element of _combo) {
        this.create(element, points);
        points *= 2;
      }
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

    private animate: ƒ.TimerHandler = (_event: ƒ.TimerEventƒ) => {
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