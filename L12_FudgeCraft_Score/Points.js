"use strict";
var L12_FudgeCraft_Score;
(function (L12_FudgeCraft_Score) {
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
            return true;
        }
    }
    DomLabel.maxLifeTime = 1000; // in milliseconds
    class Points extends Array {
        constructor(_viewport, _domScore) {
            super();
            this.score = 0;
            this.time = new L12_FudgeCraft_Score.ƒ.Time();
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
            this.domScore = _domScore;
            this.time.setTimer(40, 0, this.animate);
        }
        showCombo(_combo, _iCombo) {
            let points = Math.pow(2, _iCombo - 1);
            for (let element of _combo) {
                this.create(element, points);
                points *= 2;
            }
            this.score += points;
            this.domScore.textContent = _iCombo + ". combo: " + _combo.length + " cubes = " + points + " | total: " + this.score;
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
    L12_FudgeCraft_Score.Points = Points;
})(L12_FudgeCraft_Score || (L12_FudgeCraft_Score = {}));
//# sourceMappingURL=Points.js.map