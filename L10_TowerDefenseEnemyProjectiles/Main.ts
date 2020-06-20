namespace L10_TowerDefenseEnemyProjectiles {
  // import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  window.addEventListener("load", hndLoad);

  export let viewport: ƒ.Viewport;
  export let path: Path;
  export let sizeTerrain: number = 10;


  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    let graph: ƒ.Node = new ƒ.Node("Graph");

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);
    ƒ.Debug.log(viewport);

    ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
    graph.addChild(new ƒAid.NodeCoordinateSystem());

    graph.addChild(createTerrain());
    path = createPath();
    // addTowers(graph);
    graph.addChild(new Tower("Tower1", ƒ.Vector3.Z(-1)));
    graph.addChild(new Enemy("Enemy1", path[0]));

    viewport.draw();

    // viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, pointerMove);
    // viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);

    document.body.addEventListener("click", shoot);
  }

  function shoot(_event: MouseEvent): void {
    let tower: Tower = <Tower>viewport.getGraph().getChildrenByName("Tower1")[0];
    let enemy: Enemy = <Enemy>viewport.getGraph().getChildrenByName("Enemy1")[0];

    let projectile: Projectile = new Projectile(tower.top.mtxWorld.translation, enemy);
    viewport.getGraph().addChild(projectile);
    console.log("Projectile started", projectile);
  }

  function update(_event: ƒ.Eventƒ): void {
    let tower: Tower = <Tower>viewport.getGraph().getChildrenByName("Tower1")[0];
    let enemy: Enemy = <Enemy>viewport.getGraph().getChildrenByName("Enemy1")[0];
    tower.follow(enemy);
    viewport.draw();
    path.render(viewport);
  }

  function createTerrain(): ƒ.Node {
    let mtrPlane: ƒ.Material = new ƒ.Material("Plane", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("green")));
    let meshPlane: ƒ.MeshQuad = new ƒ.MeshQuad();
    let mtxPlane: ƒ.Matrix4x4 = ƒ.Matrix4x4.ROTATION_X(-90);
    mtxPlane.scale(ƒ.Vector3.ONE(sizeTerrain));
    let plane: ƒAid.Node = new ƒAid.Node("Plane", mtxPlane, mtrPlane, meshPlane);
    return plane;
  }

  function createPath(): Path {
    let path: Path = new Path();
    for (let i: number = 0; i <= sizeTerrain; i++) {
      path.push(new ƒ.Vector3(i - sizeTerrain / 2, 0, ƒ.Random.default.getRange(-sizeTerrain, sizeTerrain) / 4));
    }
    return path;
  }

  /*
  function createPickerTestCubes(): ƒ.Node {
    let cubes: ƒ.Node = new ƒ.Node("Cubes");

    let mtrWhite: ƒ.Material = new ƒ.Material("White", ƒ.ShaderFlat, new ƒ.CoatColored());
    let meshCube: ƒ.MeshCube = new ƒ.MeshCube();

    for (let i: number = 0; i < 0; i++) {
      let range: number = 4;
      let pos: ƒ.Vector3 = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range));
      let cube: ƒAid.Node = new ƒAid.Node("Cube" + i, ƒ.Matrix4x4.TRANSLATION(pos), mtrWhite, meshCube);
      cube.mtxLocal.scale(ƒ.Vector3.ONE(1));
      cube.addComponent(new ComponentPicker());
      cubes.addChild(cube);
    }
    return cubes;
  }
  function pointerMove(_event: ƒ.EventPointer): void {
    let posMouse: ƒ.Vector2 = new ƒ.Vector2(_event.canvasX, _event.canvasY);
    let cubes: ƒ.Node[] = viewport.getGraph().getChild(1).getChildren();
    let picked: { z: number; picker: ComponentPicker, name: string }[] = [];
    for (let cube of cubes) {
      let cmpPicker: ComponentPicker = cube.getComponent(ComponentPicker);
      let pickData: PickData = cmpPicker.pick(posMouse);
      let cmpMaterial: ƒ.ComponentMaterial = cube.getComponent(ƒ.ComponentMaterial);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      if (pickData) {
        cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
        picked.push({ z: pickData.clip.z, picker: cmpPicker, name: cube.name });
      }
    }
    picked.sort((_a, _b) => _a.z > _b.z ? 1 : -1);
    console.clear();
    console.table(picked);
    viewport.draw();

    for (let pick of picked)
      pick.picker.drawPickRadius(viewport);
  }
  */
}