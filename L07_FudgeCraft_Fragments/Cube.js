"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var ƒ = FudgeCore;
    let CUBE_TYPE;
    (function (CUBE_TYPE) {
        CUBE_TYPE["GREEN"] = "Green";
        CUBE_TYPE["RED"] = "Red";
        CUBE_TYPE["BLUE"] = "Blue";
    })(CUBE_TYPE = L07_FudgeCraft_Fragments.CUBE_TYPE || (L07_FudgeCraft_Fragments.CUBE_TYPE = {}));
    class Cube extends ƒ.Node {
        constructor(_type, _position) {
            super("Cube");
            let cmpMesh = new ƒ.ComponentMesh(Cube.mesh);
            this.addComponent(cmpMesh);
            let cmpMaterial = new ƒ.ComponentMaterial(Cube.materials.get(_type));
            this.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(ƒ.Vector3.ONE(0.9));
            this.addComponent(cmpTransform);
        }
        static createMaterials() {
            return new Map([
                [CUBE_TYPE.RED, new ƒ.Material("Red", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.RED))],
                [CUBE_TYPE.GREEN, new ƒ.Material("Green", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.GREEN))],
                [CUBE_TYPE.BLUE, new ƒ.Material("Blue", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.BLUE))]
            ]);
        }
    }
    Cube.mesh = new ƒ.MeshCube();
    Cube.materials = Cube.createMaterials();
    L07_FudgeCraft_Fragments.Cube = Cube;
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Cube.js.map