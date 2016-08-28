module Scumbag
{
  /** this is how you will address all the buttons */
  export const enum Button
  {
    a,
    b,
    x,
    y,
    l,
    r,
    select,
    start,
    lTrigger,
    rTrigger,
    nButtons
  }


  /** this is how you address all the axes */
  export const enum Axis
  {
    Horizontal,
    Vertical,
    nAxes
  }


  /** An abstract input device which can actually be any device, but will appear
   * to the programmer as if it were a gamepad */
  export abstract class InputDevice
  {
    /** tells you the state of a button */
    abstract getButtonState(button:Button):boolean;


    /** tells you the state of an axis */
    abstract getAxisState(axis:Axis):number;


    /** lets you put a callback function on a button. You'll probably want to
      * not use an anonymous function so that you can remove it again when you
      * are done */
    abstract addOnButtonPress(button:Button,callback:Function,context:any):void;


    /** removes a given function from getting called by a given button being
     * pressed */
    abstract removeOnButtonPress(button:Button,callback:Function):void;

    /** remove all callbacks from the device */
    abstract clear():void;
  }
}
