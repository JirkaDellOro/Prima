namespace L02_DavidsRotation {
  import ƒ = FudgeCore;

  window.addEventListener("load", sceneLoad);
  // window.addEventListener("click", sceneLoad);

  export let viewport: ƒ.Viewport;

  let pos: number = 0;

  function sceneLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.Debug.log(canvas);

    let node: ƒ.Node = new ƒ.Node("Quad");


    let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
    let cMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
    node.addComponent(cMesh);

    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    let cMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
    node.addComponent(cMaterial);

    let node2: ƒ.Node = new ƒ.Node("Torus");

    let mesh2: ƒ.MeshTorus = new ƒ.MeshTorus("Torus", 1, 10, 1);
    let cMesh2: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh2);
    cMesh2.pivot.translateX(0);
    cMesh2.pivot.rotateZ(90);
    cMesh2.pivot.rotateX(90);
    node2.addComponent(cMesh2);

    let orange: ƒ.Material = new ƒ.Material("Orange", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("ORANGE")));
    let corange: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(orange);
    node2.addComponent(corange);



    node.appendChild(node2);

    let node3: ƒ.Node = new ƒ.Node("Cube");
    let mesh3: ƒ.MeshCube = new ƒ.MeshCube();
    let cMesh3: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh3);
    let red: ƒ.Material = new ƒ.Material("Red", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));
    let cred: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(red);

    cMesh3.pivot.scaleX(0.5);
    cMesh3.pivot.scaleY(0.5);
    cMesh3.pivot.rotateZ(pos * -45);

    node2.addComponent(corange);
    node3.addComponent(cMesh3);
    node3.addComponent(cred);
    node.appendChild(node3);


    let cCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cCamera.pivot.translateZ(4);
    cCamera.pivot.rotateY(180);
    cCamera.pivot.rotateZ(pos * 30);


    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", node, cCamera, canvas);
    ƒ.Debug.log(viewport);

    viewport.draw();

    pos += 1;
  }
}