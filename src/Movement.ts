module Scumbag
{
  /** the different types of movement that there can be
   * Walk is for where they are walking to a region
   * Wait is where they are doing nothing for a period of time */
  export enum MovementType
  {
    Walk,
    Wait
  }

  export function printMovementType(move:MovementType):void
  {
    if (move == MovementType.Walk) console.log("walk");
    else if (move == MovementType.Wait) console.log("wait");
  }

  /** a movememnt that can tell an actor to move about the place */
  export interface Movement
  {
    type:     MovementType;
    waitTime: number;
    region:   Region;
  }

  /** converts a string to a movement */
  export function stringToMovement(data:string,
                                   regions:{[name:string]:Region}):Movement
  {
    if (data.charAt(0) == '#')
    {
      return {type:MovementType.Wait,waitTime:parseInt(data.substring(1)),
              region:regions[0]};
    }
    else return {type:MovementType.Walk,waitTime:0,region:regions[data]};
  }
}
