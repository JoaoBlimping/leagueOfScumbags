///<reference path="GuiElement.ts"/>

module Scumbag
{

  /** callback function for when the user activates something in the selector */
  function click()
  {
    this.go = true;
  }


  /** a selector thing that lets you choose from a bunch of options */
  export class SelectorElement extends GuiElement
  {
    image:        Phaser.Image;
    children:     GuiElement[];
    x = -99999;
    y = -99999;
    go = false;
    selection = 0;
    oldVerticalStick:number;


    /** creates a text thingy */
    constructor(game:Phaser.Game,key:string,children:GuiElement[])
    {
      super();
      this.image = game.add.image(this.x,this.y,key);
      this.children = children;
      InputManager.getInputDevice(0).addOnButtonPress(Button.a,click,this);

      this.oldVerticalStick = InputManager.getInputDevice(0).getAxisState(Axis.Vertical);

      let yPadding = 0;

      for (let i = 0;i < this.children.length;i++)
      {
        this.children[i].setPosition(this.image.x,
                                     this.image.y + yPadding);
        this.children[i].bringToFront();
        yPadding += this.children[i].getHeight() * 0.8;
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
    getWidth() {return 0}//TODO: this may need fixing


    /** implements GuiElement.getHeight */
    getHeight() {return 0}//TODO: this may need fixing


    /** implements GuiElement.update */
    update()
    {
      let verticalStick = InputManager.getInputDevice(0).getAxisState(Axis.Vertical);

      if (Math.abs(this.oldVerticalStick) < 0.5 &&
          Math.abs(verticalStick) > 0.5)
      {
        if (verticalStick > 0) this.selection++;
        else this.selection--;
      }

      this.oldVerticalStick = verticalStick;


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
