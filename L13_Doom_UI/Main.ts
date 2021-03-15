namespace L13_Doom_UI {
  import ƒ = FudgeCore;
  import ƒaid = FudgeAid;

  window.addEventListener("load", hndLoad);

  const clrWhite: ƒ.Color = ƒ.Color.CSS("white");
  export const sizeWall: number = 3;
  export const numWalls: number = 20;

  export let viewport: ƒ.Viewport;
  export let avatar: ƒ.Node = new ƒ.Node("Avatar");
  let root: ƒ.Node = new ƒ.Node("Root");
  let walls: ƒ.Node;
  let enemies: ƒ.Node;

  let ctrSpeed: ƒ.Control = new ƒ.Control("AvatarSpeed", 0.3, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrSpeed.setDelay(100);
  let ctrStrafe: ƒ.Control = new ƒ.Control("AvatarSpeed", 0.1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrSpeed.setDelay(100);
  let ctrRotation: ƒ.Control = new ƒ.Control("AvatarRotation", -0.1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrRotation.setDelay(100);

  async function hndLoad(_event: Event): Promise<void> {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");

    let txtFloor: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/DEM1_5.png");
    let mtrFloor: ƒ.Material = new ƒ.Material("Floor", ƒ.ShaderTexture, new ƒ.CoatTextured(clrWhite, txtFloor));
    let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(ƒ.Vector3.ONE(sizeWall * numWalls));
    floor.getComponent(ƒ.ComponentMaterial).mtxPivot.scale(ƒ.Vector2.ONE(numWalls));

    root.appendChild(floor);

    walls = createWalls();
    root.appendChild(walls);

    enemies = await createEnemies();
    root.appendChild(enemies);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.projectCentral(1, 45, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
    cmpCamera.mtxPivot.translate(ƒ.Vector3.Y(1.7));
    cmpCamera.clrBackground = ƒ.Color.CSS("darkblue");

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
    canvas.addEventListener("click", shoot);

    Hud.start();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 120);
  }

  function shoot(): void {
    gameState.ammo--;
  }

  function hndLoop(_event: Event): void {
    ctrSpeed.setInput(
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
    );
    ctrStrafe.setInput(
      ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
      + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
    );

    moveAvatar(ctrSpeed.getOutput(), ctrRotation.getOutput(), ctrStrafe.getOutput());
    ctrRotation.setInput(0);

    for (let enemy of enemies.getChildren() as Enemy[])
      enemy.update();

    viewport.draw();
  }

  function hndMouse(_event: MouseEvent): void {
    // console.log(_event.movementX, _event.movementY);
    ctrRotation.setInput(_event.movementX);
  }

  function moveAvatar(_speed: number, _rotation: number, _strafe: number): void {
    avatar.mtxLocal.rotateY(_rotation);
    let posOld: ƒ.Vector3 = avatar.mtxLocal.translation;
    avatar.mtxLocal.translateZ(_speed);
    avatar.mtxLocal.translateX(_strafe);

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

  async function createEnemies(): Promise<ƒ.Node> {
    let enemies: ƒ.Node = new ƒ.Node("Enemies");

    let txtCacodemon: ƒ.TextureImage = new ƒ.TextureImage();
    await txtCacodemon.load("../DoomAssets/Cacodemon.png");
    let coatSprite: ƒ.CoatTextured = new ƒ.CoatTextured(clrWhite, txtCacodemon);
    Enemy.generateSprites(coatSprite);
    for (let i: number = 0; i < 1; i++)
      enemies.appendChild(new Enemy("Cacodemon" + i, ƒ.Vector3.Z(3)));
    // enemies.appendChild(new Enemy("Cacodemon1", ƒ.Vector3.X(3)));
    // enemies.appendChild(new Enemy("Cacodemon2", ƒ.Vector3.X(-3)));

    console.log("Enemies", enemies);
    return enemies;
  }

  function createWalls(): ƒ.Node {
    let walls: ƒ.Node = new ƒ.Node("Walls");

    let txtWall: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/CEMPOIS.png");
    let mtrWall: ƒ.Material = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(clrWhite, txtWall));

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