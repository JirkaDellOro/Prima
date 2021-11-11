namespace LaserLeague {
  export import ƒ = FudgeCore;
  export import ƒui = FudgeUserInterface;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  // let transform: ƒ.Matrix4x4;
  let agent: Agent;
  // let laser: ƒ.Node;
  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);
  let laser: ƒ.GraphInstance;

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    let graph: ƒ.Node = viewport.getBranch();
    // laser = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser")[0];
    // transform = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
    // agent = graph.getChildrenByName("Agents")[0].getChildren()[0];
    agent = new Agent();
    graph.getChildrenByName("Agents")[0].addChild(agent);


    document.addEventListener("click", hndClick);
    graph.addEventListener("agentSentEvent", hndAgentEvent);

    viewport.camera.mtxPivot.translateZ(-16);

    let graphLaser: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-10-28T13:06:19.996Z|71944"];
    laser = await ƒ.Project.createGraphInstance(graphLaser);
    console.log("Copy", laser);

    graph.getChildrenByName("Lasers")[0].addChild(laser);
    // copyLaser.addComponent(new ƒ.ComponentTransform);
    laser.mtxLocal.translateX(5);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used

    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    // let speedLaserRotate: number = 360; // degres per second
    let speedAgentRotation: number = 360; // meters per second

    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
    //   ctrForward.setInput(1);
    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))

    let value: number = (
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
    );
    ctrForward.setInput(value * deltaTime);
    agent.mtxLocal.translateY(ctrForward.getOutput());

    // agent.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      agent.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      agent.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);

    // transform.rotateZ(speedLaserRotate * deltaTime);

    viewport.draw();

    checkCollision();


    ƒ.AudioManager.default.update();

    GameState.get().health -= 0.01;
  }

  function checkCollision(): void {
    // let beam: ƒ.Node = laser.getChildren()[3];
    // let posLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beam.mtxWorldInverse, true);
    // console.log(posLocal.toString());
  }

  function hndClick(_event: MouseEvent): void {
    console.log("Click");
    agent.dispatchEvent(new CustomEvent("agentSentEvent", { bubbles: true }));
  }
  function hndAgentEvent(_event: Event): void {
    console.log("Agent event received");
  }
}