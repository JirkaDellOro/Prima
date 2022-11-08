namespace Mario {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Avatar extends ƒAid.NodeSprite {
    readonly xSpeedDefault: number = .9;
    readonly xSpeedSprint: number = 2;
    private ySpeed: number = 0;
    private leftDirection: boolean = false;
    private prevSprint: boolean = false;

    private animWalk: ƒAid.SpriteSheetAnimation;
    private animSprint: ƒAid.SpriteSheetAnimation;
    private animJump: ƒAid.SpriteSheetAnimation;
    private animLook: ƒAid.SpriteSheetAnimation;
    private animDeath: ƒAid.SpriteSheetAnimation;


    public constructor() {
      super("AvatarInstance");
      this.addComponent(new ƒ.ComponentTransform());
      // this.addEventListener(ƒ.EVENT.RENDER_PREPARE, () => console.log("Render"));
    }

    public update(_deltaTime: number): void {
      this.ySpeed -= gravity * _deltaTime;
      let yOffset: number = this.ySpeed * _deltaTime;
      this.mtxLocal.translateY(yOffset);
    }

    public walk(_deltaTime: number, _left: boolean): void {
      const xTranslation: number = this.xSpeedDefault * _deltaTime;
      this.mtxLocal.translateX(xTranslation * (_left ? -1 : 1));
    }

    public async initializeAnimations(_imgSpriteSheet: ƒ.TextureImage): Promise<void> {
      let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, _imgSpriteSheet);

      this.animWalk = new ƒAid.SpriteSheetAnimation("Walk", coat);
      this.animWalk.generateByGrid(ƒ.Rectangle.GET(0, 0, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

      this.animSprint = new ƒAid.SpriteSheetAnimation("Sprint", coat);
      this.animSprint.generateByGrid(ƒ.Rectangle.GET(0, 24, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

      this.animJump = new ƒAid.SpriteSheetAnimation("Jump", coat);
      this.animJump.generateByGrid(ƒ.Rectangle.GET(0, 48, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

      this.animLook = new ƒAid.SpriteSheetAnimation("Look", coat);
      this.animLook.generateByGrid(ƒ.Rectangle.GET(32, 0, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

      this.animDeath = new ƒAid.SpriteSheetAnimation("Death", coat);
      this.animDeath.generateByGrid(ƒ.Rectangle.GET(32, 24, 16, 24), 2, 64, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));

      this.setAnimation(this.animDeath);
      this.framerate = 20;
    }
  }
}
