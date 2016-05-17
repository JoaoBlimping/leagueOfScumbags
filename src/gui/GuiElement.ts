module Scumbag
{
  /** the basic shit for gui elements yeah yea
   * width sets the width of the element
   * height sets the height of the element
   * bottom sets whether to display the element at the bottom of the area it is
   * in, otherwise it's displayed at the top of it.
   * It's ok to use absolute widths and stuff since the game has a set screen
   * size. */
  export abstract class GuiElement
  {
    width:    number;
    height:   number;
    bottom:   boolean;


    /** just sets all this stuff */
    constructor(width:number,height:number,bottom:boolean)
    {
      this.width = width;
      this.height = height;
      this.bottom = bottom;
    }

    /** updates the gui element, which can return numbers if it does stuff like
     * a button or whatever */
    abstract update():number;
  }
}
