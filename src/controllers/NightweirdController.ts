///<reference path="Controller.ts"/>

module Scumbag
{

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class NightweirdController extends Controller
    {
      angle = 0;
      control(controlled:Fighter):void
      {
        this.angle +=  Math.random() - 0.5;
        controlled.fly(this.angle);

        //attacking
        let event = Math.random();

        if (event < 0.005)
        {
          this.game.sound.play(controlled.deathSound);
        }
      }
    }
  }
}
