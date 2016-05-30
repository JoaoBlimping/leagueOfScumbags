module Scumbag
{


  const N_INPUT_DEVICES = 1;

  export namespace InputManager
  {
    let inputDevices = Array<InputDevice>(N_INPUT_DEVICES);

    export function init(game:Phaser.Game):void
    {
      game.input.gamepad.start();

      let pad = game.input.gamepad.pad1;

      if (game.input.gamepad.supported && game.input.gamepad.active &&
          pad.connected)
      {
        console.log("using gamepad");
        inputDevices[0] = new GamepadInputDevice(pad);
      }
      else
      {
        console.log("using keyboard");
        inputDevices[0] = new KeyboardInputDevice(game);
      }
    }

    export function getInputDevice(id:number):InputDevice
    {
      return inputDevices[id];
    }

  }
}
