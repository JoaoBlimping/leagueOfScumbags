module Scumbag
{
  /** the different types of movement that there can be
   * Walk is for where they are walking to a region
   * Wait is where they are doing nothing for a period of time
   * Towards is where they walk toward a certain actor for a certain time
   * angle is where they walk at a certain angle for a certain time */
  export enum MovementType
  {
    Walk,
    Wait,
    Towards,
    Angle
  }

  /** outputs to the console what movememnt type it is given */
  export function printMovementType(move:MovementType):void
  {
    if (move == MovementType.Walk) console.log("walk");
    else if (move == MovementType.Wait) console.log("wait");
    else if (move == MovementType.Towards) console.log("towards");
    else if (move == MovementType.Angle) console.log("angle");
  }

  /** a movememnt that can tell an actor to move about the place */
  export interface Movement
  {
    type:     MovementType;
    waitTime: number;
    region:   Region;
    actorName:string;
    angle:    number;
  }

  /** converts a string to a movement */
  export function stringToMovement(data:string,
                                   regions:{[name:string]:Region}):Movement
  {
    if (data.charAt(0) == '#')
    {
      return {type:MovementType.Wait,waitTime:parseInt(data.substring(1)),
              region:regions[0],actorName:"",angle:0};
    }
    else if (data.charAt(0) == '&')
    {
      var tokens = data.substring(1).split('#');
      return {type:MovementType.Towards,waitTime:parseInt(tokens[1]),
              region:regions[0],actorName:tokens[0],angle:0};
    }
    else if (data.charAt(0) == '^')
    {
      var tokens = data.substring(1).split('#');
      return {type:MovementType.Angle,waitTime:parseInt(tokens[1]),
              region:regions[0],actorName:"",angle:Util.evaluateDirection(tokens[0])};
    }

    else return {type:MovementType.Walk,waitTime:0,region:regions[data],actorName:"",
                 angle:0};
  }


  export function stringToMovements(data:string,
                                    regions:{[name:string]:Region}):Movement[]
  {
    let pathNames = data.split(",");
    let path:Movement[] = [];
    for (let u in pathNames) path.push(stringToMovement(pathNames[u],regions));
    return path;
  }
}
