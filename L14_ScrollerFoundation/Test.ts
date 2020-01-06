namespace L14_ScrollerFoundation {
  import ƒ = FudgeCore;
  
  window.addEventListener("load", test);

  function test(): void {
    let img: HTMLImageElement = document.querySelector("img");
    let txtImage: ƒ.TextureImage = new ƒ.TextureImage();
    txtImage.image = img;

    let sprite: Sprite = new Sprite("Test");
    let rects: ƒ.Rectangle[] = [
      new ƒ.Rectangle(0, 0, 100, 100),
      new ƒ.Rectangle(0, 0, 50, 50),
      new ƒ.Rectangle(50, 50, 50, 50),
      new ƒ.Rectangle(25, 25, 50, 50)
    ];  

    sprite.generate(txtImage, rects, 100, ƒ.ORIGIN2D.BOTTOMCENTER);
  }
}