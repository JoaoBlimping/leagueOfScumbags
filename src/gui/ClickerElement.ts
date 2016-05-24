///<reference path="GuiElement.ts"/>


module Scumbag
{

  function click()
  {
    this.go = true;
  }


  export class ClickerElement extends GuiElement
  {
    private image:        Phaser.Image;
    private go = false;


    /** creates a text thingy */
    constructor(game:Phaser.Game,key:string)
    {
      super(false);
      this.image = game.add.image(0,0,key);
      InputManager.getInputDevice(0).addOnButtonPress(Button.a,click,this);
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
    update()
    {
      if (this.go) return 1;
      else return 0;
    }


    /** implements GuiElement.destroy */
    destroy()
    {
      InputManager.getInputDevice(0).removeOnButtonPress(Button.a,click);
      this.image.destroy();
    }
  }
}
