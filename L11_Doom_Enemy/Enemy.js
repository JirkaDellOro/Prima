"use strict";
var L11_Doom_Enemy;
(function (L11_Doom_Enemy) {
    var ƒ = FudgeCore;
    var ƒaid = FudgeAid;
    let ANGLE;
    (function (ANGLE) {
        // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
        ANGLE[ANGLE["_000"] = 0] = "_000";
        ANGLE[ANGLE["_045"] = 1] = "_045";
        ANGLE[ANGLE["_090"] = 2] = "_090";
        ANGLE[ANGLE["_135"] = 3] = "_135";
        ANGLE[ANGLE["_180"] = 4] = "_180";
        ANGLE[ANGLE["_225"] = 5] = "_225";
        ANGLE[ANGLE["_270"] = 6] = "_270";
        ANGLE[ANGLE["_315"] = 7] = "_315";
    })(ANGLE = L11_Doom_Enemy.ANGLE || (L11_Doom_Enemy.ANGLE = {}));
    class Enemy extends ƒ.Node {
        // private static speedMax: number = 1; // units per second
        // public direction: number = 0; 
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 1;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new ƒaid.Node("Show", ƒ.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new ƒaid.NodeSprite("Sprite");
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            // this.sprite.showFrame(0);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            this.posTarget = _position;
            // this.appendChild(new ƒaid.Node("Cube", ƒ.Matrix4x4.IDENTITY(), new ƒ.Material("Cube", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("red"))), new ƒ.MeshCube()));
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            for (let angle = 0; angle < 5; angle++) {
                let name = "Idle" + ANGLE[angle];
                let sprite = new ƒaid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(ƒ.Rectangle.GET(44, 33, 63, 66), 3, 32, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.Y(100));
                Enemy.animations[name] = sprite;
            }
        }
        update() {
            if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
                this.chooseTargetPosition();
            this.move();
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * ƒ.Loop.timeFrameGame / 1000);
            this.show.mtxLocal.showTo(ƒ.Vector3.TRANSFORMATION(L11_Doom_Enemy.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
        }
        chooseTargetPosition() {
            let range = 5; //sizeWall * numWalls / 2 - 2;
            this.posTarget = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), 0, ƒ.Random.default.getRange(-range, range));
            console.log("New target", this.posTarget.toString());
        }
    }
    L11_Doom_Enemy.Enemy = Enemy;
})(L11_Doom_Enemy || (L11_Doom_Enemy = {}));
//# sourceMappingURL=Enemy.js.map