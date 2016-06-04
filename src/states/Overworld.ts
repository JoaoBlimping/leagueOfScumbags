///<reference path="GuiState.ts"/>


module Scumbag
{

  /** this is run when the player collides with an npc */
  function actorCollide(a:Actor,b:Actor)
  {
    let script = null;
    if (a instanceof PlayerActor && b instanceof NpcActor)
    {
      script = b.script;
      StateOfGame.parameters.playerX = a.position.x;
      StateOfGame.parameters.playerY = a.position.y;
    }
    else if (a instanceof NpcActor && b instanceof PlayerActor)
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

  /** the scene in which you walk around and most of the storyline takes
   * place */
  export class Overworld extends GuiState
  {
    background:       Phaser.Image  = null;
    music:            Phaser.Sound  = null;
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
      this.tilemap.createLayer("background");
      this.collisionLayer = this.tilemap.createLayer('collisions');
      this.tilemap.setLayer(this.collisionLayer);
      this.tilemap.setCollisionBetween(0, 6569);
      this.collisionLayer.resizeWorld();

      //create the regions
      this.regions = createRegions(this.tilemap.objects["regions"]);

      //add player and stuff
      if (playerRegion == null)
      {
        this.player = new PlayerActor(this.game,
                                      StateOfGame.parameters.playerX,
                                      StateOfGame.parameters.playerY,
                                      "chad");
      }
      else
      {
        this.player = addPlayerAtRegion(this.game,this.regions[playerRegion],"chad");
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

      //run script if there is one
      if (this.tilemap.properties.hasOwnProperty("startScript"))
      {
        if (this.tilemap.properties.startScript != "")
        {
          Script.setScript(this.tilemap.properties.startScript);
        }
      }

      //create the background
      if (this.tilemap.properties.hasOwnProperty("background"))
      {
        if (this.tilemap.properties.background != "")
        {
          this.background = this.add.image(0,0,this.tilemap.properties.background);
          this.background.sendToBack();
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
        let mapWidth = this.tilemap.width * this.tilemap.tileWidth;
        let mapHeight = this.tilemap.height * this.tilemap.tileHeight;

        let x = (this.game.camera.position.x) / (mapWidth - this.game.camera.width) *
                (mapWidth - this.background.width);
        let y = (this.game.camera.position.y) / (mapHeight - this.game.camera.height) *
                (mapHeight - this.background.height);

        if (isFinite(x)) this.background.x = x;
        if (isFinite(y)) this.background.y = y;
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
  }

}
