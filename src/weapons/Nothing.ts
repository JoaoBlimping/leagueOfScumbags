///<reference path="Weapon.ts"/>

module Scumbag
{
  export namespace Weapons
  {
    /** shoots out some kind of bullet */
    export class Nothing extends Weapon
    {

      /** creates the gun */
      constructor(game:Phaser.Game,parent:Phaser.Group,master:Fighter)
      {
        super(game,parent,0,0,master);
      }


      fire(source:Phaser.Sprite){}
    }
  }
}
