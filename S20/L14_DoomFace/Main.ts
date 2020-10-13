namespace L14_DoomFace {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  console.log(ƒ, ƒAid);
  window.addEventListener("load", init);

  function init(_event: Event): void {
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured();
    coat.texture = new ƒ.TextureImage();
    coat.texture.image = document.querySelector("img");

    let idle: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Idle", coat);
    // easier to have the pivot in the center
    let startRect: ƒ.Rectangle = new ƒ.Rectangle(0, 0, 24, 30, ƒ.ORIGIN2D.TOPLEFT);
    idle.generateByGrid(startRect, 3, new ƒ.Vector2(0, 0), 72, ƒ.ORIGIN2D.CENTER);
    
    let face: ƒAid.NodeSprite = new ƒAid.NodeSprite("DoomFace");
    face.setAnimation(idle);
    face.framerate = 1;

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(-1);

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Portrait", face, cmpCamera, document.querySelector("canvas"));

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);

    function update(_event: ƒ.Eventƒ): void {
      viewport.draw();
    }
  }
}