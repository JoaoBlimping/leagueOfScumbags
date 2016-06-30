///<reference path="Weapon.ts"/>

module Scumbag
{
  export namespace Weapons
  {
    /** shoots out some kind of bullet */
    export class TrogMaker extends Weapon
    {
      bulletSpeed = 600;
      gravity     = 500;
      lifespan    = 5000;

      /** creates the gun */
      constructor(game:Phaser.Game,parent:Phaser.Group)
      {
        super(game,parent,200,1);
      }


      fire(source:Phaser.Sprite)
      {
        console.log("make trog");
      }
    }
  }
}
