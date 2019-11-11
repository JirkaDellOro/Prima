namespace L07_FudgeCraft_Fragments {
    import ƒ = FudgeCore;

    export enum CUBE_TYPE {
        GREEN = "Green",
        RED = "Red",
        BLUE = "Blue"
    }
    type Materials = Map<CUBE_TYPE, ƒ.Material>;

    export class Cube extends ƒ.Node {
        private static mesh: ƒ.MeshCube = new ƒ.MeshCube();
        private static materials: Materials = Cube.createMaterials();

        constructor(_type: CUBE_TYPE, _position: ƒ.Vector3) {
            super("Cube");

            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Cube.mesh);
            this.addComponent(cmpMesh);

            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Cube.materials.get(_type));
            this.addComponent(cmpMaterial);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(ƒ.Vector3.ONE(0.9));
            this.addComponent(cmpTransform);
        }

        private static createMaterials(): Materials {
            return new Map([
                [CUBE_TYPE.RED, new ƒ.Material("Red", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.RED))],
                [CUBE_TYPE.GREEN, new ƒ.Material("Green", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.GREEN))],
                [CUBE_TYPE.BLUE, new ƒ.Material("Blue", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.BLUE))]
            ]);
        }
    }
}