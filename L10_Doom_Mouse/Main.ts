namespace L10_Doom_Mouse {
  import ƒ = FudgeCore;
  import ƒaid = FudgeAid;

  window.addEventListener("load", hndLoad);

  const sizeWall: number = 3;
  const numWalls: number = 20;

  export let viewport: ƒ.Viewport;
  let root: ƒ.Node = new ƒ.Node("Root");
  let avatar: ƒ.Node = new ƒ.Node("Avatar");
  let walls: ƒ.Node;

  let ctrSpeed: ƒ.Control = new ƒ.Control("AvatarSpeed", 0.5, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrSpeed.setDelay(100);
  let ctrRotation: ƒ.Control = new ƒ.Control("AvatarRotation", -0.1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrRotation.setDelay(50);

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");

    let txtFloor: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/DEM1_5.png");
    let mtrFloor: ƒ.Material = new ƒ.Material("Floor", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtFloor));
    let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(ƒ.Vector3.ONE(sizeWall * numWalls));
    floor.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(numWalls));

    root.appendChild(floor);

    walls = createWalls();
    root.appendChild(walls);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.projectCentral(1, 45, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
    cmpCamera.pivot.translate(ƒ.Vector3.Y(1.7));
    cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");

    avatar.addComponent(cmpCamera);
    avatar.addComponent(new ƒ.ComponentTransform());
    avatar.mtxLocal.translate(ƒ.Vector3.Z(10));
    avatar.mtxLocal.rotate(ƒ.Vector3.Y(180));
    root.appendChild(avatar);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();

    canvas.addEventListener("mousemove", hndMouse);
    canvas.addEventListener("click", canvas.requestPointerLock);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 120);
  }

  function hndLoop(_event: Event): void {
    ctrSpeed.setInput(
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
    );
    // ctrRotation.setInput(
    //   ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
    //   + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
    // );

    moveAvatar(ctrSpeed.getOutput(), ctrRotation.getOutput());

    viewport.draw();
  }

  function hndMouse(_event: MouseEvent): void {
    // console.log(_event.movementX, _event.movementY);
    ctrRotation.setInput(_event.movementX);
  }

  function moveAvatar(_translation: number, _rotation: number): void {
    avatar.mtxLocal.rotateY(_rotation);
    let posOld: ƒ.Vector3 = avatar.mtxLocal.translation;
    avatar.mtxLocal.translateZ(_translation);

    let bouncedOff: Wall[] = bounceOffWalls(<Wall[]>walls.getChildren());
    if (bouncedOff.length < 2)
      return;

    bouncedOff = bounceOffWalls(bouncedOff);
    if (bouncedOff.length == 0)
      return;

    console.log("Stuck!");
    avatar.mtxLocal.translation = posOld;
  }

  function bounceOffWalls(_walls: Wall[]): Wall[] {
    let bouncedOff: Wall[] = [];
    let posAvatar: ƒ.Vector3 = avatar.mtxLocal.translation;

    for (let wall of _walls) {
      let posBounce: ƒ.Vector3 = wall.calculateBounce(posAvatar, 1);
      if (posBounce) {
        avatar.mtxLocal.translation = posBounce;
        bouncedOff.push(wall);
      }
    }
    return bouncedOff;
  }

  function createWalls(): ƒ.Node {
    let walls: ƒ.Node = new ƒ.Node("Walls");

    let txtWall: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/CEMPOIS.png");
    let mtrWall: ƒ.Material = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtWall));

    walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.Y(sizeWall / 2), ƒ.Vector3.ZERO(), mtrWall));
    walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(0.5, 1, -0.866), sizeWall / 2), ƒ.Vector3.Y(120), mtrWall));
    walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(-0.5, 1, -0.866), sizeWall / 2), ƒ.Vector3.Y(-120), mtrWall));

    for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
      walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(-numWalls / 2, 0.5, i), sizeWall), ƒ.Vector3.Y(90), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(numWalls / 2, 0.5, i), sizeWall), ƒ.Vector3.Y(-90), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(i, 0.5, -numWalls / 2), sizeWall), ƒ.Vector3.Y(0), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(i, 0.5, numWalls / 2), sizeWall), ƒ.Vector3.Y(180), mtrWall));
    }

    return walls;
  }
}