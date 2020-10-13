"use strict";
var L10_TowerDefenseEnemyProjectiles;
(function (L10_TowerDefenseEnemyProjectiles) {
    // import ƒ = FudgeCore;
    // import ƒAid = FudgeAid;
    class ComponentPicker extends ƒ.Component {
        constructor(_radius = 0.5) {
            super();
            this.radius = 0.5;
            this.radius = _radius;
        }
        drawPickRadius(_viewport) {
            let pickData = this.getPickData();
            let crc2 = _viewport.getContext();
            crc2.save();
            crc2.beginPath();
            crc2.arc(pickData.canvas.x, pickData.canvas.y, pickData.radius.magnitude, 0, 2 * Math.PI);
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = "#ffffff80";
            crc2.stroke();
            crc2.fill();
        }
        pick(_client) {
            let pickData = this.getPickData();
            let distance = ƒ.Vector2.DIFFERENCE(_client, pickData.canvas);
            if (distance.magnitudeSquared < pickData.radius.magnitudeSquared)
                return pickData;
            return null;
        }
        getPickData() {
            let node = this.getContainer();
            let projection = L10_TowerDefenseEnemyProjectiles.viewport.camera.project(node.mtxWorld.translation);
            let posClient = L10_TowerDefenseEnemyProjectiles.viewport.pointClipToClient(projection.toVector2());
            let projectionRadius = ƒ.Vector3.X(this.radius * node.mtxWorld.scaling.magnitude); // / 1.414);
            projectionRadius.transform(L10_TowerDefenseEnemyProjectiles.viewport.camera.pivot, false);
            projectionRadius = L10_TowerDefenseEnemyProjectiles.viewport.camera.project(ƒ.Vector3.SUM(node.mtxWorld.translation, projectionRadius));
            let posRadius = L10_TowerDefenseEnemyProjectiles.viewport.pointClipToClient(projectionRadius.toVector2());
            return { clip: projection, canvas: posClient, radius: ƒ.Vector2.DIFFERENCE(posRadius, posClient) };
        }
    }
    L10_TowerDefenseEnemyProjectiles.ComponentPicker = ComponentPicker;
})(L10_TowerDefenseEnemyProjectiles || (L10_TowerDefenseEnemyProjectiles = {}));
//# sourceMappingURL=CompontentPicker.js.map