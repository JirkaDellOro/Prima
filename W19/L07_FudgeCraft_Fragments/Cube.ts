namespace L07_FudgeCraft_Fragments {
    import ƒ = FudgeCore;

    export enum CUBE_TYPE {
        GREEN = "Green",
        RED = "Red",
        BLUE = "Blue",
        YELLOW = "Yellow",
        MAGENTA = "Magenta",
        CYAN = "Cyan"
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
                [CUBE_TYPE.RED, new ƒ.Material(CUBE_TYPE.RED, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("RED")))],
                [CUBE_TYPE.GREEN, new ƒ.Material(CUBE_TYPE.GREEN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")))],
                [CUBE_TYPE.BLUE, new ƒ.Material(CUBE_TYPE.BLUE, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")))],
                [CUBE_TYPE.MAGENTA, new ƒ.Material(CUBE_TYPE.MAGENTA, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("MAGENTA")))],
                [CUBE_TYPE.YELLOW, new ƒ.Material(CUBE_TYPE.YELLOW, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("YELLOW")))],
                [CUBE_TYPE.CYAN, new ƒ.Material(CUBE_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("CYAN")))]
            ]);
        }
    }
}