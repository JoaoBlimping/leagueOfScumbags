///<reference path="Controller.ts"/>

module Scumbag
{

  export namespace Controllers
  {
    /** controller that controls the player with the keyboard or a gamepad */
    export class PlayerController extends Controller
    {
      control(controlled:Fighter):void
      {
        let x = 0,y = 0;

        //moving
        {
          //directions
          x = InputManager.getInputDevice(0).getAxisState(Axis.Horizontal);
          y = InputManager.getInputDevice(0).getAxisState(Axis.Vertical);

          if (Math.abs(x) > 0.2 || Math.abs(y) > 0.2)
          {
            let angle = Math.atan2(y,x);
            controlled.move(angle);
          }
        }

        //jumping
        if (InputManager.getInputDevice(0).getButtonState(Button.a))
        {
          controlled.jump();
        }

        //attacking
        if (InputManager.getInputDevice(0).getButtonState(Button.lTrigger))
        {
          controlled.attack(WeaponSlot.Left);
        }
        else if (InputManager.getInputDevice(0).getButtonState(Button.rTrigger))
        {
          controlled.attack(WeaponSlot.Right);
        }
      }
    }
  }
}
