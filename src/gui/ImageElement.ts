///<reference path="GuiElement.ts"/>


module Scumbag
{
  /** used to display text in the gui */
  export class ImageElement extends GuiElement
  {
    image:   Phaser.Image;


    /** creates a text thingy */
    constructor(game:Phaser.Game,key:string)
    {
      super();
      this.image = game.add.image(0,0,key);
    }


    /** implements GuiElement.bringToFront */
    bringToFront()
    {
      this.image.bringToTop();
    }


    /** overrides GuiElement.setPosition */
    addPosition(x:number,y:number)
    {
      this.image.x += x;
      this.image.y += y;
    }


    /** overrides GuiElement.setPosition */
    setPosition(x:number,y:number)
    {
      this.image.x = x;
      this.image.y = y;
    }


    /** implements GuiElement.getX() */
    getX() {return this.image.x}


    /** implements GuiElement.getY() */
    getY() {return this.image.y}


    /** implements GuiElement.getWidth */
    getWidth() {return this.image.width}


    /** implements GuiElement.getHeight */
    getHeight() {return this.image.height}


    /** implements GuiElement.update */
    update() {return 0}


    /** implements GuiElement.destroy */
    destroy()
    {
      this.image.destroy();
    }
  }
}
