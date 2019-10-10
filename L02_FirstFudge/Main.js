"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        console.log(canvas);
        let viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", null, null, canvas);
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map