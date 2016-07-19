///<reference path="Weapon.ts"/>

module Scumbag
{
  export namespace Weapons
  {
    const bulletSpeed = 600;
    const gravity     = 500;
    const lifespan    = 5000;

    /** shoots out some kind of bullet */
    export class TrogLauncher extends Weapon
    {
      maker:  EnemyMaker;

      /** creates the gun */
      constructor(game:Phaser.Game,parent:Phaser.Group,master:Fighter)
      {
        super(game,parent,200,5,master);

        //create the explosion maker
        this.maker = new EnemyMaker(game,parent,master,"trog");

        //create the future bullets
        for (let i = 0;i < 32;i++) this.add(new Bullet(game,'bullet1',this.maker),true);
        this.setAll('tracking',true);
      }


      fire(source:Phaser.Sprite)
      {
        this.launchBullet(source.x,source.y,source.angle,bulletSpeed,0,gravity,lifespan);
      }
    }
  }
}
