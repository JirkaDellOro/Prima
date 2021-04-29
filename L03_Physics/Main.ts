// /<reference types="./libs/FudgeCore.js"/>


namespace Turorials_FUDGEPhysics_Lesson1 {
  import ƒ = FudgeCore;


  window.addEventListener("load", init);
  const app: HTMLCanvasElement = document.querySelector("canvas");
  let viewPort: ƒ.Viewport;
  let root: ƒ.Node;

  let environment: ƒ.Node[] = new Array();
  let avatar: ƒ.Node;
  let ball: ƒ.Node;
  let cmpBall: ƒ.ComponentRigidbody;
  let cmpAvatar: ƒ.ComponentRigidbody;

  //Setting Variables
  let mtrAvatar: ƒ.Material = new ƒ.Material("Avatar", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.7, 0.8, 0.6, 1)));
  let mtrBall: ƒ.Material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.8, 0.8, 0.2, 1)));
  let mtrEnvironment: ƒ.Material = new ƒ.Material("Environment", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.2, 0.2, 0.2, 1)));
  let mtrGoal: ƒ.Material = new ƒ.Material("Goal", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.5, 0.5, 0.5, 1)));

  //Physical Player Variables
  let isGrounded: boolean;
  let cmpCamera: ƒ.ComponentCamera;
  // let movementspeed: number = 12;
  // let turningspeed: number = 200;
  // let playerWeight: number = 75;
  // let playerJumpForce: number = 500;
  // let kickStrength: number = 100;
  let yTurn: number = 0;
  let forwardMovement: number = 0;


  function init(_event: Event): void {
    root = new ƒ.Node("Root");
    settingUpEnvironment();
    settingUpAvatar();

    ball = createNodeWithComponents("Ball", mtrBall, new ƒ.MeshSphere(), ƒ.Vector3.ONE(), ƒ.Vector3.Y(5));
    cmpBall = new ƒ.ComponentRigidbody(0.1, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.GROUP_2);
    cmpBall.restitution = 2.5;
    ball.addComponent(cmpBall);
    root.appendChild(ball);

    settingUpTrigger();

    settingUpAJoint();

    //Standard Fudge Scene Initialization - Creating a directional light, a camera and initialize the viewport
    let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.CSS("WHITE")));
    cmpLight.mtxPivot.lookAt(new ƒ.Vector3(0.5, -1, -0.8)); //Set light direction
    root.addComponent(cmpLight);

    cmpCamera = new ƒ.ComponentCamera();
    cmpCamera.clrBackground = ƒ.Color.CSS("GREY");
    cmpCamera.mtxPivot.translate(new ƒ.Vector3(20, 10, 20));
    cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());

    viewPort = new ƒ.Viewport();
    viewPort.initialize("Viewport", root, cmpCamera, app);

    //Ball Resetting on enter trigger


    // Implementing kicking mechanic
    document.addEventListener("keypress", (_event: ƒ.EventKeyboard) => {
      if (_event.code == ƒ.KEYBOARD_CODE.E) {
        //
      }
    });

    ƒ.Physics.start(root);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(); //Stard the game loop
  }

  function update(): void {
    let speed: number = 15;
    let rotate: number = 5;
    let forward: ƒ.Vector3;
    forward = avatar.mtxWorld.getZ();

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
      cmpAvatar.setVelocity(ƒ.Vector3.SCALE(forward, speed));

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
      cmpAvatar.setVelocity(ƒ.Vector3.SCALE(forward, - speed));

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      cmpAvatar.rotateBody(ƒ.Vector3.Y(rotate));
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      cmpAvatar.rotateBody(ƒ.Vector3.Y(-rotate));


    ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);

    cmpCamera.mtxPivot.lookAt(ball.mtxLocal.translation);
    // playerIsGroundedRaycast();

    viewPort.draw();
    ƒ.Physics.settings.debugDraw = true;
  }

  function createNodeWithComponents(_name: string, _material: ƒ.Material, _mesh: ƒ.Mesh, _scale?: ƒ.Vector3, _translate?: ƒ.Vector3): ƒ.Node {
    let node: ƒ.Node = new ƒ.Node(_name);
    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(_mesh);
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(_material);

    let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
    if (_translate)
      cmpTransform.mtxLocal.translate(_translate);
    if (_scale)
      cmpTransform.mtxLocal.scale(_scale);

    node.addComponent(cmpMesh);
    node.addComponent(cmpMaterial);
    node.addComponent(cmpTransform);

    return node;
  }

  function settingUpAvatar(): void {
    avatar = createNodeWithComponents("Avatar", mtrAvatar, new ƒ.MeshCube(), new ƒ.Vector3(0.5, 1.8, 0.3), new ƒ.Vector3(2.5, 4, 3.5));
    cmpAvatar = new ƒ.ComponentRigidbody(0.1, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.GROUP_2);
    cmpAvatar.restitution = 0.5;
    cmpAvatar.rotationInfluenceFactor = ƒ.Vector3.ZERO();
    cmpAvatar.friction = 1;
    avatar.addComponent(cmpAvatar);
    root.appendChild(avatar);

    // Nose as direction indicator
    let playerNose: ƒ.Node = createNodeWithComponents("PlayerNose", mtrAvatar, new ƒ.MeshCube());
    playerNose.mtxLocal.translate(new ƒ.Vector3(0, 0.2, 0.4));
    playerNose.mtxLocal.scale(new ƒ.Vector3(0.1, 0.2, 1.5));

    avatar.addChild(playerNose);
  }

  function playerIsGroundedRaycast(): void {
    //
  }


  function settingUpEnvironment(): void {
    let environment: ƒ.Node = new ƒ.Node("Environment");
    let node: ƒ.Node;
    node = createNodeWithComponents("Ground", mtrEnvironment, new ƒ.MeshCube(), new ƒ.Vector3(20, 0.3, 20));
    node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.GROUP_2));
    // node.getComponent(ƒ.ComponentRigidbody).mtxPivot.scale(new ƒ.Vector3(20, 0.3, 20));
    environment.appendChild(node);

    //Protective Walls
    node = createNodeWithComponents("FrontWall", mtrEnvironment, new ƒ.MeshCube(), new ƒ.Vector3(20, 1, 1), new ƒ.Vector3(0, 0.5, 10.5));
    node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.GROUP_2));
    environment.appendChild(node);

    node = createNodeWithComponents("BackWall", mtrEnvironment, new ƒ.MeshCube(), new ƒ.Vector3(20, 1, 1), new ƒ.Vector3(0, 0.5, -10.5));
    node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.GROUP_2));
    environment.appendChild(node);

    node = createNodeWithComponents("LeftWall", mtrEnvironment, new ƒ.MeshCube(), new ƒ.Vector3(1, 1, 20), new ƒ.Vector3(10.5, 0.5, 0));
    node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.GROUP_2));
    environment.appendChild(node);

    node = createNodeWithComponents("RightWall", mtrEnvironment, new ƒ.MeshCube(), new ƒ.Vector3(1, 1, 20), new ƒ.Vector3(-10.5, 0.5, 0));
    node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.GROUP_2));
    environment.appendChild(node);

    //Goal
    node = createNodeWithComponents("Goal_Upper", mtrGoal, new ƒ.MeshCube(), new ƒ.Vector3(8, 1, 1), new ƒ.Vector3(0, 4.5, -9.5));
    node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.GROUP_2));
    environment.appendChild(node);

    node = createNodeWithComponents("Goal_Left", mtrGoal, new ƒ.MeshCube(), new ƒ.Vector3(1, 5, 1), new ƒ.Vector3(-4.5, 2.5, -9.5));
    node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.GROUP_2));
    environment.appendChild(node);

    node = createNodeWithComponents("Goal_Right", mtrGoal, new ƒ.MeshCube(), new ƒ.Vector3(1, 5, 1), new ƒ.Vector3(4.5, 2.5, -9.5));
    node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.GROUP_2));
    environment.appendChild(node);

    root.appendChild(environment);
  }

  function settingUpTrigger(): void {
    // Ball Resetting Triggers
    environment[8] = createNodeWithComponents("Ground_BelowZero", mtrGoal, new ƒ.MeshCube());
    environment[8].removeComponent(environment[8].getComponent(ƒ.ComponentMesh));
    environment[8].mtxLocal.scale(new ƒ.Vector3(100, 10, 100));
    environment[8].mtxLocal.translateY(-1);
    root.appendChild(environment[8]);

    environment[9] = createNodeWithComponents("Goal_Trigger", mtrGoal, new ƒ.MeshCube());
    environment[9].removeComponent(environment[9].getComponent(ƒ.ComponentMesh));
    environment[9].mtxLocal.scale(new ƒ.Vector3(9, 4.5, 1.5));
    environment[9].mtxLocal.translate(new ƒ.Vector3(0, 0.5, -6.25));
    root.appendChild(environment[9]);
  }

  function resetBall(_event: Event): void {
    //
  }

  function settingUpAJoint(): void {
    environment[10] = createNodeWithComponents("Holder", new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.4, 0.4, 0.4, 1))), new ƒ.MeshCube());
    root.appendChild(environment[10]);
    environment[10].mtxLocal.translate(new ƒ.Vector3(5, 6, -2));
    environment[10].mtxLocal.scale(new ƒ.Vector3(0.5, 1, 0.5));

    environment[11] = createNodeWithComponents("MovingDrill", new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(1, 1, 0, 1))), new ƒ.MeshCube());
    root.appendChild(environment[11]);
    environment[11].mtxLocal.translate(new ƒ.Vector3(5, 2.5, -2));
    environment[11].mtxLocal.scale(new ƒ.Vector3(3, 2, 0.2));
  }
}

