///<reference path="Actor.ts"/>


module Scumbag
{
  export class PlayerActor extends Actor
  {
    constructor(game:Phaser.Game,x:number,y:number,key:string)
    {
      super(game,x,y,key);
    }

    postActorUpdate()
    {
      let input = InputManager.getInputDevice(0);
      this.body.velocity.x = input.getAxisState(Axis.Horizontal) * this.moveSpeed;
      this.body.velocity.y = input.getAxisState(Axis.Vertical) * this.moveSpeed;
    }

  }
}
