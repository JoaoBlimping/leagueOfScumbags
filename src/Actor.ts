///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{
  /** creates a bunch of pages out of a string containing their string representation */
  export function createPages(rawData:string,regions:{[name:string]:Region}):Page[]
  {
    let pages:Page[] = [];

    let rawPages = rawData.split("@");
    for (let i = 0;i < rawPages.length - 1;i++)
    {
      pages[i] = new Page();

      let rawPage = rawPages[i + 1];
      let conditions = rawPage.substr(0,rawPage.indexOf("\n")).split(",");
      let values = rawPage.substr(rawPage.indexOf("\n"),rawPage.indexOf("$") -
                   rawPage.indexOf("\n")).split("\n");
      pages[i].script = rawPage.substr(rawPage.indexOf("$") + 1);

      //do conditions
      for (let u = 0;u < conditions.length;u++)
      {
        let parts = conditions[u].split(" ");
        if (parts[0] == "s") pages[i].switches.push(parts[1]);
        if (parts[0] == "v") pages[i].variables.push({name:parts[1],threshold:parseInt(parts[2])});
      }

      for (let u = 0;u < values.length;u++)
      {
        //TODO: if it's the path or an enum do the right stuff for that
        let name = values[u].substr(0,values[u].indexOf(" "));
        let value = values[u].substr(values[u].indexOf(" ") + 1);
        if (value.length < 1) continue;

        if (name == "path")
        {
          pages[i].path = stringToMovements(JSON.parse(value),regions);
        }
        else pages[i][name] = JSON.parse(value);
      }
    }
    return pages;
  }


  /** the different modes of movement that actors can be in
   * PermanentPath is for when they are following a path over and over again
   * TemporaryPath is for when they follow a path once and then stop
   * PlayerControlled is for whe they are being controlled by the player */
  export enum MovementMode
  {
    PermanentPath,
    TemporaryPath,
    PlayerControlled
  }


  /** a page of actor data which does all the stuff and that */
  export class Page
  {
    switches:   string[]                          = [];
    variables:  {name:string,threshold:number}[]  = [];

    key:        string                            = "";
    moveOnSpot: boolean                           = false;
    autorun:    boolean                           = false;
    immovable:  boolean                           = false;
    moveSpeed:  number                            = 100;
    path:       Movement[]                        = [];
    script:     string                            = "";


    /** tells you if this page is good to go or nah */
    evaluatePermissions():boolean
    {
      for (let i = 0;i < this.switches.length;i++)
      {
        if (!StateOfGame.parameters.switches[this.switches[i]]) return false;
      }

      for (let i = 0;i < this.variables.length;i++)
      {
        if (!(StateOfGame.parameters.variables[this.variables[i].name] >= this.variables[i].threshold))
        {
          return false;
        }
      }
      return true;
    }
  }


  /** a fighter that will jump about and all that in the battle system */
  export class Actor extends Phaser.Sprite
  {
    name:     string;
    updating: boolean = true;
    waiting:  boolean = false;
    waitTime: number  = 0;
    autoran:  boolean = false;
    moveMode: MovementMode;

    pages:    Page[];
    page:     number  = -1;

    /** like a sprite, but also with tile width and height */
    constructor(game:Phaser.Game,x:number,y:number,name:string,pages:Page[])
    {
      //run superconstructor
      super(game,x,y,pages[0].key);

      //set it's parameters
      this.name = name;
      this.pages = pages;

      //turn on physics
      this.game.physics.arcade.enable(this);
      this.body.collideWorldBounds = true;

      //add it to the scene
      game.add.existing(this);

      //evaluate it's pages
      this.evaluatePages();
    }


    /** overrides Phaser.Sprite.update() */
    update()
    {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      if (!this.updating)
      {
        if (!this.getPage().moveOnSpot) this.animations.stop();
        return;
      }

      if (this.getPage().autorun && !this.autoran)
      {
        Script.setScript(this.getPage().script);
        this.autoran = true;
      }

      this.evaluateNextPage();

      this.move();

      //set the animation right
      let angle = Math.atan2(this.body.velocity.y,this.body.velocity.x);
      if (this.body.velocity.x != 0 || this.body.velocity.y != 0 ||
          this.getPage().moveOnSpot)
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
      if ((this.getPage().path.length == 0 &&
          (this.moveMode == MovementMode.PermanentPath ||
           this.moveMode == MovementMode.TemporaryPath)) || this.waiting)
      {
        return;
      }

      //control like the player
      if (this.moveMode == MovementMode.PlayerControlled)
      {
        let input = InputManager.getInputDevice(0);
        this.body.velocity.x = input.getAxisState(Axis.Horizontal) * this.getPage().moveSpeed;
        this.body.velocity.y = input.getAxisState(Axis.Vertical) * this.getPage().moveSpeed;
      }

      //control via some sort of path
      else
      {
        if (this.getPage().path[0].type == MovementType.Wait)
        {
          this.waitTime -= this.game.time.elapsedMS;
          if (this.waitTime <= 0) this.nextMovement();
        }
        else if (this.getPage().path[0].type == MovementType.Walk) this.pathMove();
      }
    }

    pathMove():void
    {
      if (this.x > this.getPage().path[0].region.x &&
          this.x < this.getPage().path[0].region.x + this.getPage().path[0].region.width &&
          this.y > this.getPage().path[0].region.y &&
          this.y < this.getPage().path[0].region.y + this.getPage().path[0].region.height)
      {
        this.nextMovement();
        return;
      }

      //set angle to the target destination
      let deltaX = (this.getPage().path[0].region.x + this.getPage().path[0].region.width / 2) - this.x;
      let deltaY = (this.getPage().path[0].region.y + this.getPage().path[0].region.height / 2) - this.y;
      let angle = Math.atan2(deltaY,deltaX);

      this.body.velocity.x = this.getPage().moveSpeed * Math.cos(angle);
      this.body.velocity.y = this.getPage().moveSpeed * Math.sin(angle);
    }

    /** goes to the next movement that the actor has to do */
    nextMovement():void
    {
      if (this.moveMode == MovementMode.PermanentPath)
      {
        this.getPage().path.push(this.getPage().path[0]);
      }
      this.getPage().path.splice(0,1);

      if (this.getPage().path.length == 0) return;

      if (this.getPage().path[0].type == MovementType.Wait)
      {
        this.waitTime = this.getPage().path[0].waitTime;
      }
    }

    /** sets the actor's path from a string containing a representation of a
     * path */
    setPathFromString(newPath:string,regions:{[name:string]:Region}):void
    {
      this.getPage().path = stringToMovements(newPath,regions);
    }

    /** gives you the current page that the actor is on */
    getPage():Page
    {
      return this.pages[this.page];
    }

    /** go through all the actors pages and see which one it should be on */
    evaluatePages():void
    {
      let oldPage = this.page;
      for (let i = this.page + 1;i < this.pages.length;i++)
      {
        if (!this.pages[i].evaluatePermissions()) break;
        this.page = i;
      }
      if (this.page == -1) this.kill();
      else if (oldPage != this.page) this.beginPage();
    }

    /** checks to see if the actor can go to their next page */
    evaluateNextPage():void
    {
      if (this.page >= this.pages.length - 1) return;
      if (this.pages[this.page + 1].evaluatePermissions())
      {
        this.page++;
        this.beginPage();
      }
    }

    /** called when an actor first goes to a new page */
    beginPage():void
    {
      this.loadTexture(this.getPage().key);

      //set it's dimensions
      this.body.width = this.width / 5 * 4;
      this.body.height = this.height / 12 * 5;
      this.body.offset.x = this.width / 10;
      this.body.offset.y = this.height / 2;


      //do animation type crap
      this.anchor.setTo(0.5,1);
      this.animations.add('down',[0,1,2,3],10,true);
      this.animations.add('right',[4,5,6,7],10,true);
      this.animations.add('left',[8,9,10,11],10,true);
      this.animations.add('up',[12,13,14,15],10,true);

      //make it immovable if relevant
      if (this.getPage().immovable) this.body.immovable = true;

      //set move mode to PermanentPath
      this.moveMode = MovementMode.PermanentPath;

      this.autoran = false;
    }
  }
}
