"use strict";
// /<reference types="./libs/FudgeCore.js"/>
var f = FudgeCore;
var Turorials_FUDGEPhysics_Lesson1;
(function (Turorials_FUDGEPhysics_Lesson1) {
    window.addEventListener("load", init);
    const app = document.querySelector("canvas");
    let viewPort;
    let hierarchy;
    let environment = new Array();
    let player;
    //let playerBody: f.ComponentRigidbody;
    let ball;
    //let ballBody: f.ComponentRigidbody;
    //Setting Variables
    let materialPlayer = new f.Material("Player", f.ShaderFlat, new f.CoatColored(new f.Color(0.7, 0.8, 0.6, 1)));
    let materialBall = new f.Material("Ball", f.ShaderFlat, new f.CoatColored(new f.Color(0.8, 0.8, 0.2, 1)));
    let materialEnvironment = new f.Material("Environment", f.ShaderFlat, new f.CoatColored(new f.Color(0.2, 0.2, 0.2, 1)));
    let materialGoal = new f.Material("Goal", f.ShaderFlat, new f.CoatColored(new f.Color(0.5, 0.5, 0.5, 1)));
    //Physical Player Variables
    let isGrounded;
    let cmpCamera;
    // let movementspeed: number = 12;
    // let turningspeed: number = 200;
    // let playerWeight: number = 75;
    // let playerJumpForce: number = 500;
    // let kickStrength: number = 100;
    let yTurn = 0;
    let forwardMovement = 0;
    function init(_event) {
        hierarchy = new f.Node("Scene");
        settingUpEnvironment();
        settingUpAPlayer();
        ball = createNodeWithComponents("Ball", materialBall, new f.MeshSphere());
        ball.mtxLocal.translateY(2);
        hierarchy.appendChild(ball);
        settingUpTrigger();
        settingUpAJoint();
        //Standard Fudge Scene Initialization - Creating a directional light, a camera and initialize the viewport
        let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.mtxPivot.lookAt(new f.Vector3(0.5, -1, -0.8)); //Set light direction
        hierarchy.addComponent(cmpLight);
        cmpCamera = new f.ComponentCamera();
        cmpCamera.clrBackground = f.Color.CSS("GREY");
        cmpCamera.mtxPivot.translate(new f.Vector3(20, 10, 20));
        cmpCamera.mtxPivot.lookAt(f.Vector3.ZERO());
        viewPort = new f.Viewport();
        viewPort.initialize("Viewport", hierarchy, cmpCamera, app);
        document.addEventListener("keypress", handler_Key_Pressed);
        document.addEventListener("keyup", handler_Key_Released);
        //Ball Resetting on enter trigger
        // Implementing kicking mechanic
        document.addEventListener("keypress", (_event) => {
            if (_event.code == f.KEYBOARD_CODE.E) {
                //
            }
        });
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(); //Stard the game loop
    }
    function update() {
        cmpCamera.mtxPivot.lookAt(player.mtxWorld.translation);
        playerIsGroundedRaycast();
        player_Movement();
        viewPort.draw();
    }
    function createNodeWithComponents(_name, _material, _mesh) {
        let node = new f.Node(_name);
        let cmpMesh = new f.ComponentMesh(_mesh);
        let cmpMaterial = new f.ComponentMaterial(_material);
        let cmpTransform = new f.ComponentTransform();
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(cmpTransform);
        return node;
    }
    function settingUpAPlayer() {
        player = createNodeWithComponents("Player", materialPlayer, new f.MeshCube());
        hierarchy.appendChild(player);
        player.mtxLocal.scale(new f.Vector3(0.5, 1.8, 0.3));
        player.mtxLocal.translate(new f.Vector3(2.5, 4, 3.5));
        // Nose as direction indicator
        let playerNose = createNodeWithComponents("PlayerNose", materialPlayer, new f.MeshCube());
        playerNose.mtxLocal.translate(new f.Vector3(0, 0.2, 0.4));
        playerNose.mtxLocal.scale(new f.Vector3(0.1, 0.2, 1.5));
        player.addChild(playerNose);
    }
    function playerIsGroundedRaycast() {
        //
    }
    function handler_Key_Pressed(_event) {
        if (_event.code == f.KEYBOARD_CODE.A) {
            yTurn = 1;
        }
        if (_event.code == f.KEYBOARD_CODE.W) {
            forwardMovement = 1;
        }
        if (_event.code == f.KEYBOARD_CODE.S) {
            forwardMovement = -1;
        }
        if (_event.code == f.KEYBOARD_CODE.D) {
            yTurn = -1;
        }
        if (_event.code == f.KEYBOARD_CODE.SPACE) {
            if (isGrounded) {
                //
            }
        }
        if (_event.code == f.KEYBOARD_CODE.T) {
            //
        }
        if (_event.code == f.KEYBOARD_CODE.Y) {
            //
        }
    }
    function handler_Key_Released(_event) {
        if (_event.code == f.KEYBOARD_CODE.A) {
            yTurn = 0;
        }
        if (_event.code == f.KEYBOARD_CODE.W) {
            forwardMovement = 0;
        }
        if (_event.code == f.KEYBOARD_CODE.S) {
            forwardMovement = 0;
        }
        if (_event.code == f.KEYBOARD_CODE.D) {
            yTurn = 0;
        }
    }
    //Actually moving the player
    function player_Movement(_deltaTime) {
        let playerForward;
        playerForward = f.Vector3.Z();
        playerForward.transform(player.mtxWorld, false);
    }
    function settingUpEnvironment() {
        environment[0] = createNodeWithComponents("Ground", materialEnvironment, new f.MeshCube());
        environment[0].mtxLocal.scale(new f.Vector3(20, 0.3, 20));
        hierarchy.appendChild(environment[0]);
        //Protective Walls
        environment[1] = createNodeWithComponents("FrontWall", materialEnvironment, new f.MeshCube());
        environment[1].mtxLocal.scale(new f.Vector3(20, 1, 1));
        environment[1].mtxLocal.translate(new f.Vector3(0, 0.5, 10.5));
        hierarchy.appendChild(environment[1]);
        environment[2] = createNodeWithComponents("BackWall", materialEnvironment, new f.MeshCube());
        environment[2].mtxLocal.scale(new f.Vector3(20, 1, 1));
        environment[2].mtxLocal.translate(new f.Vector3(0, 0.5, -10.5));
        hierarchy.appendChild(environment[2]);
        environment[3] = createNodeWithComponents("LeftWall", materialEnvironment, new f.MeshCube());
        environment[3].mtxLocal.scale(new f.Vector3(1, 1, 20));
        environment[3].mtxLocal.translate(new f.Vector3(10.5, 0.5, 0));
        hierarchy.appendChild(environment[3]);
        environment[4] = createNodeWithComponents("RightWall", materialEnvironment, new f.MeshCube());
        environment[4].mtxLocal.scale(new f.Vector3(1, 1, 20));
        environment[4].mtxLocal.translate(new f.Vector3(-10.5, 0.5, 0));
        hierarchy.appendChild(environment[4]);
        //Goal
        environment[5] = createNodeWithComponents("Goal_Upper", materialGoal, new f.MeshCube());
        environment[5].mtxLocal.scale(new f.Vector3(8, 1, 1));
        environment[5].mtxLocal.translate(new f.Vector3(0, 4.5, -9.5));
        hierarchy.appendChild(environment[5]);
        environment[6] = createNodeWithComponents("Goal_Left", materialGoal, new f.MeshCube());
        environment[6].mtxLocal.scale(new f.Vector3(1, 4.5, 1));
        environment[6].mtxLocal.translate(new f.Vector3(-4.5, 0.5, -9.5));
        hierarchy.appendChild(environment[6]);
        environment[7] = createNodeWithComponents("Goal_Right", materialGoal, new f.MeshCube());
        environment[7].mtxLocal.scale(new f.Vector3(1, 4.5, 1));
        environment[7].mtxLocal.translate(new f.Vector3(4.5, 0.5, -9.5));
        hierarchy.appendChild(environment[7]);
    }
    function settingUpTrigger() {
        // Ball Resetting Triggers
        environment[8] = createNodeWithComponents("Ground_BelowZero", materialGoal, new f.MeshCube());
        environment[8].removeComponent(environment[8].getComponent(f.ComponentMesh));
        environment[8].mtxLocal.scale(new f.Vector3(100, 10, 100));
        environment[8].mtxLocal.translateY(-1);
        hierarchy.appendChild(environment[8]);
        environment[9] = createNodeWithComponents("Goal_Trigger", materialGoal, new f.MeshCube());
        environment[9].removeComponent(environment[9].getComponent(f.ComponentMesh));
        environment[9].mtxLocal.scale(new f.Vector3(9, 4.5, 1.5));
        environment[9].mtxLocal.translate(new f.Vector3(0, 0.5, -6.25));
        hierarchy.appendChild(environment[9]);
    }
    function resetBall(_event) {
        //
    }
    function settingUpAJoint() {
        environment[10] = createNodeWithComponents("Holder", new f.Material("Cube", f.ShaderFlat, new f.CoatColored(new f.Color(0.4, 0.4, 0.4, 1))), new f.MeshCube());
        hierarchy.appendChild(environment[10]);
        environment[10].mtxLocal.translate(new f.Vector3(5, 6, -2));
        environment[10].mtxLocal.scale(new f.Vector3(0.5, 1, 0.5));
        environment[11] = createNodeWithComponents("MovingDrill", new f.Material("Cube", f.ShaderFlat, new f.CoatColored(new f.Color(1, 1, 0, 1))), new f.MeshCube());
        hierarchy.appendChild(environment[11]);
        environment[11].mtxLocal.translate(new f.Vector3(5, 2.5, -2));
        environment[11].mtxLocal.scale(new f.Vector3(3, 2, 0.2));
    }
})(Turorials_FUDGEPhysics_Lesson1 || (Turorials_FUDGEPhysics_Lesson1 = {}));
//# sourceMappingURL=Main.js.map