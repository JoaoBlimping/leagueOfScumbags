///<reference path="GuiElement.ts"/>


module Scumbag
{
  /** used to display text in the gui */
  export class TextElement extends GuiElement
  {
    text:   Phaser.Text;


    /** creates a text thingy */
    constructor(game:Phaser.Game,content:string,
                style:{font:string,fill:string})
    {
      super();
      this.text = game.add.text(0,0,content,style);
      this.text.setShadow(1,1,'rgba(0,0,0,1)',4);
    }


    /** implements GuiElement.bringToFront */
    bringToFront()
    {
      this.text.bringToTop();
    }


    /** overrides GuiElement.setPosition */
    addPosition(x:number,y:number)
    {
      this.text.x += x;
      this.text.y += y;
    }


    /** overrides GuiElement.setPosition */
    setPosition(x:number,y:number)
    {
      this.text.x = x;
      this.text.y = y;
    }


    /** implements GuiElement.getX() */
    getX() {return this.text.x}


    /** implements GuiElement.getY() */
    getY() {return this.text.y}


    /** implements GuiElement.getWidth */
    getWidth() {return this.text.width}


    /** implements GuiElement.getHeight */
    getHeight() {return this.text.height}


    /** implements GuiElement.update */
    update() {return 0}


    /** implements GuiElement.destroy */
    destroy()
    {
      this.text.destroy();
    }
  }
}
