module Scumbag
{
  export namespace Util
  {
    /** returns 1 when the value is greater than one, otherwise it returns 0 */
    export function slow(value:{x:number,y:number}):void
    {
      if (value.x > 1) value.x = 1;
      else if (value.x < -1) value.x = -1;
      else value.x = 0;

      if (value.y > 1) value.y = 1;
      else if (value.y < -1) value.y = -1;
      else value.y = 0;
    }

    /** takes either an angle in degrees or a direction like left and turns it into
     * radians */
    export function evaluateDirection(direction:string):number
    {
      if (direction == "up") return Math.PI / 2;
      else if (direction == "left") return Math.PI;
      else if (direction == "down") return -1 * Math.PI / 2;
      else if (direction == "right") return 0;
      else return parseInt(direction);
    }

  };

};
