namespace L10_TowerDefenseEnemyProjectiles {
  export class Path extends Array<ƒ.Vector3> {
    // public waypoints: ƒ.Vector3[] = [];

    public render(_viewport: ƒ.Viewport): void {
      let crc2: CanvasRenderingContext2D = _viewport.getContext();
      let first: boolean = true;
      for (let waypoint of this) {
        let projection: ƒ.Vector3 = viewport.camera.project(waypoint);
        let posClient: ƒ.Vector2 = viewport.pointClipToClient(projection.toVector2());
        if (first)
          crc2.moveTo(posClient.x, posClient.y);
        else
          crc2.lineTo(posClient.x, posClient.y);
        first = false;
      }
      crc2.stroke();
    }
  }
}