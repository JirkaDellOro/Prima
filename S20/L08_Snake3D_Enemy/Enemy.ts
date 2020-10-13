namespace L08_Snake3D_Enemy {
  // import ƒ = FudgeCore;
  // import ƒAid = FudgeAid;

  interface MapAngleToDistance {
    angle: number;
    distance: number;
  }

  export class Enemy extends Snake {
    private detectionRange: number = 5;

    constructor(_name: string = "Enemy", _color: ƒ.Color = ƒ.Color.CSS("blue")) {
      super(_name, _color);
    }

    public move(): void {
      let angle: number = this.chooseTurn();
      this.rotate(ƒ.Vector3.Y(angle));
      super.move();
    }

    private chooseTurn(): number {
      let result: number = 0;
      let foodInRange: ƒ.Node[] = this.detectFood();
      if (!foodInRange.length)
        return result;

      let distances: MapAngleToDistance[];
      for (let angle of [0, -90, 0, 90]) {
        let minSquareDistance: number = Number.POSITIVE_INFINITY;

        let test: ƒ.Matrix4x4 = this.head.mtxLocal.copy;
        if (!distances)
          // first iteration on the current position of head
          distances = [];
        else {
          // following iterations at possible positions for next step
          test.rotate(ƒ.Vector3.Y(angle));
          test.translate(this.dirCurrent);
        }

        for (let food of foodInRange) {
          let translation: ƒ.Vector3 = test.getTranslationTo(food.mtxLocal);
          let squareDistance: number = translation.magnitudeSquared;
          minSquareDistance = Math.min(minSquareDistance, squareDistance);
        }
        distances.push({ angle: angle, distance: minSquareDistance });
      }

      distances.sort((_a: MapAngleToDistance, _b: MapAngleToDistance) => _a.distance < _b.distance ? -1 : 1);
      if (distances.length)
        result = distances[0].angle;

      return result;
    }

    private detectFood(): ƒ.Node[] {
      let foodInRange: ƒ.Node[] = [];
      for (let item of items.getChildren()) {
        let position: ƒ.Vector3 = item.mtxLocal.translation;
        if (position.isInsideSphere(this.head.mtxLocal.translation, this.detectionRange))
          foodInRange.push(item);
      }
      return foodInRange;
    }

    // public eat(): void {
    // }
  }
}