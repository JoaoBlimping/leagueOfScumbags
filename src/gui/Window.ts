///<reference path="GuiElement.ts"/>


module Scumbag
{
  const padding = 4;

  /** a window that will hold other stuff in it */
  export class Window extends GuiElement
  {
    private children:     GuiElement[];
    private image:        Phaser.Image;
    private chip:         Phaser.Image  = null;

    /** creates the window, using the game thing to set up the size, and it's
     * renderer, and also a list of it's children */
    constructor(game:Phaser.Game,key:string,children:GuiElement[],
                chipKey?:string)
    {
      super();
      this.children = children;

      this.image = game.add.image(0,game.height - game.height / 4,key);
      this.image.width = game.width;
      this.image.height = game.height / 4;


      let xPadding = padding;
      let yPadding = padding;

      if (chipKey != null)
      {
        this.chip = game.add.image(0,0,chipKey);
        this.chip.y = game.height - this.chip.height;
        xPadding += this.chip.width;
      }

      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].setPosition(this.image.x + xPadding,
                                     this.image.y + yPadding);
        this.children[i].bringToFront();
        yPadding += this.children[i].getHeight();
      }
    }


    /** implements GuiElement.bringToFront */
    bringToFront()
    {
      this.image.bringToTop();
      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].bringToFront();
      }
      if (this.chip != null) this.chip.bringToTop();
    }


    /** implements GuiElement.addPosition */
    addPosition(x:number,y:number)
    {
      this.image.x += x;
      this.image.y += y;

      if (this.chip != null)
      {
        this.chip.x += x;
        this.chip.y += y;
      }

      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].addPosition(x,y);
      }
    }


    /** implements GuiElement.setPosition */
    setPosition(x:number,y:number)
    {
      let deltaX = x - this.image.x;
      let deltaY = y - this.image.y;

      this.image.x += deltaX;
      this.image.y += deltaY

      if (this.chip != null)
      {
        this.chip.x += deltaX;
        this.chip.y += deltaY;
      }

      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].addPosition(deltaX,deltaY);
      }
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
      this.image.destroy();
      if (this.chip != null) this.chip.destroy();
      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].destroy();
      }
    }
  }
}
