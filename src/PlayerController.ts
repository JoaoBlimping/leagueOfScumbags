///<reference path="Controller.ts"/>

module Scumbag
{
  /** controller that controls the player with the keyboard or a gamepad */
  export class PlayerController extends Controller
  {
    control(controlled:Controllable):void
    {
      let x = 0,y = 0;

      //moving
      {
        //horizontal keys
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) x = -1;
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) x = 1;

        //vertical keys
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) y = -1;
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) y = 1;

        if (x != 0 || y != 0)
        {
          let angle = Math.atan2(y,x);
          controlled.move(angle);
        }
      }

      //jumping
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
      {
        controlled.jump();
      }

      //attacking
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL))
      {
        controlled.attack();
      }
    }
  }
}
