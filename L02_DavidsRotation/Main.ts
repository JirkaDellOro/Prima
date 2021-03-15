namespace L02_DavidsRotation {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);

  export let viewport: ƒ.Viewport;
  let root: ƒ.Node;

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // ƒ.Debug.log(canvas);

    root = new ƒ.Node("Root");
    root.addComponent(new ƒ.ComponentTransform());

    let quad: ƒ.Node = new ƒ.Node("Quad");
    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
    let cmpQuad: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshQuad);
    quad.addComponent(cmpQuad);

    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    let cMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
    quad.addComponent(cMaterial);

    root.addChild(quad);


    let torus: ƒ.Node = new ƒ.Node("Torus");

    let meshTorus: ƒ.MeshTorus = new ƒ.MeshTorus("Torus", 1, 10, 1);
    let cmpTorus: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshTorus);
    cmpTorus.mtxPivot.translateX(0);
    cmpTorus.mtxPivot.rotateZ(90);
    cmpTorus.mtxPivot.rotateX(90);
    torus.addComponent(cmpTorus);

    let orange: ƒ.Material = new ƒ.Material("Orange", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("ORANGE")));
    let corange: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(orange);
    torus.addComponent(corange);


    root.appendChild(torus);

    let cube: ƒ.Node = new ƒ.Node("Cube");
    let meshCube: ƒ.MeshCube = new ƒ.MeshCube();
    let cmpCube: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshCube);
    let red: ƒ.Material = new ƒ.Material("Red", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));
    let cred: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(red);

    cmpCube.mtxPivot.scaleX(0.5);
    cmpCube.mtxPivot.scaleY(0.5);

    torus.addComponent(corange);
    cube.addComponent(cmpCube);
    cube.addComponent(cred);
    root.appendChild(cube);


    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(4);
    cmpCamera.mtxPivot.rotateY(180);


    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    // ƒ.Debug.log(viewport);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
  }

  function hndLoop(_event: Event): void {
    console.log("Tick");
    root.mtxLocal.rotateZ(10);
    viewport.draw();
  }
}