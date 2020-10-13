"use strict";
var L10_TowerDefenseEnemyProjectiles;
(function (L10_TowerDefenseEnemyProjectiles) {
    class Path extends Array {
        // public waypoints: ƒ.Vector3[] = [];
        render(_viewport) {
            let crc2 = _viewport.getContext();
            let first = true;
            for (let waypoint of this) {
                let projection = L10_TowerDefenseEnemyProjectiles.viewport.camera.project(waypoint);
                let posClient = L10_TowerDefenseEnemyProjectiles.viewport.pointClipToClient(projection.toVector2());
                if (first)
                    crc2.moveTo(posClient.x, posClient.y);
                else
                    crc2.lineTo(posClient.x, posClient.y);
                first = false;
            }
            crc2.stroke();
        }
    }
    L10_TowerDefenseEnemyProjectiles.Path = Path;
})(L10_TowerDefenseEnemyProjectiles || (L10_TowerDefenseEnemyProjectiles = {}));
//# sourceMappingURL=Path.js.map