"use strict";
var L09_TowerDefenseStart;
(function (L09_TowerDefenseStart) {
    // import ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let graph = new ƒ.Node("Graph");
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");
        L09_TowerDefenseStart.viewport = new ƒ.Viewport();
        L09_TowerDefenseStart.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(L09_TowerDefenseStart.viewport);
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        graph.addChild(new ƒAid.NodeCoordinateSystem());
        graph.addChild(createTerrain());
        // addWaypoints(graph);
        // addTowers(graph);
        graph.addChild(new L09_TowerDefenseStart.Tower("Tower1", ƒ.Vector3.ZERO()));
        graph.addChild(new L09_TowerDefenseStart.Enemy("Enemy1", new ƒ.Vector3(0, 0, 2)));
        L09_TowerDefenseStart.viewport.draw();
        // viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, pointerMove);
        // viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    }
    function update(_event) {
        let tower = L09_TowerDefenseStart.viewport.getGraph().getChildrenByName("Tower1")[0];
        let enemy = L09_TowerDefenseStart.viewport.getGraph().getChildrenByName("Enemy1")[0];
        tower.follow(enemy);
        L09_TowerDefenseStart.viewport.draw();
    }
    function createTerrain() {
        let mtrPlane = new ƒ.Material("Plane", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("green")));
        let meshPlane = new ƒ.MeshQuad();
        let mtxPlane = ƒ.Matrix4x4.ROTATION_X(-90);
        mtxPlane.scale(ƒ.Vector3.ONE(10));
        let plane = new ƒAid.Node("Plane", mtxPlane, mtrPlane, meshPlane);
        return plane;
    }
    // function createPickerTestCubes(): ƒ.Node {
    //   let cubes: ƒ.Node = new ƒ.Node("Cubes");
    //   let mtrWhite: ƒ.Material = new ƒ.Material("White", ƒ.ShaderFlat, new ƒ.CoatColored());
    //   let meshCube: ƒ.MeshCube = new ƒ.MeshCube();
    //   for (let i: number = 0; i < 0; i++) {
    //     let range: number = 4;
    //     let pos: ƒ.Vector3 = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range));
    //     let cube: ƒAid.Node = new ƒAid.Node("Cube" + i, ƒ.Matrix4x4.TRANSLATION(pos), mtrWhite, meshCube);
    //     cube.mtxLocal.scale(ƒ.Vector3.ONE(1));
    //     cube.addComponent(new ComponentPicker());
    //     cubes.addChild(cube);
    //   }
    //   return cubes;
    // }
    // function pointerMove(_event: ƒ.EventPointer): void {
    //   let posMouse: ƒ.Vector2 = new ƒ.Vector2(_event.canvasX, _event.canvasY);
    //   let cubes: ƒ.Node[] = viewport.getGraph().getChild(1).getChildren();
    //   let picked: { z: number; picker: ComponentPicker, name: string }[] = [];
    //   for (let cube of cubes) {
    //     let cmpPicker: ComponentPicker = cube.getComponent(ComponentPicker);
    //     let pickData: PickData = cmpPicker.pick(posMouse);
    //     let cmpMaterial: ƒ.ComponentMaterial = cube.getComponent(ƒ.ComponentMaterial);
    //     cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
    //     if (pickData) {
    //       cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
    //       picked.push({ z: pickData.clip.z, picker: cmpPicker, name: cube.name });
    //     }
    //   }
    //   picked.sort((_a, _b) => _a.z > _b.z ? 1 : -1);
    //   console.clear();
    //   console.table(picked);
    //   viewport.draw();
    //   for (let pick of picked)
    //     pick.picker.drawPickRadius(viewport);
    // }
})(L09_TowerDefenseStart || (L09_TowerDefenseStart = {}));
//# sourceMappingURL=Main.js.map