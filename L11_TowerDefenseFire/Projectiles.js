"use strict";
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    let Projectile = /** @class */ (() => {
        class Projectile extends ƒ.Node {
            constructor(_start, _target) {
                super("Projectile");
                this.speed = 10 / 1000;
                this.update = (_event) => {
                    console.log("Projectile flying");
                    let position = this.mtxLocal.translation;
                    let distance = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
                    let distanceToTravel = this.speed * ƒ.Loop.timeFrameGame;
                    if (distance.magnitudeSquared < distanceToTravel * distanceToTravel) {
                        L11_TowerDefenseFire.viewport.getGraph().removeChild(this);
                        ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                        return;
                    }
                    let travel = ƒ.Vector3.NORMALIZATION(distance, distanceToTravel);
                    this.mtxLocal.translate(travel);
                };
                this.target = _target;
                this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_start)));
                let cmpMaterial = new ƒ.ComponentMaterial(Projectile.material);
                cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
                this.addComponent(cmpMaterial);
                let cmpMesh = new ƒ.ComponentMesh(Projectile.mesh);
                this.addComponent(cmpMesh);
                cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.2));
                L11_TowerDefenseFire.viewport.getGraph().addChild(this);
                ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            }
        }
        Projectile.material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored());
        Projectile.mesh = new ƒ.MeshCube();
        return Projectile;
    })();
    L11_TowerDefenseFire.Projectile = Projectile;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
//# sourceMappingURL=Projectiles.js.map