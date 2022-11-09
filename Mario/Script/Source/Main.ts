namespace Mario {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  // Initialize Viewport
  let viewport: ƒ.Viewport;
  export let graph: ƒ.Node;
  export let gravity: number = 5;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    hndLoad(_event);
  }

  let animWalk: ƒAid.SpriteSheetAnimation;
  let animSprint: ƒAid.SpriteSheetAnimation;
  let animJump: ƒAid.SpriteSheetAnimation;
  let animLook: ƒAid.SpriteSheetAnimation;
  let animDeath: ƒAid.SpriteSheetAnimation;

  function initializeAnimations(coat: ƒ.CoatTextured): void {
    animWalk = new ƒAid.SpriteSheetAnimation("Walk", coat);
    animWalk.generateByGrid(ƒ.Rectangle.GET(0, 0, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

    animSprint = new ƒAid.SpriteSheetAnimation("Sprint", coat);
    animSprint.generateByGrid(ƒ.Rectangle.GET(0, 24, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

    animJump = new ƒAid.SpriteSheetAnimation("Jump", coat);
    animJump.generateByGrid(ƒ.Rectangle.GET(0, 48, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

    animLook = new ƒAid.SpriteSheetAnimation("Look", coat);
    animLook.generateByGrid(ƒ.Rectangle.GET(32, 0, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

    animDeath = new ƒAid.SpriteSheetAnimation("Death", coat);
    animDeath.generateByGrid(ƒ.Rectangle.GET(32, 24, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
  }

  // Load Sprite
  let avatarInstance: Avatar;
  async function hndLoad(_event: Event): Promise<void> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("./Images/Mario_Spritesheet.png");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);

    initializeAnimations(coat);

    graph = viewport.getBranch();

    avatarInstance = new Avatar();
    avatarInstance.initializeAnimations(imgSpriteSheet);
    graph.addChild(avatarInstance);

    let cmpAudio: ƒ.ComponentAudio = graph.getComponent(ƒ.ComponentAudio);
    cmpAudio.volume = 0.1;
    console.log(cmpAudio);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();
  }

  function update(_event: Event): void {
    let deltaTime: number = ƒ.Loop.timeFrameGame / 1000;
    let run: boolean = ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT, ƒ.KEYBOARD_CODE.SHIFT_RIGHT]);

    // Check for key presses
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
      avatarInstance.mtxLocal.rotation = ƒ.Vector3.Y(180);
      avatarInstance.act(run ? ACTION.SPRINT : ACTION.WALK);
    }
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      avatarInstance.mtxLocal.rotation = ƒ.Vector3.Y(0);
      avatarInstance.act(run ? ACTION.SPRINT : ACTION.WALK);
    }
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
      avatarInstance.act(ACTION.LOOK);
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
      avatarInstance.act(ACTION.CROUCH);
    else
      avatarInstance.act(ACTION.IDLE);

    avatarInstance.update(deltaTime);
    checkCollision();


    viewport.draw();
    //ƒ.AudioManager.default.update();
  }

  function checkCollision(): void {
    let blocks: ƒ.Node = graph.getChildrenByName("Blocks")[0];
    let pos: ƒ.Vector3 = avatarInstance.mtxLocal.translation;
    for (let block of blocks.getChildren()) {
      let posBlock: ƒ.Vector3 = block.mtxLocal.translation;
      if (Math.abs(pos.x - posBlock.x) < 0.5) {
        if (pos.y < posBlock.y + 0.5) {
          pos.y = posBlock.y + 0.5;
          avatarInstance.mtxLocal.translation = pos;
          avatarInstance.ySpeed = 0;
        }
      }
    }
  }
}