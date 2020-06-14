namespace L09_TowerDefenseStart {
  // import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class NodePickable extends ƒAid.Node {
    radius: number = 0.5;

    public drawPickRadius(): void {
      let projection: ƒ.Vector3 = viewport.camera.project(this.mtxWorld.translation);
      let posClient: ƒ.Vector2 = viewport.pointClipToClient(projection.toVector2());

      let projectionRadius: ƒ.Vector3 = ƒ.Vector3.X(this.radius * this.mtxWorld.scaling.magnitude);// / 1.414);
      projectionRadius.transform(viewport.camera.pivot, false);
      projectionRadius = viewport.camera.project(ƒ.Vector3.SUM(this.mtxWorld.translation, projectionRadius));
      let posRadius: ƒ.Vector2 = viewport.pointClipToClient(projectionRadius.toVector2());

      let radius: number = ƒ.Vector2.DIFFERENCE(posRadius, posClient).magnitude;

      let crc2: CanvasRenderingContext2D = viewport.getContext();
      crc2.beginPath();
      crc2.arc(posClient.x, posClient.y, radius, 0, 2 * Math.PI);
      crc2.stroke();
    }
  }
}