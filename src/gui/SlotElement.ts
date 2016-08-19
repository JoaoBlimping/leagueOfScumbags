///<reference path="GuiElement.ts"/>

module Scumbag
{

  /** callback function for when the user activates something in the selector */
  function click()
  {
    this.go = true;
  }


  /** a selector thing that lets you choose from a bunch of options */
  export class SlotElement extends GuiElement
  {
    image:        Phaser.Image;
    children:     GuiElement[];
    x = 0;
    y = 0;
    go = false;
    selection = 0;
    oldHorizontalStick:number;


    /** creates a text thingy */
    constructor(game:Phaser.Game,key:string,children:GuiElement[])
    {
      super();
      this.image = game.add.image(0,0,key);
      this.children = children;
      InputManager.getInputDevice(0).addOnButtonPress(Button.a,click,this);

      this.oldHorizontalStick = InputManager.getInputDevice(0).getAxisState(Axis.Horizontal);

      let xPadding = 0;

      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].setPosition(this.image.x + xPadding,
                                     this.image.y);
        this.children[i].bringToFront();
        xPadding += this.children[i].getWidth() * 1.5;
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

    }


    /** overrides GuiElement.setPosition */
    addPosition(x:number,y:number)
    {
      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].addPosition(x,y);
      }
    }


    /** overrides GuiElement.setPosition */
    setPosition(x:number,y:number)
    {
      let deltaX = x - this.x;
      let deltaY = y - this.y;

      this.x += deltaX;
      this.y += deltaY;

      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].addPosition(deltaX,deltaY);
      }
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
        width += this.children[i].width;
      }
      return width;
    }


    /** implements GuiElement.getHeight */
    getHeight()
    {
      let height = 0;
      for (let i = 0;i < this.children.length;i++)
      {
        if (this.children[i].getHeight() > height)
        {
          height = this.children[i].getHeight();
        }
      }
      return height;
    }


    /** implements GuiElement.update */
    update()
    {
      let horizontalStick = InputManager.getInputDevice(0).getAxisState(Axis.Horizontal);

      if (Math.abs(this.oldHorizontalStick) < 0.5 &&
          Math.abs(horizontalStick) > 0.5)
      {
        if (horizontalStick > 0) this.selection++;
        else this.selection--;
      }

      this.oldHorizontalStick = horizontalStick;


      if (this.selection >= this.children.length) this.selection = 0;
      if (this.selection < 0) this.selection = this.children.length - 1;

      this.image.x = this.children[this.selection].getX();
      this.image.y = this.children[this.selection].getY();
      this.image.width = this.children[this.selection].getWidth();
      this.image.height = this.children[this.selection].getHeight();

      if (this.go) return this.selection + 1;
      else return 0;
    }


    /** implements GuiElement.destroy */
    destroy()
    {
      InputManager.getInputDevice(0).removeOnButtonPress(Button.a,click);
      this.image.destroy();
      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].destroy();
      }
    }
  }
}
