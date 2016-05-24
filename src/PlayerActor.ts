///<reference path="Actor.ts"/>


module Scumbag
{
  export class PlayerActor extends Actor
  {
    constructor(game:Phaser.Game,x:number,y:number,key:string,tileWidth:number,
                tileHeight:number)
    {
      super(game,x,y,key,tileWidth,tileHeight);
    }

    update()
    {
      if (this.directions.length == 0)
      {
        let input = InputManager.getInputDevice(0);
        let xStick = input.getAxisState(Axis.Horizontal);
        let yStick = input.getAxisState(Axis.Vertical);

        if (yStick < -0.5) this.directions.push(Direction.up);
        else if (xStick < -0.5) this.directions.push(Direction.left);
        else if (yStick > 0.5) this.directions.push(Direction.down);
        else if (xStick > 0.5) this.directions.push(Direction.right);
      }

      super.update();
    }

  }
}
