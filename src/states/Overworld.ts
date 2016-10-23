///<reference path="GuiState.ts"/>


module Scumbag
{
  function actorSelector(a:Actor,distance:number)
  {
    if (a == this.player) return false;

    let deltaX = this.player.body.x - a.body.x;
    let deltaY = this.player.body.y - a.body.y;
    let angle = Math.atan(deltaY / deltaX);

    let playerDistance = this.player.body.width / 2 * Math.cos(angle) +
                         this.player.body.height / 2 * Math.sin(angle);
    let otherDistance = a.body.width / 2 * Math.cos(angle) +
                        a.body.height / 2 * Math.sin(angle);

    return distance <= playerDistance + otherDistance + 5;
  }

  /** this is run when the player presses A so we can check if they are touching
   * another actor which can be activated */
  function actorCollide()
  {
    if (!this.player.updating) return;

    let closest = this.actors.getClosestTo(this.player,actorSelector,this);

    if (closest == null) return;

    if ((this.player.animations.currentAnim.name == "left" &&
         closest.x >= this.player.x) ||
        (this.player.animations.currentAnim.name == "right" &&
         closest.x <= this.player.x) ||
        (this.player.animations.currentAnim.name == "up" &&
         closest.y >= this.player.y) ||
        (this.player.animations.currentAnim.name == "down" &&
         closest.y <= this.player.y))
    {
      return;
    }

    if (!closest.getPage().autorun)
    {
      Script.setScript(closest.getPage().script,closest);
    }
  }


  function pause()
  {
    if (this.gui != null) return;
    Script.setScript(this.game.cache.getText("saveScript"));
  }


  function addPlayerAtRegion(game:Phaser.Game,region:Region,key:string)
  {
    let x = region.x + region.width / 2;
    let y = region.y + region.height / 2;

    let page = new Page();
    page.key = StateOfGame.parameters.playerKey;

    let player = new Actor(game,x,y,"player",[page]);
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
      let returning = false;

      if (map == null)
      {
        map = StateOfGame.parameters.map;
        returning = true;
      }

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
        let page = new Page();
        page.key = StateOfGame.parameters.playerKey;
        this.player = new Actor(this.game,0,0,"player",[page]);
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
        let x = actors[i].x + actors[i].width / 2;
        let y = actors[i].y + this.tilemap.tileHeight - actors[i].height / 2;
        let name = actors[i].name;

        let actor = new Actor(this.game,x,y,name,
                              createPages(actors[i].properties.pages,name,
                                          this.tilemap.key,this.regions));

        this.actors.add(actor);
      }

      //load actors
      if (returning)
      {
        this.restoreActors();
      }

      //create the top layer of the world
      this.tilemap.createLayer("overhead");
    }


    /** implements Phaser.State.create() */
    create()
    {
      this.game.camera.follow(this.player);
      this.game.camera.focusOnXY(this.player.position.x,this.player.position.y);

      /* run the script that was going before the battle */
      if (Script.checkPaused()) Script.runScript(0);

      //if there ain't no things then don't go there
      if (this.tilemap.properties != null)
      {
        //load music if there is some
        if (this.tilemap.properties.hasOwnProperty("music"))
        {
          MusicManager.playSong(this.game,this.tilemap.properties.music,MusicChannel.Music);
        }

        if (this.tilemap.properties.hasOwnProperty("ambience"))
        {
          MusicManager.playSong(this.game,this.tilemap.properties.ambience,MusicChannel.Ambience);
        }
        else
        {
          MusicManager.stopSong(MusicChannel.Ambience);
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
      }



      //add button press callbacks
      let device = InputManager.getInputDevice(0);
      device.addOnButtonPress(Button.a,actorCollide,this);
      device.addOnButtonPress(Button.b,pause,this);

      //start a play time counter
      StateOfGame.startTimer();
    }


    /** overrides Phaser.State.render() */
    render() {}

    shutdown()
    {
      let device = InputManager.getInputDevice(0);
      device.clear();
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
       this.game.physics.arcade.collide(this.actors,this.actors);

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

    restoreActors():void
    {
      for (let i = 0;i < StateOfGame.parameters.actors.length;i++)
      {
        let dude = this.getActorByName(StateOfGame.parameters.actors[i].name);
        dude.x = StateOfGame.parameters.actors[i].x;
        dude.y = StateOfGame.parameters.actors[i].y;
      }
    }


    transition(map:string):void
    {
      let transitioner = this.add.image(this.camera.x + this.game.width / 2,
                                        this.camera.y + this.game.height / 2,
                                        "transition");
      transitioner.anchor.setTo(0.5,0.5);
      let tween = this.add.tween(transitioner.scale).to({x:30,y:30},700,Phaser.Easing.Default,true);
      this.add.tween(transitioner).to({angle:1000},700,Phaser.Easing.Default,true);
      tween.onComplete.add(function(){this.game.state.start("Fight",true,false,map);},this);
      this.game.sound.play("swish");
      this.onGuiStart();
    }
  }

}
