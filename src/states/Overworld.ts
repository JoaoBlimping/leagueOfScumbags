///<reference path="GuiState.ts"/>


module Scumbag
{

  /** this is run when the player collides with an npc */
  function actorCollide(a:Actor,b:Actor)
  {
    let script = null;
    if (a.name == "player")
    {
      script = b.script;
      StateOfGame.parameters.playerX = a.position.x;
      StateOfGame.parameters.playerY = a.position.y;
    }
    else if (b.name == "player")
    {
      script = a.script;
      StateOfGame.parameters.playerX = b.position.x;
      StateOfGame.parameters.playerY = b.position.y;
    }
    else return;

    let inputDevice = InputManager.getInputDevice(0);
    if (inputDevice.getButtonState(Button.a) && script != null)
    {
      Script.setScript(script);
    }
  }


  function addPlayerAtRegion(game:Phaser.Game,region:Region,key:string)
  {
    let x = region.x + region.width / 2;
    let y = region.y + region.height / 2;
    let player = new Actor(game,x,y,key,"player");
    player.moveMode = MovementMode.PlayerControlled;
    return player;
  }


  /** the scene in which you walk around and most of the storyline takes
   * place */
  export class Overworld extends GuiState
  {
    background:       Background    = null;
    tilemap:          Phaser.Tilemap;
    collisionLayer:   Phaser.TilemapLayer;
    actors:           Phaser.Group;
    regions:          {[name:string]:Region};
    player:           Actor;


    /** overrides Phaser.State.init() */
    init(map:string,playerRegion:string)
    {
      if (map == null) map = StateOfGame.parameters.map;

      //save the map name
      StateOfGame.parameters.map = map;

      //turn on phyysics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //create the tilemap
      this.tilemap = this.add.tilemap(map);
      for (let i in this.tilemap.tilesets)
      {
        this.tilemap.addTilesetImage(this.tilemap.tilesets[i].name,
                                     this.tilemap.tilesets[i].name);
      }
      this.collisionLayer = this.tilemap.createLayer('collisions');
      this.tilemap.setLayer(this.collisionLayer);
      this.tilemap.setCollisionBetween(0,6569);
      this.collisionLayer.resizeWorld();
      this.collisionLayer.visible = false;

      this.tilemap.createLayer("background");
      this.tilemap.createLayer("things");

      //create the regions
      this.regions = createRegions(this.tilemap.objects["regions"]);

      //add player and stuff
      if (playerRegion == null)
      {
        this.player = new Actor(this.game,
                                      StateOfGame.parameters.playerX,
                                      StateOfGame.parameters.playerY,
                                      StateOfGame.parameters.playerKey,
                                      "player");
        this.player.moveMode = MovementMode.PlayerControlled;
      }
      else
      {
        this.player = addPlayerAtRegion(this.game,this.regions[playerRegion],
                                        StateOfGame.parameters.playerKey);
      }
      this.actors = this.game.add.group();
      this.actors.add(this.player);

      //create the actors
      let actors = this.tilemap.objects["actors"];
      for (let i in actors)
      {
        let x = actors[i].x;
        let y = actors[i].y + this.tilemap.tileHeight;
        let key = actors[i].properties.key;
        let name = actors[i].name;
        let path:Movement[] = [];
        if (actors[i].properties.hasOwnProperty("path"))
        {
          path = stringToMovements(actors[i].properties.path,this.regions);
        }

        let actor = new Actor(this.game,x,y,key,name);
        actor.path = path;
        actor.moveOnSpot = actors[i].properties.moveOnSpot;
        actor.body.immovable = actor.moveOnSpot;
        if (actors[i].properties.hasOwnProperty("script"))
        {
          if (actors[i].properties.script != "")
          {
            actor.script = actors[i].properties.script;
          }
        }
        this.actors.add(actor);
      }

      //create the top layer of the world
      this.tilemap.createLayer("overhead");
    }


    /** implements Phaser.State.create() */
    create()
    {
      this.game.camera.follow(this.player);
      this.game.camera.focusOnXY(this.player.position.x,this.player.position.y);

      //if there ain't no things then don't go there
      if (this.tilemap.properties == null) return;

      //load music if there is some
      if (this.tilemap.properties.hasOwnProperty("music"))
      {
        MusicManager.playSong(this.game,this.tilemap.properties.music);
      }

      //create the background
      if (this.tilemap.properties.hasOwnProperty("background"))
      {
        if (this.tilemap.properties.background != "")
        {
          this.background = new Background(this.tilemap.properties.background,
                                           this.tilemap.width * this.tilemap.tileWidth,
                                           this.tilemap.height * this.tilemap.tileHeight,
                                           this.game);
        }
      }

      //run script if there is one
      if (this.tilemap.properties.hasOwnProperty("startScript"))
      {
        if (this.tilemap.properties.startScript != "")
        {
          Script.setScript(this.tilemap.properties.startScript);
        }
      }
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

      //fix up the background image if there is one
      if (this.background != null)
      {
        this.background.update(this.camera.x,this.camera.y);
      }

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

    /** gives you an actor by their name, or returns null if no actor has that
     * name */
    getActorByName(name:string):Actor
    {
      for (let i = 0;i < this.actors.length;i++)
      {
        if ((<Actor>this.actors.getAt(i)).name == name)
        {
          return <Actor>this.actors.getAt(i);
        }
      }
      return null;
    }
  }

}
