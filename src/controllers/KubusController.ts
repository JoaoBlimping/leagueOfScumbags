///<reference path="Controller.ts"/>

module Scumbag
{

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class KubusController extends Controller
    {
      jumping:number;
      angle:number;

      control(controlled:Fighter):void
      {
        if (this.jumping > 0)
        {
          controlled.move(this.angle);
          this.jumping -= this.game.time.elapsedMS / 1000;
        }
        else
        {
          let event = Math.random();

          controlled.body.velocity.x /= 2;

          if (event < 0.02)
          {
            this.game.sound.play(controlled.deathSound);
            this.angle = Math.random() * Math.PI * 2 - Math.PI;
            this.jumping = Math.random() * 2.5;
            controlled.jump();
          }
          else if (event > 0.1)
          {
            let state = controlled.game.state.getCurrentState();
            if (state instanceof Fight)
            {
              let player = state.player;
              if (!player.alive) return;

              let angle = controlled.angle;
              controlled.angle = Math.atan2(player.body.y - controlled.body.y,
                                     player.body.x - controlled.body.x);
              controlled.attack(Math.floor(Math.random() * 2));
              controlled.angle = angle;
            }
          }
        }





      }
    }
  }
}
