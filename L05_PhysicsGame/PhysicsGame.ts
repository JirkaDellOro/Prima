namespace L05_PhysicsGame {
  import ƒ = FudgeCore;
  // import ƒAid = FudgeAid;
  let root: ƒ.Graph;
  let cmpAvatar: ƒ.ComponentRigidbody;
  let viewport: ƒ.Viewport;

  window.addEventListener("load", start);

  async function start(_event: Event): Promise<void> {
    ƒ.Physics.settings.debugDraw = true;

    await FudgeCore.Project.loadResourcesFromHTML();
    // await FudgeCore.Project.loadResources("PhysicsGame.json");
    FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
    // pick the graph to show
    root = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-04-27T14:37:42.239Z|64317"];

    createAvatar();

    createRigidbodies();

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translate(ƒ.Vector3.ONE(20));
    cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);


    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();
  }

  function createAvatar(): void {
    cmpAvatar = new ƒ.ComponentRigidbody(0.1, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
    cmpAvatar.restitution = 0.5;
    cmpAvatar.rotationInfluenceFactor = ƒ.Vector3.ZERO();
    cmpAvatar.friction = 1;
    let avatar: ƒ.Node = new ƒ.Node("Avatar");
    avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(3))));
    avatar.addComponent(cmpAvatar);
    root.appendChild(avatar);
  }

  function update(): void {
    ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);

    // cmpCamera.mtxPivot.lookAt(ball.mtxLocal.translation);
    // playerIsGroundedRaycast();

    viewport.draw();
    ƒ.Physics.settings.debugDraw = true;
  }

  function createRigidbodies(): void {
    let level: ƒ.Node = root.getChildrenByName("level")[0];
    for (let node of level.getChildren()) {
      let cmpRigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
      node.addComponent(cmpRigidbody);
      console.log(node.name, node.cmpTransform?.mtxLocal.toString());
    }

    ƒ.Physics.adjustTransforms(root, true);


    for (let node of level.getChildren()) {
      console.log(node.name, node.cmpTransform?.mtxLocal.toString());
    }
  }
}