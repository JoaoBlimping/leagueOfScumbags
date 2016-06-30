module Scumbag
{
  /** some code that controls a fighter. It will either be some kind of ai, or
   * just taking controls from the player */
  export abstract class Controller
  {
    game: Phaser.Game;

    constructor(game:Phaser.Game)
    {
      this.game = game;
    }

    /** makes it control a given fighter */
    abstract control(controlled:Fighter):void;
  }

  /** the slots for weapons that each controllable has */
  export enum WeaponSlot
  {
    Left,
    Right,
    nWeaponSlots
  }
}
