///<reference path="Controller.ts"/>

module Scumbag
{

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class StationaryController extends Controller
    {
      homeSet = false;
      homeX:number;
      homeY:number;

      control(controlled:Fighter):void
      {
        if (!this.homeSet)
        {
          this.homeX = controlled.x;
          this.homeY = controlled.y;
          this.homeSet = true;
        }
        else
        {
          let angle = Math.atan2(this.homeY - controlled.body.y,
                                 this.homeX - controlled.body.x);
          controlled.fly(angle);
        }



        let state = controlled.game.state.getCurrentState();
        if (state instanceof Fight)
        {
          let player = state.player;
          if (!player.alive) return;

          let angle = Math.atan2(player.body.y - controlled.body.y,
                                 player.body.x - controlled.body.x);
          controlled.look(angle);
          controlled.attack(WeaponSlot.Left);
        }
      }
    }
  }
}
