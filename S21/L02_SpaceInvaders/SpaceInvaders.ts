namespace SpaceInvaders {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  let viewport: ƒ.Viewport = new ƒ.Viewport();
  let ship: Ship;
  let speedShip: number = 5;
  let gunReady: boolean = true;

  let projectiles: ƒ.Node = new ƒ.Node("Projectiles");
  let invaders: ƒ.Node = new ƒ.Node("Invaders");
  invaders.addComponent(new ƒ.ComponentTransform());
  let velocityInvaders: ƒ.Vector2 = new ƒ.Vector2(0.5, 0);

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let space: ƒ.Node = new ƒ.Node("Space");
    ship = Ship.getInstance();
    space.addChild(ship);
    space.addChild(MotherShip.getInstance());
    space.addChild(projectiles);

    let columnCount: number = 11;
    let rowCount: number = 5;

    for (let row: number = 0; row < rowCount; ++row) {
      for (let column: number = 0; column < columnCount; ++column) {
        let pos: ƒ.Vector2 = new ƒ.Vector2();
        pos.x = (column - (columnCount - 1) / 2) * 15 / 13;
        pos.y = (row * 15 + 65) / 13;

        invaders.addChild(new Invader(pos));
      }
    }
    space.addChild(invaders);
    ƒ.Time.game.setTimer(500, 0, moveInvaders);

    let barricades: ƒ.Node = new ƒ.Node("Barricades");
    let nBarricade: number = 4;

    for (let iBarricade: number = 0; iBarricade < nBarricade; ++iBarricade) {
      let pos: ƒ.Vector2 = new ƒ.Vector2();
      pos.x = (iBarricade - (nBarricade - 1) / 2) * 53 / 13;
      pos.y = 24 / 13;

      barricades.addChild(new Barricade(pos));
    }

    space.addChild(barricades);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(18);
    cmpCamera.mtxPivot.translateY(77 / 13);
    cmpCamera.mtxPivot.rotateY(180);
    console.log(cmpCamera);

    viewport.initialize("Viewport", space, cmpCamera, canvas);
    viewport.draw();

    console.log(space);

    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    // console.log(_event);
    let offset: number = speedShip * ƒ.Loop.timeFrameReal / 1000;

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      ship.mtxLocal.translateX(-offset);

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      ship.mtxLocal.translateX(+offset);

    if (gunReady && ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
      let projectile: Projectile = new Projectile(ship.mtxLocal.translation.toVector2());
      projectiles.addChild(projectile);
      gunReady = false;
      ƒ.Time.game.setTimer(1000, 1, () => gunReady = true);
    }

    for (let projectile of projectiles.getChildren() as Projectile[]) {
      projectile.move();
      if (projectile.mtxLocal.translation.y > 10)
        projectiles.removeChild(projectile);
    }

    checkProjectileCollision();
    viewport.draw();
  }

  function checkProjectileCollision(): void {
    for (let projectile of projectiles.getChildren() as Projectile[]) {

      // let mtxInverse: ƒ.Matrix4x4 = ƒ.Matrix4x4.INVERSION(invaders.mtxLocal);
      // let posWorld: ƒ.Vector3 = projectile.mtxLocal.translation;
      // let posInvaderSpace: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(posWorld, mtxInverse, true);
      // projectile.mtxLocal.translation = posInvaderSpace;
      // projectile.setRectPosition();
      
      let mtxProjectile: ƒ.Matrix4x4 = projectile.mtxLocal;
      projectile.cmpTransform.mtxLocal = ƒ.Matrix4x4.RELATIVE(mtxProjectile, invaders.mtxLocal);
      projectile.setRectPosition();

      for (let invader of invaders.getChildren() as Invader[]) {
        if (projectile.checkCollision(invader)) {
          projectiles.removeChild(projectile);
          invaders.removeChild(invader);
        }
      }

      // projectile.mtxLocal.translation = posWorld;
      projectile.cmpTransform.mtxLocal = mtxProjectile;
      projectile.setRectPosition();
    }
  }

  function moveInvaders(): void {
    invaders.mtxLocal.translate(velocityInvaders.toVector3());
  }
}