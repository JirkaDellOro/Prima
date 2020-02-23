"use strict";
var L13_Craftris;
(function (L13_Craftris) {
    var ƒ = FudgeCore;
    let CUBE_TYPE;
    (function (CUBE_TYPE) {
        CUBE_TYPE["GREEN"] = "Green";
        CUBE_TYPE["RED"] = "Red";
        CUBE_TYPE["BLUE"] = "Blue";
        CUBE_TYPE["YELLOW"] = "Yellow";
        CUBE_TYPE["MAGENTA"] = "Magenta";
        CUBE_TYPE["CYAN"] = "Cyan";
        CUBE_TYPE["BLACK"] = "Black";
    })(CUBE_TYPE = L13_Craftris.CUBE_TYPE || (L13_Craftris.CUBE_TYPE = {}));
    class Cube extends ƒ.Node {
        constructor(_type, _position) {
            super("Cube." + _type);
            let cmpMesh = new ƒ.ComponentMesh(Cube.mesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.9));
            this.addComponent(cmpMesh);
            let cmpMaterial = new ƒ.ComponentMaterial(Cube.materials.get(_type));
            this.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
            this.addComponent(cmpTransform);
        }
        static createMaterials() {
            let alpha = 0.9;
            return new Map([
                [CUBE_TYPE.RED, new ƒ.Material(CUBE_TYPE.RED, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("RED", alpha)))],
                [CUBE_TYPE.GREEN, new ƒ.Material(CUBE_TYPE.GREEN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("LIME", alpha)))],
                [CUBE_TYPE.BLUE, new ƒ.Material(CUBE_TYPE.BLUE, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("BLUE", alpha)))],
                [CUBE_TYPE.MAGENTA, new ƒ.Material(CUBE_TYPE.MAGENTA, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("MAGENTA", alpha)))],
                [CUBE_TYPE.YELLOW, new ƒ.Material(CUBE_TYPE.YELLOW, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("YELLOW", alpha)))],
                [CUBE_TYPE.CYAN, new ƒ.Material(CUBE_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("CYAN", alpha)))],
                [CUBE_TYPE.BLACK, new ƒ.Material(CUBE_TYPE.BLACK, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("BLACK", alpha)))]
            ]);
        }
        getColor() {
            return this.getComponent(ƒ.ComponentMaterial).material.getCoat().color;
        }
    }
    Cube.mesh = new ƒ.MeshCube();
    Cube.materials = Cube.createMaterials();
    L13_Craftris.Cube = Cube;
})(L13_Craftris || (L13_Craftris = {}));
//# sourceMappingURL=Cube.js.map