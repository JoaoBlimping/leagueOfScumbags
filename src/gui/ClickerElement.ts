module Scumbag
{
  export class ClickerElement extends GuiElement
  {
    private image:        Phaser.Image;


    /** creates a text thingy */
    constructor(game:Phaser.Game)
    {
      super(false);
      this.image = game.add.image(0,0,'clicker');//TODO: bad
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


    /** implements GuiElement.getWidth */
    getWidth() {return this.image.width}


    /** implements GuiElement.getHeight */
    getHeight() {return this.image.height}


    /** implements GuiElement.update */
    update()
    {

      return 1;
    }
  }
}
