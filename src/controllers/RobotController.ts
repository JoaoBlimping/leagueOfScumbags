///<reference path="Controller.ts"/>

module Scumbag
{

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class RobotController extends Controller
    {
      control(controlled:Fighter):void
      {
        controlled.body.velocity.x = 0;

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
