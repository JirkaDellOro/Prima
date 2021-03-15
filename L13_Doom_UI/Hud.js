"use strict";
var L13_Doom_UI;
(function (L13_Doom_UI) {
    var ƒUi = FudgeUserInterface;
    class GameState extends ƒ.Mutable {
        constructor() {
            super(...arguments);
            this.health = 100;
            this.score = 0;
            this.ammo = 100;
        }
        reduceMutator(_mutator) { }
    }
    L13_Doom_UI.GameState = GameState;
    L13_Doom_UI.gameState = new GameState();
    class Hud {
        static start() {
            let domHud = document.querySelector("div#hud");
            Hud.controller = new ƒUi.Controller(L13_Doom_UI.gameState, domHud);
            Hud.controller.updateUserInterface();
        }
    }
    L13_Doom_UI.Hud = Hud;
})(L13_Doom_UI || (L13_Doom_UI = {}));
//# sourceMappingURL=Hud.js.map