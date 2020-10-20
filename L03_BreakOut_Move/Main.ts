namespace L03_BreakOut_Move {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let ball: ƒ.Node;
  let velocity: ƒ.Vector3 = new ƒ.Vector3(ƒ.Random.default.getRange(-1, 1), ƒ.Random.default.getRange(-1, 1), 0);
  let speed: number = 15;
  velocity.normalize(speed);

  export let viewport: ƒ.Viewport;
  let root: ƒ.Node;

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // ƒ.Debug.log(canvas);

    root = new ƒ.Node("Root");
    
    ball = new ƒ.Node("Ball");
    ball.addComponent(new ƒ.ComponentTransform());
    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
    let cmpQuad: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshQuad);
    ball.addComponent(cmpQuad);

    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    let cMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
    ball.addComponent(cMaterial);

    root.addChild(ball);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);


    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    // ƒ.Debug.log(viewport);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
  }

  function hndLoop(_event: Event): void {
    // console.log("Tick");
    let frameTime: number = ƒ.Time.game.getElapsedSincePreviousCall() / 1000;
    let move: ƒ.Vector3 = ƒ.Vector3.SCALE(velocity, frameTime);
    ball.mtxLocal.translate(move);
    viewport.draw();
  }
}