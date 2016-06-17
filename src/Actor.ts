///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{
  /** a fighter that will jump about and all that in the battle system */
  export abstract class Actor extends Phaser.Sprite
  {
    name:           string;
    moveSpeed:      number;
    updating:       boolean = true;
    moveOnSpot:     boolean = false;

    /** like a sprite, but also with tile width and height */
    constructor(game:Phaser.Game,x:number,y:number,key:string)
    {
      //run superconstructor
      super(game,x,y,key);

      //turn on physics
      this.game.physics.arcade.enable(this);
      this.body.collideWorldBounds = true;

      //set the tile width
      this.body.width = this.width / 5 * 4;
      this.body.height = this.height / 10 * 4;
      this.body.offset.x = this.width / 10;
      this.body.offset.y = this.height / 10 * 6;


      //do animation type crap
      this.anchor.setTo(0.5,1);
      this.animations.add('down',[0,1,2,3],10,true);
      this.animations.add('right',[4,5,6,7],10,true);
      this.animations.add('left',[8,9,10,11],10,true);
      this.animations.add('up',[12,13,14,15],10,true);

      //add controller
      this.moveSpeed = 100;

      //add it to the scene
      game.add.existing(this);
    }


    /** overrides Phaser.Sprite.update() */
    update()
    {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      if (!this.updating)
      {
        if (!this.moveOnSpot) this.animations.stop();
        return;
      }

      this.postActorUpdate();

      //set the animation right
      let angle = Math.atan2(this.body.velocity.y,this.body.velocity.x);
      if (this.body.velocity.x != 0 || this.body.velocity.y != 0 ||
          this.moveOnSpot)
      {
        if (angle < -3 * Math.PI / 4) this.animations.play("left");
        else if (angle < -1 * Math.PI / 4) this.animations.play("up");
        else if (angle < Math.PI / 4) this.animations.play("right");
        else if (angle < 3 * Math.PI / 4) this.animations.play("down");
        else this.animations.play("left");
      }
      else this.animations.stop();
    }


    /** this is the update that will happen when the superclass has decided that
     * it is allowed to happen */
    abstract postActorUpdate():void;
  }
}
