namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let cart: ƒ.Node;
  let body: ƒ.ComponentRigidbody;
  let mtxTerrain: ƒ.Matrix4x4;
  let meshTerrain: ƒ.MeshTerrain;

  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);
  let ctrTurn: ƒ.Control = new ƒ.Control("Turn", 100, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(50);

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.calculateTransforms();

    let cmpMeshTerrain: ƒ.ComponentMesh = viewport.getBranch().getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
    meshTerrain = <ƒ.MeshTerrain>cmpMeshTerrain.mesh;
    mtxTerrain = cmpMeshTerrain.mtxWorld;
    cart = viewport.getBranch().getChildrenByName("Cart")[0];
    body = cart.getComponent(ƒ.ComponentRigidbody);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    let maxHeight: number = 0.3;
    let minHeight: number = 0.2;
    let forceNodes: ƒ.Node[] = cart.getChildren();
    let force: ƒ.Vector3 = ƒ.Vector3.SCALE(ƒ.Physics.world.getGravity(), -body.mass / forceNodes.length);

    for (let forceNode of forceNodes) {
      let posForce: ƒ.Vector3 = forceNode.getComponent(ƒ.ComponentMesh).mtxWorld.translation;
      let terrainInfo: ƒ.TerrainInfo = meshTerrain.getTerrainInfo(posForce, mtxTerrain);
      let height: number = posForce.y - terrainInfo.position.y;
      console.log(height);
      body.applyForceAtPoint(force, posForce);
    }

    ƒ.Physics.world.simulate();  // if physics is included and used
    // let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;

    let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
    ctrTurn.setInput(turn);
    // cart.mtxLocal.rotateY(ctrTurn.getOutput() * deltaTime);

    let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
    ctrForward.setInput(forward);
    // cart.mtxLocal.translateZ(ctrForward.getOutput() * deltaTime);

    // let terrainInfo: ƒ.TerrainInfo = meshTerrain.getTerrainInfo(cart.mtxLocal.translation, mtxTerrain);
    // cart.mtxLocal.translation = terrainInfo.position;
    // cart.mtxLocal.showTo(ƒ.Vector3.SUM(terrainInfo.position, cart.mtxLocal.getZ()), terrainInfo.normal);

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}