"use strict";
var L12_FudgeCraft_Points;
(function (L12_FudgeCraft_Points) {
    class DomLabel {
        constructor(_domElement, _node) {
            this.lifeTime = DomLabel.maxLifeTime;
            this.domElement = _domElement;
            this.posWorld = _node.mtxWorld.translation.copy;
        }
        place(_viewport, _lapse) {
            let projection = _viewport.camera.project(this.posWorld);
            let position = _viewport.pointClipToClient(projection.toVector2());
            position = _viewport.pointClientToScreen(position);
            this.lifeTime -= _lapse;
            if (this.lifeTime < 0)
                return false;
            this.domElement.style.left = position.x + "px";
            this.domElement.style.top = (position.y - 40 + 40 * this.lifeTime / DomLabel.maxLifeTime) + "px";
            // let posNew: string = (parseInt(domLabel.domElement.style.top) - 2) + "px";
            //   domLabel.domElement.style.top = posNew;
            return true;
        }
    }
    DomLabel.maxLifeTime = 1000; // in milliseconds
    class Points extends Array {
        constructor(_viewport) {
            super();
            this.time = new L12_FudgeCraft_Points.ƒ.Time();
            this.animate = (_event) => {
                let lapse = _event.target.lapse;
                for (let i = this.length - 1; i >= 0; i--) {
                    let domLabel = this[i];
                    let stillAlive = domLabel.place(this.viewport, lapse);
                    if (stillAlive)
                        continue;
                    this.remove(i);
                }
            };
            this.viewport = _viewport;
            this.time.setTimer(40, 0, this.animate);
        }
        showCombo(_combo, _iCombo) {
            let points = 1;
            for (let element of _combo) {
                this.create(element, points);
                points *= 2;
            }
        }
        create(_element, _points) {
            let domPoints = document.createElement("span");
            let domLabel = new DomLabel(domPoints, _element.cube);
            document.querySelector("div#PointsAnimation").appendChild(domLabel.domElement);
            domPoints.textContent = "+" + _points; //.toString();
            domPoints.style.color = _element.cube.getColor().getCSS();
            this.push(domLabel);
        }
        remove(_index) {
            let domLabel = this[_index];
            domLabel.domElement.parentNode.removeChild(domLabel.domElement);
            this.splice(_index, 1);
        }
    }
    L12_FudgeCraft_Points.Points = Points;
})(L12_FudgeCraft_Points || (L12_FudgeCraft_Points = {}));
//# sourceMappingURL=Points.js.map