namespace L09_TowerDefenseStart {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  window.addEventListener("load", hndLoad);

  export let viewport: ƒ.Viewport;


  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    let graph: ƒ.Node = new ƒ.Node("Graph");

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translate(new ƒ.Vector3(10, 10, 10));
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("white");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);
    ƒ.Debug.log(viewport);

    ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
    graph.addChild(new ƒAid.NodeCoordinateSystem());
    graph.addChild(new ƒ.Node("Cubes"));

    let mtrWhite: ƒ.Material = new ƒ.Material("White", ƒ.ShaderFlat, new ƒ.CoatColored());
    let meshCube: ƒ.MeshCube = new ƒ.MeshCube();

    for (let i: number = 0; i < 10; i++) {
      let range: number = 4;
      let pos: ƒ.Vector3 = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range));
      let cube: NodePickable = new NodePickable("Cube" + i, ƒ.Matrix4x4.TRANSLATION(pos), mtrWhite, meshCube);
      cube.mtxLocal.scale(ƒ.Vector3.ONE(1));
      graph.getChild(1).addChild(cube);
    }

    viewport.draw();

    for (let cube of <NodePickable[]>graph.getChild(1).getChildren())
      cube.drawPickRadius();

    // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
  }
}