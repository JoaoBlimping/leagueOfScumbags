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

        if (Math.random() > 0.96) this.goLeft = !this.goLeft;

        let angle = Math.atan2(y,x);
        controlled.move(angle);

        //attacking
        if (Math.random() > 0.9)
        {
          let state = controlled.game.state.getCurrentState();
          if (state instanceof Fight)
          {

            let angle = Math.random() * Math.PI * 2 - Math.PI;
            controlled.move(angle);
            controlled.attack(WeaponSlot.Left);
          }
        }
      }
    }
  }
}
