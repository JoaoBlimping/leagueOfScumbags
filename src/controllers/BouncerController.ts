///<reference path="Controller.ts"/>

module Scumbag
{

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class BouncerController extends Controller
    {
      goLeft:boolean = false;
      control(controlled:Fighter):void
      {
        let x = 0,y = 0;

        //always jump
        controlled.jump();

        //moving
        if (this.goLeft) x = -1;
        else x = 1;

        //change this to if hit wall somehow
        if (Math.random() > 0.96) this.goLeft = !this.goLeft;

        let angle = Math.atan2(y,x);
        controlled.move(angle);

        //attacking
        if (Math.random() > 0.6)
        {
          let state = controlled.game.state.getCurrentState();
          if (state instanceof Fight)
          {
            let player = state.player;
            if (!player.alive) return;

            let angle = Math.atan2(player.body.y - controlled.body.y,player.body.x - controlled.body.x);
            controlled.move(angle);
            //controlled.attack(Math.floor(Math.random() * 2));
          }
        }
      }
    }
  }
}
