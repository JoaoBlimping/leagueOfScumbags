///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{
  /** a fighter that will jump about and all that in the battle system */
  export class Fighter extends Phaser.Sprite implements Controllable
  {
    moveSpeed:number;
    jumpHeight:number;
    controller:Controller;
    angle:number;


    /** create it just like you would a sprite, at least at the moment.
     * TODO: It will probably need some kind of id so it can build itself from
     * some data file */
    constructor(game:Phaser.Game,x:number,y:number,key:string)
    {
      //run superconstructor
      super(game,x,y,key);

      //turn on physics
      this.game.physics.arcade.enable(this);
      this.body.gravity.y = 400;
      this.body.collideWorldBounds = true;

      //do animation type crap
      this.anchor.setTo(0.5,0.5);
      this.animations.add('up', [0,1,2], 10, true);
      this.animations.add('upright', [3,4,5], 10, true);
      this.animations.add('right', [6,7,8], 10, true);
      this.animations.add('downright', [9,10,11], 10, true);
      this.animations.add('down', [12,13,14], 10, true);

      //add controller
      this.moveSpeed = 200;
      this.jumpHeight = 400;
      this.controller = new PlayerController(this.game);

      //add it to the scene
      game.add.existing(this);
    }


    update()
    {
      this.body.velocity.x = 0;
      this.controller.control(this);

      //play animation if moving and if not don't
      if (this.body.velocity.x != 0)
      {
        let animationAngle = this.angle;

        if (this.body.velocity.x < 0)
        {
          this.scale.x = -1;
          if (animationAngle > 0) animationAngle = (animationAngle - Math.PI) * -1;
          else animationAngle = (animationAngle + Math.PI) * -1;
        }
        else
        {
          this.scale.x = 1;
        }

        if (animationAngle > (3 * Math.PI / 8)) this.animations.play('down');
        else if (animationAngle > Math.PI / 8) this.animations.play('downright');
        else if (animationAngle > 0 - Math.PI / 8) this.animations.play('right');
        else if (animationAngle > 0 - (3 * Math.PI / 8)) this.animations.play('upright');
        else this.animations.play('up');
      }
      else
      {
        this.animations.currentAnim.stop();
      }
    }


    move(angle:number)
    {
      this.angle = angle;
      this.body.velocity.x = this.moveSpeed * Math.cos(angle);
    }


    jump()
    {
      if (this.body.blocked.down)
      {
        this.body.velocity.y = 0 - this.jumpHeight;
      }

      if (this.body.blocked.left)
      {
        this.body.velocity.x += this.jumpHeight / 2;
        this.body.velocity.y = 0 - this.jumpHeight;
      }

      if (this.body.blocked.right)
      {
        this.body.velocity.x += this.jumpHeight / 2;
        this.body.velocity.y = 0 - this.jumpHeight;
      }
    }


    attack()
    {
      console.log("bang!");
    }
  }
}
