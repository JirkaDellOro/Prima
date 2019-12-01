namespace L09_FudgeCraft_CameraControl {
    import ƒ = FudgeCore;

    export class CameraOrbit extends ƒ.Node {
        //rotatorX: ƒ.Node;
        maxRotX: number = 75;
        minDistance: number = 10;

        constructor(_maxRotX: number) {
            super("CameraOrbit");

            this.maxRotX = Math.min(_maxRotX, 89);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
            this.addComponent(cmpTransform);

            let rotatorX: ƒ.Node = new ƒ.Node("CameraRotX");
            rotatorX.addComponent(new ƒ.ComponentTransform());
            this.appendChild(rotatorX);

            let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
            cmpCamera.backgroundColor = ƒ.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
        }

        get cmpCamera(): ƒ.ComponentCamera {
            return this.rotatorX.getComponent(ƒ.ComponentCamera);
        }

        get rotatorX(): ƒ.Node {
            return this.getChildrenByName("CameraRotX")[0];
        }

        setDistance(_distance: number): void {
            let newDistance: number = Math.max(this.minDistance, _distance);
            this.cmpCamera.pivot.translation = ƒ.Vector3.Z(newDistance);
        }

        moveDistance(_delta: number): void {
            this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
        }

        setRotationY(_angle: number): void {
            this.cmpTransform.local.rotation = ƒ.Vector3.Y(_angle);
        }

        setRotationX(_angle: number): void {
            // @Jonas: rotation.z = ... verändert nur die Koordinate einer Kopie
            _angle = Math.min(Math.max(-this.maxRotX, _angle), this.maxRotX);
            this.rotatorX.cmpTransform.local.rotation = ƒ.Vector3.X(_angle);
        }

        rotateY(_delta: number): void {
            this.cmpTransform.local.rotateY(_delta);
        }
        
        rotateX(_delta: number): void {
            let angle: number = this.rotatorX.cmpTransform.local.rotation.x + _delta;
            this.setRotationX(angle);
        }
        translate(_delta: number): void {
            let distance: number = this.cmpCamera.pivot.translation.z + _delta;
            this.setDistance(distance);
        }
    }
}
