namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  // let transform: ƒ.Matrix4x4;
  let agent: ƒ.Node;
  let laser: ƒ.Node;
  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);
  let copyLaser: ƒ.GraphInstance;

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    let graph: ƒ.Node = viewport.getBranch();
    laser = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser")[0];
    // transform = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
    agent = graph.getChildrenByName("Agents")[0].getChildren()[0];

    viewport.camera.mtxPivot.translateZ(-16);

    let graphLaser: ƒ.Graph = await ƒ.Project.registerAsGraph(laser, false);
    copyLaser = await ƒ.Project.createGraphInstance(graphLaser);
    console.log("Copy", copyLaser);

    graph.getChildrenByName("Lasers")[0].addChild(copyLaser);
    // copyLaser.addComponent(new ƒ.ComponentTransform);
    copyLaser.mtxLocal.translateX(5);

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
  }

  function checkCollision(): void {
    // let beam: ƒ.Node = laser.getChildren()[3];
    // let posLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beam.mtxWorldInverse, true);
    // console.log(posLocal.toString());
  }
}