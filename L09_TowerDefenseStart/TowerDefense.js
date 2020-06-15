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
var L09_TowerDefenseStart;
(function (L09_TowerDefenseStart) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let graph = new ƒ.Node("Graph");
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 10, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("green");
        L09_TowerDefenseStart.viewport = new ƒ.Viewport();
        L09_TowerDefenseStart.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(L09_TowerDefenseStart.viewport);
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        graph.addChild(new ƒAid.NodeCoordinateSystem());
        graph.addChild(new ƒ.Node("Cubes"));
        let mtrWhite = new ƒ.Material("White", ƒ.ShaderFlat, new ƒ.CoatColored());
        let meshCube = new ƒ.MeshCube();
        for (let i = 0; i < 10; i++) {
            let range = 4;
            let pos = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range));
            let cube = new ƒAid.Node("Cube" + i, ƒ.Matrix4x4.TRANSLATION(pos), mtrWhite, meshCube);
            cube.mtxLocal.scale(ƒ.Vector3.ONE(1));
            cube.addComponent(new L09_TowerDefenseStart.ComponentPicker());
            graph.getChild(1).addChild(cube);
        }
        L09_TowerDefenseStart.viewport.draw();
        for (let cube of graph.getChild(1).getChildren()) {
            cube.getComponent(L09_TowerDefenseStart.ComponentPicker).drawPickRadius(L09_TowerDefenseStart.viewport);
        }
        L09_TowerDefenseStart.viewport.addEventListener("\u0192pointermove" /* MOVE */, pointerMove);
        L09_TowerDefenseStart.viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        // ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    }
    function pointerMove(_event) {
        let posMouse = new ƒ.Vector2(_event.canvasX, _event.canvasY);
        let cubes = L09_TowerDefenseStart.viewport.getGraph().getChild(1).getChildren();
        let picked = [];
        for (let cube of cubes) {
            let cmpPicker = cube.getComponent(L09_TowerDefenseStart.ComponentPicker);
            let pickData = cmpPicker.pick(posMouse);
            let cmpMaterial = cube.getComponent(ƒ.ComponentMaterial);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            if (pickData) {
                cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
                picked.push({ z: pickData.clip.z, picker: cmpPicker, name: cube.name });
            }
        }
        picked.sort((_a, _b) => _a.z > _b.z ? 1 : -1);
        console.clear();
        console.table(picked);
        L09_TowerDefenseStart.viewport.draw();
        for (let pick of picked)
            pick.picker.drawPickRadius(L09_TowerDefenseStart.viewport);
    }
})(L09_TowerDefenseStart || (L09_TowerDefenseStart = {}));
//# sourceMappingURL=TowerDefense.js.map