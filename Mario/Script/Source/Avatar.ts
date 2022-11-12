namespace Mario {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export enum ACTION {
    IDLE, WALK, SPRINT, CROUCH, LOOK
  }

  export class Avatar extends ƒAid.NodeSprite {
    readonly speedWalk: number = .9;
    readonly speedSprint: number = 2;
    public ySpeed: number = 0;
    private xSpeed: number = 0;
    private animationCurrent: ƒAid.SpriteSheetAnimation;

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
      this.mtxLocal.translateX(this.xSpeed * _deltaTime, true);
      this.mtxLocal.rotateX(this.xSpeed * _deltaTime, true);
    }

    public act(_action: ACTION): void {
      let animation: ƒAid.SpriteSheetAnimation;
      this.xSpeed = 0;
      switch (_action) {
        case ACTION.WALK:
          this.xSpeed = this.speedWalk;
          animation = this.animWalk;
          break;
        case ACTION.SPRINT:
          this.xSpeed = this.speedSprint;
          animation = this.animSprint;
          break;
        case ACTION.IDLE:
          this.showFrame(0);
          animation = this.animWalk;
          break;
        case ACTION.CROUCH:
          this.showFrame(0);
          animation = this.animLook;
          break;
        case ACTION.LOOK:
          this.showFrame(1);
          animation = this.animLook;
          break;
      }

      if (animation != this.animationCurrent) {
        this.setAnimation(animation);
        this.animationCurrent = animation;
      }
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
