namespace L10_Doom_Mouse {
  import ƒ = FudgeCore;

  export class GameObject extends ƒ.Node {
    private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
    public mtxPivot: ƒ.Matrix4x4;
    public mtxPivotInverse: ƒ.Matrix4x4;
    public mtxComplete: ƒ.Matrix4x4;
    public mtxCompleteInverse: ƒ.Matrix4x4;

    public constructor(_name: string, _size: ƒ.Vector2, _position: ƒ.Vector3, _rotation: ƒ.Vector3) {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
      this.mtxLocal.rotation = _rotation;

      let cmpQuad: ƒ.ComponentMesh = new ƒ.ComponentMesh(GameObject.meshQuad);
      this.addComponent(cmpQuad);
      cmpQuad.pivot.scale(_size.toVector3(1));

      this.mtxPivot = this.getComponent(ƒ.ComponentMesh).pivot;
    }

    public calculateBounce(_posWith: ƒ.Vector3, _radius: number = 1): ƒ.Vector3 {
      // make sure inversions exist
      this.calculatePivotInverse();
      this.calculateCompleteAndInverse();

      // transform position and radius to mesh coordinates
      let posLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(_posWith, this.mtxCompleteInverse, true);
      let vctRadiusLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(ƒ.Vector3.X(_radius), this.mtxPivotInverse);

      // return if behind mesh or further away than radius. Prerequisite: pivot.z of this object hasn't been scaled!!
      if (posLocal.z < 0 || posLocal.z > _radius)
        return null;

      // return if further to the side than 0.5 (the half of the width of the mesh) plus the transformed radius
      if (Math.abs(posLocal.x) > 0.5 + vctRadiusLocal.x)
        return null;

      // bounce in system local to mesh
      posLocal.z = _radius * 1.001;

      // transform back to world system
      posLocal.transform(this.mtxComplete, true);

      return posLocal;
    }

    private calculatePivotInverse(): void {
      if (this.mtxPivotInverse) return;
      this.mtxPivotInverse = ƒ.Matrix4x4.INVERSION(this.mtxPivot);
    }

    private calculateCompleteAndInverse(): void {
      if (this.mtxComplete) return;
      this.mtxComplete = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, this.mtxPivot);
      this.mtxCompleteInverse = ƒ.Matrix4x4.MULTIPLICATION(this.mtxPivotInverse, this.mtxWorldInverse);
    }
  }
}