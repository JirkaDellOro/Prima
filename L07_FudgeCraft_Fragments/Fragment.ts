namespace L07_FudgeCraft_Fragments {
    import ƒ = FudgeCore;

    export class Fragment extends ƒ.Node {
        private static shapes: number[][][] = Fragment.getShapeArray();
        public position: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);

        constructor(_shape: number) {
            super("Fragment-Type" + _shape);
            let shape: number [][] = Fragment.shapes[_shape];
            let type: CUBE_TYPE = CUBE_TYPE.RED;
            for (let position of shape) {
                let vctPosition: ƒ.Vector3 = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube: Cube = new Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }

        private static getShapeArray(): number[][][] {
            return [
                // small flat L
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]
            ];
        }
    }
}