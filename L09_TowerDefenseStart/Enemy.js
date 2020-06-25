"use strict";
var L09_TowerDefenseStart;
(function (L09_TowerDefenseStart) {
    let Enemy = /** @class */ (() => {
        class Enemy extends ƒ.Node {
            constructor(_name, _pos) {
                super(_name);
                this.health = 1;
                this.stamina = 1;
                this.speed = 0.3 / 1000;
                this.nextWaypoint = 0;
                this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
                let cmpMaterial = new ƒ.ComponentMaterial(Enemy.material);
                cmpMaterial.clrPrimary = ƒ.Color.CSS("lightblue");
                this.addComponent(cmpMaterial);
                let cmpMesh = new ƒ.ComponentMesh(Enemy.mesh);
                this.addComponent(cmpMesh);
                cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.5));
                cmpMesh.pivot.translateY(0.5);
                ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
            }
            update() {
                // via mutator for demonstration
                let mutator = this.mtxLocal.getMutator();
                mutator.translation.x += this.speed * ƒ.Loop.timeFrameGame;
                if (mutator.translation.x > 5)
                    mutator.translation.x = -5;
                this.mtxLocal.mutate(mutator);
            }
        }
        Enemy.material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
        Enemy.mesh = new ƒ.MeshSphere(4, 2);
        return Enemy;
    })();
    L09_TowerDefenseStart.Enemy = Enemy;
})(L09_TowerDefenseStart || (L09_TowerDefenseStart = {}));
//# sourceMappingURL=Enemy.js.map