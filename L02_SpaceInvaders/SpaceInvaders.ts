namespace SpaceInvaders {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  let viewport: ƒ.Viewport = new ƒ.Viewport();
  let ship: Ship;
  let speedShip: number = 5;

  let projectiles: ƒ.Node = new ƒ.Node("Projectiles");
  let invaders: ƒ.Node = new ƒ.Node("Invaders");

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

    let barricades: ƒ.Node = new ƒ.Node("Barricades");
    let nBarricade: number = 4;

    for (let iBarricade: number = 0; iBarricade < nBarricade; ++iBarricade) {
      let pos: ƒ.Vector2 = new ƒ.Vector2();
      pos.x = (iBarricade - (nBarricade - 1) / 2) * 53 / 13;
      pos.y = 24 / 13;

      barricades.addChild(new Barricade(pos));
    }

    space.addChild(barricades);


    // let projectile0Pos: ƒ.Vector2 = new ƒ.Vector2();
    // projectile0Pos.x = 0;
    // projectile0Pos.y = 1;

    // projectiles.addChild(new Projectile(projectile0Pos));

    // let projectile1Pos: ƒ.Vector2 = new ƒ.Vector2();
    // projectile1Pos.x = -45 / 13;
    // projectile1Pos.y = 4;

    // projectiles.addChild(new Projectile(projectile1Pos));

    // space.addChild(projectiles);

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

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
      let projectile: Projectile = new Projectile(ship.mtxLocal.translation.toVector2());
      projectiles.addChild(projectile);
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
      for (let invader of invaders.getChildren() as Invader[]) {
        if (projectile.checkCollision(invader)) {
          projectiles.removeChild(projectile);
          invaders.removeChild(invader);
        }
      }
    }
  }
}