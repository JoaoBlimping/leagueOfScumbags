///<reference path="Controller.ts"/>

module Scumbag
{

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class MonkeyController extends Controller
    {
      control(controlled:Fighter):void
      {
        controlled.body.velocity.x = 0;

        let state = controlled.game.state.getCurrentState();
        if (state instanceof Fight)
        {
          let player = state.player;
          if (!player.alive) return;

          let angle = player.angle;
          controlled.look(angle);
          controlled.attack(WeaponSlot.Left);
        }
      }
    }
  }
}
