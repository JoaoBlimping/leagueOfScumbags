///<reference path="Weapon.ts"/>

module Scumbag
{
  export namespace Weapons
  {
    /** shoots out some kind of bullet */
    export class TrogLauncher extends Weapon
    {
      bulletSpeed = 600;
      gravity     = 500;
      lifespan    = 5000;

      explosion:  Explosion;

      /** creates the gun */
      constructor(game:Phaser.Game,parent:Phaser.Group)
      {
        super(game,parent,200,1);

        //create the explosion maker
        this.explosion = new Explosion(game,parent,40,10);

        //create the future bullets
        for (let i = 0;i < 32;i++) this.add(new Bullet(game,'bullet1',this.explosion),true);
        this.setAll('tracking',true);
      }


      fire(source:Phaser.Sprite)
      {
        this.launchBullet(source.x,source.y,source.angle,this.bulletSpeed,0,this.gravity,
                          this.lifespan);
      }
    }
  }
}
