"use strict";
var L10_TowerDefenseEnemyProjectiles;
(function (L10_TowerDefenseEnemyProjectiles) {
    let Projectile = /** @class */ (() => {
        class Projectile extends ƒ.Node {
            constructor(_start, _target) {
                super("Projectile");
                this.speed = 10 / 1000;
                this.target = _target;
                this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_start)));
                let cmpMaterial = new ƒ.ComponentMaterial(Projectile.material);
                cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
                this.addComponent(cmpMaterial);
                let cmpMesh = new ƒ.ComponentMesh(Projectile.mesh);
                this.addComponent(cmpMesh);
                cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.2));
                ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
            }
            update(_event) {
                console.log("Projectile flying");
                let position = this.mtxLocal.translation;
                let distance = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
                let distanceToTravel = this.speed * ƒ.Loop.timeFrameGame;
                let travel = ƒ.Vector3.NORMALIZATION(distance, distanceToTravel);
                this.mtxLocal.translate(travel);
            }
        }
        Projectile.material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored());
        Projectile.mesh = new ƒ.MeshCube();
        return Projectile;
    })();
    L10_TowerDefenseEnemyProjectiles.Projectile = Projectile;
})(L10_TowerDefenseEnemyProjectiles || (L10_TowerDefenseEnemyProjectiles = {}));
//# sourceMappingURL=Projectiles.js.map