"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new ƒ.Viewport();
    SpaceInvaders.quadMesh = new ƒ.MeshQuad("Quad");
    SpaceInvaders.material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    function init(_event) {
        const canvas = document.querySelector("canvas");
        let space = new ƒ.Node("Space");
        let ship = new ƒ.Node("Ship");
        ship.addComponent(new ƒ.ComponentTransform());
        ship.addComponent(new ƒ.ComponentMesh(SpaceInvaders.quadMesh));
        ship.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(7 / 13);
        ship.addComponent(new ƒ.ComponentMaterial(SpaceInvaders.material));
        space.addChild(ship);
        let motherShip = new ƒ.Node("MotherShip");
        motherShip.addComponent(new ƒ.ComponentTransform());
        motherShip.mtxLocal.translateX(75 / 13);
        motherShip.mtxLocal.translateY(140 / 13);
        motherShip.addComponent(new ƒ.ComponentMesh(SpaceInvaders.quadMesh));
        motherShip.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(14 / 13);
        motherShip.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(7 / 13);
        motherShip.addComponent(new ƒ.ComponentMaterial(SpaceInvaders.material));
        space.addChild(motherShip);
        let invaders = new ƒ.Node("Invaders");
        for (let y = 0; y < 5; ++y) {
            for (let x = 0; x < 11; ++x) {
                let invader = new SpaceInvaders.Invader(x, y);
                invaders.addChild(invader);
            }
        }
        space.addChild(invaders);
        let barricades = new ƒ.Node("Barricades");
        let nStripes = 21;
        let barricadeStripeHeights = [14, 15, 16, 17, 17, 12, 11, 10, 9, 8, 8, 8, 9, 10, 11, 12, 17, 17, 16, 15, 14];
        let barricadeStripeYOffsets = [-1.5, -1, -0.5, 0, 0, 2.5, 3, 3.5, 4, 4.5, 4.5, 4.5, 4, 3.5, 3, 2.5, 0, 0, -0.5, -1, -1.5];
        for (let iBarricade = 0; iBarricade < 4; iBarricade++) {
            let barricade = new ƒ.Node("Barricade" + iBarricade);
            barricade.addComponent(new ƒ.ComponentTransform());
            barricade.getComponent(ƒ.ComponentTransform).mtxLocal.translateX((iBarricade - 1.5) * 53 / 13);
            barricade.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(24 / 13);
            for (let iStripe = 0; iStripe < nStripes; iStripe++) {
                let barricadeStripe = new ƒ.Node("BarricadeStripe" + (iStripe + iBarricade * nStripes));
                let posX = iStripe - (nStripes - 1) / 2;
                let scaleX = 21 / (nStripes * 13);
                barricadeStripe.addComponent(new ƒ.ComponentTransform());
                barricadeStripe.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(posX * scaleX);
                barricadeStripe.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(barricadeStripeYOffsets[iStripe] / 13);
                barricadeStripe.addComponent(new ƒ.ComponentMesh(SpaceInvaders.quadMesh));
                barricadeStripe.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(scaleX);
                barricadeStripe.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(barricadeStripeHeights[iStripe] / 13);
                barricadeStripe.addComponent(new ƒ.ComponentMaterial(SpaceInvaders.material));
                barricade.addChild(barricadeStripe);
            }
            barricades.addChild(barricade);
        }
        space.addChild(barricades);
        let projectile0 = new ƒ.Node("Projektile0");
        projectile0.addComponent(new ƒ.ComponentTransform());
        projectile0.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(1);
        projectile0.addComponent(new ƒ.ComponentMesh(SpaceInvaders.quadMesh));
        projectile0.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(1 / 13);
        projectile0.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(5 / 13);
        projectile0.addComponent(new ƒ.ComponentMaterial(SpaceInvaders.material));
        space.addChild(projectile0);
        let projectile1 = new ƒ.Node("Projektile1");
        projectile1.addComponent(new ƒ.ComponentTransform());
        projectile1.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-45 / 13);
        projectile1.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(4);
        projectile1.addComponent(new ƒ.ComponentMesh(SpaceInvaders.quadMesh));
        projectile1.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(1 / 13);
        projectile1.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(5 / 13);
        projectile1.addComponent(new ƒ.ComponentMaterial(SpaceInvaders.material));
        space.addChild(projectile1);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(18);
        cmpCamera.mtxPivot.translateY(77 / 13);
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", space, cmpCamera, canvas);
        viewport.draw();
        console.log(space);
    }
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=SpaceInvaders.js.map