namespace L08_FudgeCraft_Collision {
    import ƒ = FudgeCore;

    export interface Transformation {
        translation?: ƒ.Vector3;
        rotation?: ƒ.Vector3;
    }

    export interface Transformations {
        [keycode: string]: Transformation;
    }

    export class Control extends ƒ.Node {
        public static transformations: Transformations = Control.defineControls();
        private fragment: Fragment;

        constructor() {
            super("Control");
            this.addComponent(new ƒ.ComponentTransform());
        }


        public static defineControls(): Transformations {
            let controls: Transformations = {};
            controls[ƒ.KEYBOARD_CODE.ARROW_UP] = { rotation: ƒ.Vector3.X(-1) };
            controls[ƒ.KEYBOARD_CODE.ARROW_DOWN] = { rotation: ƒ.Vector3.X(1) };
            controls[ƒ.KEYBOARD_CODE.ARROW_LEFT] = { rotation: ƒ.Vector3.Y(-1) };
            controls[ƒ.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: ƒ.Vector3.X(1) };
            controls[ƒ.KEYBOARD_CODE.W] = { translation: ƒ.Vector3.Z(-1) };
            controls[ƒ.KEYBOARD_CODE.S] = { translation: ƒ.Vector3.Z(1) };
            controls[ƒ.KEYBOARD_CODE.A] = { translation: ƒ.Vector3.X(-1) };
            controls[ƒ.KEYBOARD_CODE.D] = { translation: ƒ.Vector3.X(1) };
            controls[ƒ.KEYBOARD_CODE.Q] = { translation: ƒ.Vector3.Y(1) };
            controls[ƒ.KEYBOARD_CODE.E] = { translation: ƒ.Vector3.Y(-1) };
            return controls;
        }

        public setFragment(_fragment: Fragment): void {
            for (let child of this.getChildren())
                this.removeChild(child);
            this.appendChild(_fragment);
            this.fragment = _fragment;
        }

        public move(_transformation: Transformation): void {
            let mtxContainer: ƒ.Matrix4x4 = this.cmpTransform.local;
            let mtxFragment: ƒ.Matrix4x4 = this.fragment.cmpTransform.local;
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);
        }
    }
}
