namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Barricade extends ƒ.Node {      
      private static count: number = 0;
      private static stripeCount: number = 21;
      private static stripeHeights: number[] = [14, 15, 16, 17, 17, 12, 11, 10, 9, 8, 8, 8, 9, 10, 11, 12, 17, 17, 16, 15, 14];
      private static stripeYOffsets: number[] = [-1.5, -1, -0.5, 0, 0, 2.5, 3, 3.5, 4, 4.5, 4.5, 4.5, 4, 3.5, 3, 2.5, 0, 0, -0.5, -1, -1.5];

      constructor(_pos: ƒ.Vector2) {  
        super("Barricade" + (++Barricade.count));

        this.addComponent(new ƒ.ComponentTransform());
        this.mtxLocal.translateX(_pos.x);
        this.mtxLocal.translateY(_pos.y);

        for (let iStripe: number = 0; iStripe < Barricade.stripeCount; ++iStripe) {
            let id: number = iStripe + Barricade.count * Barricade.stripeCount;
            let width: number = 21 / (Barricade.stripeCount * 13);

            let pos: ƒ.Vector2 = new ƒ.Vector2((iStripe - (Barricade.stripeCount - 1) / 2) * width, Barricade.stripeYOffsets[iStripe] / 13);
            let scale: ƒ.Vector2 = new ƒ.Vector2(width, Barricade.stripeHeights[iStripe] / 13);
            let stripe: ƒ.Node = new QuadNode("BarricadeStripe" + id, pos, scale);
            stripe.getComponent(ƒ.ComponentMaterial).clrPrimary = new ƒ.Color(0.6, 0.4, 0.4, 1);

            this.addChild(stripe);
        }
      }
    }
  }