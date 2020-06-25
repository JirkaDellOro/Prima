"use strict";
var L09_TowerDefenseStart;
(function (L09_TowerDefenseStart) {
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
            let projection = L09_TowerDefenseStart.viewport.camera.project(node.mtxWorld.translation);
            let posClient = L09_TowerDefenseStart.viewport.pointClipToClient(projection.toVector2());
            let projectionRadius = ƒ.Vector3.X(this.radius * node.mtxWorld.scaling.magnitude); // / 1.414);
            projectionRadius.transform(L09_TowerDefenseStart.viewport.camera.pivot, false);
            projectionRadius = L09_TowerDefenseStart.viewport.camera.project(ƒ.Vector3.SUM(node.mtxWorld.translation, projectionRadius));
            let posRadius = L09_TowerDefenseStart.viewport.pointClipToClient(projectionRadius.toVector2());
            return { clip: projection, canvas: posClient, radius: ƒ.Vector2.DIFFERENCE(posRadius, posClient) };
        }
    }
    L09_TowerDefenseStart.ComponentPicker = ComponentPicker;
})(L09_TowerDefenseStart || (L09_TowerDefenseStart = {}));
//# sourceMappingURL=CompontentPicker.js.map