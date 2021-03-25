namespace L01_FirstFudge {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  let node: ƒ.Node = new ƒ.Node("Test");
  let viewport: ƒ.Viewport = new ƒ.Viewport();

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    node.addComponent(new ƒ.ComponentTransform());

    let mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");
    node.addComponent(new ƒ.ComponentMesh(mesh));

    let material: ƒ.Material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
    node.addComponent(cmpMaterial);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(3);
    cmpCamera.mtxPivot.rotateY(180);
    console.log(cmpCamera);

    viewport.initialize("Viewport", node, cmpCamera, canvas);
    viewport.draw();

    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    // console.log(_event);
    let rotSpeed: number = 90;
    let timeSinceLastFrameInSeconds: number = ƒ.Loop.timeFrameReal / 1000;
    node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * timeSinceLastFrameInSeconds);
    viewport.draw();
  }
}