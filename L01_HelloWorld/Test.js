"use strict";
var L01_HelloWorld;
(function (L01_HelloWorld) {
    console.log("Hello World");
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.body.innerHTML = "Hello World";
    }
})(L01_HelloWorld || (L01_HelloWorld = {}));
//# sourceMappingURL=Test.js.map