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
    abstract control(controlled:Controllable):void;
  }

  /** interface for things that can be controlled by a controller. It's only
   * going to be fighters, but this interface hides the other stuff that the
   * controller doesn't need to see */
  export interface Controllable
  {
    /** make the controlled thing move in a given direction */
    move(angle:number):void;

    /** make the controlled thing jump */
    jump():void;

    /** make the controlled thing use it's set attack in it's current
     * direction */
    attack():void;
  }
}
