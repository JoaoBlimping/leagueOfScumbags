///<reference path="GuiElement.ts"/>


module Scumbag
{

  /** a stack that will hold other stuff in it */
  export class StackElement extends GuiElement
  {
    private children:     GuiElement[];
    x:                    number        = 0;
    y:                    number        = 0;

    /** creates the window, using the game thing to set up the size, and it's
     * renderer, and also a list of it's children */
    constructor(children:GuiElement[])
    {
      super();
      this.children = children;

      let yPadding = 0;

      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].setPosition(0,yPadding);
        this.children[i].bringToFront();
        yPadding += this.children[i].getHeight();
      }
    }


    /** implements GuiElement.bringToFront */
    bringToFront()
    {
      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].bringToFront();
      }
    }


    /** implements GuiElement.addPosition */
    addPosition(x:number,y:number)
    {
      this.x += x;
      this.y += y;
      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].addPosition(x,y);
      }
    }


    /** implements GuiElement.setPosition */
    setPosition(x:number,y:number)
    {
      let deltaX = x - this.x;
      let deltaY = y - this.y;

      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].addPosition(deltaX,deltaY);
      }

      this.x = x;
      this.y = y;
    }


    /** implements GuiElement.getX() */
    getX() {return this.x}


    /** implements GuiElement.getY() */
    getY() {return this.y}


    /** implements GuiElement.getWidth */
    getWidth()
    {
      let width = 0;

      for (let i = 0;i < this.children.length;i++)
      {
        if (this.children[i].getWidth() > width)
        {
          width = this.children[i].getWidth();
        }
      }
      return width;
    }


    /** implements GuiElement.getHeight */
    getHeight()
    {
      let height = 0;
      for (let i = 0;i < this.children.length;i++)
      {
        height += this.children[i].getHeight();
      }
      return height;
    }


    /** implements GuiElement.update */
    update()
    {
      for (let i = 0;i < this.children.length;i++)
      {
        let value = this.children[i].update();
        if (value != 0) return value;
      }
      return 0;
    }


    /** implements GuiElement.destroy */
    destroy()
    {
      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].destroy();
      }
    }
  }
}
