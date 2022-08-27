namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let pacman: ƒ.Node;
  let grid: ƒ.Node;
  let direction: ƒ.Vector2 = ƒ.Vector2.ZERO();
  let speed: number = 0.05;
  let waka: ƒ.ComponentAudio;
  let ghost: ƒ.Node;
  let sprite: ƒAid.NodeSprite;

  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    console.log(viewport.camera);
    viewport.camera.mtxPivot.translateZ(10);
    viewport.camera.mtxPivot.rotateY(180);
    viewport.camera.mtxPivot.translateX(-2);
    viewport.camera.mtxPivot.translateY(2);


    let graph: ƒ.Node = viewport.getBranch();
    grid = graph.getChildrenByName("Grid")[0];

    pacman = graph.getChildrenByName("Pacman")[0];
    sprite = await createSprite();
    pacman.addChild(sprite);
    pacman.getComponent(ƒ.ComponentMaterial).activate(false);

    ghost = createGhost();
    graph.addChild(ghost);

    ƒ.AudioManager.default.listenTo(graph);
    waka = graph.getChildrenByName("Sound")[0].getComponents(ƒ.ComponentAudio)[1];

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    let posPacman: ƒ.Vector3 = pacman.mtxLocal.translation;
    let nearestGridPoint: ƒ.Vector2 = new ƒ.Vector2(Math.round(posPacman.x), Math.round(posPacman.y));
    let nearGridPoint: boolean = posPacman.toVector2().equals(nearestGridPoint, 2 * speed);

    if (nearGridPoint) {
      let directionOld: ƒ.Vector2 = direction.clone;
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
        direction.set(1, 0);
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]))
        direction.set(-1, 0);
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W]))
        direction.set(0, 1);
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN, ƒ.KEYBOARD_CODE.S]))
        direction.set(0, -1);


      if (blocked(ƒ.Vector2.SUM(nearestGridPoint, direction)))
        if (direction.equals(directionOld)) // did not turn
          direction.set(0, 0); // full stop
        else {
          if (blocked(ƒ.Vector2.SUM(nearestGridPoint, directionOld))) // wrong turn and dead end
            direction.set(0, 0); // full stop
          else
            direction = directionOld; // don't turn but continue ahead
        }

      if (!direction.equals(directionOld) || direction.magnitudeSquared == 0)
        pacman.mtxLocal.translation = nearestGridPoint.toVector3();

      if (direction.magnitudeSquared == 0) {
        waka.play(false);
        sprite.setFrameDirection(0);
      }
      else if (!waka.isPlaying) {
        waka.play(true);  
        sprite.setFrameDirection(3);
      }
    }

    pacman.mtxLocal.translate(ƒ.Vector2.SCALE(direction, speed).toVector3());

    if (direction.magnitudeSquared != 0) {
      sprite.mtxLocal.reset();
      sprite.mtxLocal.rotation = new ƒ.Vector3(0, direction.x < 0 ? 180 : 0, direction.y * 90);
    }

    viewport.draw();
    // ƒ.AudioManager.default.update();
  }

  function blocked(_posCheck: ƒ.Vector2): boolean {
    let check: ƒ.Node = grid.getChild(_posCheck.y)?.getChild(_posCheck.x)?.getChild(0);
    return (!check || check.name == "Wall");
  }

  function createGhost(): ƒ.Node {
    let node: ƒ.Node = new ƒ.Node("Ghost");

    let mesh: ƒ.MeshSphere = new ƒ.MeshSphere();
    let material: ƒ.Material = new ƒ.Material("MaterialGhost", ƒ.ShaderLit, new ƒ.CoatColored());

    let cmpTransfrom: ƒ.ComponentTransform = new ƒ.ComponentTransform();
    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);

    cmpMaterial.clrPrimary = ƒ.Color.CSS("red");

    node.addComponent(cmpMaterial);
    node.addComponent(cmpMesh);
    node.addComponent(cmpTransfrom);

    node.mtxLocal.translateX(2);
    cmpTransfrom.mtxLocal.translateY(1);

    return node;
  }

  async function createSprite(): Promise<ƒAid.NodeSprite> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("Image/texture.png");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);

    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Pacman", coat);
    animation.generateByGrid(ƒ.Rectangle.GET(0, 0, 64, 64), 8, 70, ƒ.ORIGIN2D.CENTER, ƒ.Vector2.X(64));

    let sprite: ƒAid.NodeSprite = new ƒAid.NodeSprite("Sprite");
    sprite.setAnimation(animation);
    sprite.setFrameDirection(1);
    sprite.framerate = 15;

    let cmpTransfrom: ƒ.ComponentTransform = new ƒ.ComponentTransform();
    sprite.addComponent(cmpTransfrom);
    sprite.getComponent(ƒ.ComponentMaterial).clrPrimary.a = 0.5;

    return sprite;
  }
}

