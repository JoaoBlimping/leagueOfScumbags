///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{
  /** the different modes of movement that actors can be in
   * PermanentPath is for when they are following a path over and over again
   * TemporaryPath is for when they follow a path once and then stop
   * PlayerControlled is for whe they are being controlled by the player*/
  export enum MovementMode
  {
    PermanentPath,
    TemporaryPath,
    PlayerControlled
  }


  /** a fighter that will jump about and all that in the battle system */
  export class Actor extends Phaser.Sprite
  {
    name:           string;
    moveSpeed:      number;
    updating:       boolean       = true;
    moveOnSpot:     boolean       = false;

    moveMode:       MovementMode  = MovementMode.PermanentPath;
    path:           Movement[]    = [];
    script:         string        = null;

    waiting:          boolean   = false;
    waitTime:         number    = 0;

    /** like a sprite, but also with tile width and height */
    constructor(game:Phaser.Game,x:number,y:number,key:string,name:string)
    {
      //run superconstructor
      super(game,x,y,key);

      //set it's name
      this.name = name;

      //turn on physics
      this.game.physics.arcade.enable(this);
      this.body.collideWorldBounds = true;

      //set it's dimensions
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

      this.move();

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

    move():void
    {
      if ((this.path.length == 0 &&
          (this.moveMode == MovementMode.PermanentPath ||
           this.moveMode == MovementMode.TemporaryPath)) || this.waiting)
      {
        return;
      }

      //control like the player
      if (this.moveMode == MovementMode.PlayerControlled)
      {
        let input = InputManager.getInputDevice(0);
        this.body.velocity.x = input.getAxisState(Axis.Horizontal) * this.moveSpeed;
        this.body.velocity.y = input.getAxisState(Axis.Vertical) * this.moveSpeed;
      }

      //control via some sort of path
      else
      {
        if (this.path[0].type == MovementType.Wait)
        {
          this.waitTime -= this.game.time.elapsedMS;
          if (this.waitTime <= 0) this.nextMovement();
        }
        else if (this.path[0].type == MovementType.Walk) this.pathMove();
      }
    }

    pathMove():void
    {
      if (this.x > this.path[0].region.x &&
          this.x < this.path[0].region.x + this.path[0].region.width &&
          this.y > this.path[0].region.y &&
          this.y < this.path[0].region.y + this.path[0].region.height)
      {
        this.nextMovement();
        return;
      }

      //set angle to the target destination
      let deltaX = (this.path[0].region.x + this.path[0].region.width / 2) - this.x;
      let deltaY = (this.path[0].region.y + this.path[0].region.height / 2) - this.y;
      let angle = Math.atan2(deltaY,deltaX);

      this.body.velocity.x = this.moveSpeed * Math.cos(angle);
      this.body.velocity.y = this.moveSpeed * Math.sin(angle);
    }

    nextMovement():void
    {
      if (this.moveMode == MovementMode.PermanentPath)
      {
        this.path.push(this.path[0]);
      }
      this.path.splice(0,1);

      if (this.path.length == 0) return;

      if (this.path[0].type == MovementType.Wait)
      {
        this.waitTime = this.path[0].waitTime;
      }
    }

    setPathFromString(newPath:string,regions:{[name:string]:Region}):void
    {
      this.path = stringToMovements(newPath,regions);
    }
  }
}
