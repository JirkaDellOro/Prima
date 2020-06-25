"use strict";
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    // import ƒ = FudgeCore;
    // import ƒAid = FudgeAid;
    class ComponentPicker extends ƒ.Component {
        constructor(_radius = 0.5) {
            super();
            this.radius = 0.5;
            this.radius = _radius;
        }
        drawPickRadius(_viewport) {
            let pickData = this.getPickData();
            let crc2 = _viewport.getContext();
            crc2.save();
            crc2.beginPath();
            crc2.arc(pickData.canvas.x, pickData.canvas.y, pickData.radius.magnitude, 0, 2 * Math.PI);
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = "#ffffff80";
            crc2.stroke();
            crc2.fill();
        }
        pick(_client) {
            let pickData = this.getPickData();
            let distance = ƒ.Vector2.DIFFERENCE(_client, pickData.canvas);
            if (distance.magnitudeSquared < pickData.radius.magnitudeSquared)
                return pickData;
            return null;
        }
        getPickData() {
            let node = this.getContainer();
            let projection = L11_TowerDefenseFire.viewport.camera.project(node.mtxWorld.translation);
            let posClient = L11_TowerDefenseFire.viewport.pointClipToClient(projection.toVector2());
            let projectionRadius = ƒ.Vector3.X(this.radius * node.mtxWorld.scaling.magnitude); // / 1.414);
            projectionRadius.transform(L11_TowerDefenseFire.viewport.camera.pivot, false);
            projectionRadius = L11_TowerDefenseFire.viewport.camera.project(ƒ.Vector3.SUM(node.mtxWorld.translation, projectionRadius));
            let posRadius = L11_TowerDefenseFire.viewport.pointClipToClient(projectionRadius.toVector2());
            return { clip: projection, canvas: posClient, radius: ƒ.Vector2.DIFFERENCE(posRadius, posClient) };
        }
    }
    L11_TowerDefenseFire.ComponentPicker = ComponentPicker;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    let Enemy = /** @class */ (() => {
        class Enemy extends ƒ.Node {
            constructor(_name, _pos) {
                super(_name);
                this.health = 1;
                this.stamina = 1;
                this.speed = 1 / 1000;
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
            update(_event) {
                // via mutator for demonstration
                let distanceToTravel = this.speed * ƒ.Loop.timeFrameGame;
                let move;
                while (true) {
                    move = ƒ.Vector3.DIFFERENCE(L11_TowerDefenseFire.path[this.nextWaypoint], this.mtxLocal.translation);
                    if (move.magnitudeSquared > distanceToTravel * distanceToTravel)
                        break;
                    this.nextWaypoint = ++this.nextWaypoint % (L11_TowerDefenseFire.sizeTerrain + 1);
                    if (this.nextWaypoint == 0)
                        this.mtxLocal.translation = L11_TowerDefenseFire.path[0];
                }
                this.mtxLocal.translate(ƒ.Vector3.NORMALIZATION(move, distanceToTravel));
            }
        }
        Enemy.material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
        Enemy.mesh = new ƒ.MeshSphere(4, 2);
        return Enemy;
    })();
    L11_TowerDefenseFire.Enemy = Enemy;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    // import ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    L11_TowerDefenseFire.sizeTerrain = 10;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let graph = new ƒ.Node("Graph");
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");
        L11_TowerDefenseFire.viewport = new ƒ.Viewport();
        L11_TowerDefenseFire.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(L11_TowerDefenseFire.viewport);
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        graph.addChild(new ƒAid.NodeCoordinateSystem());
        graph.addChild(createTerrain());
        L11_TowerDefenseFire.path = createPath();
        // addTowers(graph);
        graph.addChild(new L11_TowerDefenseFire.Tower("Tower1", ƒ.Vector3.Z(-1)));
        graph.addChild(new L11_TowerDefenseFire.Enemy("Enemy1", L11_TowerDefenseFire.path[0]));
        L11_TowerDefenseFire.viewport.draw();
        // viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, pointerMove);
        // viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        // document.body.addEventListener("click", shoot);
    }
    // function shoot(_event: MouseEvent): void {
    //   let tower: Tower = <Tower>viewport.getGraph().getChildrenByName("Tower1")[0];
    //   let enemy: Enemy = <Enemy>viewport.getGraph().getChildrenByName("Enemy1")[0];
    //   let projectile: Projectile = new Projectile(tower.top.mtxWorld.translation, enemy);
    //   viewport.getGraph().addChild(projectile);
    //   console.log("Projectile started", projectile);
    // }
    function update(_event) {
        let tower = L11_TowerDefenseFire.viewport.getGraph().getChildrenByName("Tower1")[0];
        let enemy = L11_TowerDefenseFire.viewport.getGraph().getChildrenByName("Enemy1")[0];
        tower.follow(enemy);
        L11_TowerDefenseFire.viewport.draw();
        L11_TowerDefenseFire.path.render(L11_TowerDefenseFire.viewport);
    }
    function createTerrain() {
        let mtrPlane = new ƒ.Material("Plane", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("green")));
        let meshPlane = new ƒ.MeshQuad();
        let mtxPlane = ƒ.Matrix4x4.ROTATION_X(-90);
        mtxPlane.scale(ƒ.Vector3.ONE(L11_TowerDefenseFire.sizeTerrain));
        let plane = new ƒAid.Node("Plane", mtxPlane, mtrPlane, meshPlane);
        return plane;
    }
    function createPath() {
        let path = new L11_TowerDefenseFire.Path();
        for (let i = 0; i <= L11_TowerDefenseFire.sizeTerrain; i++) {
            path.push(new ƒ.Vector3(i - L11_TowerDefenseFire.sizeTerrain / 2, 0, ƒ.Random.default.getRange(-L11_TowerDefenseFire.sizeTerrain, L11_TowerDefenseFire.sizeTerrain) / 4));
        }
        return path;
    }
    /*
    function createPickerTestCubes(): ƒ.Node {
      let cubes: ƒ.Node = new ƒ.Node("Cubes");
  
      let mtrWhite: ƒ.Material = new ƒ.Material("White", ƒ.ShaderFlat, new ƒ.CoatColored());
      let meshCube: ƒ.MeshCube = new ƒ.MeshCube();
  
      for (let i: number = 0; i < 0; i++) {
        let range: number = 4;
        let pos: ƒ.Vector3 = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range));
        let cube: ƒAid.Node = new ƒAid.Node("Cube" + i, ƒ.Matrix4x4.TRANSLATION(pos), mtrWhite, meshCube);
        cube.mtxLocal.scale(ƒ.Vector3.ONE(1));
        cube.addComponent(new ComponentPicker());
        cubes.addChild(cube);
      }
      return cubes;
    }
    function pointerMove(_event: ƒ.EventPointer): void {
      let posMouse: ƒ.Vector2 = new ƒ.Vector2(_event.canvasX, _event.canvasY);
      let cubes: ƒ.Node[] = viewport.getGraph().getChild(1).getChildren();
      let picked: { z: number; picker: ComponentPicker, name: string }[] = [];
      for (let cube of cubes) {
        let cmpPicker: ComponentPicker = cube.getComponent(ComponentPicker);
        let pickData: PickData = cmpPicker.pick(posMouse);
        let cmpMaterial: ƒ.ComponentMaterial = cube.getComponent(ƒ.ComponentMaterial);
        cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
        if (pickData) {
          cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
          picked.push({ z: pickData.clip.z, picker: cmpPicker, name: cube.name });
        }
      }
      picked.sort((_a, _b) => _a.z > _b.z ? 1 : -1);
      console.clear();
      console.table(picked);
      viewport.draw();
  
      for (let pick of picked)
        pick.picker.drawPickRadius(viewport);
    }
    */
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    class Path extends Array {
        // public waypoints: ƒ.Vector3[] = [];
        render(_viewport) {
            let crc2 = _viewport.getContext();
            let first = true;
            for (let waypoint of this) {
                let projection = L11_TowerDefenseFire.viewport.camera.project(waypoint);
                let posClient = L11_TowerDefenseFire.viewport.pointClipToClient(projection.toVector2());
                if (first)
                    crc2.moveTo(posClient.x, posClient.y);
                else
                    crc2.lineTo(posClient.x, posClient.y);
                first = false;
            }
            crc2.stroke();
        }
    }
    L11_TowerDefenseFire.Path = Path;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
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
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    var ƒAid = FudgeAid;
    let Tower = /** @class */ (() => {
        class Tower extends ƒ.Node {
            constructor(_name, _pos) {
                super(_name);
                this.health = 1;
                this.strength = 0.1;
                this.range = 4;
                this.rate = 0.5;
                this.timer = new ƒ.Timer(ƒ.Time.game, 500, 0, this.fire.bind(this));
                let base = new ƒAid.Node("Base", null, Tower.material, Tower.meshBase);
                this.top = new ƒAid.Node("Top", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), Tower.material, Tower.meshTop);
                let mtxTop = this.top.getComponent(ƒ.ComponentMesh).pivot;
                mtxTop.rotateZ(90);
                this.gun = new ƒAid.Node("Base", ƒ.Matrix4x4.IDENTITY(), Tower.material, Tower.meshGun);
                let mtxGun = this.gun.getComponent(ƒ.ComponentMesh).pivot;
                mtxGun.scale(new ƒ.Vector3(0.1, 0.1, 1));
                mtxGun.translateZ(0.5);
                this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
                this.addChild(base);
                this.addChild(this.top);
                this.top.addChild(this.gun);
            }
            follow(_enemy) {
                this.target = null;
                let distanceSquared = ƒ.Vector3.DIFFERENCE(this.mtxWorld.translation, _enemy.mtxWorld.translation).magnitudeSquared;
                if (distanceSquared > (this.range * this.range))
                    return;
                this.top.cmpTransform.lookAt(_enemy.mtxWorld.translation, ƒ.Vector3.Y());
                this.target = _enemy;
            }
            fire() {
                // console.log("Fire", this);
                if (!this.target)
                    return;
                let projectile = new L11_TowerDefenseFire.Projectile(this.top.mtxWorld.translation, this.target);
            }
        }
        Tower.material = new ƒ.Material("Tower", ƒ.ShaderFlat, new ƒ.CoatColored());
        Tower.meshBase = new ƒ.MeshPyramid();
        Tower.meshTop = new ƒ.MeshSphere(10, 4);
        Tower.meshGun = new ƒ.MeshCube();
        return Tower;
    })();
    L11_TowerDefenseFire.Tower = Tower;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
//# sourceMappingURL=TowerDefense.js.map