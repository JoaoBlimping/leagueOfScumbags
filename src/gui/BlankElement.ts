///<reference path="GuiElement.ts"/>


module Scumbag
{

  function click()
  {
    this.go = true;
  }


  export class BlankElement extends GuiElement
  {



    /** implements GuiElement.bringToFront */
    bringToFront()
    {
    }


    /** overrides GuiElement.setPosition */
    addPosition(x:number,y:number)
    {

    }


    /** overrides GuiElement.setPosition */
    setPosition(x:number,y:number)
    {

    }


    /** implements GuiElement.getX() */
    getX() {return 0}


    /** implements GuiElement.getY() */
    getY() {return 0}


    /** implements GuiElement.getWidth */
    getWidth() {return 0}


    /** implements GuiElement.getHeight */
    getHeight() {return 0}


    /** implements GuiElement.update */
    update()
    {
      return 0;
    }


    /** implements GuiElement.destroy */
    destroy()
    {

    }
  }
}
