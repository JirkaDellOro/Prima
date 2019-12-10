namespace L10_FudgeCraft_DetectCombos {
    export class Combos {
        found: GridElement[][] = [];

        constructor(_elements: GridElement[]) {
            this.detect(_elements);
        }

        private detect(_elements: GridElement[]): void {
            for (let element of _elements) {
                if (this.contains(element))
                    continue;
                let combo: GridElement[] = [];
                combo.push(element);
                this.recurse(element, combo);
                this.found.push(combo);
            }
        }

        private contains(_element: GridElement): boolean {
            for (let combo of this.found)
                for (let element of combo)
                    if (element == _element)
                        return true;
            return false;
        }

        private recurse(_element: GridElement, _combo: GridElement[]): void {
            let matches: GridElement[] = this.findNeigborsOfSameColor(_element);
            for (let iMatch: number = matches.length - 1; iMatch >= 0; iMatch--) {
                let match: GridElement = matches[iMatch];
                let iCombo: number = _combo.indexOf(match);
                if (iCombo >= 0)
                    matches.splice(iMatch);
                else
                    _combo.push(match);
            }

            for (let match of matches)
                this.recurse(match, _combo);
        }

        private findNeigborsOfSameColor(_element: GridElement): GridElement[] {
            let all: GridElement[] = grid.findNeigbors(_element.cube.cmpTransform.local.translation);
            let found: GridElement[] = all.filter(
                _neighbor => (_neighbor.cube.name == _element.cube.name)
            );
            return found;
        }
    }
}