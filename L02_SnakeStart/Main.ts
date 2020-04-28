namespace L02_SnakeStart {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  export let viewport: ƒ.Viewport;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.Debug.log(canvas);

    let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));

    let snake: ƒ.Node = new ƒ.Node("Snake");

    for (let i: number = 0; i < 4; i++) {
      let node: ƒ.Node = new ƒ.Node("Quad");

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      node.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
      node.addComponent(cmpMaterial);

      node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));

      snake.appendChild(node);
    }

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(10);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", snake, cmpCamera, canvas);
    ƒ.Debug.log(viewport);

    viewport.draw();
  }
}