namespace L09_TowerDefenseStart {
  // import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export interface PickData {
    clip: ƒ.Vector3;
    canvas: ƒ.Vector2;
    radius: ƒ.Vector2;
  }

  export class NodePickable extends ƒAid.Node {
    radius: number = 0.5;

    public drawPickRadius(): void {
      let pickData: PickData = this.getPickData();

      let crc2: CanvasRenderingContext2D = viewport.getContext();
      crc2.beginPath();
      crc2.arc(pickData.canvas.x, pickData.canvas.y, pickData.radius.magnitude, 0, 2 * Math.PI);
      crc2.stroke();
    }

    public pick(_client: ƒ.Vector2): PickData {
      let pickData: PickData = this.getPickData();
      let distance: ƒ.Vector2 = ƒ.Vector2.DIFFERENCE(_client, pickData.canvas);
      if (distance.magnitudeSquared < pickData.radius.magnitudeSquared)
        return pickData;
      return null;
    }

    private getPickData(): PickData {
      let projection: ƒ.Vector3 = viewport.camera.project(this.mtxWorld.translation);
      let posClient: ƒ.Vector2 = viewport.pointClipToClient(projection.toVector2());

      let projectionRadius: ƒ.Vector3 = ƒ.Vector3.X(this.radius * this.mtxWorld.scaling.magnitude);// / 1.414);
      projectionRadius.transform(viewport.camera.pivot, false);
      projectionRadius = viewport.camera.project(ƒ.Vector3.SUM(this.mtxWorld.translation, projectionRadius));
      let posRadius: ƒ.Vector2 = viewport.pointClipToClient(projectionRadius.toVector2());

      return { clip: projection, canvas: posClient, radius: ƒ.Vector2.DIFFERENCE(posRadius, posClient) };
    }
  }
}