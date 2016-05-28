///<reference path="GuiState.ts"/>


module Scumbag
{

  /** this is run when the player collides with an npc */
  function actorCollide(a:Actor,b:Actor)
  {
    let script = null;
    if (a instanceof PlayerActor && b instanceof NpcActor) script = b.script;
    else if (a instanceof NpcActor && b instanceof PlayerActor) script = a.script;
    else return;

    let inputDevice = InputManager.getInputDevice(0);
    if (inputDevice.getButtonState(Button.a) && script != null)
    {
      Script.setScript(script);
    }
  }

  /** the scene in which you walk around and most of the storyline takes
   * place */
  export class Overworld extends GuiState
  {
    background:       Phaser.Sprite;
    music:            Phaser.Sound;
    tilemap:          Phaser.Tilemap;
    collisionLayer:   Phaser.TilemapLayer;
    actors:           Phaser.Group;
    regions:          {[name:string]:Region};
    player:           Actor;


    /** overrides Phaser.State.create() */
    create()
    {
      //create the background
      this.background = this.add.sprite(0, 0, 'titlepage');

      //load and play the music
      this.music = this.add.audio('music', 1, false);
      this.music.play();

      //turn on phyysics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //create the tilemap
      this.tilemap = this.add.tilemap('map2');
      this.tilemap.addTilesetImage('outsideTiles','outsideTiles');
      this.tilemap.createLayer("background");
      this.collisionLayer = this.tilemap.createLayer('collisions');
      this.tilemap.setLayer(this.collisionLayer);
      this.tilemap.setCollisionBetween(0, 6569);
      this.collisionLayer.resizeWorld();


      //add player and stuff
      this.player = new PlayerActor(this.game,160,160,'chad');
      this.actors = this.game.add.group();
      this.actors.add(this.player);
      this.game.camera.follow(this.player);


      //create the regions
      this.regions = createRegions(this.tilemap.objects["regions"]);

      //create the actors
      let actors = this.tilemap.objects["actors"];
      for (let i in actors)
      {
        let x = actors[i].x;
        let y = actors[i].y + this.tilemap.tileHeight;
        let key = actors[i].properties.key;
        let pathNames = [];
        if (actors[i].properties.hasOwnProperty("path"))
        {
          pathNames = actors[i].properties.path.split(",");
        }
        let path:Region[] = [];
        for (let u in pathNames) path.push(this.regions[pathNames[u]]);

        let actor = new NpcActor(this.game,x,y,key);
        actor.path = path;
        actor.moveOnSpot = actors[i].properties.moveOnSpot;
        actor.body.immovable = actor.moveOnSpot;
        if (actors[i].properties.hasOwnProperty("script"))
        {
          actor.script = actors[i].properties.script;
        }

        this.actors.add(actor);
      }

      //create the top layer of the world
      this.tilemap.createLayer("overhead");
    }


    /** overrides Phaser.State.render() */
    render()
    {
      //this.game.debug.body(this.player);
      //this.game.debug.bodyInfo(this.player,32,32);
    }


    /** overrides GuiState.postGuiUpdate() */
    postGuiUpdate()
    {
      //make it look right
      this.actors.sort('y', Phaser.Group.SORT_ASCENDING);

      //check collisions between the characetrsand the level
      this.game.physics.arcade.collide(this.actors,this.collisionLayer);

       //check collisions between the actors and each other
       this.game.physics.arcade.collide(this.actors,this.actors,actorCollide);

       //check if the player is in a region with a script
       for (let i in this.regions)
       {
         if (this.regions[i].script != null)
         {
           if (this.player.x > this.regions[i].x &&
               this.player.x < this.regions[i].x + this.regions[i].width &&
               this.player.y > this.regions[i].y &&
               this.player.y < this.regions[i].y + this.regions[i].height)
           {
             Script.setScript(this.regions[i].script);

           }
         }
       }

    }


    /** overrides GuiState.onGuiStart() */
    onGuiStart()
    {
      this.player.updating = false;
      this.actors.setAll('updating',false);
    }


    /** overrides GuiState.onGuiEnd() */
    onGuiEnd()
    {
      this.player.updating = true;
      this.actors.setAll('updating',true);
    }
  }

}