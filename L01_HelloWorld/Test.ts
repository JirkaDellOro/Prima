namespace L01_HelloWorld {
    console.log("Hello World");
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        document.body.innerHTML = "Hello World";
    }
}