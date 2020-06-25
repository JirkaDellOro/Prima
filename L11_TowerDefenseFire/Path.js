"use strict";
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    class Path extends Array {
        // public waypoints: ƒ.Vector3[] = [];
        render(_viewport) {
            let crc2 = _viewport.getContext();
            let first = true;
            for (let waypoint of this) {
                let projection = L11_TowerDefenseFire.viewport.camera.project(waypoint);
                let posClient = L11_TowerDefenseFire.viewport.pointClipToClient(projection.toVector2());
                if (first)
                    crc2.moveTo(posClient.x, posClient.y);
                else
                    crc2.lineTo(posClient.x, posClient.y);
                first = false;
            }
            crc2.stroke();
        }
    }
    L11_TowerDefenseFire.Path = Path;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
//# sourceMappingURL=Path.js.map