namespace L10_Doom_Mouse {
  import ƒ = FudgeCore;

  export class GameObject extends ƒ.Node {
    private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();

    public constructor(_name: string, _size: ƒ.Vector2, _position: ƒ.Vector3, _rotation: ƒ.Vector3) {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
      this.mtxLocal.rotation = _rotation;

      let cmpQuad: ƒ.ComponentMesh = new ƒ.ComponentMesh(GameObject.meshQuad);
      this.addComponent(cmpQuad);
      cmpQuad.pivot.scale(_size.toVector3(1));
    }

    public calculateBounce(_posWith: ƒ.Vector3, _radius: number = 1): ƒ.Vector3 {
      let normal: ƒ.Vector3 = this.mtxWorld.getZ();
      let posThis: ƒ.Vector3 = this.mtxWorld.translation;

      let difference: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(_posWith, posThis);
      let distance: number = ƒ.Vector3.DOT(difference, normal);

      if (distance < 0 || distance > _radius)
        return null;

      let size: ƒ.Vector3 = this.getComponent(ƒ.ComponentMesh).pivot.scaling;
      let ray: ƒ.Ray = new ƒ.Ray(normal, _posWith);
      let intersect: ƒ.Vector3 = ray.intersectPlane(posThis, normal);

      let localIntersect: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(intersect, this.mtxWorldInverse, true);

      if (Math.abs(localIntersect.x) - _radius > 0.5 * size.x)
        return null;

      normal.scale(1.001);
      return ƒ.Vector3.SUM(intersect, normal);
    }
  }
}