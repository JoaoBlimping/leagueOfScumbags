module Scumbag
{
  /** directions are used to tell which way actors are moving */
  export const enum Direction
  {
    up,
    down,
    left,
    right,
    static
  }

  /** turns directions into points */
  export function directionToPoint(direction:Direction):{x:number,y:number}
  {
    if (direction == Direction.up) return {x:0,y:-1};
    else if (direction == Direction.down) return {x:0,y:1};
    else if (direction == Direction.left) return {x:-1,y:0};
    else if (direction == Direction.right) return {x:1,y:0};
    else return {x:0,y:0};
  }


  /** logs a direction in english */
  export function logDirection(direction:Direction):void
  {
    if (direction == Direction.up) console.log("up");
    else if (direction == Direction.down) console.log("down");
    else if (direction == Direction.left) console.log("left");
    else if (direction == Direction.right) console.log("right");
    else console.log("static");
  }
}
