///<reference path="Weapon.ts"/>

module Scumbag
{
  export namespace Weapons
  {
    /** shoots out some kind of bullet */
    export class Nuke extends Weapon
    {
      bulletSpeed = 600;
      gravity     = 500;
      lifespan    = 2000;

      radioactivity:  Radioactivity;

      /** creates the gun */
      constructor(game:Phaser.Game,parent:Phaser.Group,master:Fighter)
      {
        super(game,parent,1000,7,master);

        //create the explosion maker
        this.radioactivity = new Radioactivity(game,parent,null,100);

        //create the future bullets
        for (let i = 0;i < 10;i++) this.add(new Bullet(game,'bullet4',this.radioactivity),true);
        this.setAll('collide',false);
        this.setAll('body.bounce.x',0.5);
        this.setAll('body.bounce.y',0.5);
        this.setAll('scaleSpeed',0.02);
        this.setAll('bouncy',true);
      }


      fire(source:Phaser.Sprite)
      {
        this.game.sound.play("throw");
        this.launchBullet(source.x,source.y,source.angle,this.bulletSpeed,0,
                          this.gravity,this.lifespan);
      }
    }
  }
}
