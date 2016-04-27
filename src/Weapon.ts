module Scumbag
{
  let num = 0;

  /** a thing that shoots out bullets of some description */
  export abstract class Weapon extends Phaser.Group
  {
    /** just calls the super constructor */
    constructor(game:Phaser.Game,parent:Phaser.Group)
    {
      super(game,parent,'G'+(num++),false,true,Phaser.Physics.ARCADE);
    }

    /** fire bullets */
    abstract fire(source:Phaser.Sprite):void;
  }
}
