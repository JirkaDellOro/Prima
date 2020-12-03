"use strict";
var L13_Doom_UI;
(function (L13_Doom_UI) {
    class Hud {
        static displayPosition(_position) {
            let divPosition = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }
    }
    L13_Doom_UI.Hud = Hud;
})(L13_Doom_UI || (L13_Doom_UI = {}));
//# sourceMappingURL=Hud.js.map