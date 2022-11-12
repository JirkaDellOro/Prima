namespace Mario {
  import ƒ = FudgeCore;

  // Initialize Viewport
  let viewport: ƒ.Viewport;
  export let graph: ƒ.Node;
  export let gravity: number = 5;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    hndLoad(_event);
  }


  // Load Sprite
  let avatar: Avatar;
  async function hndLoad(_event: Event): Promise<void> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("./Images/Mario_Spritesheet.png");

    graph = viewport.getBranch();
    avatar = new Avatar();
    avatar.initializeAnimations(imgSpriteSheet);
    graph.addChild(avatar);

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
      avatar.mtxLocal.rotation = ƒ.Vector3.Y(180);
      avatar.act(run ? ACTION.SPRINT : ACTION.WALK);
    }
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      avatar.mtxLocal.rotation = ƒ.Vector3.Y(0);
      avatar.act(run ? ACTION.SPRINT : ACTION.WALK);
    }
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
      avatar.act(ACTION.LOOK);
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
      avatar.act(ACTION.CROUCH);
    else
      avatar.act(ACTION.IDLE);

    avatar.update(deltaTime);
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
          avatar.ySpeed = 0;
        }
      }
    }
  }
}