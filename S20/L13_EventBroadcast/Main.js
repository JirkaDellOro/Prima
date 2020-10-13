"use strict";
var L13_EventBroadcast;
(function (L13_EventBroadcast) {
    console.log("Starting Events");
    var ƒ = FudgeCore;
    let parent = new ƒ.Node("Parent");
    let child0 = new ƒ.Node("Child0");
    let child1 = new ƒ.Node("Child1");
    parent.appendChild(child0);
    parent.appendChild(child1);
    child0.addEventListener("broadcast", handler, true);
    child1.addEventListener("broadcast", handler, true);
    parent.addEventListener("bubble", handler);
    let eventBroadcast = new CustomEvent("broadcast");
    parent.broadcastEvent(eventBroadcast);
    let eventBubble = new CustomEvent("bubble", { bubbles: true });
    child0.dispatchEvent(eventBubble);
    function handler(_event) {
        console.log(_event.type, _event.target.name, _event.currentTarget.name);
    }
})(L13_EventBroadcast || (L13_EventBroadcast = {}));
//# sourceMappingURL=Main.js.map