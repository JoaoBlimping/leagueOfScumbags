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

  };

};
