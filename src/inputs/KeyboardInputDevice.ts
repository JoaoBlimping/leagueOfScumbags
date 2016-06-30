///<reference path="InputDevice.ts"/>

module Scumbag
{
  /** a pretend gamepad that actually uses the keyboard */
  export class KeyboardInputDevice extends InputDevice
  {
    private buttons:    Array<Phaser.Key>;
    private up:         Phaser.Key;
    private down:       Phaser.Key;
    private left:       Phaser.Key;
    private right:      Phaser.Key;

    constructor(game:Phaser.Game)
    {
      super();
      this.buttons = new Array<Phaser.Key>(Button.nButtons);
      this.buttons[Button.a] = game.input.keyboard.addKey(Phaser.KeyCode.SHIFT);
      this.buttons[Button.b] = game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);
      this.buttons[Button.x] = game.input.keyboard.addKey(Phaser.KeyCode.Z);
      this.buttons[Button.y] = game.input.keyboard.addKey(Phaser.KeyCode.A);
      this.buttons[Button.l] = game.input.keyboard.addKey(Phaser.KeyCode.S);
      this.buttons[Button.r] = game.input.keyboard.addKey(Phaser.KeyCode.X);
      this.buttons[Button.lTrigger] = game.input.keyboard.addKey(Phaser.KeyCode.D);
      this.buttons[Button.rTrigger] = game.input.keyboard.addKey(Phaser.KeyCode.C);
      this.buttons[Button.select] = game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);
      this.buttons[Button.start] = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

      this.up = game.input.keyboard.addKey(Phaser.KeyCode.UP);
      this.down = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
      this.left = game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
      this.right = game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
    }


    /** extends InputDevice.getButtonState */
    getButtonState(button:Button)
    {
      return this.buttons[button].isDown;
    }


    /** extends InputDevice.getAxisState */
    getAxisState(axis:Axis)
    {
      if (axis == Axis.Horizontal)
      {
        if (this.left.isDown && this.right.isDown) return 0;
        if (this.left.isDown) return -1;
        if (this.right.isDown) return 1;
        return 0;
      }

      if (axis == Axis.Vertical)
      {
        if (this.up.isDown && this.down.isDown) return 0;
        if (this.up.isDown) return -1;
        if (this.down.isDown) return 1;
        return 0;
      }
    }


    /** extends InputDevice.addOnButtonPress */
    addOnButtonPress(button:Button,callback:Function,context:any)
    {
      this.buttons[button].onDown.add(callback,context);
    }


    /** extends InputDevice.removeOnButtonPress */
    removeOnButtonPress(button:Button,callback:Function)
    {
      this.buttons[button].onDown.remove(callback);
    }
  }
}
