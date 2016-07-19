module Scumbag
{
  let num = 0;

  /** a thing that shoots out bullets of some description */
  export abstract class Weapon extends Phaser.Group
  {
    master:   Fighter;
    wait:     number;
    manaCost: number;

    /** just calls the super constructor */
    constructor(game:Phaser.Game,parent:Phaser.Group,wait:number,
                manaCost:number,master:Fighter)
    {
      super(game,parent,'G'+(num++),false,true,Phaser.Physics.ARCADE);
      this.wait = wait;
      this.manaCost = manaCost;
      this.master = master;
    }

    /** launch a bullet if there is any available in the group */
    launchBullet(x:number,y:number,angle:number,speed:number,gx:number,
                 gy:number,lifespan:number)
    {
      let bullet = this.getFirstExists(false);
      if (bullet != null) bullet.fire(x,y,angle,speed,gx,gy,lifespan);
    }

    /** fire bullets */
    abstract fire(source:Phaser.Sprite):void;
  }
}
