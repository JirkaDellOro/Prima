namespace SpaceInvaders {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  let viewport: ƒ.Viewport = new ƒ.Viewport();

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let space: ƒ.Node = new ƒ.Node("Space");
    
    space.addChild(Ship.getInstance());
    space.addChild(MotherShip.getInstance());

    let invaders: ƒ.Node = new ƒ.Node("Invaders");
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

    let projectiles: ƒ.Node = new ƒ.Node("Projectiles");

    let projectile0Pos: ƒ.Vector2 = new ƒ.Vector2();
    projectile0Pos.x = 0;
    projectile0Pos.y = 1;

    projectiles.addChild(new Projectile(projectile0Pos));

    let projectile1Pos: ƒ.Vector2 = new ƒ.Vector2();
    projectile1Pos.x = -45 / 13;
    projectile1Pos.y = 4;

    projectiles.addChild(new Projectile(projectile1Pos));

    space.addChild(projectiles);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(18);
    cmpCamera.mtxPivot.translateY(77 / 13);
    cmpCamera.mtxPivot.rotateY(180);
    console.log(cmpCamera);

    viewport.initialize("Viewport", space, cmpCamera, canvas);
    viewport.draw();

    console.log(space);
  }
}