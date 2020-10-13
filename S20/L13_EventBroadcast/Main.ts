namespace L13_EventBroadcast {
  console.log("Starting Events");
  import ƒ = FudgeCore;

  let parent: ƒ.Node = new ƒ.Node("Parent");
  let child0: ƒ.Node = new ƒ.Node("Child0");
  let child1: ƒ.Node = new ƒ.Node("Child1");

  parent.appendChild(child0);
  parent.appendChild(child1);

  child0.addEventListener("broadcast", handler, true);
  child1.addEventListener("broadcast", handler, true);
  parent.addEventListener("bubble", handler);
  
  let eventBroadcast: CustomEvent = new CustomEvent("broadcast");
  parent.broadcastEvent(eventBroadcast);
  
  let eventBubble: CustomEvent = new CustomEvent("bubble", {bubbles: true});
  child0.dispatchEvent(eventBubble);


  function handler(_event: Event): void {
    console.log(_event.type, (<ƒ.Node>_event.target).name, (<ƒ.Node>_event.currentTarget).name);
  }
}