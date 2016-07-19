///<reference path="Controller.ts"/>

module Scumbag
{

  const RANGE = 16;

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class BurrowerController extends Controller
    {
      dig:boolean = true;


      control(controlled:Fighter):void
      {
        //digging down
        if (this.dig)
        {
          controlled.move(Math.PI / 2);
          controlled.attack(WeaponSlot.Left);

          //change this eventually
          if (Math.random() > 0.99) this.dig = false;
        }
        else
        {
          let state = controlled.game.state.getCurrentState();
          if (state instanceof Fight)
          {
            let player = state.player;
            if (!player.alive) return;

            if (Math.abs((player.x + player.width / 2) - (controlled.x + controlled.width / 2)) < RANGE)
            {
              controlled.look(0 - Math.PI / 2);
              controlled.attack(WeaponSlot.Right);
            }
            else
            {
              controlled.look(Math.PI / 2);
            }
          }
        }
      }
    }
  }
}
