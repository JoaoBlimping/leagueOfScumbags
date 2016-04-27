module Scumbag
{
  /** a bullet that gets shot about the place and stuff */
  export class Bullet extends Phaser.Sprite
  {
    tracking:   boolean;
    scaleSpeed: number;

    /** constructs the bullet */
    constructor(game:Phaser.Game,key:string)
    {
      super(game,0,0,key);

      this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
      this.anchor.set(0.5);

      this.checkWorldBounds = true;
      this.outOfBoundsKill = true;
      this.exists = false;

      this.tracking = false;
      this.scaleSpeed = 0;
    }


    /** Fires the bullets so that it is back in the game
     * x and y are it's position to start at
     * angle is the angle it is fired at
     * speed is the speed it moves at
     * gx and gy are the gravity that affect it
     */
    fire(x:number,y:number,angle:number,speed:number,gx:number,gy:number)
    {
      gx = gx || 0;
      gy = gy || 0;

      this.reset(x, y);
      this.scale.set(1);

      this.game.physics.arcade.velocityFromRotation(angle, speed, this.body.velocity);
      this.angle = angle;
      this.body.gravity.set(gx, gy);
    }


    update()
    {
      if (this.tracking)
      {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
      }

      if (this.scaleSpeed > 0)
      {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
      }
    }
  }

  /** this gets called when a bullet hits the level */
  export function hitLevel(bullet:Bullet)
  {
    bullet.kill();
  }

/** this gets called when a bullet hits a fighter */
  export function hitFighter(bullet:Bullet,fighter:Fighter)
  {
    bullet.kill();
    /* TODO: it should just hurt them */
    fighter.kill();
  }
}
