namespace LaserLeague {
  export import ƒ = FudgeCore;
  export import ƒui = FudgeUserInterface;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let agent: Agent;
  let lasers: ƒ.Node;

  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);
  window.addEventListener("load", init);
  // show dialog for startup


  function init(_event: Event): void {
    let dialog: HTMLDialogElement = document.querySelector("dialog");
    dialog.querySelector("h1").textContent = document.title;
    dialog.addEventListener("click", function (_event: Event): void {
      // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
      dialog.close();
      start(null);
    });
    //@ts-ignore
    dialog.showModal();
  }
  async function start(_event: Event): Promise<void> {
    await FudgeCore.Project.loadResourcesFromHTML();
    let graph: ƒ.Node = <ƒ.Graph>ƒ.Project.resources[document.head.querySelector("meta[autoView]").getAttribute("autoView")];

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.rotateY(180);
    cmpCamera.mtxPivot.translateZ(-9);

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);

    ƒ.AudioManager.default.listenTo(graph);
    ƒ.AudioManager.default.listenWith(graph.getComponent(ƒ.ComponentAudioListener));

    lasers = graph.getChildrenByName("Lasers")[0];

    agent = new Agent();
    graph.getChildrenByName("Agents")[0].addChild(agent);

    viewport.getCanvas().addEventListener("mousedown", hndClick);
    graph.addEventListener("agentEvent", hndAgentEvent);

    viewport.camera.mtxPivot.translateZ(-16);

    let graphLaser: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-10-28T13:06:19.996Z|71944"];

    for (let i: number = -1; i < 2; i++) {
      let laser: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(graphLaser);
      laser.addEventListener("graphEvent", hndGraphEvent, true);
      lasers.addChild(laser);
      laser.mtxLocal.translateX(7 * i);
    }

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used

    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    let speedAgentRotation: number = 360; // meters per second

    let value: number = (
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
    );
    ctrForward.setInput(value * deltaTime);
    agent.mtxLocal.translateY(ctrForward.getOutput());

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      agent.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      agent.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);

    viewport.draw();

    agent.getComponent(ƒ.ComponentMaterial).clrPrimary.a = 1;
    for (let laser of lasers.getChildren()) {
      if (laser.getComponent(ScriptLaser).checkCollision(agent.mtxWorld.translation, 0.25)) {
        agent.getComponent(ƒ.ComponentMaterial).clrPrimary.a = 0.5;
        break;
      }
    }

    ƒ.AudioManager.default.update();

    GameState.get().health -= 0.01;
  }

  function hndClick(_event: MouseEvent): void {
    console.log("mousedown event");
    agent.dispatchEvent(new CustomEvent("agentEvent", { bubbles: true }));
  }
  function hndAgentEvent(_event: Event): void {
    console.log("Agent event received by", _event.currentTarget);
    (<ƒ.Node>_event.currentTarget).broadcastEvent(new CustomEvent("graphEvent"));
  }
  function hndGraphEvent(_event: Event): void {
    console.log("Graph event received", _event.currentTarget);
  }
}