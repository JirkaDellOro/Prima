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
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["PATROL"] = 1] = "PATROL";
    })(JOB = L11_Doom_Enemy.JOB || (L11_Doom_Enemy.JOB = {}));
    class Enemy extends ƒ.Node {
        // private static speedMax: number = 1; // units per second
        // public direction: number = 0; 
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 3;
            this.angleView = 0;
            this.job = JOB.PATROL;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new ƒaid.Node("Show", ƒ.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new ƒaid.NodeSprite("Sprite");
            this.sprite.addComponent(new ƒ.ComponentTransform());
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            // this.sprite.showFrame(0);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            // this.posTarget = _position;
            this.chooseTargetPosition();
            // this.appendChild(new ƒaid.Node("Cube", ƒ.Matrix4x4.IDENTITY(), new ƒ.Material("Cube", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("red"))), new ƒ.MeshCube()));
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            for (let angle = 0; angle < 5; angle++) {
                let name = "Idle" + ANGLE[angle];
                let sprite = new ƒaid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(ƒ.Rectangle.GET(44 + angle * 107, 33, 63, 66), 3, 32, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.Y(100));
                Enemy.animations[name] = sprite;
            }
        }
        update() {
            switch (this.job) {
                case JOB.PATROL:
                    if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
                        // this.chooseTargetPosition();
                        this.job = JOB.IDLE;
                    this.move();
                    break;
                case JOB.IDLE:
                default:
                    break;
            }
            this.displayAnimation();
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * ƒ.Loop.timeFrameGame / 1000);
        }
        displayAnimation() {
            this.show.mtxLocal.showTo(ƒ.Vector3.TRANSFORMATION(L11_Doom_Enemy.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
            let rotation = this.show.mtxLocal.rotation.y;
            rotation = (rotation + 360 + 22.5) % 360;
            rotation = Math.floor(rotation / 45);
            if (this.angleView == rotation)
                return;
            this.angleView = rotation;
            if (rotation > 4) {
                rotation = 8 - rotation;
                this.flip(true);
            }
            else
                this.flip(false);
            let section = ANGLE[rotation]; // .padStart(3, "0");
            console.log(section);
            this.sprite.setAnimation(Enemy.animations["Idle" + section]);
        }
        chooseTargetPosition() {
            let range = L11_Doom_Enemy.sizeWall * L11_Doom_Enemy.numWalls / 2 - 2;
            this.posTarget = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), 0, ƒ.Random.default.getRange(-range, range));
            console.log("New target", this.posTarget.toString());
        }
        flip(_reverse) {
            this.sprite.mtxLocal.rotation = ƒ.Vector3.Y(_reverse ? 180 : 0);
        }
    }
    L11_Doom_Enemy.Enemy = Enemy;
})(L11_Doom_Enemy || (L11_Doom_Enemy = {}));
//# sourceMappingURL=Enemy.js.map