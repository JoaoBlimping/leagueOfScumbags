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
    constructor(bottom:boolean)
    {
      this.bottom = bottom;
    }


    /** brings the element to the front */
    abstract bringToFront():void;


    /** adds to the position of the gui element so that they can get moved
     * around no matter how their graphics representation works */
    abstract addPosition(x:number,y:number):void;


    /** sets the position of the gui element absolutely. this way it works
     * no matter what it uses to visualise itself */
    abstract setPosition(x:number,y:number):void;


    /** gives you the width of this element */
    abstract getWidth():number;


    /** gives you the height of this element */
    abstract getHeight():number;


    /** updates the gui element, which can return numbers if it does stuff like
     * a button or whatever */
    abstract update():number;
  }
}
