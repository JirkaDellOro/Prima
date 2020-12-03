"use strict";
var L12_Doom_StateMachine;
(function (L12_Doom_StateMachine) {
    var ƒ = FudgeCore;
    var ƒaid = FudgeAid;
    let ANGLE;
    (function (ANGLE) {
        ANGLE[ANGLE["_000"] = 0] = "_000";
        ANGLE[ANGLE["_045"] = 1] = "_045";
        ANGLE[ANGLE["_090"] = 2] = "_090";
        ANGLE[ANGLE["_135"] = 3] = "_135";
        ANGLE[ANGLE["_180"] = 4] = "_180";
        ANGLE[ANGLE["_225"] = 5] = "_225";
        ANGLE[ANGLE["_270"] = 6] = "_270";
        ANGLE[ANGLE["_315"] = 7] = "_315";
    })(ANGLE = L12_Doom_StateMachine.ANGLE || (L12_Doom_StateMachine.ANGLE = {}));
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["PATROL"] = 1] = "PATROL";
    })(JOB = L12_Doom_StateMachine.JOB || (L12_Doom_StateMachine.JOB = {}));
    class Enemy extends ƒ.Node {
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 3;
            this.angleView = 0;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new ƒaid.Node("Show", ƒ.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new ƒaid.NodeSprite("Sprite");
            this.sprite.addComponent(new ƒ.ComponentTransform());
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            let cmpStateMachine = new L12_Doom_StateMachine.ComponentStateMachineEnemy();
            this.addComponent(cmpStateMachine);
            cmpStateMachine.stateCurrent = JOB.PATROL;
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
            this.getComponent(L12_Doom_StateMachine.ComponentStateMachineEnemy).act();
            this.displayAnimation();
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * ƒ.Loop.timeFrameGame / 1000);
        }
        chooseTargetPosition() {
            let range = L12_Doom_StateMachine.sizeWall * L12_Doom_StateMachine.numWalls / 2 - 2;
            this.posTarget = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), 0, ƒ.Random.default.getRange(-range, range));
            console.log("New target", this.posTarget.toString());
        }
        displayAnimation() {
            this.show.mtxLocal.showTo(ƒ.Vector3.TRANSFORMATION(L12_Doom_StateMachine.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
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
            let section = ANGLE[rotation];
            this.sprite.setAnimation(Enemy.animations["Idle" + section]);
        }
        flip(_reverse) {
            this.sprite.mtxLocal.rotation = ƒ.Vector3.Y(_reverse ? 180 : 0);
        }
    }
    L12_Doom_StateMachine.Enemy = Enemy;
})(L12_Doom_StateMachine || (L12_Doom_StateMachine = {}));
//# sourceMappingURL=Enemy.js.map