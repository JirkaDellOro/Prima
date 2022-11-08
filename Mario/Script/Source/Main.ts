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
  let avatar: ƒAid.NodeSprite;
  let avatarInstance: Avatar;
  async function hndLoad(_event: Event): Promise<void> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("./Images/Mario_Spritesheet.png");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);

    initializeAnimations(coat);

    avatar = new ƒAid.NodeSprite("Avatar");
    avatar.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    avatar.setAnimation(animWalk);
    avatar.framerate = 20;

    graph = viewport.getBranch();
    // let mario: ƒ.Node = branch.getChildrenByName("Mario")[0];
    graph.addChild(avatar);

    avatarInstance = new Avatar();
    avatarInstance.initializeAnimations(imgSpriteSheet);
    console.log(avatarInstance);
    graph.addChild(avatarInstance);

    let cmpAudio: ƒ.ComponentAudio = graph.getComponent(ƒ.ComponentAudio);
    cmpAudio.volume = 0.1;
    console.log(cmpAudio);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();
  }

  const xSpeedDefault: number = .9;
  const xSpeedSprint: number = 2;
  let ySpeed: number = 1;

  let leftDirection: boolean = false;
  let prevSprint: boolean = false;

  function update(_event: Event): void {
    let deltaTime: number = ƒ.Loop.timeFrameGame / 1000;

    avatarInstance.update(deltaTime);
    ySpeed -= gravity * deltaTime;
    let yOffset: number = ySpeed * deltaTime;
    avatar.mtxLocal.translateY(yOffset);

    // let pos: ƒ.Vector3 = avatar.mtxLocal.translation;
    // if (pos.y + yOffset > 0)
    //   avatar.mtxLocal.translateY(yOffset);
    // else {
    //   ySpeed = 0;
    //   pos.y = 0;
    //   avatar.mtxLocal.translation = pos;
    // }

    let speed: number = xSpeedDefault;
    if (leftDirection) {
      speed = -xSpeedDefault;
    }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT, ƒ.KEYBOARD_CODE.SHIFT_RIGHT])) {
      speed = xSpeedSprint;
      if (leftDirection) {
        speed = -xSpeedSprint;
      }
    }

    // Calculate (walk) speed
    const xTranslation: number = speed * deltaTime;

    // Check for key presses
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
      leftDirection = true;
      avatarInstance.walk(deltaTime, leftDirection);
      avatar.mtxLocal.translateX(-xTranslation);
      if (speed < -1) {
        if (!prevSprint) {
          prevSprint = true;
          avatar.setAnimation(animSprint);
        }
      } else {
        prevSprint = false;
      }
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      avatar.mtxLocal.translateX(xTranslation);
      leftDirection = false;
      if (speed > 1) {
        if (!prevSprint) {
          prevSprint = true;
          avatar.setAnimation(animSprint);
        }
      } else {
        prevSprint = false;
      }
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
      avatar.setAnimation(animLook);
      avatar.showFrame(1);
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
      avatar.setAnimation(animLook);
      avatar.showFrame(0);
    } else {
      avatar.showFrame(0);
      avatar.setAnimation(animWalk);
    }

    // Rotate based on direction
    avatar.mtxLocal.rotation = ƒ.Vector3.Y(leftDirection ? 180 : 0);

    checkCollision();


    viewport.draw();
    //ƒ.AudioManager.default.update();
  }

  function checkCollision(): void {
    let blocks: ƒ.Node = graph.getChildrenByName("Blocks")[0];
    let pos: ƒ.Vector3 = avatar.mtxLocal.translation;
    for (let block of blocks.getChildren()) {
      let posBlock: ƒ.Vector3 = block.mtxLocal.translation;
      if (Math.abs(pos.x - posBlock.x) < 0.5) {
        if (pos.y < posBlock.y + 0.5) {
          pos.y = posBlock.y + 0.5;
          avatar.mtxLocal.translation = pos;
          ySpeed = 0;
        }
      }
    }
  }
}