///<reference path="Controller.ts"/>

module Scumbag
{

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class PacerController extends Controller
    {
      goLeft:boolean = false;
      control(controlled:Fighter):void
      {
        let x = 0,y = 0;

        //moving
        if (this.goLeft) x = -1;
        else x = 1;

        if (Math.random() > 0.9) this.goLeft = !this.goLeft;

        let angle = Math.atan2(y,x);
        controlled.move(angle);

        //jumping
        controlled.jump();

        //attacking
        if (Math.random() > 0.95)
        {
          let state = controlled.game.state.getCurrentState();
          if (state instanceof Fight)
          {
            let player = state.player;
            let angle = Math.atan2(player.body.y - controlled.body.y,player.body.x - controlled.body.x);
            controlled.move(angle);
            controlled.attack(WeaponSlot.Left);
          }
        }
      }
    }
  }
}
