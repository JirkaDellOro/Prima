namespace L01_FirstFudge {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);

  function init(_event: Event): void {
    let node: ƒ.Node = new ƒ.Node("Test");
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");
    node.addComponent(new ƒ.ComponentMesh(mesh));
    
    let material: ƒ.Material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
    node.addComponent(cmpMaterial);
    
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(3);
    cmpCamera.mtxPivot.rotateY(180);
    console.log(cmpCamera);

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", node, cmpCamera, canvas);
    viewport.draw();
  }
}