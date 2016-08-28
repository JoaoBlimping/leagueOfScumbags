///<reference path="InputDevice.ts"/>

module Scumbag
{

  /** a gamepad that actually is controlled by a gamepad! */
  export class GamepadInputDevice extends InputDevice
  {
    private buttons:  Array<Phaser.DeviceButton>;
    private axes:     Array<number>;
    private pad:      Phaser.SinglePad;


    constructor(pad:Phaser.SinglePad)
    {
      super();
      this.pad = pad;

      this.buttons = new Array(Button.nButtons);
      this.buttons[Button.a] = this.pad.getButton(Phaser.Gamepad.XBOX360_A);
      this.buttons[Button.b] = this.pad.getButton(Phaser.Gamepad.XBOX360_B);
      this.buttons[Button.x] = this.pad.getButton(Phaser.Gamepad.XBOX360_X);
      this.buttons[Button.y] = this.pad.getButton(Phaser.Gamepad.XBOX360_Y);
      this.buttons[Button.l] = this.pad.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
      this.buttons[Button.r] = this.pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
      this.buttons[Button.select] = this.pad.getButton(Phaser.Gamepad.XBOX360_BACK);
      this.buttons[Button.start] = this.pad.getButton(Phaser.Gamepad.XBOX360_START);
      this.buttons[Button.lTrigger] = this.pad.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
      this.buttons[Button.rTrigger] = this.pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

      this.axes = new Array<number>(Axis.nAxes);
      this.axes[Axis.Horizontal] = Phaser.Gamepad.XBOX360_STICK_LEFT_X;
      this.axes[Axis.Vertical] = Phaser.Gamepad.XBOX360_STICK_LEFT_Y;
    }


    /** extends Gamepad.getButtonState */
    getButtonState(button:Button)
    {
      return this.buttons[button].isDown;
    }


    /** extends Gamepad.getAxisState */
    getAxisState(axis:Axis)
    {
      let axisState = this.pad.axis(this.axes[axis]);
      if (!axisState) return 0;
      return axisState;
    }


    /** extends Gamepad.addOnButtonPress */
    addOnButtonPress(button:Button,callback:Function,context?:any)
    {
      this.buttons[button].onDown.add(callback,context);
    }


    /** extends Gamepad.removeOnButtonPress */
    removeOnButtonPress(button:Button,callback:Function,context?:any)
    {
      this.buttons[button].onDown.remove(callback,context);
    }

    clear()
    {
      for (let i = 0;i < Button.nButtons;i++)
      {
        this.buttons[i].onDown.removeAll();
      }
    }
  }
}
